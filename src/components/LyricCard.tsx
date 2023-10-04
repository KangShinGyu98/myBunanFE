import { Box, Card, CardBody, Heading, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Music } from "../hooks/useMusics";
import YouTube from "react-youtube";
import YoutubeThumnailMaker from "./YoutubeThumnailMaker";
import { Link } from "react-router-dom";
import { Lyric } from "../hooks/useLyrics";

interface Props {
  lyric: Lyric;
}
const LyricCard = ({ lyric }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Text> </Text>
      <h1>hello</h1>
    </>
  );
};

export default LyricCard;
