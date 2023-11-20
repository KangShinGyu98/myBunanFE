import { Box, Button, Flex } from "@chakra-ui/react";
import MusicHeading from "../components/MusicHeading";
import CountrySelector from "../components/CountrySelector";
import SortSelector from "../components/SortSelector";
import MusicGrid from "../components/MusicGrid";
import GenreSelector from "../components/GenreSelector";
import { Link } from "react-router-dom";
import { MusicQuery } from "./MainPage";
import { useEffect } from "react";

export interface MainMusicListProps {
  musicQuery: MusicQuery;
  setMusicQuery: (musicQuery: MusicQuery) => void;
}

const MainMusicList = ({ musicQuery, setMusicQuery }: MainMusicListProps) => {
  return (
    <>
      <Box paddingLeft={2}>
        <MusicHeading musicQuery={musicQuery} />
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <CountrySelector selectedCountry={musicQuery.country} onSelectCountry={(country) => setMusicQuery({ ...musicQuery, country })} />
          </Box>
          <Box marginRight={5}>
            <GenreSelector selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
          </Box>
          <SortSelector sortOrder={musicQuery.sortOrder} onSelectSortOrder={(sortOrder) => setMusicQuery({ ...musicQuery, sortOrder })} />

          <Link to="/create">
            <Button colorScheme="whatsapp" marginLeft={5} variant="solid">
              새 글 작성
            </Button>
          </Link>
        </Flex>
      </Box>
      <MusicGrid musicQuery={musicQuery} />
    </>
  );
};

export default MainMusicList;
