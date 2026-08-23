import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'Sokha Realty | Premium Real Estate',
    short_name:       'Sokha Realty',
    description:      'Mumbai\'s trusted premium real estate developer.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#FDFCFA',
    theme_color:      '#C9A84C',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
