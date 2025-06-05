"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>TITLE</SheetTitle>
          <SheetDescription>DESCRIPTION</SheetDescription>

          <div className="grid gap-4 py-4">
            {siteConfig.mainNav?.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.title}
              </MobileLink>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-[1.15rem]", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
