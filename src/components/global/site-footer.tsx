import Link from "next/link";

import { Book, Home, LogIn } from "lucide-react";

import Container from "@/components/global/container";

import { Button } from "../ui/button";

const SiteFooter = () => {
  return (
    <footer className="border-grid border-t py-6 md:py-0">
      <Container className="flex h-96 items-center justify-center border-b">
        <Button>SUBSCRIBE</Button>
      </Container>

      <Container className="hidden h-14 items-center justify-around sm:flex">
        &copy; 2025
      </Container>

      <Container className="flex h-14 items-center justify-around sm:hidden">
        <Button asChild size="icon">
          <Link href="/">
            <Home />
          </Link>
        </Button>
        <Button asChild size="icon">
          <Link href="/courses">
            <Book />
          </Link>
        </Button>
        <Button asChild size="icon">
          <Link href="/auth/sign-in">
            <LogIn />
          </Link>
        </Button>

        {/* &copy; 2025 */}
      </Container>
    </footer>
  );
};

export default SiteFooter;
