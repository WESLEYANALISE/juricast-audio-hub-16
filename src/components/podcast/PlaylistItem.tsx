
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Pause, Gavel, Book, Scale, File, Check } from 'lucide-react';
import { PodcastEpisode } from '@/lib/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toggleFavorite } from '@/lib/podcast-service';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useAudioPlayer } from '@/context/AudioPlayerContext';

interface PlaylistItemProps {
  episode: PodcastEpisode;
  index: number;
  isPlaying?: boolean;
  onPlay?: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  episode, 
  index, 
  isPlaying = false,
  onPlay 
}) => {
  const audioPlayer = useAudioPlayer();
  const isCurrentlyPlaying = isPlaying || (audioPlayer.state.currentEpisode?.id === episode.id && audioPlayer.state.isPlaying);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(episode.id);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay) {
      onPlay();
    } else {
      audioPlayer.play(episode);
    }
  };

  // Helper function to return appropriate area icon
  const getAreaIcon = () => {
    const areaLower = episode.area.toLowerCase();
    
    if (areaLower.includes('civil')) return <Book size={16} className="text-juricast-accent" />;
    if (areaLower.includes('penal') || areaLower.includes('criminal')) return <Gavel size={16} className="text-juricast-accent" />;
    if (areaLower.includes('constituc')) return <Scale size={16} className="text-juricast-accent" />;
    return <File size={16} className="text-juricast-accent" />;
  };

  // Check if episode is completed (100%)
  const isCompleted = episode.progresso === 100;

  // Check if episode is new (published in the last 7 days)
  const isNew = () => {
    if (!episode.data_publicacao) return false;
    
    try {
      // First try to parse as ISO date
      const publishDate = new Date(episode.data_publicacao);
      const currentDate = new Date();
      
      // Check if valid date object was created
      if (isNaN(publishDate.getTime())) {
        // Try to parse BR format (dd/mm/yyyy)
        const parts = episode.data_publicacao.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);
          
          const diffTime = currentDate.getTime() - parsedDate.getTime();
          const diffDays = diffTime / (1000 * 3600 * 24);
          return diffDays <= 7;
        }
      } else {
        const diffTime = currentDate.getTime() - publishDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        return diffDays <= 7;
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
    
    return false;
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "bg-juricast-card hover:bg-juricast-card/80 rounded-lg overflow-hidden",
        isCurrentlyPlaying && "border-l-4 border-juricast-accent"
      )}
    >
      <Link to={`/podcast/${episode.id}`} className="flex items-center p-3">
        <div className="w-10 text-center text-juricast-muted mr-3 hidden sm:block">
          {index}
        </div>
        
        <div className="h-12 w-12 relative rounded-md overflow-hidden flex-shrink-0">
          <OptimizedImage
            src={episode.imagem_miniatura}
            alt={episode.titulo}
            className="h-full w-full"
            aspectRatio="aspect-square"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-juricast-accent/90"
              onClick={handlePlay}
              aria-label={isCurrentlyPlaying ? "Pause" : "Play"}
            >
              {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </motion.button>
          </div>
          {isCompleted && (
            <div className="absolute top-0 right-0 bg-green-500 p-1 rounded-bl-md">
              <Check size={12} className="text-white" />
            </div>
          )}
          {isNew() && !isCompleted && (
            <div className="absolute top-0 left-0 bg-juricast-accent p-1 rounded-br-md">
              <span className="text-white text-[10px] font-bold">NEW</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 ml-4 mr-2 overflow-hidden">
          <h3 className="font-medium text-sm line-clamp-2 sm:line-clamp-1">{episode.titulo}</h3>
          <div className="flex items-center text-juricast-accent text-xs gap-1">
            {getAreaIcon()}
            <span className="truncate">{episode.area} - {episode.tema}</span>
          </div>
          
          {episode.progresso && episode.progresso > 0 && episode.progresso < 100 && (
            <div className="mt-1 w-full h-1 bg-juricast-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-juricast-accent rounded-full" 
                style={{ width: `${episode.progresso}%` }}
              />
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 rounded-full", 
            episode.favorito ? "text-juricast-accent" : "text-juricast-muted"
          )}
          onClick={handleToggleFavorite}
          aria-label={episode.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart size={18} fill={episode.favorito ? "currentColor" : "none"} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default React.memo(PlaylistItem);
