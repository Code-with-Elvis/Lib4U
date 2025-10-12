import useGetBooks from "@/hooks/useGetBooks";
import HomeTitle from "./HomeTitle";
import AsideBookCard from "../global/AsideBookCard";
import ChildrenBooksLoader from "./ChildrenBooksLoader";

const ChildrenBooks = () => {
  const { data, error, isPending } = useGetBooks(
    "children-books",
    "children",
    0,
    20
  );

  if (isPending) return <ChildrenBooksLoader />;
  if (error)
    return (
      <section className="mb-10">
        <HomeTitle title="Children's Books" />
        <p className="text-red-500">Error loading books</p>
      </section>
    );

  const randomBooks = data?.items
    ? [...data.items].sort(() => 0.5 - Math.random()).slice(0, 4)
    : [];
  return (
    <section className="mb-10">
      <HomeTitle title="Children's Books" />
      <div className="grid grid-cols-1 gap-4">
        {randomBooks.map((book) => (
          <AsideBookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default ChildrenBooks;
