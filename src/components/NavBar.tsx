import { Button, HStack, Image, useToast, Text, Box } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useAuthContext } from "../context/AuthContext";
import { MusicQuery } from "../pages/MainPage";

interface Props {
  onSearch: (searchText: string) => void;
  setMusicQuery: (musicQuery: MusicQuery) => void;
  musicQuery: MusicQuery;
}

const NavBar = ({ onSearch, setMusicQuery, musicQuery }: Props) => {
  const toast = useToast();
  const { user, isInitializing, onAuthStateChange } = useAuthContext();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    onAuthStateChange("logout");
    toast({
      position: "top",
      title: "로그아웃에 성공했습니다.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <HStack padding="10px">
      <Link to="/">
        <Image
          src={"https://bunan-image-bucket.s3.ap-northeast-2.amazonaws.com/etc/logo_black.png"}
          width={"100%"}
          onClick={() =>
            setMusicQuery({
              genre: null,
              tags: [],
              country: null,
              sortOrder: null,
              searchText: "",
              email: user?.email,
            } as MusicQuery)
          }
        />
      </Link>
      <SearchInput onSearch={onSearch} />
      {/* <ColorModeSwitch /> */}
      {!user && !isInitializing ? (
        <>
          <LoginModal setMusicQuery={setMusicQuery} musicQuery={musicQuery} />
          <SignUpModal setMusicQuery={setMusicQuery} musicQuery={musicQuery} />
        </>
      ) : (
        <>
          <Text whiteSpace={"nowrap"} textOverflow={"ellipsis"} maxWidth={"300px"}>
            {`${user?.nickname}님`}
          </Text>
          <Button colorScheme="blue" mr={3} onClick={handleLogout}>
            로그아웃
          </Button>
        </>
      )}
    </HStack>
  );
};

export default NavBar;
