import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DeleteCommentBtn = ({ commentId }) => {
  const queryClient = useQueryClient();
  const { bookId } = useParams();

  // === DELETE COMMENT
  const { mutate: deleteComment, isPending: deleting } = useMutation({
    mutationFn: async (commentId) => {
      await deleteDoc(doc(db, "comments", commentId));
    },
    onSuccess: () => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries(["comments", bookId]);
    },
    onError: (err) => toast.error(err.message || "Failed to delete comment"),
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => deleteComment(commentId)}
      disabled={deleting}
      className="text-xs text-red-500 mt-1"
    >
      {deleting ? "..." : "Delete"}
    </Button>
  );
};
export default DeleteCommentBtn;
