import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetBook = (queryKey, q) => {
  const { data, error, isPending } = useQuery({
    queryKey: [queryKey, q],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${q}`
      );
      return response.data;
    },
  });

  return { data, error, isPending };
};

export default useGetBook;
