import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { commonQueryParams } from "@/lib/data";
import { PiArticle } from "react-icons/pi";

const SearchBtn = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
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
      setSheetOpen(false); // ✅ Close the sheet after submission
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden max-[640px]:inline-flex w-8"
        >
          <RiSearchLine />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="sr-only hidden">
            Search Form
          </SheetDescription>
        </SheetHeader>

        <div className="px-8 max-[800px]:px-5 max-[600px]:px-3.5 pb-8">
          <form onSubmit={handleSubmit} className="relative w-full">
            <RiSearchLine className="absolute text-xl -translate-y-1/2 pointer-events-none top-1/2 left-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 px-4 pl-12 text-sm rounded-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-yellow-500 border-neutral-400 border-1"
            />
          </form>
          <nav className="mt-6 common-query">
            {commonQueryParams.map(({ id, label, url }) => (
              <Button
                variant="ghost"
                size="sm"
                key={id}
                className="w-full justify-start gap-3 mb-2"
                asChild
              >
                <Link to={url} onClick={() => setSheetOpen(false)}>
                  <PiArticle className="size-5" />{" "}
                  <span className="text-sm">{label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default SearchBtn;
