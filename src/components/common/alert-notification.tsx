import * as React from "react";

import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertNotificationProps {
  data: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | null | undefined;
  };
  className?: string;
}
const AlertNotification: React.FC<AlertNotificationProps> = ({
  data,
  className,
}) => {
  return (
    <Alert variant={data.variant} className={className}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{data.title}</AlertTitle>
      <AlertDescription>{data.description}</AlertDescription>
    </Alert>
  );
};

export default AlertNotification;
