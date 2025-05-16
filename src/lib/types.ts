export interface PodcastEpisode {
  id: number;
  titulo: string;
  descricao: string;
  area: string;
  tema: string;
  tag: string[];
  url_audio: string;
  imagem_miniatura: string;
  sequencia: string;
  progresso: number;
  favorito: boolean;
  comentarios: number;
  curtidas: number;
  data_publicacao: string;
}

export interface UserProgress {
  episodeId: number;
  progress: number;
  lastPosition: number;
}

export interface UserFavorite {
  episodeId: number;
  isFavorite: boolean;
}

export interface AreaCard {
  id: number;
  name: string;
  episodeCount: number;
  slug: string;
  image: string;
}

export interface ThemeCard {
  name: string;
  episodeCount: number;
  slug: string;
  area: string;
  image: string;
}

export interface SupabaseEpisode {
  id: number;
  titulo: string;
  descricao: string;
  area: string;
  tema: string;
  tag: string | string[];
  url_audio: string;
  imagem_miniatura: string;
  sequencia: string;
  comentarios?: number;
  curtidas?: number;
  data_publicacao?: string;
}

// Add AudioPlayer related interfaces
export interface AudioPlayerState {
  isPlaying: boolean;
  currentEpisode: PodcastEpisode | null;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  isMinimized: boolean;
  queue: PodcastEpisode[];
}

export interface AudioPlayerContextType {
  state: AudioPlayerState;
  play: (episode: PodcastEpisode) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (episode: PodcastEpisode) => void;
  clearQueue: () => void;
  toggleMinimize: () => void;
}
