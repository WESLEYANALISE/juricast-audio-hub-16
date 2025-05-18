import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Home, Heart, Clock, List, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAreas } from '@/lib/podcast-service';
import { AreaCard } from '@/lib/types';

const TopNavigation = () => {
  const [areas, setAreas] = useState<AreaCard[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  
  useEffect(() => {
    const fetchAreas = async () => {
      const areaData = await getAllAreas();
      setAreas(areaData);
    };
    fetchAreas();
  }, []);
  
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
    }
  };
  
  return <div className="sticky top-0 z-40 bg-gradient-to-b from-juricast-background to-juricast-background/80 backdrop-blur-sm py-2">
      <div className="flex flex-col">
        <div className="flex justify-between items-center px-4 py-2">
          <Link to="/">
            <motion.h1 className="text-xl font-bold text-juricast-accent" initial={{
            scale: 0.95,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            duration: 0.3,
            delay: 0.1
          }}>
              JuriCast
            </motion.h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {isSearchActive && <motion.form initial={{
              width: 0,
              opacity: 0
            }} animate={{
              width: "200px",
              opacity: 1
            }} exit={{
              width: 0,
              opacity: 0
            }} className="relative" onSubmit={handleSearchSubmit}>
                  <input type="text" value={searchQuery} onChange={handleSearchChange} className="w-full py-1 px-3 pr-8 rounded-full bg-juricast-card border border-juricast-card/50 text-sm focus:outline-none focus:ring-1 focus:ring-juricast-accent" placeholder="Buscar podcasts..." autoFocus />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Search size={16} className="text-juricast-accent" />
                  </button>
                </motion.form>}
            </AnimatePresence>
            
            <motion.button className="p-2 rounded-full hover:bg-juricast-card transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2
          }} onClick={toggleSearch} aria-label="Search">
              <Search size={20} />
            </motion.button>
          </div>
        </div>
        
        {/* Main Navigation */}
        <MainNavigation path={path} />
        
        {/* Categories */}
        <CategoryNav areas={areas} />
      </div>
    </div>;
};

const MainNavigation = ({
  path
}: {
  path: string;
}) => {
  const navItems = [{
    icon: Home,
    label: "Home",
    href: "/"
  }, {
    icon: Clock,
    label: "Novos",
    href: "/episodios-novos"
  }, {
    icon: List,
    label: "Progresso",
    href: "/em-progresso"
  }, {
    icon: Check,
    label: "Concluídos",
    href: "/concluidos"
  }, {
    icon: Heart,
    label: "Favoritos",
    href: "/favoritos"
  }];
  return <div className="flex justify-center mb-2">
      <motion.div className="glassmorphism py-2 px-3 rounded-full shadow-md flex justify-around items-center" initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.3,
      delay: 0.1
    }}>
        {navItems.map(item => {
        const isActive = path === item.href || item.href === "/episodios-novos" && path.includes("/episodios-novos");
        const Icon = item.icon;
        return <Link key={item.label} to={item.href} className="flex flex-col items-center relative px-3">
              <motion.div className={cn("p-2 rounded-full transition-all", isActive ? "bg-juricast-accent text-white" : "text-white/70 hover:text-white")} whileHover={{
            scale: 1.1,
            y: -2
          }} whileTap={{
            scale: 0.9
          }}>
                <Icon size={20} />
                {isActive && <motion.div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" layoutId="navIndicator" />}
              </motion.div>
              <span className={cn("text-xs", isActive ? "text-white" : "text-white/70")}>
                {item.label}
              </span>
            </Link>;
      })}
      </motion.div>
    </div>;
};

const CategoryNav = ({
  areas
}: {
  areas: AreaCard[];
}) => {
  const location = useLocation();
  const path = location.pathname;
  return <div className="overflow-x-auto nav-scrollbar">
      <div className="flex px-4 space-x-4 pb-2 min-w-max">
        {areas.map(area => {
        const isActive = path === `/categoria/${area.slug}`;
        return <Link key={area.name} to={`/categoria/${area.slug}`} className={cn("px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all duration-300", isActive ? "bg-juricast-accent text-white font-medium" : "bg-juricast-card text-juricast-text hover:bg-juricast-card/70")}>
              {area.name}
            </Link>;
      })}
      </div>
    </div>;
};

export default TopNavigation;
