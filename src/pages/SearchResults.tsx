
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import { motion } from 'framer-motion';
import { getAllEpisodes } from '@/lib/podcast-service';
import { PodcastEpisode } from '@/lib/types';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState<PodcastEpisode[]>([]);
  
  const { data: allEpisodes = [], isLoading } = useQuery({
    queryKey: ['allEpisodes'],
    queryFn: getAllEpisodes
  });

  useEffect(() => {
    if (searchQuery && allEpisodes.length > 0) {
      const query = searchQuery.toLowerCase();
      const filteredEpisodes = allEpisodes.filter(episode => {
        return (
          (episode.titulo && episode.titulo.toLowerCase().includes(query)) ||
          (episode.descricao && episode.descricao.toLowerCase().includes(query)) ||
          (episode.area && episode.area.toLowerCase().includes(query)) ||
          (episode.tema && episode.tema.toLowerCase().includes(query)) ||
          (episode.tag && Array.isArray(episode.tag) && 
            episode.tag.some(tag => tag && tag.toLowerCase().includes(query)))
        );
      });
      
      setResults(filteredEpisodes);
    } else {
      setResults([]);
    }
  }, [searchQuery, allEpisodes]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-2">
            Resultados para "{searchQuery}"
          </h1>
          <p className="text-juricast-muted mb-6">
            {isLoading 
              ? 'Buscando episódios...'
              : `${results.length} episódios encontrados`}
          </p>
        </motion.div>

        <motion.div 
          className="space-y-3"
          variants={containerVariants}
        >
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="bg-juricast-card animate-pulse rounded-lg h-16"></div>
              ))
            : results.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  variants={itemVariants}
                >
                  <PlaylistItem
                    episode={episode}
                    index={index + 1}
                  />
                </motion.div>
              ))
          }
          
          {results.length === 0 && !isLoading && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-juricast-muted">
                Nenhum resultado encontrado
              </h3>
              <p className="mt-2 text-juricast-muted">
                Tente usar termos diferentes na sua busca
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default SearchResults;
