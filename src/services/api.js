import axios from "axios";

export const getPosts = async (query) => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
