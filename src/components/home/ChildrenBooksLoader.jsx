import AsideBookCardLoader from "../global/AsideBookCardLoader";
import HomeTitle from "./HomeTitle";

const ChildrenBooksLoader = () => {
  return (
    <section className="mb-10">
      <HomeTitle title="Children's Books" />
      <div className="grid grid-cols-1 gap-4">
        {[...Array(4)].map((_, index) => (
          <AsideBookCardLoader key={index} />
        ))}
      </div>
    </section>
  );
};
export default ChildrenBooksLoader;
