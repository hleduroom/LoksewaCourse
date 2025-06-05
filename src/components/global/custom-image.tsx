import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const CustomImage = ({ url }: { url?: string | null }) => {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      {url ? (
        <Image src={url} alt="" fill className="rounded-md object-cover" />
      ) : (
        <div className="h-full w-full rounded-md bg-gradient-to-r from-purple-300 via-pink-300 to-red-300" />
      )}
    </AspectRatio>
  );
};

export default CustomImage;
