import React from "react";
import { MusicQuery } from "../App";
import { Box, Flex } from "@chakra-ui/react";
import MusicHeading from "../components/MusicHeading";
import CountrySelector from "../components/CountrySelector";
import SortSelector from "../components/SortSelector";
import MusicGrid from "../components/MusicGrid";

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
          <SortSelector sortOrder={musicQuery.sortOrder} onSelectSortOrder={(sortOrder) => setMusicQuery({ ...musicQuery, sortOrder })} />
        </Flex>
      </Box>
      <MusicGrid musicQuery={musicQuery} />
    </>
  );
};

export default MainMusicList;
