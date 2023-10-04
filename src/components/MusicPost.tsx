import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import LylicsGrid from "./LyricsGrid";
import useLylics from "../hooks/useLyrics";
import useVideoId from "../hooks/useVideoId";

const MusicPost = async () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  console.log("id", id);
  const videoId = await useVideoId(parseInt(id || "0"));
  const opts = {
    height: "300",
    width: "400",
  };

  return (
    <>
      <YouTube videoId={videoId} opts={opts} />
      <LylicsGrid postId={parseInt(id || "0")} />
    </>
  );
};

export default MusicPost;
