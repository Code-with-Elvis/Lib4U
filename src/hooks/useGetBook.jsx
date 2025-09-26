import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetBook = (queryKey, q) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const { data, error, isPending } = useQuery({
    queryKey: [queryKey, q],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${q}?key=${API_KEY}`
      );
      return response.data;
    },
  });

  return { data, error, isPending };
};

export default useGetBook;
