import { Button, Heading, HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import useCountries, { Country } from "../hooks/useCountries";

interface Props {
  onSelectCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

const CountryList = ({ selectedCountry, onSelectCountry }: Props) => {
  const { data, isLoading, error } = useCountries();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        국가별
      </Heading>
      <List>
        {data.map((country) => (
          <ListItem key={country.id} paddingY="5px">
            <HStack>
              <Image boxSize="32px" borderRadius={8} objectFit="cover" src={country.image_background} />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={country.id === selectedCountry?.id ? "bold" : "normal"}
                onClick={() => onSelectCountry(country)}
                fontSize="md"
                variant="link"
              >
                {country.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CountryList;
