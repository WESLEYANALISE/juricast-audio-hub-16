import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { AudioPlayerContextType, AudioPlayerState, PodcastEpisode, AudioPlayerProviderProps } from '@/lib/types';
import { saveEpisodeProgress, getEpisodesByArea, getAllEpisodes } from '@/lib/podcast-service';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
  const progressSaveTimeout = useRef<number | null>(null);
  const themeEpisodes = useRef<PodcastEpisode[]>([]);

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
      if (state.currentEpisode) {
        try {
          // Get all episodes in the same area and theme
          const areaEpisodes = await getEpisodesByArea(state.currentEpisode.area);
          
          if (areaEpisodes && areaEpisodes.length > 0) {
            // Filter episodes with the same theme and sort by sequence
            const sameThemeEpisodes = areaEpisodes
              .filter(ep => ep.tema === state.currentEpisode?.tema)
              .sort((a, b) => {
                // Parse sequence as numbers if possible, otherwise compare as strings
                const seqA = parseInt(a.sequencia) || a.sequencia;
                const seqB = parseInt(b.sequencia) || b.sequencia;
                
                if (typeof seqA === 'number' && typeof seqB === 'number') {
                  return seqA - seqB;
                }
                return String(a.sequencia).localeCompare(String(b.sequencia));
              });
            
            // Store theme episodes for later use
            themeEpisodes.current = sameThemeEpisodes;
            
            // Find current episode index in the sequence
            const currentIndex = sameThemeEpisodes.findIndex(ep => ep.id === state.currentEpisode?.id);
            
            // If we found the episode and there are more episodes after it, queue them
            if (currentIndex !== -1 && currentIndex < sameThemeEpisodes.length - 1) {
              const nextEpisodes = sameThemeEpisodes.slice(currentIndex + 1, currentIndex + 6);
              dispatch({ type: 'SET_QUEUE', payload: nextEpisodes });
            } else if (state.queue.length === 0) {
              // If we're at the end of theme episodes and the queue is empty, 
              // add some episodes from the same area but different themes
              const differentThemeEpisodes = areaEpisodes
                .filter(ep => ep.tema !== state.currentEpisode?.tema)
                .slice(0, 5);
                
              if (differentThemeEpisodes.length > 0) {
                dispatch({ type: 'SET_QUEUE', payload: differentThemeEpisodes });
              }
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
          
          // Save progress with debounce to avoid too many database calls
          if (progressSaveTimeout.current) {
            window.clearTimeout(progressSaveTimeout.current);
          }
          
          progressSaveTimeout.current = window.setTimeout(() => {
            if (state.currentEpisode && audioRef.current) {
              const currentTime = audioRef.current.currentTime;
              const duration = audioRef.current.duration || 0;
              const progressPercent = duration > 0 ? Math.floor(currentTime / duration * 100) : 0;
              
              // Don't save progress for very short listens (less than 3%)
              if (progressPercent > 3 && state.currentEpisode.id) {
                saveEpisodeProgress(state.currentEpisode.id, progressPercent, currentTime);
                
                // Refresh in-progress episodes data when significant progress is made
                if (progressPercent % 10 === 0) { // Every 10% refresh the data
                  queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
                }
              }
            }
          }, 2000); // Save after 2 seconds of stable playback
        }
      };
      
      const handleEnded = () => {
        // Mark episode as completed (100%)
        if (state.currentEpisode) {
          saveEpisodeProgress(state.currentEpisode.id, 100, audioRef.current?.duration || 0);
          
          // Invalidate queries to refresh UI immediately after completion
          queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
          queryClient.invalidateQueries({ queryKey: ['completedEpisodes'] });
          
          // Find the next episode in the sequence
          const currentThemeEpisodes = themeEpisodes.current;
          if (currentThemeEpisodes.length > 0) {
            const currentIndex = currentThemeEpisodes.findIndex(ep => ep.id === state.currentEpisode?.id);
            if (currentIndex !== -1 && currentIndex < currentThemeEpisodes.length - 1) {
              const nextEpisode = currentThemeEpisodes[currentIndex + 1];
              
              // Show animation toast for next episode
              toast({
                title: "Próximo episódio",
                description: (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 relative overflow-hidden rounded">
                      <img 
                        src={nextEpisode.imagem_miniatura} 
                        alt={nextEpisode.titulo} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold truncate">{nextEpisode.titulo}</p>
                      <p className="text-xs text-muted-foreground">{nextEpisode.area} - {nextEpisode.tema}</p>
                    </div>
                  </div>
                ),
                variant: "default",
                duration: 5000
              });
              
              // Play next episode
              dispatch({ type: 'PLAY', payload: nextEpisode });
              
              // If next episode is in queue, remove it
              if (state.queue.some(ep => ep.id === nextEpisode.id)) {
                dispatch({ type: 'REMOVE_FROM_QUEUE', payload: nextEpisode.id });
              }
              
              return;
            }
          }
          
          // If no next episode in sequence found, auto-play next in queue if available
          if (state.queue.length > 0) {
            const nextEpisode = state.queue[0];
            dispatch({ type: 'PLAY', payload: nextEpisode });
            dispatch({ type: 'REMOVE_FROM_QUEUE', payload: nextEpisode.id });
            toast({
              title: "Próximo episódio",
              description: nextEpisode.titulo,
              variant: "default",
            });
          } else {
            dispatch({ type: 'PAUSE' });
          }
        }
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
        
        if (progressSaveTimeout.current) {
          window.clearTimeout(progressSaveTimeout.current);
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

      // Set new interval - more frequent to ensure more accurate progress tracking
      progressTrackingInterval.current = window.setInterval(() => {
        if (audioRef.current && state.currentEpisode) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration || 0;
          const progressPercent = duration > 0 ? Math.floor(currentTime / duration * 100) : 0;
          
          // Save progress every 5 seconds during active playback
          saveEpisodeProgress(state.currentEpisode.id, progressPercent, currentTime);
        }
      }, 5000); // Save every 5 seconds
    } else if (progressTrackingInterval.current) {
      // Clear interval when not playing
      window.clearInterval(progressTrackingInterval.current);
    }

    // Save progress on pause to ensure progress is captured
    if (!state.isPlaying && state.currentEpisode && audioRef.current && audioRef.current.currentTime > 0) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 0;
      const progressPercent = duration > 0 ? Math.floor(currentTime / duration * 100) : 0;
      
      // Only save if meaningful progress was made
      if (progressPercent > 3 && state.currentEpisode.id) {
        saveEpisodeProgress(state.currentEpisode.id, progressPercent, currentTime);
        queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
      }
    }

    // Cleanup on unmount
    return () => {
      if (progressTrackingInterval.current) {
        window.clearInterval(progressTrackingInterval.current);
      }
    };
  }, [state.isPlaying, state.currentEpisode, queryClient]);

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
    
    // Invalidate queries to ensure UI is up-to-date
    queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
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

  // Make sure playNext invalidates queries to update the UI
  const playNext = () => {
    // Check if there's a next episode in the same theme sequence
    const currentThemeEpisodes = themeEpisodes.current;
    if (state.currentEpisode && currentThemeEpisodes.length > 0) {
      const currentIndex = currentThemeEpisodes.findIndex(ep => ep.id === state.currentEpisode.id);
      if (currentIndex !== -1 && currentIndex < currentThemeEpisodes.length - 1) {
        const nextEpisode = currentThemeEpisodes[currentIndex + 1];
        play(nextEpisode);
        
        // Save current episode as completed
        if (state.currentEpisode) {
          saveEpisodeProgress(state.currentEpisode.id, 100, audioRef.current?.duration || 0);
        }
        
        // Refresh data
        queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
        queryClient.invalidateQueries({ queryKey: ['completedEpisodes'] });
        
        toast({
          title: "Reproduzindo próximo episódio",
          description: nextEpisode.titulo,
        });
        return;
      }
    }
    
    // Fall back to queue if no next episode in sequence
    if (state.queue.length > 0) {
      const nextEpisode = state.queue[0];
      play(nextEpisode);
      removeFromQueue(nextEpisode.id);
      
      // Save current episode as completed if it exists
      if (state.currentEpisode) {
        saveEpisodeProgress(state.currentEpisode.id, 100, audioRef.current?.duration || 0);
      }
      
      // Refresh data to show updated progress in UI
      queryClient.invalidateQueries({ queryKey: ['inProgressEpisodes'] });
      queryClient.invalidateQueries({ queryKey: ['completedEpisodes'] });
      
      toast({
        title: "Reproduzindo próximo episódio",
        description: nextEpisode.titulo,
      });
    }
  };

  const playPrevious = () => {
    // Check if there's a previous episode in the same theme sequence
    const currentThemeEpisodes = themeEpisodes.current;
    if (state.currentEpisode && currentThemeEpisodes.length > 0) {
      const currentIndex = currentThemeEpisodes.findIndex(ep => ep.id === state.currentEpisode.id);
      if (currentIndex > 0) {
        const previousEpisode = currentThemeEpisodes[currentIndex - 1];
        play(previousEpisode);
        
        toast({
          title: "Reproduzindo episódio anterior",
          description: previousEpisode.titulo,
        });
      }
    }
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
