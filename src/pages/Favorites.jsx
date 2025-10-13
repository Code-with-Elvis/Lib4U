import SortDropdown from "@/components/favorite/SortDropdown";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/store";
import BookCard from "@/components/favorite/BookCard";
import BlogCardLoader from "@/components/favorite/BlogCardLoader";

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const user = useAuth((state) => state.user);

  // FETCH FAVORITES FROM FIREBASE
  const fetchFavorites = async () => {
    if (!user) return [];
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const {
    data: favorites = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: fetchFavorites,
    enabled: !!user,
  });

  // FILTER + SORT
  let filteredFavorites = favorites;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredFavorites = filteredFavorites.filter(
      (fav) =>
        fav.bookTitle?.toLowerCase().includes(term) ||
        fav.bookAuthor?.toLowerCase().includes(term)
    );
  }

  if (sortby === "most-recent") {
    filteredFavorites = [...filteredFavorites].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortby === "oldest") {
    filteredFavorites = [...filteredFavorites].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="lib-container py-10">
        <h1 className="text-2xl font-bold mb-2">Favorites</h1>

        {/* === Search + Sort === */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="relative w-full sm:w-sm">
            <RiSearchLine className="absolute text-xl -translate-y-1/2 pointer-events-none top-1/2 left-4 text-neutral-500 dark:text-neutral-300" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 px-4 pl-12 text-sm rounded-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-yellow-500 border-border border-1 dark:border-neutral-700"
            />
          </form>
          <SortDropdown />
        </div>

        {isPending ? (
          <div className="h-4 mt-6 mb-2 w-1/3 skeleton"></div>
        ) : (
          filteredFavorites.length > 0 && (
            <h2 className="mt-4 font-semibold mb-4">
              Results: {filteredFavorites.length}
            </h2>
          )
        )}

        {/* === Results === */}
        {isPending ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <BlogCardLoader key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 dark:text-red-400 font-medium">
              Failed to load favorites.{" "}
              {error.message || "Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Retry
            </button>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-300">
            No favorites found.
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFavorites.map((fav) => (
              <BookCard key={fav.id} {...fav} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
