
import React from 'react';
import { PodcastEpisode } from '@/lib/types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  currentEpisodeId: number;
}

const RelatedEpisodes: React.FC<RelatedEpisodesProps> = ({ episodes, currentEpisodeId }) => {
  // Filter out the current episode and limit to 5 episodes
  const relatedEpisodes = episodes
    .filter(episode => episode.id !== currentEpisodeId)
    .slice(0, 5);
    
  if (relatedEpisodes.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-juricast-card rounded-lg p-6 border border-juricast-card/30 shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Episódios Relacionados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedEpisodes.map((episode, index) => (
          <RelatedEpisodeCard 
            key={episode.id} 
            episode={episode} 
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

const RelatedEpisodeCard: React.FC<{ episode: PodcastEpisode; index: number }> = ({ episode, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
    >
      <Link 
        to={`/podcast/${episode.id}`} 
        className="block overflow-hidden"
      >
        <div className="flex flex-row items-start space-x-3 p-3 rounded-lg hover:bg-juricast-background/20 transition-colors">
          <div className="w-16 h-16 flex-shrink-0">
            <img 
              src={episode.imagem_miniatura || "/placeholder.svg"} 
              alt={episode.titulo} 
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
          </div>
          
          <div className="flex-grow min-w-0">
            <h4 className="font-medium text-sm line-clamp-2">{episode.titulo}</h4>
            <p className="text-juricast-accent text-xs mt-1">{episode.tema}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RelatedEpisodes;
