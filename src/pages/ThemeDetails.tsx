
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import { getEpisodesByTheme } from '@/lib/podcast-service';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ThemeDetails = () => {
  const { area, theme } = useParams<{area: string, theme: string}>();
  
  // Convert theme slug to proper title case
  const themeTitle = theme
    ? theme
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : '';
  
  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ['episodesByTheme', theme, area],
    queryFn: () => getEpisodesByTheme(theme || '', area || ''),
    enabled: !!theme && !!area
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Sort episodes by sequence if available
  const sortedEpisodes = [...episodes].sort((a, b) => {
    // If both have sequence, sort numerically
    if (a.sequencia && b.sequencia) {
      return parseInt(a.sequencia) - parseInt(b.sequencia);
    }
    // If only a has sequence, a comes first
    if (a.sequencia) return -1;
    // If only b has sequence, b comes first
    if (b.sequencia) return 1;
    // Default to ID sorting as fallback
    return a.id - b.id;
  });

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-1 md:px-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-bold truncate">{themeTitle}</h1>
          <span className="text-juricast-accent text-xs md:text-sm bg-juricast-accent/10 px-2 py-0.5 rounded-full whitespace-nowrap">
            {episodes.length} episódios
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-juricast-card rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-juricast-accent mb-2" />
            <p className="text-juricast-muted">Carregando episódios...</p>
          </div>
        ) : episodes.length > 0 ? (
          <motion.div
            className="space-y-3 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedEpisodes.map((episode, index) => (
              <PlaylistItem
                key={episode.id}
                episode={episode}
                index={index + 1}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-juricast-card rounded-lg p-4 md:p-6 mb-20">
            <h2 className="text-xl font-semibold mb-2 text-center">Nenhum episódio encontrado</h2>
            <p className="text-juricast-muted text-center mb-4">
              Não encontramos episódios no tema {themeTitle}.
            </p>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default ThemeDetails;
