"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const LoginButton = () => {
  const router = useRouter();
  const handlelogin = () => {
    router.push("/auth/signin");
  };
  return (
    <Button
      onClick={handlelogin}
      className="text-primary border-primary hover:bg-primary/10 cursor-pointer border-1 bg-white"
    >
      Log in
    </Button>
  );
};

export default LoginButton;
