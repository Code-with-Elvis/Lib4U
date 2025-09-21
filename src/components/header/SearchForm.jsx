import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const SearchForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Extract the search term from URL on page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";
    setSearchTerm(query);
  }, [location.search]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const params = new URLSearchParams(); // Create a fresh set of search parameters
      params.set("q", searchTerm); // Add only the search term to the URL
      navigate(`/search?${params.toString()}`); // Apply new search params to URL
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-[340px] max-[840px]:w-[280px] max-[640px]:hidden"
    >
      <RiSearchLine className="absolute text-xl -translate-y-1/2 pointer-events-none top-1/2 left-4 text-neutral-500 dark:text-neutral-300" />
      <input
        type="text"
        placeholder="Search by title, author, or keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-8 px-4 pl-12  text-sm rounded-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-yellow-500 border-border border-1"
      />
    </form>
  );
};
export default SearchForm;
