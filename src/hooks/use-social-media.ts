import { useState, useEffect, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  followers?: string;
}

export interface SocialStats {
  totalFollowers: string;
  platformCount: number;
  videoCount: string;
}

interface UseSocialMediaReturn {
  socialLinks: SocialLink[];
  stats: SocialStats;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

const mockSocialLinks: SocialLink[] = [
  {
    id: 'website',
    name: 'Site Web',
    handle: 'eesimzogona.org',
    url: 'https://eesimzogona.org',
    icon: 'globe-outline',
    gradient: ['#030a7f', '#020866'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@EgliseEvangeliqueSIMZogona',
    url: 'https://youtube.com/@EgliseEvangeliqueSIMZogona',
    icon: 'logo-youtube',
    gradient: ['#ff0000', '#cc0000'],
    followers: '2.5K',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'EE SIM Zogona',
    url: 'https://facebook.com/eesimzogona',
    icon: 'logo-facebook',
    gradient: ['#1877f2', '#0d65d9'],
    followers: '5.2K',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@eesimzogona',
    url: 'https://instagram.com/eesimzogona',
    icon: 'logo-instagram',
    gradient: ['#e4405f', '#c13584'],
    followers: '1.8K',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@eesimzogona',
    url: 'https://tiktok.com/@eesimzogona',
    icon: 'logo-tiktok',
    gradient: ['#000000', '#333333'],
    followers: '850',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Groupe de prière',
    url: 'https://chat.whatsapp.com/invite-link',
    icon: 'logo-whatsapp',
    gradient: ['#25d366', '#128c7e'],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: 'Canal EE SIM Zogona',
    url: 'https://t.me/eesimzogona',
    icon: 'paper-plane',
    gradient: ['#0088cc', '#006699'],
  },
];

const mockStats: SocialStats = {
  totalFollowers: '10K+',
  platformCount: 7,
  videoCount: '500+',
};

export function useSocialMedia(): UseSocialMediaReturn {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [stats, setStats] = useState<SocialStats>(mockStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSocialLinks(mockSocialLinks);
      setStats(mockStats);
      setLoading(false);
    }, 500);
  };

  // Initial load
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSocialLinks(mockSocialLinks);
      setStats(mockStats);
      setLoading(false);
    }, 300);
  }, []);

  return {
    socialLinks,
    stats,
    loading,
    error,
    refresh,
  };
}
