import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Data Consulting Group',
    short_name: 'DCG',
    description: 'DCG Website',
    start_url: '/',
    display: 'browser',
    background_color: 'white',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
     
    ],
  }
}