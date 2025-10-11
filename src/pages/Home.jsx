import Categories from "@/components/home/Categories";
import ChildrenBooks from "@/components/home/ChildrenBooks";
import FollowUs from "@/components/home/FollowUs";
import GoTopBtn from "@/components/home/GoTopBtn";
import Landing from "@/components/home/Landing";
import NewReleases from "@/components/home/NewReleases";

const Home = () => {
  return (
    <>
      <GoTopBtn />
      <Landing />
      <div className="lib-container items-start grid max-[1024px]:grid-cols-1 grid-cols-[3fr_1.5fr] gap-10 gap-y-12 my-10">
        {/*=== Left Column ===*/}
        <div className="">
          <NewReleases />
        </div>
        {/*=== Right Column ===*/}
        <div className="">
          <FollowUs />
          <ChildrenBooks />
          <Categories />
        </div>
      </div>
    </>
  );
};

export default Home;
