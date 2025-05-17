import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PodcastCard from '@/components/podcast/PodcastCard';
import { getFavoriteEpisodes } from '@/lib/podcast-service';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { data: favoriteEpisodes = [], isLoading } = useQuery({
    queryKey: ['favoriteEpisodes'],
    queryFn: getFavoriteEpisodes,
    staleTime: 2 * 60 * 1000, // 2 minutes cache
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
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Heart className="text-juricast-accent" size={24} />
          <h1 className="text-2xl font-bold">Favoritos</h1>
          <span className="bg-juricast-accent/10 text-juricast-accent text-sm px-2 py-0.5 rounded-full ml-2">
            {favoriteEpisodes.length}
          </span>
        </motion.div>

        {isLoading ? (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <motion.div 
                key={index} 
                className="bg-juricast-card animate-pulse rounded-lg h-64"
                variants={itemVariants}
              ></motion.div>
            ))}
          </motion.div>
        ) : favoriteEpisodes.length > 0 ? (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEpisodes.map((episode, index) => (
              <motion.div key={episode.id} variants={itemVariants}>
                <PodcastCard
                  id={episode.id}
                  title={episode.titulo}
                  area={episode.area}
                  description={episode.descricao}
                  date={episode.data_publicacao || episode.data || ''}
                  comments={episode.comentarios || 0}
                  likes={episode.curtidas || 0}
                  thumbnail={episode.imagem_miniatura}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center h-64 bg-juricast-card rounded-lg p-6">
            <Heart size={40} className="text-juricast-muted mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h2>
            <p className="text-juricast-muted text-center mb-4">
              Você ainda não adicionou nenhum episódio aos seus favoritos.
            </p>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Favorites;
