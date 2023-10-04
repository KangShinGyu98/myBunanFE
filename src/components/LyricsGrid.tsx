import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { MusicQuery } from "../App";
import useMusics from "../hooks/useMusics";
import MusicCardContainer from "./MusicCardContainer";
import MusicCardSkeleton from "./MusicCardSkeleton";
import MusicCard from "./MusicCard";
import useLyrics from "../hooks/useLyrics";
import LyricCard from "./LyricCard";

interface Props {
  postId: number;
}

const LyricsGrid = ({ postId }: Props) => {
  const { data, error, isLoading } = useLyrics(postId);
  console.log("useLyrics data :  ", data);
  if (error) return <Text>{error}</Text>;

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;
  return (
    <SimpleGrid columns={{ sm: 1, md: 1, lg: 1, xl: 1 }} padding="10px" spacing={6}>
      {isLoading &&
        skeletons.map((skeleton) => (
          <MusicCardContainer key={skeleton}>
            <MusicCardSkeleton />
          </MusicCardContainer>
        ))}
      {/* 여기 youtube */}
      {data.map((lyric) => (
        <LyricCard key={lyric.id} lyric={lyric} />
      ))}
    </SimpleGrid>
  );
};

export default LyricsGrid;
