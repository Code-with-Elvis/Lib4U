import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";

const Search = () => {
  return (
    <section>
      <div className="lib-container py-10">
        <SearchForm />
        <SearchResults />
      </div>
    </section>
  );
};

export default Search;
