import { Image } from "@chakra-ui/react";
import canada from "../assets/countries/canada.svg";
import usa from "../assets/countries/usa.svg";
import uk from "../assets/countries/uk.svg";
// 나머지 국가들의 SVG도 이와 같이 import

const CountryIcons = {
  1: { name: "Canada", icon: canada },
  2: { name: "USA", icon: usa },
  3: { name: "UK", icon: uk },
  // 나머지 국가들...
};

export default CountryIcons;
