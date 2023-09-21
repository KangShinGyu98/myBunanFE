import React from "react";

interface Props {
  videoId: string;
}

const YoutubeThumnailMaker = ({ videoId }: Props) => {
  // 비디오 썸네일 이미지 URL을 생성 (예: https://img.youtube.com/vi/VIDEO_ID/0.jpg)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return <img src={thumbnailUrl} alt="Video Thumbnail" />;
};

export default YoutubeThumnailMaker;
