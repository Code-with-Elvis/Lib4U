import BlogCardLoader from "../global/BlogCardLoader";

const SearchResultsLoader = () => {
  return (
    <div>
      <div className="skeleton h-4 w-40 sm:w-60 mb-4"></div>
      <div className="columns-2  sm:grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <BlogCardLoader key={index} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <div className="skeleton h-8 w-44 rounded-sm"></div>
      </div>
    </div>
  );
};
export default SearchResultsLoader;
