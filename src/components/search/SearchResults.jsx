import useGetSearchedBooks from "@/hooks/useGetSearchedBooks";
import Pagination from "../global/Pagination";
import { Button } from "../ui/button";
import BookCard from "../global/BookCard";

const SearchResults = () => {
  const { data, error, isPending } = useGetSearchedBooks("searched-books");

  if (isPending) return <p>Loading...</p>;
  if (error)
    return (
      <div className="px-4 text-center mt-20 pb-10">
        <p className="mb-5 text-center text-red-500">
          Error loading books. Please try again later.
        </p>
        <Button
          className="bg-blue-500 font-medium"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );

  const books = data?.items || [];
  const totalItems = data?.totalItems || 0;
  const pages = Math.ceil(totalItems / 10); // since maxResults=10

  // handle case where page number is too high
  if (books.length === 0) {
    return (
      <div className="text-center mt-10 pb-10">
        <h2 className="text-lg font-semibold mb-4">No results found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or going back to an earlier page.
        </p>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <h2 className=" font-semibold mb-4">
        Results ({totalItems.toLocaleString()})
      </h2>
      <div className="columns-2  sm:grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      <Pagination pages={pages} />
    </div>
  );
};

export default SearchResults;
