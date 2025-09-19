'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { exhibits, type Exhibit } from '@/lib/exhibits-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign } from 'lucide-react';

function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={exhibit.image.imageUrl}
            alt={exhibit.title}
            fill
            className="object-cover"
            data-ai-hint={exhibit.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{exhibit.date}</Badge>
        <CardTitle className="font-headline text-xl mb-2">{exhibit.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{exhibit.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/30">
        <div className="font-bold text-lg text-primary">${exhibit.price}</div>
        <Button asChild size="sm">
          <Link href={`/checkout?exhibitId=${exhibit.id}&quantity=1`}>Book Ticket</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ExhibitsPage() {
  const [filteredExhibits, setFilteredExhibits] = useState<Exhibit[]>(exhibits);
  const [sort, setSort] = useState('availability');
  const [priceRange, setPriceRange] = useState(50);

  const handleFilter = () => {
    let newFiltered = [...exhibits];
    
    newFiltered = newFiltered.filter(e => e.price <= priceRange);

    newFiltered.sort((a, b) => {
        if (sort === 'availability') return b.availableSeats - a.availableSeats;
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return 0;
    });

    setFilteredExhibits(newFiltered);
  };
  
  useState(() => {
    handleFilter();
  });

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary">Our Exhibits</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Discover a world of art, history, and science.
        </p>
      </div>

      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
                <Label htmlFor="price-range" className="font-medium">Price Range: ${priceRange}</Label>
                <div className="flex items-center gap-4 mt-2">
                    <span>$0</span>
                    <Input id="price-range" type="range" min="0" max="50" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} onMouseUp={handleFilter} onTouchEnd={handleFilter}/>
                    <span>$50</span>
                </div>
            </div>
            <div>
                <Label htmlFor="sort-by" className="font-medium">Sort By</Label>
                <Select value={sort} onValueChange={value => { setSort(value); handleFilter(); }}>
                    <SelectTrigger id="sort-by" className="w-full mt-2">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="availability">Availability</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleFilter} className="w-full">Apply Filters</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredExhibits.map(exhibit => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} />
        ))}
      </div>
    </div>
  );
}
