import { Button, HStack, Image, useToast, Text, Box } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  onSearch: (searchText: string) => void;
  setMusicQueryEmpty: () => void;
}

const NavBar = ({ onSearch, setMusicQueryEmpty }: Props) => {
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
        <Image src={"https://bunan-image-bucket.s3.ap-northeast-2.amazonaws.com/etc/logo_black.png"} width={"100%"} onClick={setMusicQueryEmpty} />
      </Link>
      <SearchInput onSearch={onSearch} />
      {/* <ColorModeSwitch /> */}
      {!user && !isInitializing ? (
        <>
          <LoginModal />
          <SignUpModal />
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
