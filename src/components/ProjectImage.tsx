import React, { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

/**
 * Image with a graceful fallback: if the asset fails to load, render a
 * styled placeholder with the project name instead of a broken-image icon.
 */
const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  title,
  className = "",
  width,
  height,
  loading = "lazy",
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={`${title} — image unavailable`}
        className={`${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-800 to-neutral-900 text-center p-6`}
      >
        <span className="text-2xl font-bold text-neutral-400 leading-tight line-clamp-2">
          {title}
        </span>
        <span className="text-xs text-neutral-500">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
};

export default ProjectImage;
