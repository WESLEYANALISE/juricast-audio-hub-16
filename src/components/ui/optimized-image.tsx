
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  aspectRatio?: string;
  skeletonClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder.svg',
  aspectRatio = 'aspect-square',
  skeletonClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatio, className)}>
      {!isLoaded && (
        <Skeleton 
          className={cn("absolute inset-0", skeletonClassName)} 
        />
      )}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt || "Image"}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

