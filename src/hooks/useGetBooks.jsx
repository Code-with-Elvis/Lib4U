import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetBooks = (queryKey, q, startIndex, maxResults) => {
  const { data, error, isPending } = useQuery({
    queryKey: [queryKey, q],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      return response.data;
    },
  });

  return { data, error, isPending };
};

export default useGetBooks;
