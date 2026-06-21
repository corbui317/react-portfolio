export const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/cbui17',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/corey-bui/',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cbui17/',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/cbui17',
  },
] as const;

export const siteConfig = {
  name: 'Corey Bui',
  title: 'Corey Bui | Developer & Systems Engineer',
  description:
    'I build modern web experiences and automation tools that bridge backend infrastructure with engaging frontends.',
  url: 'https://coreybui.com',
  email: 'corbui317@gmail.com',
} as const;
