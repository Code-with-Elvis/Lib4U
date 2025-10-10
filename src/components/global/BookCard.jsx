import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BookCard = ({ volumeInfo, id }) => {
  return (
    <Link to={`/book/${id}`} className="block break-inside-avoid mb-4 sm:mb-0">
      <Card className="rounded-sm shadow-none pt-0  overflow-clip hover:shadow-sm h-full">
        <CardHeader className="px-0">
          <div className="h-auto sm:h-54 overflow-hidden mb-4">
            <img
              src={volumeInfo.imageLinks?.thumbnail}
              alt={volumeInfo.title}
              className="w-full"
            />
          </div>
          <CardTitle className="px-3 text-sm sm:text-base">
            {volumeInfo.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BookCard;
