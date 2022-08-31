import React, { useMemo } from "react";
import { VideoBlock, ExternalFileObject } from "@notion-cms/types";

const youtubeRegexp = /^https:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9]+)$/;

export interface ExternalVideoBlock extends VideoBlock {
  video: ExternalFileObject;
}

interface Props {
  block: ExternalVideoBlock;
}

const Video = ({ block }: Props) => {
  const match = useMemo(
    () => block.video.external.url.match(youtubeRegexp),
    [block.video.external.url]
  );
  // Youtube video
  if (match) {
    const embedUrl = `https://www.youtube.com/embed/${match[1]}`;
    return (
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  // Anything else
  return (
    <video controls>
      <source src={block.video.external.url} type="video/mpeg" />
      Your browser does not support the video element. Kindly update it to
      latest version.
    </video>
  );
};

export default Video;
