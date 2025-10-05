import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { BsSend } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";
import { useAccountModal, useAuth } from "@/store";
import { Loader } from "lucide-react";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Filter } from "bad-words";

//=== Simple optional profanity filter
const filterProfanity = (text) => {
  const banned = ["stupid", "damn", "hell", "crap", "darn", "bloody"];
  return banned.some((word) => text.toLowerCase().includes(word));
};

const filter = new Filter({ placeHolder: "x" });
const newBadWords = ["stupid", "damn", "hell", "crap", "darn", "bloody"];
filter.addWords(...newBadWords);

const PostCommentForm = ({ bookId }) => {
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user);
  const open = useAccountModal((s) => s.open);
  const navigate = useNavigate();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async (newComment) => {
      //=== Check if user already commented
      const q = query(
        collection(db, "comments"),
        where("bookId", "==", newComment.bookId),
        where("userId", "==", newComment.userId)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        throw new Error("User has already commented on this book");
      }

      await addDoc(collection(db, "comments"), {
        ...newComment,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      setCommentText("");
      toast.success("Comment added 🎉");
      queryClient.invalidateQueries(["comments", bookId]);
    },
    onError: (err) => {
      if (err.message.includes("already commented")) {
        toast.error("You have already commented on this book");
      } else {
        console.error(err);
        toast.error("Failed to add comment. Please try again.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("?form=login");
      open();
      return;
    }

    if (!commentText.trim()) return toast.error("Comment cannot be empty");
    if (filterProfanity(commentText))
      return toast.error("Watch your language 😅");

    addComment({
      comment: filter.clean(commentText.trim()),
      bookId,
      userId: user.uid,
      userName: user.name,
      userEmail: user.email,
      userImg: user?.img_url || "",
    });
  };

  return (
    <form className="flex items-end gap-2 max-w-2xl" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Add a comment..."
        value={commentText}
        maxLength={500}
        onChange={(e) => setCommentText(e.target.value)}
        className="resize-none overflow-y-auto border-neutral-400 min-h-[40px] max-h-[100px] w-full text-sm px-5 rounded-sm"
        onInput={(e) => {
          const target = e.currentTarget;
          target.style.height = "auto";
          const newHeight = Math.min(target.scrollHeight, 100);
          target.style.height = `${newHeight}px`;
          target.style.overflowY =
            target.scrollHeight > 100 ? "auto" : "hidden";
        }}
      />
      <Button
        type="submit"
        className="bg-yellow-500 h-10"
        disabled={isPending || !commentText.trim()}
      >
        {isPending ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          <BsSend className="size-5" />
        )}
      </Button>
    </form>
  );
};

export default PostCommentForm;
