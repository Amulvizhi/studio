import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Exhibit {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  price: number;
  availableSeats: number;
  image: ImagePlaceholder;
}

const exhibitDetails: Omit<Exhibit, 'id' | 'image'>[] = [
  {
    title: 'Ancient Worlds',
    description: 'Explore the wonders of ancient civilizations, from Egypt to Rome.',
    longDescription: 'A breathtaking journey through time, featuring rare artifacts from ancient Egypt, Greece, and the Roman Empire. Discover the secrets of the pharaohs and the minds of legendary philosophers.',
    date: 'Ongoing',
    price: 25,
    availableSeats: 150,
  },
  {
    title: 'Modern Art',
    description: 'A vibrant collection of abstract and contemporary masterpieces.',
    longDescription: 'Immerse yourself in the bold colors and shapes of the 20th and 21st centuries. This exhibit showcases pivotal works from pioneers of modernism and today\'s leading contemporary artists.',
    date: 'Closes Dec 15, 2024',
    price: 20,
    availableSeats: 80,
  },
  {
    title: 'Dino Exhibit',
    description: 'Come face-to-face with the giants of the prehistoric world.',
    longDescription: 'Stand in the shadows of colossal skeletons, including a full-size Tyrannosaurus Rex. Our most popular exhibit brings the Mesozoic Era to life with interactive displays and fossil discoveries.',
    date: 'Ongoing',
    price: 30,
    availableSeats: 250,
  },
  {
    title: 'Space Journey',
    description: 'An interactive voyage through our solar system and beyond.',
    longDescription: 'Embark on an interstellar adventure. Pilot a virtual spacecraft, gaze at stunning nebulae, and learn about the latest discoveries in space exploration from our partners at the national space agency.',
    date: 'Closes Jan 31, 2025',
    price: 22,
    availableSeats: 120,
  },
  {
    title: 'Renaissance Masters',
    description: 'Witness the genius of Leonardo, Michelangelo, and Raphael.',
    longDescription: 'A curated collection of masterpieces from the height of the Italian Renaissance. Admire iconic paintings and sculptures that forever changed the course of art history.',
    date: 'Starts Nov 1, 2024',
    price: 35,
    availableSeats: 50,
  },
  {
    title: 'Ocean Life',
    description: 'Dive deep into the mysteries of the ocean in our aquarium.',
    longDescription: 'From the sunlit coral reefs to the dark abyssal plain, discover the incredible diversity of marine life. Our 3-story aquarium features thousands of species from around the globe.',
    date: 'Ongoing',
    price: 28,
    availableSeats: 200,
  },
   {
    title: 'Sculpture Garden',
    description: 'Art and nature in harmony, featuring stunning outdoor installations.',
    longDescription: 'Stroll through our serene gardens and discover a world-class collection of modern and contemporary sculptures. The interplay of art, light, and landscape creates a truly unique experience.',
    date: 'Weather Permitting',
    price: 15,
    availableSeats: 300,
  },
  {
    title: 'Fashion History',
    description: 'A century of style, from the Roaring Twenties to the modern day.',
    longDescription: 'Trace the evolution of fashion through iconic garments that defined generations. This exhibit explores how clothing has reflected and shaped social and cultural change over the past 100 years.',
    date: 'Closes Feb 28, 2025',
    price: 18,
    availableSeats: 90,
  }
];

export const exhibits: Exhibit[] = PlaceHolderImages.map((image) => {
  const detail = exhibitDetails.find(d => d.title.toLowerCase().includes(image.id.split('-')[0]));
  return {
    id: image.id,
    image: image,
    ...detail!,
  };
}).filter(Boolean);
