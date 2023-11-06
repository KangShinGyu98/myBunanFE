import countries from "../data/countries";

export interface Country {
  id: number;
  name: string;
  image_background: string;
}

const useCountries = () => ({ data: countries, isLoading: false, error: null });

export default useCountries;
