
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
