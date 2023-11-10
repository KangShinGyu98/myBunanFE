import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import MusicCardContainer from "./MusicCardContainer";
import MusicCardSkeleton from "./MusicCardSkeleton";
import LyricCard from "./LyricCard";
import { useAuthContext } from "../context/AuthContext";
import useLyrics from "../hooks/useLyrics";

interface Props {
  postId: number;
}

const LyricsGrid = ({ postId }: Props) => {
  const { user, isInitializing, onAuthStateChange } = useAuthContext();
  const userNickname = user?.nickname;
  const { data, error, isLoading } = useLyrics(postId, userNickname);
  console.log("useLyrics data :  ", data);
  console.log("useLyrics nickname :  ", userNickname);

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
