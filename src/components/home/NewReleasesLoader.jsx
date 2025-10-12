import BlogCardLoader from "../global/BlogCardLoader";
import HomeTitle from "./HomeTitle";

const NewReleasesLoader = () => {
  return (
    <section>
      <HomeTitle title="New Releases" />
      <div className="columns-2  sm:grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <BlogCardLoader key={index} />
        ))}
      </div>
    </section>
  );
};
export default NewReleasesLoader;
