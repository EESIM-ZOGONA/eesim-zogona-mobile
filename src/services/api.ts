const API_BASE_URL = 'https://eesimzogona.org/api';

export interface VideoData {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailHigh: string;
  publishedAt: string;
  url: string;
  views: number;
  localViews: number;
  totalViews: number;
  likes: number;
  duration: string;
  durationSeconds: number;
  durationFormatted: string;
  commentCount: number;
  category: string | null;
  tags: string[];
}

export interface PlaylistData {
  id: string;
  title: string;
  category: string;
  videoCount: number;
  videos: VideoData[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more?: boolean;
  };
}

export interface PlaylistsResponse {
  data: PlaylistData[];
}

export interface VideoDetailResponse {
  video: VideoData;
  playlist: {
    id: string;
    title: string;
    videos: VideoData[];
  } | null;
}

class ApiService {
  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }

  async getVideos(params?: {
    q?: string;
    playlist_id?: string;
    sort?: 'recent' | 'popular' | 'oldest';
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<VideoData>> {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.playlist_id) searchParams.append('playlist_id', params.playlist_id);
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.page) searchParams.append('page', params.page.toString());

    const query = searchParams.toString();
    return this.fetch(`/videos${query ? `?${query}` : ''}`);
  }

  async getPlaylists(): Promise<PlaylistsResponse> {
    return this.fetch('/videos/playlists');
  }

  async getPlaylistVideos(playlistId: string, params?: {
    q?: string;
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<VideoData> & { playlist: { id: string; title: string } }> {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.page) searchParams.append('page', params.page.toString());

    const query = searchParams.toString();
    return this.fetch(`/videos/playlist/${playlistId}${query ? `?${query}` : ''}`);
  }

  async getVideo(videoId: string): Promise<VideoDetailResponse> {
    return this.fetch(`/videos/${videoId}`);
  }
}

export const api = new ApiService();
