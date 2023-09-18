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
      {/* <Image src={getCroppedImageUrl(game.background_image)} /> */}
      <Image src={music.background_image} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          {music.tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
          <Text>{music.country}</Text>
          {/* <PlatformIconList platforms={game.parent_platforms?.map((p) => p.platform)} /> */}
          {/* <CriticScore score={game.metacritic} /> */}
          {/* //add music likey and tags */}
        </HStack>
        <Heading fontSize="2xl">
          {music.name}
          {/* <Emoji rating={game.rating_top} /> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
