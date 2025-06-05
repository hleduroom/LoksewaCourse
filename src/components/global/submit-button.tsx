import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const SubmitButton = ({
  loading,
  label = "Save",
  className,
}: {
  loading: boolean;
  label?: string;
  className?: string;
}) => {
  return (
    <Button type="submit" disabled={loading} className={cn(className)}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
