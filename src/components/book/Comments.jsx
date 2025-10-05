import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/store";
import PostCommentForm from "./PostCommentForm";
import { getInitials } from "@/lib/format";
import DeleteCommentBtn from "./DeleteCommentBtn";

const Comments = ({ bookId }) => {
  const user = useAuth((state) => state.user);

  // === FETCH COMMENTS
  const { data: comments = [], isPending } = useQuery({
    queryKey: ["comments", bookId],
    queryFn: async () => {
      const q = query(
        collection(db, "comments"),
        where("bookId", "==", bookId)
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
  });

  return (
    <div className="lib-container pb-10 mt-8 pt-8 border-t-1 border-border">
      <h3 className="text-lg font-semibold mb-8">Comments</h3>

      {/* Comments List */}
      {isPending ? (
        <p className="text-muted-foreground mb-8">Loading comments...</p>
      ) : comments?.length === 0 ? (
        <p className="text-muted-foreground mb-8">No comments yet.</p>
      ) : (
        <ul className="space-y-4 mb-10">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3 items-start">
              <Avatar className="size-10 flex-shrink-0">
                <AvatarImage src={c?.userImg} className="object-cover" />
                <AvatarFallback>
                  {getInitials(c?.userName || "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{c.userName}</p>
                <p className="text-sm text-muted-foreground break-words">
                  {c.comment}
                </p>
                {user?.uid === c.userId && (
                  <DeleteCommentBtn commentId={c.id} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <PostCommentForm bookId={bookId} />
    </div>
  );
};

export default Comments;
