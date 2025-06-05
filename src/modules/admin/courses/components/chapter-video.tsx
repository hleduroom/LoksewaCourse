import { useCallback, useEffect, useState } from "react";

import { Clock } from "lucide-react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";

// Optional: Define props type
type ChapterVideoProps = {
  id: string;
  publicId: string;
  duration: number;
};

const ChapterVideo = ({ id, publicId, duration }: ChapterVideoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatDuration = useCallback((seconds: number = 0) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <div
      className="card bg-base-100 cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative aspect-video">
        {isHovered ? (
          previewError ? (
            <img
              src={getThumbnailUrl(publicId)}
              alt={`Thumbnail for video ${id}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              src={getPreviewVideoUrl(publicId)}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(publicId)}
            alt={`Thumbnail for video ${id}`}
            className="h-full w-full object-cover"
          />
        )}

        <div className="bg-base-100 bg-opacity-70 absolute right-2 bottom-2 flex items-center rounded-lg px-2 py-1 text-sm">
          <Clock size={16} className="mr-1" />
          {formatDuration(duration)}
        </div>
      </figure>
    </div>
  );
};

export default ChapterVideo;
