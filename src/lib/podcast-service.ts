
// Fix the formatEpisodes function at the bottom of the file to handle proper types

import { supabase } from "@/integrations/supabase/client";
import { PodcastEpisode, UserProgress, UserFavorite, AreaCard, ThemeCard, SupabaseEpisode } from "./types";

// Local storage keys
const PROGRESS_STORAGE_KEY = 'juricast_progress';
const FAVORITES_STORAGE_KEY = 'juricast_favorites';
const USER_IP_KEY = 'juricast_user_ip';

// Get IP to identify users without authentication
export async function saveUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    localStorage.setItem(USER_IP_KEY, data.ip);
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return null;
  }
}

export function getUserIP() {
  return localStorage.getItem(USER_IP_KEY) || 'anonymous';
}

// Get all podcast episodes from JURIFY table
export async function getAllEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const { data, error } = await supabase
      .from('JURIFY')
      .select('*')
      .order('sequencia', { ascending: true });
    
    if (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }

    return formatEpisodes(ensureTagsAreArrays(data || []));
  } catch (error) {
    console.error("Error in getAllEpisodes:", error);
    return [];
  }
}

// Helper function to ensure tags are arrays
function ensureTagsAreArrays(episodes: any[]): SupabaseEpisode[] {
  return episodes.map(episode => ({
    ...episode,
    tag: Array.isArray(episode.tag) ? episode.tag : episode.tag ? [episode.tag] : [],
    comentarios: episode.comentarios || 0,
    curtidas: episode.curtidas || 0,
    data_publicacao: episode.data_publicacao || new Date().toLocaleDateString('pt-BR')
  }));
}

// Get episodes by area (category)
export async function getEpisodesByArea(area: string): Promise<PodcastEpisode[]> {
  try {
    if (!area) return [];
    
    // Format the area string to match how it might be stored in the database
    // First letter capitalized, spaces restored from dashes
    const formattedArea = area
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    console.log("Searching for area:", formattedArea);
    
    const { data, error } = await supabase
      .from('JURIFY')
      .select('*')
      .ilike('area', `%${formattedArea}%`)
      .order('sequencia', { ascending: true });
    
    if (error) {
      console.error(`Error fetching episodes for area ${area}:`, error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} episodes for area ${formattedArea}`);
    return formatEpisodes(ensureTagsAreArrays(data || []));
  } catch (error) {
    console.error(`Error in getEpisodesByArea for ${area}:`, error);
    return [];
  }
}

// Get episodes by theme
export async function getEpisodesByTheme(theme: string, area: string): Promise<PodcastEpisode[]> {
  try {
    // Format the theme string to match how it might be stored in the database
    const formattedTheme = theme
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const formattedArea = area
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    console.log("Searching for theme:", formattedTheme, "in area:", formattedArea);
    
    const { data, error } = await supabase
      .from('JURIFY')
      .select('*')
      .ilike('tema', `%${formattedTheme}%`)
      .ilike('area', `%${formattedArea}%`)
      .order('sequencia', { ascending: true });
    
    if (error) {
      console.error(`Error fetching episodes for theme ${theme}:`, error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} episodes for theme ${formattedTheme}`);
    return formatEpisodes(ensureTagsAreArrays(data || []));
  } catch (error) {
    console.error(`Error in getEpisodesByTheme for ${theme}:`, error);
    return [];
  }
}

// Get episode by ID
export async function getEpisodeById(id: number): Promise<PodcastEpisode | null> {
  try {
    const { data, error } = await supabase
      .from('JURIFY')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching episode with id ${id}:`, error);
      throw error;
    }

    if (!data) return null;
    
    // Format the episode data with progress and favorite information
    const progressData = await getUserProgress(data.id);
    const isFavorite = await checkIfFavorite(data.id);
    
    const episode = {
      ...data,
      tag: Array.isArray(data.tag) ? data.tag : data.tag ? [data.tag] : [],
      progresso: progressData?.progress || 0,
      favorito: isFavorite,
      comentarios: data.comentarios || 0,
      curtidas: data.curtidas || 0,
      data_publicacao: data.data_publicacao || new Date().toLocaleDateString('pt-BR'),
    };
    
    return episode;
  } catch (error) {
    console.error(`Error in getEpisodeById for ${id}:`, error);
    return null;
  }
}

// Get all unique areas with episode counts
export async function getAllAreas(): Promise<AreaCard[]> {
  try {
    const { data, error } = await supabase
      .from('JURIFY')
      .select('area');
    
    if (error) {
      console.error("Error fetching areas:", error);
      throw error;
    }

    const areasMap = new Map<string, number>();
    
    // Count episodes per area
    data?.forEach(episode => {
      if (episode.area) {
        const count = areasMap.get(episode.area) || 0;
        areasMap.set(episode.area, count + 1);
      }
    });
    
    // Convert to array of area cards
    const areas: AreaCard[] = Array.from(areasMap.entries()).map(([name, count], index) => ({
      id: index + 1, // Generate ID based on index
      name,
      episodeCount: count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      image: getAreaImage(name)
    }));
    
    return areas.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error in getAllAreas:", error);
    return [];
  }
}

// Get all themes for a specific area
export async function getThemesByArea(area: string): Promise<ThemeCard[]> {
  try {
    const formattedArea = area
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    const { data, error } = await supabase
      .from('JURIFY')
      .select('tema, area')
      .eq('area', formattedArea);
    
    if (error) {
      console.error(`Error fetching themes for area ${area}:`, error);
      throw error;
    }

    const themesMap = new Map<string, {count: number, area: string}>();
    
    // Count episodes per theme
    data?.forEach(episode => {
      if (episode.tema) {
        const current = themesMap.get(episode.tema) || {count: 0, area: episode.area};
        themesMap.set(episode.tema, {
          count: current.count + 1,
          area: episode.area
        });
      }
    });
    
    // Convert to array of theme cards
    const themes: ThemeCard[] = Array.from(themesMap.entries()).map(([name, info]) => ({
      name,
      episodeCount: info.count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      area: formattedArea,
      image: getThemeImage(name)
    }));
    
    return themes.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(`Error in getThemesByArea for ${area}:`, error);
    return [];
  }
}

// Helper function to get representative image for an area
function getAreaImage(areaName: string): string {
  // Try to find an episode with this area to use its image
  return '/placeholder.svg'; // Fallback to placeholder
}

// Helper function to get representative image for a theme
function getThemeImage(themeName: string): string {
  // Try to find an episode with this theme to use its image
  return '/placeholder.svg'; // Fallback to placeholder
}

// Get featured episodes (most recent from each area)
export async function getFeaturedEpisodes(): Promise<PodcastEpisode[]> {
  return getAllEpisodes().then(episodes => {
    // Group episodes by area
    const episodesByArea = episodes.reduce<Record<string, PodcastEpisode[]>>((acc, episode) => {
      if (!acc[episode.area]) {
        acc[episode.area] = [];
      }
      acc[episode.area].push(episode);
      return acc;
    }, {});
    
    // Get the most recent episode from each area
    const featuredEpisodes = Object.values(episodesByArea)
      .map(areaEpisodes => areaEpisodes[0])
      .sort((a, b) => (b.sequencia || '').localeCompare(a.sequencia || ''))
      .slice(0, 6);
      
    return featuredEpisodes;
  });
}

// Get recent episodes
export async function getRecentEpisodes(): Promise<PodcastEpisode[]> {
  return getAllEpisodes().then(episodes => 
    episodes
      .sort((a, b) => (b.sequencia || '').localeCompare(a.sequencia || ''))
      .slice(0, 6)
  );
}

// Supabase integration for favorites
export async function toggleFavorite(episodeId: number): Promise<boolean> {
  try {
    const userIp = getUserIP();
    const isFavorite = await checkIfFavorite(episodeId);
    
    if (isFavorite) {
      // Remove favorite
      const { error } = await supabase
        .from('podcast_favorites')
        .delete()
        .eq('episode_id', episodeId)
        .eq('user_ip', userIp);
        
      if (error) throw error;
      return false;
    } else {
      // Add favorite
      const { error } = await supabase
        .from('podcast_favorites')
        .insert({ episode_id: episodeId, user_ip: userIp });
        
      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    
    // Fallback to localStorage if Supabase fails
    const favoritesData = getFavoritesData();
    const isFavorite = favoritesData[episodeId]?.isFavorite || false;
    
    favoritesData[episodeId] = { 
      episodeId, 
      isFavorite: !isFavorite 
    };
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesData));
    
    return !isFavorite;
  }
}

export async function checkIfFavorite(episodeId: number): Promise<boolean> {
  try {
    const userIp = getUserIP();
    const { data, error } = await supabase
      .from('podcast_favorites')
      .select('*')
      .eq('episode_id', episodeId)
      .eq('user_ip', userIp)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    
    // Fallback to localStorage
    const favoritesData = getFavoritesData();
    return favoritesData[episodeId]?.isFavorite || false;
  }
}

export function getUserFavorite(episodeId: number): UserFavorite | null {
  try {
    const favoritesData = getFavoritesData();
    return favoritesData[episodeId] || null;
  } catch (error) {
    console.error("Error getting user favorite:", error);
    return null;
  }
}

export async function getFavoriteEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const userIp = getUserIP();
    const { data: favorites, error } = await supabase
      .from('podcast_favorites')
      .select('episode_id')
      .eq('user_ip', userIp);
    
    if (error) throw error;
    
    const favoriteIds = favorites.map(fav => fav.episode_id);
    
    return getAllEpisodes().then(episodes => 
      episodes.filter(episode => favoriteIds.includes(episode.id))
    );
  } catch (error) {
    console.error("Error getting favorite episodes from Supabase:", error);
    
    // Fallback to localStorage
    try {
      const favoritesData = getFavoritesData();
      const favoriteIds = Object.keys(favoritesData)
        .map(Number)
        .filter(id => favoritesData[id].isFavorite);
      
      return getAllEpisodes().then(episodes => 
        episodes.filter(episode => favoriteIds.includes(episode.id))
      );
    } catch (error) {
      console.error("Error getting favorite episodes:", error);
      return Promise.resolve([]);
    }
  }
}

// Progress tracking with Supabase
export async function saveEpisodeProgress(episodeId: number, progress: number, position: number = 0): Promise<void> {
  try {
    const userIp = getUserIP();
    const { error } = await supabase
      .from('podcast_history')
      .upsert({
        episode_id: episodeId,
        user_ip: userIp,
        progress_percent: progress,
        current_position: position,
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
  } catch (error) {
    console.error("Error saving episode progress to Supabase:", error);
    
    // Fallback to localStorage
    try {
      const progressData = getProgressData();
      progressData[episodeId] = { 
        episodeId, 
        progress, 
        lastPosition: position 
      };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error("Error saving episode progress:", error);
    }
  }
}

export async function getUserProgress(episodeId: number): Promise<UserProgress | null> {
  try {
    const userIp = getUserIP();
    const { data, error } = await supabase
      .from('podcast_history')
      .select('*')
      .eq('episode_id', episodeId)
      .eq('user_ip', userIp)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    if (!data) {
      // Fallback to localStorage
      const progressData = getProgressData();
      return progressData[episodeId] || null;
    }
    
    return {
      episodeId,
      progress: data.progress_percent,
      lastPosition: data.current_position
    };
  } catch (error) {
    console.error("Error getting user progress:", error);
    
    // Fallback to localStorage
    const progressData = getProgressData();
    return progressData[episodeId] || null;
  }
}

export async function getInProgressEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const userIp = getUserIP();
    const { data, error } = await supabase
      .from('podcast_history')
      .select('episode_id, progress_percent')
      .eq('user_ip', userIp)
      .gt('progress_percent', 0)
      .lt('progress_percent', 100);
    
    if (error) throw error;
    
    const episodeIds = data.map(item => item.episode_id);
    
    return getAllEpisodes().then(episodes => 
      episodes.filter(episode => episodeIds.includes(episode.id))
    );
  } catch (error) {
    console.error("Error getting in-progress episodes from Supabase:", error);
    
    // Fallback to localStorage
    try {
      const progressData = getProgressData();
      const episodeIds = Object.keys(progressData).map(Number).filter(id => 
        progressData[id].progress > 0 && progressData[id].progress < 100
      );
      
      return getAllEpisodes().then(episodes => 
        episodes.filter(episode => episodeIds.includes(episode.id))
      );
    } catch (error) {
      console.error("Error getting in-progress episodes:", error);
      return Promise.resolve([]);
    }
  }
}

export async function getCompletedEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const userIp = getUserIP();
    const { data, error } = await supabase
      .from('podcast_history')
      .select('episode_id')
      .eq('user_ip', userIp)
      .eq('progress_percent', 100);
    
    if (error) throw error;
    
    const episodeIds = data.map(item => item.episode_id);
    
    return getAllEpisodes().then(episodes => 
      episodes.filter(episode => episodeIds.includes(episode.id))
    );
  } catch (error) {
    console.error("Error getting completed episodes from Supabase:", error);
    
    // Fallback to localStorage
    try {
      const progressData = getProgressData();
      const episodeIds = Object.keys(progressData)
        .map(Number)
        .filter(id => progressData[id].progress === 100);
      
      return getAllEpisodes().then(episodes => 
        episodes.filter(episode => episodeIds.includes(episode.id))
      );
    } catch (error) {
      console.error("Error getting completed episodes:", error);
      return Promise.resolve([]);
    }
  }
}

// Helper functions for localStorage fallbacks
function getProgressData(): Record<number, UserProgress> {
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function getFavoritesData(): Record<number, UserFavorite> {
  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// Format episodes with additional client-side data
async function formatEpisodes(episodes: SupabaseEpisode[]): Promise<PodcastEpisode[]> {
  // Create an array to hold the processed episodes
  const formattedEpisodes: PodcastEpisode[] = [];

  // Process each episode sequentially
  for (const episode of episodes) {
    const progressData = await getUserProgress(episode.id);
    const isFavorite = await checkIfFavorite(episode.id);
    
    formattedEpisodes.push({
      ...episode,
      tag: Array.isArray(episode.tag) ? episode.tag : episode.tag ? [episode.tag] : [],
      progresso: progressData ? progressData.progress : 0,
      favorito: isFavorite,
      comentarios: episode.comentarios || 0,
      curtidas: episode.curtidas || 0,
      data_publicacao: episode.data_publicacao || new Date().toLocaleDateString('pt-BR'),
    });
  }
  
  return formattedEpisodes;
}
