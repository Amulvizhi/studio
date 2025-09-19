import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/exhibits"
            className="transition-colors hover:text-primary"
          >
            Exhibits
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/exhibits">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
