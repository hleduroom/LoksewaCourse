import * as Icons from "lucide-react";

interface IconRendererProps {
    name: string;
    className?: string;
}

export const IconRenderer = ({ name, className = "h-5 w-5 text-purple-600" }: IconRendererProps) => {
    const LucideIcon = (Icons as any)[name];
    if (!LucideIcon) return null; // or return a default icon
    return <LucideIcon className={className} />;
};