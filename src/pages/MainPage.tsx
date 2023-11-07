import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Genre } from "../hooks/useGenres";
import { Country } from "../hooks/useCountries";
import NavBar from "../components/NavBar";
import CountryList from "../components/CountryList";
import GenreList from "../components/GenreList";
import MainMusicList from "./MainMusicList";
import MusicPost from "./MusicPost";
import CreateNewMusic from "./CreateNewMusic";

export interface MusicQuery {
  genre: Genre | null;
  tags: string[];
  country: Country | null;
  sortOrder: string;
  searchText: string;
}

const MainPage = () => {
  const [musicQuery, setMusicQuery] = useState<MusicQuery>({} as MusicQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => setMusicQuery({ ...musicQuery, searchText })} setMusicQueryEmpty={() => setMusicQuery({} as MusicQuery)} />
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <CountryList selectedCountry={musicQuery.country} onSelectCountry={(country) => setMusicQuery({ ...musicQuery, country })} />
          <hr
            style={{
              width: "95%",
              textAlign: "center",
              borderBottom: "1px solid #aaa",
              lineHeight: "0.2em",
              marginTop: "10px",
            }}
          />

          <GenreList selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Routes>
          <Route path="/" element={<MainMusicList musicQuery={musicQuery} setMusicQuery={setMusicQuery} />} />

          <Route path="/musics/:id" element={<MusicPost />} />
          <Route path="/create" element={<CreateNewMusic />} />

          {/* 기타 등등 */}
          <Route path="*" element={<MainMusicList musicQuery={musicQuery} setMusicQuery={setMusicQuery} />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default MainPage;
