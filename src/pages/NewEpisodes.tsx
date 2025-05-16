
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import { motion } from 'framer-motion';
import { getRecentEpisodes } from '@/lib/podcast-service';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { AlertCircle } from 'lucide-react';

const NewEpisodes = () => {
  const audioPlayer = useAudioPlayer();
  const {
    data: recentEpisodes = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['recentEpisodes'],
    queryFn: getRecentEpisodes
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handler for playing episodes
  const handlePlay = (episode: any) => {
    audioPlayer.play(episode);
  };

  return (
    <MainLayout>
      <motion.div
        className="space-y-6 container mx-auto px-4 sm:px-6 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-juricast-accent to-juricast-text bg-clip-text text-transparent">
            Episódios Recentes
          </h1>
          
          <p className="text-juricast-muted mb-6">
            Confira os últimos lançamentos do JuriCast. Atualizamos nossa biblioteca regularmente com novos conteúdos.
          </p>
        </motion.div>

        {error && (
          <motion.div 
            variants={itemVariants} 
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500"
          >
            <AlertCircle size={20} />
            <p>Ocorreu um erro ao carregar os episódios. Por favor, tente novamente mais tarde.</p>
          </motion.div>
        )}

        <motion.div 
          className="space-y-3"
          variants={containerVariants}
        >
          {isLoading
            ? [...Array(10)].map((_, i) => (
                <div key={i} className="bg-juricast-card animate-pulse rounded-lg h-16"></div>
              ))
            : recentEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  variants={itemVariants}
                >
                  <PlaylistItem
                    episode={episode}
                    index={index + 1}
                    isPlaying={audioPlayer.state.currentEpisode?.id === episode.id && audioPlayer.state.isPlaying}
                    onPlay={() => handlePlay(episode)}
                  />
                </motion.div>
              ))
          }
          
          {recentEpisodes.length === 0 && !isLoading && !error && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-juricast-muted">
                Nenhum episódio recente encontrado
              </h3>
              <p className="mt-2 text-juricast-muted">
                Novos episódios serão exibidos aqui quando disponíveis
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default NewEpisodes;
