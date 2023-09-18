import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import MainGameList from "./pages/MainGameList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMusicList from "./pages/MainMusicList";
import { Tag } from "./hooks/useMusics";
import { Country } from "./hooks/useCountries";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform;
  sortOrder: string;
  searchText: string;
}
export interface MusicQuery {
  genre: Genre | null;
  tag: Tag;
  country: Country | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [musicQuery, setMusicQuery] = useState<MusicQuery>({} as MusicQuery);

  return (
    <BrowserRouter>
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
          <NavBar onSearch={(searchText) => setMusicQuery({ ...musicQuery, searchText })} />
        </GridItem>

        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
            <GenreList selectedGenre={musicQuery.genre} onSelectGenre={(genre) => setMusicQuery({ ...musicQuery, genre })} />
          </GridItem>
        </Show>

        <GridItem area="main">
          <Routes>
            <Route path="/" element={<MainMusicList musicQuery={musicQuery} setMusicQuery={setMusicQuery} />} />
            <Route path="/game" element={<MainGameList gameQuery={gameQuery} setGameQuery={setGameQuery} />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
