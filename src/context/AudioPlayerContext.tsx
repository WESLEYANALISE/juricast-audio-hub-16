import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { AudioPlayerContextType, AudioPlayerState, PodcastEpisode, AudioPlayerProviderProps } from '@/lib/types';
import { saveEpisodeProgress, getEpisodesByArea } from '@/lib/podcast-service';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

// Initial state for audio player
const initialState: AudioPlayerState = {
  isPlaying: false,
  currentEpisode: null,
  volume: 1,
  isMuted: false,
  duration: 0,
  currentTime: 0,
  playbackRate: 1,
  showMiniPlayer: false,
  isLoading: false,
  queue: [],
};

// Types of actions for the reducer
type AudioPlayerAction = 
  | { type: 'PLAY', payload: PodcastEpisode }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SET_VOLUME', payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_DURATION', payload: number }
  | { type: 'SET_CURRENT_TIME', payload: number }
  | { type: 'SET_PLAYBACK_RATE', payload: number }
  | { type: 'SHOW_MINI_PLAYER' }
  | { type: 'HIDE_MINI_PLAYER' }
  | { type: 'ADD_TO_QUEUE', payload: PodcastEpisode }
  | { type: 'REMOVE_FROM_QUEUE', payload: number }
  | { type: 'SET_QUEUE', payload: PodcastEpisode[] }
  | { type: 'CLEAR_QUEUE' }
  | { type: 'STOP' };

// Reducer function to handle state changes
function audioPlayerReducer(state: AudioPlayerState, action: AudioPlayerAction): AudioPlayerState {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        currentEpisode: action.payload,
        showMiniPlayer: true,
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };
    case 'RESUME':
      return {
        ...state,
        isPlaying: true,
      };
    case 'STOP':
      return {
        ...initialState
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0,
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };
    case 'SET_PLAYBACK_RATE':
      return {
        ...state,
        playbackRate: action.payload,
      };
    case 'SHOW_MINI_PLAYER':
      return {
        ...state,
        showMiniPlayer: true,
      };
    case 'HIDE_MINI_PLAYER':
      return {
        ...state,
        showMiniPlayer: false,
      };
    case 'ADD_TO_QUEUE':
      // Prevent duplicates
      if (state.queue.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter(episode => episode.id !== action.payload),
      };
    case 'CLEAR_QUEUE':
      return {
        ...state,
        queue: [],
      };
    default:
      return state;
  }
}

// Create the context
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// Create a single global audio element
let globalAudioElement: HTMLAudioElement | null = null;

// Provider component
export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queryClient = useQueryClient();
  const progressTrackingInterval = useRef<number | null>(null);

  // Initialize audio element only once in the app lifecycle
  useEffect(() => {
    // Create the audio element only if it doesn't exist
    if (!globalAudioElement) {
      globalAudioElement = new Audio();
      console.log('Creating new global audio element');
    }
    
    // Assign the global element to our ref
    audioRef.current = globalAudioElement;
    
    // Clean up on unmount - but don't destroy the global element
    return () => {
      if (progressTrackingInterval.current) {
        window.clearInterval(progressTrackingInterval.current);
      }
    };
  }, []);

  // Fetch related episodes to queue when current episode changes
  useEffect(() => {
    const fetchAndQueueRelatedEpisodes = async () => {
      if (state.currentEpisode && state.queue.length === 0) {
        try {
          const relatedEpisodes = await getEpisodesByArea(state.currentEpisode.area);
          
          // Filter out current episode and create a queue of up to 5 related episodes
          if (relatedEpisodes && relatedEpisodes.length > 0) {
            const filteredEpisodes = relatedEpisodes
              .filter(ep => ep.id !== state.currentEpisode?.id)
              .slice(0, 5);
              
            if (filteredEpisodes.length > 0) {
              dispatch({ type: 'SET_QUEUE', payload: filteredEpisodes });
            }
          }
        } catch (error) {
          console.error('Error fetching related episodes for queue:', error);
        }
      }
    };
    
    fetchAndQueueRelatedEpisodes();
  }, [state.currentEpisode]);

  // Handle audio source changes
  useEffect(() => {
    if (state.currentEpisode && audioRef.current) {
      // Only set src if it's different from current to prevent duplicate playback
      if (audioRef.current.src !== state.currentEpisode.url_audio) {
        audioRef.current.src = state.currentEpisode.url_audio;
        audioRef.current.load(); // Explicitly load to avoid race conditions
      }
      
      audioRef.current.volume = state.isMuted ? 0 : state.volume;
      audioRef.current.playbackRate = state.playbackRate;
      
      const handleLoadedMetadata = () => {
        dispatch({ type: 'SET_DURATION', payload: audioRef.current?.duration || 0 });
      };
      
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          dispatch({ type: 'SET_CURRENT_TIME', payload: audioRef.current.currentTime });
        }
      };
      
      const handleEnded = () => {
        dispatch({ type: 'PAUSE' });
        // Save progress as completed
        if (state.currentEpisode) {
          saveEpisodeProgress(state.currentEpisode.id, 100, audioRef.current?.duration || 0);
          queryClient.invalidateQueries({
            queryKey: ['inProgressEpisodes']
          });
          queryClient.invalidateQueries({
            queryKey: ['completedEpisodes']
          });
        }
        
        // Play next in queue if available
        if (state.queue.length > 0) {
          const nextEpisode = state.queue[0];
          dispatch({ type: 'PLAY', payload: nextEpisode });
          dispatch({ type: 'REMOVE_FROM_QUEUE', payload: nextEpisode.id });
          toast({
            title: "Reproduzindo próximo episódio",
            description: nextEpisode.titulo,
            duration: 3000,
          });
        }
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      
      // Don't auto-play when just setting source, let components control that
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [state.currentEpisode, queryClient]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Error playing audio:', error);
            dispatch({ type: 'PAUSE' });
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume;
    }
  }, [state.volume, state.isMuted]);

  // Handle playback rate changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.playbackRate;
    }
  }, [state.playbackRate]);

  // Set up progress tracking when playing
  useEffect(() => {
    if (state.isPlaying && state.currentEpisode?.id !== undefined) {
      // Clear any existing interval
      if (progressTrackingInterval.current) {
        window.clearInterval(progressTrackingInterval.current);
      }

      // Set new interval
      progressTrackingInterval.current = window.setInterval(() => {
        if (audioRef.current && state.currentEpisode) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration || 0;
          const progressPercent = duration > 0 ? Math.floor(currentTime / duration * 100) : 0;
          saveEpisodeProgress(state.currentEpisode.id, progressPercent, currentTime);
        }
      }, 5000); // Save every 5 seconds
    } else if (progressTrackingInterval.current) {
      // Clear interval when not playing
      window.clearInterval(progressTrackingInterval.current);
    }

    // Cleanup on unmount
    return () => {
      if (progressTrackingInterval.current) {
        window.clearInterval(progressTrackingInterval.current);
      }
    };
  }, [state.isPlaying, state.currentEpisode]);

  // Context methods
  const play = (episode: PodcastEpisode) => {
    dispatch({ type: 'PLAY', payload: episode });
    // Notify with toast
    if (episode.titulo) {
      toast({
        title: "Reproduzindo",
        description: episode.titulo,
        variant: "default"
      });
    }
  };

  const pause = () => {
    dispatch({ type: 'PAUSE' });
  };

  const resume = () => {
    dispatch({ type: 'RESUME' });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const toggleMute = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch({ type: 'SET_CURRENT_TIME', payload: time });
    }
  };

  const seekTo = seek;

  const setPlaybackRate = (rate: number) => {
    dispatch({ type: 'SET_PLAYBACK_RATE', payload: rate });
  };

  const skipForward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + seconds);
      audioRef.current.currentTime = newTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
    }
  };

  const skipBackward = (seconds = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - seconds);
      audioRef.current.currentTime = newTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
    }
  };

  const addToQueue = (episode: PodcastEpisode) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: episode });
    toast({
      title: "Adicionado à fila",
      description: episode.titulo
    });
  };

  const removeFromQueue = (episodeId: number) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: episodeId });
  };

  const clearQueue = () => {
    dispatch({ type: 'CLEAR_QUEUE' });
  };

  const closeMiniPlayer = () => {
    dispatch({ type: 'HIDE_MINI_PLAYER' });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    dispatch({ type: 'STOP' });
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const stop = () => {
    dispatch({ type: 'STOP' });
  };

  const playNext = () => {
    if (state.queue.length > 0) {
      const nextEpisode = state.queue[0];
      play(nextEpisode);
      removeFromQueue(nextEpisode.id);
    }
  };

  const playPrevious = () => {
    // Implementation for playing previous track if needed
    console.log('Play previous not implemented yet');
  };

  const value: AudioPlayerContextType = {
    state,
    play,
    pause,
    resume,
    setVolume,
    toggleMute,
    seek,
    setPlaybackRate,
    skipForward,
    skipBackward,
    addToQueue,
    removeFromQueue,
    clearQueue,
    closeMiniPlayer,
    seekTo,
    togglePlay,
    stop,
    playNext,
    playPrevious
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
