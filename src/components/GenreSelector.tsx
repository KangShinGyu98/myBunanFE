import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useCountries, { Country } from "../hooks/useCountries";
import useGenres, { Genre } from "../hooks/useGenres";
import { useEffect } from "react";

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreSelector = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, error } = useGenres();
  useEffect(() => {
    console.log("selectedGenre : ", selectedGenre);
  }, [selectedGenre]);
  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenre?.name || "장르별"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectGenre(null)} key={0}>
          모든 장르
        </MenuItem>
        {data.map((genre) => (
          <MenuItem onClick={() => onSelectGenre(genre)} key={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenreSelector;
