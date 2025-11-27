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
  },
  {
    id: '5',
    title: 'Washi Paper Lab',
    category: 'Craft',
    shortDescription: 'Revitalizing traditional Japanese paper making through modern branding.',
    fullDescription: 'We partnered with a historic paper mill in Gifu to create a digital archive and e-commerce platform. The challenge was to convey the texture and warmth of handmade paper through a screen. High-resolution macro photography combined with slow, organic animations creates a tactile digital experience.',
    year: '2023',
    imageUrl: 'https://picsum.photos/id/24/800/600',
    tags: ['Branding', 'Photography', 'Culture']
  },
  {
    id: '6',
    title: 'Zen Garden VR',
    category: 'Experiential',
    shortDescription: 'Virtual reality meditation experience in a generated dry landscape.',
    fullDescription: 'A VR application that procedurally generates karesansui (dry landscape) gardens. Users can rake gravel and place stones in a serene, physics-based environment. The sound design responds to the user\'s movements, creating a unique soundscape for each session.',
    year: '2024',
    imageUrl: 'https://picsum.photos/id/28/800/600',
    tags: ['VR', 'Unity', 'Sound Design']
  },
  {
    id: '7',
    title: 'Sumi Ink',
    category: 'Typography',
    shortDescription: 'A variable typeface inspired by the fluid dynamics of calligraphy ink.',
    fullDescription: 'Sumi Ink is a display typeface that changes weight and flow based on typing speed and context. Developed using custom algorithms to simulate the capillary action of ink on paper, it brings the unpredictability and beauty of hand-lettering to digital typography.',
    year: '2022',
    imageUrl: 'https://picsum.photos/id/42/800/600',
    tags: ['Typography', 'Creative Coding', 'Design']
  }
];

export const SOCIAL_LINKS = [
  { name: 'Twitter', url: '#' },
  { name: 'Instagram', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'Email', url: 'mailto:hello@example.com' },
];