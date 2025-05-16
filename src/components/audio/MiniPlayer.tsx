
import React from 'react';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { Play, Pause, SkipForward, X, Heart, SkipNext } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { toggleFavorite } from '@/lib/podcast-service';
import { useQueryClient } from '@tanstack/react-query';

const MiniPlayer = () => {
  const { state, play, pause, resume, skipForward, closeMiniPlayer, playNext } = useAudioPlayer();
  const { currentEpisode, isPlaying, showMiniPlayer, currentTime, duration } = state;
  const location = useLocation();
  const queryClient = useQueryClient();
  
  // Don't show mini player if we're already on the podcast detail page for the current episode
  const isOnEpisodePage = location.pathname.startsWith('/podcast/') && 
                          currentEpisode && 
                          location.pathname === `/podcast/${currentEpisode.id}`;
  
  if (!showMiniPlayer || !currentEpisode || isOnEpisodePage) return null;
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressPercentage = Math.round(progress);
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleClosePlayer = () => {
    closeMiniPlayer();
  };
  
  const handleToggleFavorite = async () => {
    if (!currentEpisode) return;
    
    try {
      await toggleFavorite(currentEpisode.id);
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['favoriteEpisodes'] });
      queryClient.invalidateQueries({ queryKey: ['episode', currentEpisode.id] });
      queryClient.invalidateQueries({ queryKey: ['allEpisodes'] });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleNextEpisode = () => {
    playNext();
  };

  return (
    <AnimatePresence>
      {showMiniPlayer && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-juricast-card border-t border-juricast-card/30 shadow-lg"
        >
          <div className="relative">
            {/* Progress bar at the top of mini player */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-juricast-background/30">
              <motion.div
                className="h-full bg-juricast-accent"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            
            <div className="flex items-center pt-1 p-3">
              <Link to={`/podcast/${currentEpisode.id}`} className="flex-shrink-0">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={currentEpisode.imagem_miniatura}
                  alt={currentEpisode.titulo}
                  className="w-12 h-12 rounded object-cover mr-3 shadow-md"
                />
              </Link>
              
              <div className="flex-grow min-w-0">
                <Link to={`/podcast/${currentEpisode.id}`} className="block">
                  <h4 className="text-sm font-medium truncate">{currentEpisode.titulo}</h4>
                  <div className="flex justify-between">
                    <p className="text-xs text-juricast-muted">{formatTime(currentTime)} / {formatTime(duration)}</p>
                    <p className="text-xs text-juricast-accent">{progressPercentage}% concluído</p>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center gap-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-juricast-background/30"
                  onClick={handleToggleFavorite}
                  aria-label="Favorite"
                >
                  <Heart 
                    size={18} 
                    fill={currentEpisode.favorito ? "currentColor" : "none"} 
                    className={currentEpisode.favorito ? "text-juricast-accent" : "text-juricast-muted"} 
                  />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-juricast-background/30"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-juricast-background/30"
                  onClick={() => skipForward(10)}
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward size={20} />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-juricast-background/30"
                  onClick={handleNextEpisode}
                  aria-label="Next episode"
                >
                  <SkipNext size={20} />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-juricast-background/30"
                  onClick={handleClosePlayer}
                  aria-label="Close player"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;
