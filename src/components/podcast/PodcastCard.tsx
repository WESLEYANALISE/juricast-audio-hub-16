
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, File, Gavel, Scale, Book, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface PodcastCardProps {
  id: number;
  title: string;
  area: string;
  description: string;
  date: string;
  comments?: number;
  likes?: number;
  thumbnail: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  id,
  title,
  area,
  description,
  date,
  likes = 0,
  thumbnail
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Helper function to return appropriate area icon
  const getAreaIcon = () => {
    const areaLower = area.toLowerCase();
    
    if (areaLower.includes('civil')) return <Book size={14} />;
    if (areaLower.includes('penal') || areaLower.includes('criminal')) return <Gavel size={14} />;
    if (areaLower.includes('constituc')) return <Scale size={14} />;
    return <File size={14} />;
  };

  // Generate sparkle particles for animation
  const sparkleCount = 15;
  const sparkles = Array.from({ length: sparkleCount }).map((_, index) => ({
    id: index,
    size: Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 3 + 5}s`,
  }));

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Placeholder image URL if the original fails to load
  const placeholderImage = '/placeholder.svg';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.2 }
      }}
      className="relative"
    >
      {/* Subtle falling sparkles on entire card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              left: sparkle.left,
              top: '-10px',
              opacity: 0,
            }}
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: parseFloat(sparkle.animationDuration),
              delay: parseFloat(sparkle.animationDelay),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <Link to={`/podcast/${id}`} className="block">
        <div className="netflix-card group bg-juricast-card">
          <div className="relative overflow-hidden h-48">
            {!imageLoaded && (
              <Skeleton className="h-full w-full absolute inset-0" />
            )}
            <img 
              src={imageError ? placeholderImage : thumbnail} 
              alt={title} 
              className={cn(
                "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-out",
                !imageLoaded && "invisible", 
                imageLoaded && "visible"
              )}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
                <div className="flex items-center text-juricast-accent text-sm gap-1">
                  {getAreaIcon()}
                  <span>{area}</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                <Heart size={12} />
                {likes}
              </span>
            </div>
            
            {/* Enhanced sparkles for thumbnail image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`inner-${index}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-5px',
                  }}
                  animate={{
                    y: ['0%', '120%'],
                    opacity: [0, 0.7, 0],
                    scale: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 4,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles size={Math.random() * 10 + 6} className="text-white/40" />
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div 
                className="w-12 h-12 bg-juricast-accent/90 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play size={20} className="text-white ml-1" />
              </motion.div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1 line-clamp-1 group-hover:text-juricast-accent transition-colors">{title}</h3>
            <div className="flex items-center text-juricast-accent text-sm mb-2 gap-1">
              {getAreaIcon()}
              <span>{area}</span>
            </div>
            <p className="text-juricast-muted text-sm line-clamp-2 mb-3">{description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-juricast-muted text-xs">{date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(PodcastCard);
