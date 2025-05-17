import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Headphones, Clock, Heart, List, BarChart2, BookOpen, Search, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const fetchCategories = async () => {
  try {
    // Now fetch from the JURIFY table instead of podcast_tabela
    const { data, error } = await supabase
      .from('JURIFY')
      .select('area')
      .order('area', { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    // Extract unique areas
    const areas = [...new Set(data?.map(item => item.area).filter(Boolean))];
    return areas.sort();
  } catch (error) {
    console.error("Error in fetchCategories:", error);
    return [];
  }
};

const sidebarAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  count,
  active,
  index
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  count?: number;
  active: boolean;
  index: number;
}) => {
  return (
    <motion.div
      custom={index}
      variants={sidebarAnimation}
      initial="hidden"
      animate="visible"
    >
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200",
          active ? "bg-juricast-accent text-white" : "hover:bg-juricast-card"
        )}
      >
        <Icon size={20} className={active ? "text-white" : "text-juricast-accent"} />
        <span className="flex-grow">{label}</span>
        {count !== undefined && (
          <span className="bg-juricast-background px-2 py-0.5 rounded-full text-xs">
            {count}
          </span>
        )}
      </Link>
    </motion.div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000 // 5 minutes cache
  });
  
  return (
    <motion.div 
      className="w-64 h-screen bg-juricast-background border-r border-juricast-card/30 flex flex-col overflow-hidden"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-juricast-accent">JuriCast</h1>
          <p className="text-juricast-muted text-sm">Podcast Jurídico</p>
        </motion.div>
      </div>
      
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-juricast-muted" size={16} />
          <input
            type="search"
            placeholder="Buscar podcast..."
            className="w-full bg-juricast-card/50 border border-juricast-card rounded-full py-2 pl-9 pr-4 
                      text-sm text-juricast-text placeholder:text-juricast-muted
                      focus:outline-none focus:ring-1 focus:ring-juricast-accent/50"
          />
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="mb-6 space-y-1">
          <SidebarLink to="/" icon={Home} label="Início" active={isActive('/')} index={0} />
          <SidebarLink to="/em-progresso" icon={Clock} label="Em Progresso" active={isActive('/em-progresso')} index={1} />
          <SidebarLink to="/favoritos" icon={Heart} label="Favoritos" active={isActive('/favoritos')} index={2} />
        </div>
        
        <div className="mb-6">
          <h2 className="text-juricast-muted font-medium px-4 py-2 text-xs uppercase tracking-wider">Ordenação</h2>
          <div className="space-y-1">
            <SidebarLink to="/?sort=recent" icon={List} label="Mais Recentes" active={isActive('/?sort=recent')} index={3} />
            <SidebarLink to="/?sort=popular" icon={BarChart2} label="Mais Populares" active={isActive('/?sort=popular')} index={4} />
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-juricast-muted font-medium px-4 py-2 text-xs uppercase tracking-wider">Categorias</h2>
          <div className="space-y-1">
            {categories.map((category, index) => (
              <SidebarLink 
                key={category} 
                to={`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                icon={BookOpen} 
                label={category}
                active={isActive(`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`)} 
                index={5 + index}
              />
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-juricast-muted text-sm px-4 py-2">Carregando categorias...</p>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
