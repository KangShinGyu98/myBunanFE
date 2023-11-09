import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import MusicCardContainer from "./MusicCardContainer";
import MusicCardSkeleton from "./MusicCardSkeleton";
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
    <SimpleGrid columns={{ base: 1 }} padding="10px">
      {data.map((lyric) => (
        <LyricCard key={lyric.id} lyric={lyric} />
      ))}
    </SimpleGrid>
  );
};

export default LyricsGrid;
