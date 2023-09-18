import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "0ea278a0733040e58a1d61fbdbc0ce31",
  },
});
