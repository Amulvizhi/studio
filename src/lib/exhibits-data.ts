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
    title: 'National Museum, New Delhi',
    description: 'Discover India\'s rich heritage with artifacts spanning 5,000 years.',
    longDescription: 'From Harappan civilization to modern art, explore a vast collection of archaeology, anthropology, and art that tells the story of the Indian subcontinent.',
    date: 'Ongoing',
    price: 30,
    availableSeats: 200,
  },
  {
    title: 'Indian Museum, Kolkata',
    description: 'The oldest and largest museum in India, a treasure trove of history.',
    longDescription: 'Founded in 1814, it houses rare collections of antiques, armour, ornaments, fossils, skeletons, mummies, and Mughal paintings.',
    date: 'Ongoing',
    price: 25,
    availableSeats: 180,
  },
  {
    title: 'CSMVS, Mumbai',
    description: 'Formerly the Prince of Wales Museum, showcasing art and history.',
    longDescription: 'Explore a magnificent Indo-Saracenic building filled with artifacts from across India and beyond, covering natural history, sculpture, and textiles.',
    date: 'Ongoing',
    price: 35,
    availableSeats: 250,
  },
  {
    title: 'Salar Jung Museum, Hyderabad',
    description: 'Home to one of the world\'s largest one-man collections of antiques.',
    longDescription: 'An art museum located at Dar-ul-Shifa, on the southern bank of the Musi River. It is famous for its collection of sculptures, paintings, and artifacts from across the globe.',
    date: 'Ongoing',
    price: 20,
    availableSeats: 150,
  },
  {
    title: 'Government Museum, Chennai',
    description: 'A rich repository of archaeology, numismatics, and natural history.',
    longDescription: 'Established in 1851, it is the second oldest museum in India. Don\'t miss the impressive collection of Roman antiquities and the largest collection of Pallava and Chola bronzes.',
    date: 'Ongoing',
    price: 15,
    availableSeats: 300,
  },
  {
    title: 'Intl. Dolls Museum, Delhi',
    description: 'A magical world of over 6,500 dolls from more than 85 countries.',
    longDescription: 'A paradise for children and adults alike, this whimsical museum showcases a vast and diverse collection of costumes and cultures through its doll displays.',
    date: 'Ongoing',
    price: 10,
    availableSeats: 100,
  },
  {
    title: 'Calico Museum of Textiles',
    description: 'One of the world\'s foremost institutions for Indian textiles.',
    longDescription: 'Located in Ahmedabad, this museum features a stunning collection of fabrics, from Mughal court textiles to regional embroideries, spanning five centuries.',
    date: 'By Appointment',
    price: 40,
    availableSeats: 40,
  },
  {
    title: 'Napier Museum, Kerala',
    description: 'An architectural gem with a collection of historical artifacts.',
    longDescription: 'Located in Thiruvananthapuram, this 19th-century museum has its own natural air conditioning system and boasts a collection of archaeological and historic artifacts, bronze idols, and ivory carvings.',
    date: 'Ongoing',
    price: 20,
    availableSeats: 120,
  },
];

export const exhibits: Exhibit[] = PlaceHolderImages.map((image) => {
  const detail = exhibitDetails.find(d => d.title.toLowerCase().includes(image.id.split('-')[0]));
  return {
    id: image.id,
    image: image,
    ...detail!,
  };
}).filter(Boolean);
