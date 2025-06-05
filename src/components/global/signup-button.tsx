"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const SignupButton = () => {
  const router = useRouter();
  const handlesignup = () => {
    router.push("/auth/signup");
  };
  return (
    <Button onClick={handlesignup} className="cursor-pointer">
      Sign up
    </Button>
  );
};

export default SignupButton;
