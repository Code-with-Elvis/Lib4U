import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import FavoriteIcon from "@/icons/FavoriteIcon";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAuth, useAccountModal } from "@/store";
import { useNavigate } from "react-router-dom";

const FavoriteBtn = ({ id }) => {
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();
  const open = useAccountModal((state) => state.open);

  // === REMOVE FAVORITE
  const { isPending, mutate: removeFavorite } = useMutation({
    mutationFn: async () => {
      await deleteDoc(doc(db, "favorites", id));
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      queryClient.invalidateQueries(["favorites", user?.uid]);
    },
    onError: (err) => toast.error(err.message || "Failed to remove"),
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("?form=login");
      open();
      return;
    }
    removeFavorite();
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="absolute w-8 top-2 right-2 z-10"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="animate-spin size-4" />
      ) : (
        <FavoriteIcon className="size-5 fill-yellow-500 text-yellow-500" />
      )}
    </Button>
  );
};

export default FavoriteBtn;
