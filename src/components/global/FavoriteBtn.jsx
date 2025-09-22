import FavoriteIcon from "@/icons/FavoriteIcon";
import { Button } from "../ui/button";

const FavoriteBtn = ({ id }) => {
  const isFavorite = false; // Placeholder for favorite state
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Favorite button clicked");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute top-4 right-4 z-10"
      onClick={handleClick}
    >
      <FavoriteIcon
        className={`size-5 ${
          isFavorite ? "fill-yellow-500 text-yellow-500" : ""
        }`}
      />
    </Button>
  );
};
export default FavoriteBtn;
