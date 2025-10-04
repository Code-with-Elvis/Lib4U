import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { Button } from "../ui/button";

const Pagination = ({ pages = 4 }) => {
  const pageCount = pages;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  // Get the current page from the URL or default to 1
  const searchParams = new URLSearchParams(search);
  const page = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (pageNumber) => {
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <Button
        key={pageNumber}
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(pageNumber)}
        className={`px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 `}
      >
        {pageNumber}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // First page button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // Ellipsis before current page
    if (page > 2) {
      pageButtons.push(
        <span className="px-3 py-2" key="dots-1">
          ...
        </span>
      );
    }

    // Current/active page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // Ellipsis after current page
    if (page < pageCount - 1) {
      pageButtons.push(
        <span
          className="px-3 py-2 max-[600px]:px-2 items-center  "
          key="dots-2"
        >
          ...
        </span>
      );
    }

    // Last page button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-5 flex justify-end max-[600px]:justify-center">
      <div className="inline-flex items-center  space-x-2 max-[600px]:text-xs">
        {/* Previous page button */}
        <button
          className="px-3 py-2 text-lg text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          <IoChevronBackSharp />
        </button>

        {/* Page buttons */}
        {renderPageButtons()}

        {/* Next page button */}
        <button
          className="px-3 py-2 text-lg text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          <IoChevronForwardSharp />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
