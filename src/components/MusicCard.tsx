import { Box, Card, CardBody, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { Music } from "../hooks/useMusics";
import YouTube from "react-youtube";
import YoutubeThumnailMaker from "./YoutubeThumnailMaker";

interface Props {
  music: Music;
}

const MusicCard = ({ music }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const opts = {
    height: "300",
    width: "400",
    // playerVars: {
    //   autoplay: 0,
    // },
  };
  const onReady = (event: any) => {
    // YouTube 플레이어가 준비되면 playerRef를 업데이트합니다.
    playerRef.current = event.target;
  };

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
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Text>{music.country}</Text>
          <Text>{music.genre}</Text>
          {/* //add music likey and tags */}
        </HStack>

        <HStack>
          {music.tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </HStack>
        <Text> 가수 : {music.singer}</Text>
        <Text> 좋아요 : {music.likes}</Text>
        <Text> 조회수 : {music.views}</Text>
        <Text> 등록일 : {music.posted.toString()}</Text>
        <Text> 발매일 : {music.released.toString()}</Text>
        <Text> 국가 : {music.country} </Text>

        <Heading fontSize="2xl">
          {music.title}
          {/* <Emoji rating={game.rating_top} /> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
