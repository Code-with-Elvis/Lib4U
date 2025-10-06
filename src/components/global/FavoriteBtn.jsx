import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";
import FavoriteIcon from "@/icons/FavoriteIcon";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAccountModal, useAuth } from "@/store";
import { useNavigate } from "react-router-dom";

const FavoriteBtn = ({ book }) => {
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();
  const open = useAccountModal((state) => state.open);

  // === CHECK IF BOOK IS ALREADY FAVORITED
  const { data: favoriteDoc, isLoading } = useQuery({
    queryKey: ["favorite", user?.uid, book.id],
    queryFn: async () => {
      if (!user) return null;
      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid),
        where("bookId", "==", book.id)
      );
      const snap = await getDocs(q);
      if (snap.empty) return null;
      return { id: snap.docs[0].id, ...snap.docs[0].data() };
    },
    enabled: !!user,
  });

  //=== ADD FAVORITE
  const addFavorite = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not logged in");
      return await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        bookId: book.id,
        bookTitle: book.title,
        bookImage: book.imageLinks?.thumbnail,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      toast.success("Added to favorites");
      queryClient.invalidateQueries(["favorite", user?.uid, book.id]);
    },
    onError: (err) => toast.error(err.message || "Failed to favorite"),
  });

  //=== REEMOVE FAVORITE
  const removeFavorite = useMutation({
    mutationFn: async (docId) => {
      await deleteDoc(doc(db, "favorites", docId));
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      queryClient.invalidateQueries(["favorite", user?.uid, book.id]);
    },
    onError: (err) => toast.error(err.message || "Failed to remove"),
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("?form=login");
      open();
      return;
    }
    if (favoriteDoc) {
      removeFavorite.mutate(favoriteDoc.id);
    } else {
      addFavorite.mutate();
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute top-4 right-4 z-10"
      onClick={toggleFavorite}
      disabled={isLoading || addFavorite.isPending || removeFavorite.isPending}
    >
      {isLoading || addFavorite.isPending || removeFavorite.isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <FavoriteIcon
          className={`size-5 ${
            favoriteDoc ? "fill-yellow-500 text-yellow-500" : ""
          }`}
        />
      )}
    </Button>
  );
};

export default FavoriteBtn;
