import { Box, Card, CardBody, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Music } from "../hooks/useMusics";
import YouTube from "react-youtube";
import YoutubeThumnailMaker from "./YoutubeThumnailMaker";
import { Link } from "react-router-dom";

interface Props {
  music: Music;
}
const MusicCard = ({ music }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const playerRef = useRef(null);
  const opts = {
    height: "300",
    width: "400",
    // playerVars: {
    //   autoplay: 0,
    // },
  };
  // const onReady = (event: any) => {
  //   // YouTube 플레이어가 준비되면 playerRef를 업데이트합니다.
  //   playerRef.current = event.target;
  // };

  const onMouseEnter = () => {
    setIsPlaying(true); // 마우스를 올리면 자동 재생 시작
  };

  const onMouseLeave = () => {
    setIsPlaying(false); // 마우스를 떼면 재생 중지
  };

  return (
    <Card>
      <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {isPlaying ? <YouTube videoId={music.videoId} opts={opts} /> : <YoutubeThumnailMaker videoId={music.videoId} />}

        {/* <YouTube videoId="liJVSwOiiwg" opts={opts} onReady={onReady} /> */}
      </Box>
      <Link to={`/musics/${music.id}`}>
        <CardBody>
          <Heading fontSize="2xl">
            {music.title}
            {/* <Emoji rating={game.rating_top} /> */}
          </Heading>
          <Heading fontSize={"xl"} mb={"2"}>
            {" - " + music.singer}
          </Heading>
          <HStack justifyContent="space-between" marginBottom={3}>
            <Text>{music.country}</Text>
            <Text>{music.genre}</Text>
            {/* //add music likey and tags */}
          </HStack>

          {/* <HStack>
            {music.tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </HStack> */}
          <HStack></HStack>

          <Text> 좋아요 : {music.likes}</Text>
          <Text> 발매일 : {music.released?.toString()}</Text>
        </CardBody>
      </Link>
    </Card>
  );
};

export default MusicCard;
