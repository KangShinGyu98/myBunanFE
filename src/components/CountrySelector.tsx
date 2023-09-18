import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
// import { Platform } from "../hooks/useGames";
// import usePlatforms from "../hooks/usePlatforms";
import useCountries, { Country } from "../hooks/useCountries";

interface Props {
  onSelectCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const CountrySelector = ({ onSelectCountry, selectedCountry }: Props) => {
  const { data, error } = useCountries();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedCountry?.name || "국가별"}
      </MenuButton>
      <MenuList>
        {data.map((country) => (
          <MenuItem onClick={() => onSelectCountry(country)} key={country.id}>
            {country.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CountrySelector;
