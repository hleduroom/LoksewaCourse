"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signOut } from "@/lib/auth-client";

const SignoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };
  return (
    <Button onClick={handleLogout}>
      <span className="hidden sm:block">Signout</span> <LogOut />
    </Button>
  );
};

export default SignoutButton;
