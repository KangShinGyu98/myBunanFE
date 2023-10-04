import axios from "axios";

const useVideoId = async (id: number): Promise<string> => {
  try {
    const response = await axios.get<string>(`/videoId/${id}`);
    const videoId = response.data;
    return videoId;
  } catch (error) {
    throw error; // 에러 처리를 위해 예외를 다시 던집니다.
  }
};

export default useVideoId;
