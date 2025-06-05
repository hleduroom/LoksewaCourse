"use client";

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md border shadow-lg dark:border-gray-700">
      <video controls className="h-full w-full object-cover">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
