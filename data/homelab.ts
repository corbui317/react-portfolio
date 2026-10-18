export interface HomelabNode {
  id: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export const homelabNodes: HomelabNode[] = [
  {
    id: 'mesh',
    title: 'Tailscale mesh',
    role: 'Network',
    description: 'Zero-trust mesh that links hosts and devices for private access to the service network.',
    tags: ['Tailscale', 'Zero trust', 'Linux'],
  },
  {
    id: 'tunnel',
    title: 'Cloudflare Tunnel',
    role: 'Ingress',
    description: 'Outbound-only tunnels publish selected services without opening router ports.',
    tags: ['Cloudflare', 'DNS', 'TLS'],
  },
  {
    id: 'sso',
    title: 'Authentik',
    role: 'Identity',
    description: 'Single sign-on with OIDC in front of self-hosted apps, one login for everything.',
    tags: ['Authentik', 'SSO', 'OIDC'],
  },
  {
    id: 'services',
    title: 'Container services',
    role: 'Workloads',
    description: 'Dockerized apps like Decidarr on Linux, routed through an Nginx reverse proxy.',
    tags: ['Docker', 'Linux', 'Nginx'],
  },
];
