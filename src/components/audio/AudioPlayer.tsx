import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
interface AudioPlayerProps {
  src: string;
  title: string;
  thumbnail?: string;
  episodeId?: number;
}
const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  thumbnail,
  episodeId
}) => {
  const {
    state,
    pause,
    resume,
    setVolume,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
    setPlaybackRate,
    playNext
  } = useAudioPlayer();
  const {
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    playbackRate
  } = state;
  const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(40).fill(0));
  const progressRef = useRef<HTMLDivElement>(null);
  const waveformInterval = useRef<number | null>(null);

  // Generate professional waveform visualization
  useEffect(() => {
    if (waveformInterval.current) {
      window.clearInterval(waveformInterval.current);
    }

    // Generate a static waveform that looks professional
    const generateWaveform = () => {
      // Create a professionally looking static waveform
      const baseValues = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4];
      if (isPlaying) {
        // Add more dynamic variations to the waveform when playing
        const data = baseValues.map(value => {
          const variation = Math.random() * 0.2 - 0.1; // Larger random variation
          return Math.max(0.1, Math.min(1, value + variation));
        });
        setWaveformData(data);
      } else {
        // Use static waveform when paused
        setWaveformData(baseValues);
      }
    };

    // Update the waveform visualization more frequently
    generateWaveform();
    if (isPlaying) {
      waveformInterval.current = window.setInterval(generateWaveform, 150);
    }
    return () => {
      if (waveformInterval.current) {
        window.clearInterval(waveformInterval.current);
      }
    };
  }, [isPlaying]);
  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      seekTo(percent * duration);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleDownload = () => {
    if (!src) return;

    // Create an anchor element with target="_blank" to open in a new tab/window
    const a = document.createElement('a');
    a.href = src;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = `${title.replace(/\s+/g, '_')}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({
      title: "Download iniciado",
      description: "O episódio está sendo baixado para seu dispositivo."
    });
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? Math.round(currentTime / duration * 100) : 0;
  const handleSkipEpisode = () => {
    playNext();
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} className="p-4 bg-juricast-card rounded-lg border border-juricast-card/30 shadow-lg px-[28px] py-6 relative overflow-hidden max-w-4xl mx-auto">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
          <motion.div className="relative w-full max-w-xs aspect-square mb-4 md:mb-0 overflow-hidden rounded-lg shadow-md mx-auto md:mx-0" whileHover={{
          scale: 1.02
        }} transition={{
          duration: 0.3
        }}>
            {/* Thumbnail */}
            <img src={thumbnail || '/placeholder.svg'} alt={title} className="w-full h-full object-cover" />
            
            {/* Professional waveform overlay - Moved to the top with enhanced animation */}
            <div className="absolute inset-x-0 top-0 h-16 bg-black/40 flex items-end justify-center">
              {waveformData.map((value, idx) => <motion.div key={idx} className="w-1 mx-[1px] bg-white/80 rounded-full" style={{
              height: `${value * 100}%`
            }} initial={{
              height: 0
            }} animate={{
              height: `${value * 100}%`
            }} transition={{
              duration: 0.1
            }} />)}
            </div>
            
            {/* Play/Pause button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              {isPlaying ? <motion.div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.2
            }}>
                  <Pause className="text-white" size={32} />
                </motion.div> : <motion.div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                  <Play className="text-white ml-1" size={32} />
                </motion.div>}
            </div>
          </motion.div>
          
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg md:text-xl font-semibold text-center md:text-left line-clamp-2">{title}</h2>
              <span className="text-juricast-accent px-0 py-0 my-0 font-extralight text-xs text-center">{progressPercentage}% concluído</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="w-full h-2 bg-juricast-background rounded-full overflow-hidden cursor-pointer" onClick={handleProgressClick} ref={progressRef}>
                <motion.div className="h-full bg-juricast-accent" style={{
                width: `${currentTime / duration * 100 || 0}%`
              }} animate={{
                width: `${currentTime / duration * 100 || 0}%`
              }} transition={{
                ease: "linear"
              }} />
              </div>
              
              <div className="flex justify-between text-juricast-muted text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="flex justify-center md:justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <motion.button onClick={() => skipBackward(10)} className="player-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-juricast-background/30" whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }}>
                    <SkipBack size={18} />
                  </motion.button>
                  
                  <motion.button onClick={handlePlayPause} className="player-button w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-juricast-accent text-white hover:bg-juricast-accent/90 shadow-md" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </motion.button>
                  
                  <motion.button onClick={() => skipForward(10)} className="player-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-juricast-background/30" whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }}>
                    <SkipForward size={18} />
                  </motion.button>
                  
                  <motion.button onClick={handleSkipEpisode} className="player-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-juricast-background/30 text-juricast-accent" whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} title="Pular para próximo episódio">
                    <SkipForward className="rotate-90" size={18} />
                  </motion.button>
                </div>
                
                <div className="hidden md:flex items-center gap-3 w-32">
                  <button onClick={toggleMute} className="text-juricast-muted hover:text-juricast-text">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-full h-1 bg-juricast-background rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-juricast-accent" />
                </div>
                
                <div className="hidden md:flex gap-2 items-center">
                  <motion.button onClick={handleDownload} className="p-2 rounded-full hover:bg-juricast-background/30 text-juricast-muted hover:text-juricast-accent" whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} title="Download">
                    <Download size={18} />
                  </motion.button>
                  
                  <div className="relative">
                    <motion.button onClick={() => setShowPlaybackOptions(!showPlaybackOptions)} whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.9
                  }} className="px-3 py-1 text-sm bg-juricast-background/30 rounded-full hover:bg-juricast-background/50">
                      {playbackRate}x
                    </motion.button>
                    
                    {showPlaybackOptions && <div className="absolute bottom-full right-0 mb-2 bg-juricast-card border border-juricast-card/30 rounded-lg p-2 shadow-lg z-20">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => <motion.button key={rate} onClick={() => {
                      setPlaybackRate(rate);
                      setShowPlaybackOptions(false);
                    }} className={cn("block w-full text-left px-3 py-1 rounded-md text-sm", playbackRate === rate ? "bg-juricast-accent text-white" : "hover:bg-juricast-background/30")} whileHover={{
                      x: 3
                    }}>
                            {rate}x
                          </motion.button>)}
                      </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile controls for volume and speed */}
        <div className="md:hidden flex justify-between items-center mt-4">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <button onClick={toggleMute} className="text-juricast-muted hover:text-juricast-text">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-full h-1 bg-juricast-background rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-juricast-accent" />
          </div>
          
          <div className="flex gap-2 items-center">
            <motion.button onClick={handleDownload} className="p-2 rounded-full hover:bg-juricast-background/30 text-juricast-muted hover:text-juricast-accent" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} title="Download">
              <Download size={18} />
            </motion.button>
            
            <div className="relative">
              <motion.button onClick={() => setShowPlaybackOptions(!showPlaybackOptions)} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }} className="px-3 py-1 text-sm bg-juricast-background/30 rounded-full hover:bg-juricast-background/50">
                {playbackRate}x
              </motion.button>
              
              {showPlaybackOptions && <div className="absolute bottom-full right-0 mb-2 bg-juricast-card border border-juricast-card/30 rounded-lg p-2 shadow-lg z-20">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => <motion.button key={rate} onClick={() => {
                setPlaybackRate(rate);
                setShowPlaybackOptions(false);
              }} className={cn("block w-full text-left px-3 py-1 rounded-md text-sm", playbackRate === rate ? "bg-juricast-accent text-white" : "hover:bg-juricast-background/30")} whileHover={{
                x: 3
              }}>
                      {rate}x
                    </motion.button>)}
                </div>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default AudioPlayer;