import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
// import LoginHandeler from "./OAuth/LoginHandler";
// import OAuth from "./OAuth/OAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        {/* private */}
        {/* <Route
          path="/OpenApi/kakao" //redirect_url
          element={<LoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
        />
        <Route
          path="/test/login" //redirect_url
          element={<OAuth />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
        /> */}
        <Route path="*" element={<MainPage />} />

        {/* others */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
