"use client";

import { StepForward } from "lucide-react";

import { Button } from "@/components/ui/button";

const OnboardingButton = () => {
  return (
    <Button variant="outline">
      <StepForward />
      <span className="hidden sm:block">Onboarding</span>
    </Button>
  );
};

export default OnboardingButton;
