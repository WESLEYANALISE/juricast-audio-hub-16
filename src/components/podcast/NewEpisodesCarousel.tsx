
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getRecentEpisodes } from '@/lib/podcast-service';
import { PodcastEpisode } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const NewEpisodesCarousel: React.FC = () => {
  const { data: recentEpisodes = [], isLoading } = useQuery({
    queryKey: ['recentEpisodes'],
    queryFn: getRecentEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="overflow-x-auto pb-4"
      variants={containerVariants}
    >
      <div className="flex space-x-4 min-w-max">
        {isLoading 
          ? [...Array(4)].map((_, i) => (
              <EpisodeCardSkeleton key={i} />
            ))
          : recentEpisodes.slice(0, 5).map((episode) => (
              <motion.div
                key={episode.id}
                className="flex-shrink-0 w-64"
                variants={itemVariants}
              >
                <EpisodeCard episode={episode} />
              </motion.div>
            ))
        }
      </div>
    </motion.div>
  );
};

interface EpisodeCardProps {
  episode: PodcastEpisode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Check if episode is new (published in the last 7 days)
  const isNew = () => {
    if (!episode.data_publicacao) return false;
    
    const publishDate = new Date(episode.data_publicacao);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - publishDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    
    return diffDays <= 7;
  };

  const placeholderImage = '/placeholder.svg';

  return (
    <Link 
      to={`/podcast/${episode.id}`}
      className="block bg-juricast-card rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative h-32">
        {!imageLoaded && (
          <Skeleton className="h-full w-full absolute inset-0" />
        )}
        <img 
          src={imageError ? placeholderImage : episode.imagem_miniatura} 
          alt={episode.titulo}
          className={cn(
            "w-full h-full object-cover",
            !imageLoaded && "invisible",
            imageLoaded && "visible"
          )}
          loading="eager"
          fetchPriority="high"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          {isNew() && (
            <span className="inline-block bg-juricast-accent/80 text-white text-xs px-2 py-1 rounded-full">Novo</span>
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">{episode.titulo}</h3>
        <p className="text-xs text-juricast-muted">{episode.area}</p>
      </div>
    </Link>
  );
};

const EpisodeCardSkeleton: React.FC = () => {
  return (
    <div className="flex-shrink-0 w-64">
      <div className="bg-juricast-card rounded-lg overflow-hidden">
        <Skeleton className="h-32 w-full" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewEpisodesCarousel);
