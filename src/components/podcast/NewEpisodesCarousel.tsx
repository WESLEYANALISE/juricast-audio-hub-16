
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getRecentEpisodes } from '@/lib/podcast-service';
import { PodcastEpisode } from '@/lib/types';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';

const NewEpisodesCarousel: React.FC = () => {
  const { data: recentEpisodes = [], isLoading } = useQuery({
    queryKey: ['recentEpisodes'],
    queryFn: getRecentEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnMount: true,
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
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
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

  return (
    <Link 
      to={`/podcast/${episode.id}`}
      className="block bg-juricast-card rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-lg h-full"
    >
      <div className="relative h-32">
        <OptimizedImage
          src={episode.imagem_miniatura}
          alt={episode.titulo}
          className="w-full h-full"
          aspectRatio="aspect-video"
          fetchPriority="high"
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
      <div className="bg-juricast-card rounded-lg overflow-hidden h-full">
        <div className="h-32 w-full bg-juricast-card/50 animate-pulse" />
        <div className="p-3 space-y-2">
          <div className="h-4 w-full bg-juricast-card/50 animate-pulse rounded" />
          <div className="h-3 w-2/3 bg-juricast-card/50 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewEpisodesCarousel);
