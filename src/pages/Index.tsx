
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import AreaCard from '@/components/podcast/AreaCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getInProgressEpisodes, getAllAreas, saveUserIP, getRecentEpisodes, getAllEpisodes } from '@/lib/podcast-service';
import { PodcastEpisode, AreaCard as AreaCardType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import NewEpisodesCarousel from '@/components/podcast/NewEpisodesCarousel';
import { Headphones } from 'lucide-react';

const Index = () => {
  const [areas, setAreas] = useState<AreaCardType[]>([]);
  
  // Get total episode count
  const { data: allEpisodes = [], isLoading: loadingAllEpisodes } = useQuery({
    queryKey: ['allEpisodes'],
    queryFn: getAllEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
  
  // Fetch in-progress episodes
  const { data: inProgressEpisodes = [], isLoading: loadingInProgress } = useQuery({
    queryKey: ['inProgressEpisodes'],
    queryFn: getInProgressEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
  
  // Save user IP on first load for persistent data
  useEffect(() => {
    saveUserIP();
  }, []);
  
  // Load areas
  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await getAllAreas();
      setAreas(areasData);
    };
    
    fetchAreas();
  }, []);

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

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <MainLayout>
      <motion.div 
        className="space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Total Episodes Counter */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-juricast-accent/20 to-juricast-background rounded-lg p-4 flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="text-lg font-bold">Biblioteca de Episódios</h2>
            <p className="text-sm text-juricast-muted">
              Conteúdo jurídico exclusivo para você
            </p>
          </div>
          <div className="flex items-center bg-juricast-accent/10 rounded-full px-4 py-2">
            <Headphones className="text-juricast-accent mr-2" size={20} />
            <span className="font-bold text-juricast-accent">
              {loadingAllEpisodes ? "..." : allEpisodes.length} episódios
            </span>
          </div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <motion.div 
            className="flex justify-between items-center mb-4"
            variants={sectionHeaderVariants}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-juricast-accent to-juricast-text bg-clip-text text-transparent">
              Episódios Recentes
            </h2>
            <Link to="/episodios-novos" className="text-juricast-accent hover:underline text-sm">
              Ver todos
            </Link>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
          >
            <NewEpisodesCarousel />
          </motion.div>
        </motion.section>
        
        {inProgressEpisodes.length > 0 && (
          <motion.section variants={itemVariants}>
            <motion.div 
              className="flex justify-between items-center mb-4"
              variants={sectionHeaderVariants}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-juricast-accent to-juricast-text bg-clip-text text-transparent">
                Continue Ouvindo
              </h2>
              <Link to="/em-progresso" className="text-juricast-accent hover:underline text-sm">
                Ver todos
              </Link>
            </motion.div>
            
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
            >
              {loadingInProgress 
                ? [...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))
                : inProgressEpisodes.slice(0, 3).map((episode, index) => (
                    <PlaylistItem
                      key={episode.id}
                      episode={episode}
                      index={index + 1}
                      priority={true}
                    />
                  ))
              }
            </motion.div>
          </motion.section>
        )}

        <motion.section variants={itemVariants}>
          <motion.div 
            className="flex justify-between items-center mb-4"
            variants={sectionHeaderVariants}
          >
            <h2 className="text-2xl font-bold">Áreas do Direito</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {areas.length === 0 
              ? [...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))
              : areas.map((area, index) => (
                <motion.div key={area.name} variants={itemVariants}>
                  <AreaCard 
                    name={area.name}
                    episodeCount={area.episodeCount}
                    slug={area.slug}
                  />
                </motion.div>
              ))
            }
          </motion.div>
        </motion.section>

        <RecentEpisodes />
      </motion.div>
    </MainLayout>
  );
};

const RecentEpisodes = () => {
  const { data: recentEpisodes = [], isLoading } = useQuery({
    queryKey: ['recentEpisodes'],
    queryFn: getRecentEpisodes,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return (
    <motion.section variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delay: 0.2 } }
    }}>
      <motion.div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Todos os episódios</h2>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.05, delayChildren: 0.2 } 
          }
        }}
      >
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))
          : recentEpisodes.slice(0, 5).map((episode, index) => (
              <PlaylistItem
                key={episode.id}
                episode={episode}
                index={index + 1}
                priority={index < 2} // Only set priority for first two items
              />
            ))
        }
      </motion.div>
    </motion.section>
  );
};

export default Index;
