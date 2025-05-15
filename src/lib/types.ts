
export interface PodcastEpisode {
  id: number;
  titulo: string;
  descricao: string;
  area: string;
  tema: string;
  tag: string[];
  url_audio: string;
  imagem_miniatura: string;
  sequencia?: string;
  data_publicacao?: string;
  favorito?: boolean;
  comentarios?: number;
  curtidas?: number;
  progresso?: number;
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
  slug: string;
  image?: string;
  episodeCount?: number;
}

export interface ThemeCard {
  name: string;
  slug: string;
  episodeCount: number;
  area: string;
  image: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentEpisode: PodcastEpisode | null;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  playbackRate: number;
  showMiniPlayer: boolean;
  queue: PodcastEpisode[];
}

export interface AudioPlayerContextType {
  state: AudioPlayerState;
  play: (episode: PodcastEpisode) => void;
  pause: () => void;
  resume: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  addToQueue: (episode: PodcastEpisode) => void;
  removeFromQueue: (episodeId: number) => void;
  clearQueue: () => void;
  closeMiniPlayer: () => void;
}

export interface SupabaseEpisode {
  id: number;
  titulo: string;
  descricao: string;
  area: string;
  tema: string;
  tag: string[];
  url_audio: string;
  imagem_miniatura: string;
  sequencia?: string;
  data_publicacao?: string;
  comentarios?: number;
  curtidas?: number;
}
