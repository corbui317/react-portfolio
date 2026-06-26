export interface Project {
  title: string;
  url: string;
  description: string;
  outcome: string;
  tags: string[];
  preview?: string;
}

export const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    url: 'https://coreybui.com',
    preview: '/logo512.png',
    description: 'Modern portfolio site built with Next.js and Tailwind CSS.',
    outcome: 'Shipped a fast, accessible site optimized for Vercel deployment.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    title: 'Decidarr',
    url: 'https://github.com/corbui317/decidarr',
    description: 'Plex movie roulette that randomly picks movies or TV shows from your libraries.',
    outcome: 'Built a self-hosted app with Plex, Tautulli, and TMDb integrations and themed slot-machine UI.',
    tags: ['Next.js', 'Plex', 'Open Source'],
  },
  {
    title: 'Soleil Nail Lounge',
    url: 'https://lenail.info',
    preview: 'https://s.wordpress.com/mshots/v1/https://lenail.info?w=800&h=600',
    description: 'Business website for a local nail salon brand.',
    outcome: 'Delivered a polished responsive site focused on booking clarity.',
    tags: ['Business Site', 'Responsive', 'Brand'],
  },
];
