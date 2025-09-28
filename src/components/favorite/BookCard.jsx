import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import FavoriteBtn from "./FavoriteBtn";

const BookCard = ({ bookImage, id, bookId, bookTitle }) => {
  return (
    <Link to={`/book/${bookId}`} className="block">
      <Card className="rounded-sm shadow-none pt-0  overflow-clip hover:shadow-sm h-full">
        <CardHeader className="px-0">
          <div className="h-auto sm:h-54 overflow-hidden mb-4 relative">
            <FavoriteBtn id={id} />
            <img src={bookImage} alt={bookTitle} className="w-full" />
          </div>
          <CardTitle className="px-3 text-sm sm:text-base">
            {bookTitle}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BookCard;
