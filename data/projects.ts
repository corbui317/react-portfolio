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
    title: 'HomeVault',
    url: 'https://home-vault.me',
    preview: 'https://s.wordpress.com/mshots/v1/https://home-vault.me?w=800&h=600',
    description: 'Self-hosted photo management platform for families.',
    outcome: 'Designed a reliable media workflow with privacy-first storage.',
    tags: ['Self-hosted', 'Media', 'Infrastructure'],
  },
  {
    title: 'Personal Portfolio',
    url: 'https://coreybui.com',
    preview: '/logo512.png',
    description: 'Modern portfolio site built with Next.js and Tailwind CSS.',
    outcome: 'Shipped a fast, accessible site optimized for Vercel deployment.',
    tags: ['Next.js', 'React', 'TypeScript'],
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
