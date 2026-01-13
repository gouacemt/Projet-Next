import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg">
          SaaS Mini App
        </Link>

        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Button asChild>
            <Link href="/pricing">S’abonner</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
