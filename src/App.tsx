import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="*" element={<MainPage />} />
        {/* private */}

        {/* others */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
