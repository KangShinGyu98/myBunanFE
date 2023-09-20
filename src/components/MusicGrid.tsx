import { SimpleGrid, Text } from "@chakra-ui/react";
import { GameQuery, MusicQuery } from "../App";
import useGames, { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import useMusics from "../hooks/useMusics";
import MusicCardContainer from "./MusicCardContainer";
import MusicCardSkeleton from "./MusicCardSkeleton";
import MusicCard from "./MusicCard";

interface Props {
  musicQuery: MusicQuery;
}

const MusicGrid = ({ musicQuery }: Props) => {
  const { data, error, isLoading } = useMusics(musicQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;
  console.log("music grid ", data);
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" spacing={6}>
      {isLoading &&
        skeletons.map((skeleton) => (
          <MusicCardContainer key={skeleton}>
            <MusicCardSkeleton />
          </MusicCardContainer>
        ))}
      {data.map((music) => (
        <MusicCardContainer key={music.id}>
          <MusicCard music={music} />
        </MusicCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default MusicGrid;
