import useGetBooks from "@/hooks/useGetBooks";
import HomeTitle from "./HomeTitle";
import BookCard from "../global/BookCard";

const NewReleases = () => {
  const { data, error, isPending } = useGetBooks("books", "books", 0, 40);

  if (isPending)
    return (
      <section>
        <HomeTitle title="New Releases" />
        <p>Loading...</p>
      </section>
    );
  if (error)
    return (
      <section>
        <HomeTitle title="New Releases" />
        <p className="text-red-500">Error fetching new releases.</p>
      </section>
    );

  const randomBooks = data?.items
    ? [...data.items].sort(() => 0.5 - Math.random()).slice(0, 12)
    : [];

  return (
    <section>
      <HomeTitle title="New Releases" />

      <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {randomBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
