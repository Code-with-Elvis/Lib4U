import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useGetSearchedBooks = (queryKey) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract params
  const page = parseInt(searchParams.get("page")) || 1;
  const q = searchParams.get("q") || "books"; // default query if empty

  // Pagination settings
  const maxResults = 10;
  const startIndex = (page - 1) * maxResults;

  const { data, error, isPending } = useQuery({
    queryKey: [queryKey, page, q],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      return response.data;
    },
  });

  return { data, error, isPending };
};

export default useGetSearchedBooks;
