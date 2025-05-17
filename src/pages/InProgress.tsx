
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import { motion } from 'framer-motion';
import { getInProgressEpisodes } from '@/lib/podcast-service';
import { Clock } from 'lucide-react';

const InProgress = () => {
  const { data: inProgressEpisodes = [], isLoading } = useQuery({
    queryKey: ['inProgressEpisodes'],
    queryFn: getInProgressEpisodes,
    staleTime: 60 * 1000, // 1 minute cache
    refetchOnMount: true, // Always refetch on component mount to ensure data is fresh
    refetchOnWindowFocus: true // Refetch when window regains focus
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div className="flex items-center gap-2">
          <Clock className="text-juricast-accent" size={24} />
          <h1 className="text-2xl font-bold">Em Progresso</h1>
          <span className="bg-juricast-accent/10 text-juricast-accent text-sm px-2 py-0.5 rounded-full ml-2">
            {inProgressEpisodes.length}
          </span>
        </motion.div>
        
        <p className="text-juricast-muted">Continue de onde parou</p>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-juricast-card animate-pulse rounded-lg h-16"></div>
            ))}
          </div>
        ) : inProgressEpisodes.length > 0 ? (
          <motion.div
            className="space-y-3 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {inProgressEpisodes.map((episode, index) => (
              <motion.div key={episode.id} variants={itemVariants}>
                <PlaylistItem
                  episode={episode}
                  index={index + 1}
                  priority={index < 3} // Prioritize first 3 images
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center h-64 bg-juricast-card rounded-lg p-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Clock size={40} className="text-juricast-muted mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nenhum episódio em progresso</h2>
            <p className="text-juricast-muted text-center mb-4">
              Você ainda não começou a ouvir nenhum episódio. 
              Comece a explorar o catálogo e seus episódios começados aparecerão aqui.
            </p>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default InProgress;
