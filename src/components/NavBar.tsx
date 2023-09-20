import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { MusicQuery } from "../App";

interface Props {
  onSearch: (searchText: string) => void;
  setMusicQueryEmpty: () => void;
}

const NavBar = ({ onSearch, setMusicQueryEmpty }: Props) => {
  return (
    <HStack padding="10px">
      <Link to="/">
        <Image src={logo} boxSize="60px" onClick={setMusicQueryEmpty} />
      </Link>
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
