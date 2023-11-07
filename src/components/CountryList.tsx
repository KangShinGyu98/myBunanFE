import { Button, Heading, HStack, Icon, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useCountries, { Country } from "../hooks/useCountries";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

interface Props {
  onSelectCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const CountryList = ({ selectedCountry, onSelectCountry }: Props) => {
  const { data, isLoading, error } = useCountries();
  const [isFolded, setIsFolded] = useState(true);

  const handleFold = () => {
    setIsFolded(!isFolded);
  };

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        국가별
      </Heading>

      <List>
        {data
          .slice(0, isFolded ? 5 : data.length) // folded가 true일 때는 상위 4개만, 아니면 전체 데이터를 사용
          .map((country) => (
            <ListItem key={country.id} paddingY="7px">
              <HStack onClick={() => onSelectCountry(country)} cursor={"pointer"}>
                <Image boxSize="32px" borderRadius={8} objectFit="cover" src={country.image_background} />

                <Button
                  whiteSpace="normal"
                  textAlign="left"
                  fontWeight={country.id === selectedCountry?.id ? "bold" : "normal"}
                  fontSize="lg"
                  variant="link"
                >
                  {country.name}
                </Button>
              </HStack>
            </ListItem>
          ))}
        <ListItem paddingY="7px">
          <HStack onClick={() => handleFold()}>
            <Icon as={isFolded ? MdExpandMore : MdExpandLess} boxSize="32px" borderRadius={8} objectFit="cover" />
            <Button whiteSpace="normal" textAlign="left" fontSize="lg" variant="link">
              {isFolded ? "더보기" : "접기"}
            </Button>
          </HStack>
        </ListItem>
      </List>
    </>
  );
};

export default CountryList;
