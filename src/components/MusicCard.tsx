import { Card, CardBody, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { Music } from "../hooks/useMusics";

interface Props {
  music: Music;
}

const MusicCard = ({ music }: Props) => {
  return (
    <Card>
      <Image src={music.background_image} />
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

        <Heading fontSize="2xl">
          {music.name}
          {/* <Emoji rating={game.rating_top} /> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
