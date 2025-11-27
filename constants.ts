import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Silent Tea House',
    category: 'Architecture',
    shortDescription: 'A digital experience for a modern tea ceremony space in Kyoto.',
    fullDescription: 'This project involved creating a web presence for a boutique tea house. The goal was to translate the silence and mindfulness of the physical space into the digital realm. We utilized heavy negative space, subtle typographic interactions, and ambient soundscapes to create an immersive, meditative browsing experience.',
    year: '2023',
    imageUrl: 'https://picsum.photos/id/112/800/600',
    tags: ['UI/UX', 'React', 'Sound Design']
  },
  {
    id: '2',
    title: 'Mono Ceramics',
    category: 'E-Commerce',
    shortDescription: 'Minimalist storefront for handcrafted ceramic artworks.',
    fullDescription: 'Mono Ceramics required a platform that stepped back and let the texture of the clay speak. The interface is strictly monochrome, using layout shifts to highlight the imperfections and uniqueness of each handmade piece. The checkout process is streamlined to maintain the Zen-like atmosphere throughout the purchase journey.',
    year: '2024',
    imageUrl: 'https://picsum.photos/id/113/800/600',
    tags: ['Shopify', 'Photography', 'Branding']
  },
  {
    id: '3',
    title: 'Essence Magazine',
    category: 'Editorial',
    shortDescription: 'Digital editorial layout focusing on slow living and sustainability.',
    fullDescription: 'A layout exploration challenging the grid. Essence Magazine is an online publication dedicated to the philosophy of slow living. The reading experience mimics the feeling of unfolding a physical newspaper, with horizontal scrolling sections and large, impactful serif typography that breathes.',
    year: '2022',
    imageUrl: 'https://picsum.photos/id/20/800/600',
    tags: ['Web Design', 'Editorial', 'Typography']
  },
  {
    id: '4',
    title: 'Komorebi Lighting',
    category: 'Product Design',
    shortDescription: 'Smart lighting control interface inspired by sunlight through trees.',
    fullDescription: 'Komorebi is a smart home app designed to control ambient lighting. Unlike tech-heavy dashboards, this interface uses natural gradients and soft transitions to adjust brightness and color temperature, mimicking the natural progression of daylight to sunset.',
    year: '2023',
    imageUrl: 'https://picsum.photos/id/102/800/600',
    tags: ['App Design', 'IoT', 'Interaction']
  }
];

export const SOCIAL_LINKS = [
  { name: 'Twitter', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Email', url: 'mailto:hello@example.com' },
];
