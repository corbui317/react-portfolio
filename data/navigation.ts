export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Homelab', href: '#homelab' },
  { label: 'Contact', href: '#contact' },
] as const;

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/corbui317',
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
  title: 'Corey Bui | Software Engineer',
  role: 'Software Engineer',
  location: 'Austin, TX',
  description:
    'Software engineer building distributed data-platform services and cloud applications in Java, Python, and JavaScript.',
  url: 'https://coreybui.com',
  email: 'corbui31796@gmail.com',
  resumePath: '/Bui_Resume_SWE_GM_Oct2026.docx',
} as const;
