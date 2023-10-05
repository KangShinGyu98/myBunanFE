import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import CountrySelector from "../components/CountrySelector";
import GenreSelector from "../components/GenreSelector";
import { Genre } from "../hooks/useGenres";
import { Country } from "../hooks/useCountries";
import NewPost from "../components/NewPost";
import { Link } from "react-router-dom";

export interface NewMusicQuery {
  genre: Genre | null;
  tags: string[];
  country: Country | null;
  title: string;
  singer: string;
  youtubeUrl: string;
  songWriter: string;
  postWriter: string;
  lyric: string;
  lyricComment: string;
}

const MainMusicList = () => {
  const [musicQuery, setMusicQuery] = useState<NewMusicQuery>({} as NewMusicQuery);
  return (
    <>
      <Box paddingLeft={2}>
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <CountrySelector selectedCountry={musicQuery.country} onSelectCountry={(country) => setMusicQuery({ ...musicQuery, country })} />
          </Box>
          <Box marginRight={5}>
            <GenreSelector selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
          </Box>
        </Flex>
      </Box>
      <NewPost musicQuery={musicQuery} setMusicQuery={setMusicQuery} />
    </>
  );
};

export default MainMusicList;
