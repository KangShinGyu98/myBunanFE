import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import LylicsGrid from "../components/LyricsGrid";
import useLylics from "../hooks/useLyrics";
import useVideoId from "../hooks/useVideoId";
import MusicCardContainer from "../components/MusicCardContainer";
import MusicCardSkeleton from "../components/MusicCardSkeleton";

const MusicPost = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  console.log("id", id);
  const { data, error, isLoading } = useVideoId(parseInt(id || "0"));
  const opts = {
    height: "300",
    width: "400",
  };

  return (
    <>
      {isLoading && (
        <MusicCardContainer key={0}>
          <MusicCardSkeleton />
        </MusicCardContainer>
      )}
      {data.map((videoId) => (
        <YouTube videoId={videoId} opts={opts} key={videoId} />
      ))}
      <LylicsGrid postId={parseInt(id || "0")} />
    </>
  );
};

export default MusicPost;
