import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import LylicsGrid from "../components/LyricsGrid";
import useVideoId from "../hooks/useVideoId";
import { Center, Stack } from "@chakra-ui/react";

const MusicPost = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옵니다.
  console.log("id", id);
  const { data, error, isLoading } = useVideoId(parseInt(id || "0"));
  const opts = {
    height: "300",
    width: "400",
  };

  return (
    <Center>
      <Stack>
        <YouTube videoId={data[0]} opts={opts} key={data[0]} />
        <LylicsGrid postId={parseInt(id || "0")} />
      </Stack>
    </Center>
  );
};

export default MusicPost;
