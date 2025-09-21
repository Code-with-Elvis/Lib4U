import { topCategories } from "@/lib/data";
import HomeTitle from "./HomeTitle";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section>
      <HomeTitle title="Top Categories" />
      <div className="flex flex-wrap gap-2">
        {topCategories.map(({ id, label, url }) => (
          <Button key={id} variant="outline" asChild>
            <Link to={url}>{label}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
