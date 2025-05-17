
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getRecentEpisodes } from '@/lib/podcast-service';
import { PodcastEpisode } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { Play, Pause, Heart, CheckCircle } from 'lucide-react';
import { toggleFavorite } from '@/lib/podcast-service';
import { useQueryClient } from '@tanstack/react-query';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

// Helper to check if episode is new (published in last 7 days)
const isEpisodeNew = (episode: PodcastEpisode) => {
  const date = episode.data_publicacao || episode.data;
  if (!date) return false;
  
  try {
    // First try to parse as ISO date
    const publishDate = new Date(date);
    const currentDate = new Date();
    
    // Check if valid date object was created
    if (isNaN(publishDate.getTime())) {
      // Try to parse BR format (dd/mm/yyyy)
      const parts = date.split('/');
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

const NewEpisodesCarousel = () => {
  const queryClient = useQueryClient();
  const { data: episodes, isLoading } = useQuery({
    queryKey: ['recentEpisodes'],
    queryFn: getRecentEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const { play, state } = useAudioPlayer();
  
  const handlePlay = (episode: PodcastEpisode) => {
    play(episode);
  };
  
  const handleToggleFavorite = async (e: React.MouseEvent, episodeId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await toggleFavorite(episodeId);
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['favoriteEpisodes'] });
      queryClient.invalidateQueries({ queryKey: ['episode', episodeId] });
      queryClient.invalidateQueries({ queryKey: ['recentEpisodes'] });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex space-x-4 overflow-x-auto py-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-72 h-48">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!episodes || episodes.length === 0) {
    return <p className="text-center text-juricast-muted">Nenhum episódio recente encontrado</p>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {episodes.map((episode, index) => (
          <CarouselItem key={episode.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Link 
                to={`/podcast/${episode.id}`} 
                className="block overflow-hidden rounded-lg relative group"
              >
                <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                  <OptimizedImage
                    src={episode.imagem_miniatura}
                    alt={episode.titulo}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Show NEW badge on large cards if episode is recent */}
                  {isEpisodeNew(episode) && (
                    <div className="absolute top-2 left-2 bg-juricast-accent text-white font-bold text-xs px-2 py-1 rounded-md z-10 shadow-lg">
                      Novo
                    </div>
                  )}
                  
                  {/* Show completion status */}
                  {episode.progresso === 100 && (
                    <div className="absolute top-2 right-2 z-10">
                      <CheckCircle className="text-green-500 drop-shadow-md" size={20} />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-base line-clamp-2 mb-1">{episode.titulo}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-juricast-accent text-xs">{episode.area}</p>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            "p-1.5 rounded-full bg-white/10 backdrop-blur-sm",
                            episode.favorito ? "text-juricast-accent" : "text-white"
                          )}
                          onClick={(e) => handleToggleFavorite(e, episode.id)}
                        >
                          <Heart size={16} fill={episode.favorito ? "currentColor" : "none"} />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 rounded-full bg-juricast-accent text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePlay(episode);
                          }}
                        >
                          {state.isPlaying && state.currentEpisode?.id === episode.id ? (
                            <Pause size={16} />
                          ) : (
                            <Play size={16} className="ml-0.5" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Add progress indicator for in-progress episodes */}
                    {episode.progresso > 0 && episode.progresso < 100 && (
                      <div className="mt-2">
                        <Progress value={episode.progresso} className="h-1 bg-white/20" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default NewEpisodesCarousel;
