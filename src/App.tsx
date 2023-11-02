import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Country } from "./hooks/useCountries";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

export interface MusicQuery {
  genre: Genre | null;
  tags: string[];
  country: Country | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [musicQuery, setMusicQuery] = useState<MusicQuery>({} as MusicQuery);

  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="*" element={<MainPage />} />
        {/* private */}

        {/* others */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
