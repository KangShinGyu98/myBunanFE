import { Heading } from "@chakra-ui/react";
import { MusicQuery } from "../pages/MainPage";

interface Props {
  musicQuery: MusicQuery;
}

const MusicHeading = ({ musicQuery }: Props) => {
  const heading = `${musicQuery.country?.name || ""} ${musicQuery.genre?.name || ""} Musics`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default MusicHeading;
