import { formatDate } from "@/lib/format";
import { Link } from "react-router-dom";

const AsideBookCard = ({ volumeInfo, id }) => {
  return (
    <Link to={`/book/${id}`} className="flex gap-4">
      <img
        src={volumeInfo?.imageLinks?.thumbnail}
        alt={volumeInfo?.title}
        className="w-24 h-20 max-[1024px]:h-32 max-[1024px]:w-28 shrink-0 object-cover"
      />
      <div>
        <h4 className="font-semibold line-clamp-4">{volumeInfo?.title}</h4>
        <small className="font-medium text-muted-foreground">
          {formatDate(volumeInfo?.publishedDate)}
        </small>
      </div>
    </Link>
  );
};

export default AsideBookCard;
