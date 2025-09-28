import FavoriteBtn from "@/components/global/FavoriteBtn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import useGetBook from "@/hooks/useGetBook";
import { formatDate } from "@/lib/format";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const [seeMore, setSeeMore] = useState(false);

  const { data, error, isPending } = useGetBook("book", bookId);

  if (isPending)
    return (
      <section>
        <div className="lib-container">Loading...</div>
      </section>
    );
  if (error)
    return (
      <section>
        <div className="lib-container pt-18 pb-10 text-center text-red-500">
          Error: {error.message}
        </div>
      </section>
    );

  if (!data) return <Navigate to="/search?q=book" replace />;

  const { volumeInfo, id } = data;

  const description = volumeInfo?.description || "";

  // Truncate description
  const truncated =
    description.split(" ").slice(0, 40).join(" ") +
    (description.split(" ").length > 40 ? "..." : "");

  return (
    <section>
      <div className="lib-container py-10 grid grid-cols-[1.5fr_2fr] max-[740px]:grid-cols-1 gap-6">
        <article className="">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/search?q=book">Books</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative max-[740px]:w-[50%] max-[520px]:w-full mx-auto">
            <img
              src={
                volumeInfo?.imageLinks?.thumbnail ||
                "https://via.placeholder.com/128x195?text=No+Image"
              }
              alt={volumeInfo?.title}
              className="w-full h-auto mt-4"
            />
            <FavoriteBtn book={{ id, ...volumeInfo }} />
          </div>
        </article>
        <article className="blog-info pt-14 max-[740px]:pt-0">
          <h4 className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold">Published Date:</span>{" "}
            <span className="text-yellow-500 font-semibold">
              {volumeInfo?.publishedDate
                ? formatDate(volumeInfo?.publishedDate)
                : "Unknown"}
            </span>
          </h4>
          <h2 className="text-2xl font-semibold mb-4">{volumeInfo?.title}</h2>
          <div>
            <h4 className="font-bold mb-1">Authors:</h4>
            <ul className="list-disc list-inside mb-4">
              {volumeInfo?.authors?.map((author) => (
                <li key={author} className="text-muted-foreground">
                  {author}
                </li>
              ))}
            </ul>

            {volumeInfo?.categories && (
              <h4 className="font-bold mb-1">Categories:</h4>
            )}
            <ul className="list-disc list-inside mb-4">
              {volumeInfo?.categories?.map((category) => (
                <li key={category} className="text-muted-foreground">
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="my-6 overflow-x-auto">
            <table className="table w-full border-1 border-border">
              <thead>
                <tr className="border-1 border-border">
                  <th
                    className="border-1 border-border text-start py-1 px-2"
                    colSpan={3}
                  >
                    Dimensions
                  </th>
                  <th className="border-1 border-border py-1 px-2">
                    Page Count
                  </th>
                  <th className="border-1 border-border py-1 px-2">
                    Publisher
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-1 border-border">
                  <td className="border-1 border-border py-1 px-2">Width</td>
                  <td className="border-1 border-border py-1 px-2">Height</td>
                  <td className="border-1 border-border py-1 px-2">
                    Thickness
                  </td>
                  <td className="border-1 border-border py-1 px-2"></td>
                  <td className="border-1 border-border py-1 px-2"></td>
                </tr>
                <tr>
                  <td className="border-1 border-border py-1 px-2">
                    {volumeInfo?.dimensions?.width || "N/A"}
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    {volumeInfo?.dimensions?.height || "N/A"}
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    {volumeInfo?.dimensions?.thickness || "N/A"}
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    {volumeInfo?.pageCount || "N/A"}
                  </td>
                  <td className="border-1 border-border py-1 px-2">
                    {volumeInfo?.publisher || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {description.split(" ").length > 40 && (
            <h4 className="font-bold mb-1">Description:</h4>
          )}
          <p
            className="text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: seeMore ? description : truncated,
            }}
          />
          {description.split(" ").length > 40 && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setSeeMore(!seeMore)}
            >
              {seeMore ? "See Less" : "See More"}
            </Button>
          )}
        </article>
      </div>
    </section>
  );
};

export default BookDetails;
