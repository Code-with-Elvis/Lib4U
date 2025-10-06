import { auth, db, googleProvider } from "@/firebase";
import { useAccountModal, useAuth } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const GoogleAuthButton = () => {
  const close = useAccountModal((state) => state.close);
  const login = useAuth((state) => state.login);

  // ✅ Login with Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "profiles", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If user doesn't exist, create a new document
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        img_url: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }

    const userData = (await getDoc(userRef)).data();

    return {
      uid: user.uid,
      name: userData.name || user.displayName,
      email: user.email,
      img_url: userData.img_url || user.photoURL,
      createdAt: userData.createdAt || new Date().toISOString(),
    };
  };

  const { mutate: googleLogin, isPending } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      toast.success("Login successful.");
      login({
        email: data.email,
        name: data.name || "No Name",
        img_url: data.img_url,
        uid: data.uid,
        createdAt: data.createdAt,
      });
      close();
    },
    onError: (error) => {
      if (error.code === "auth/cancelled-popup-request") {
        toast.error("Google auth cancelled");
      } else {
        toast.error(error?.message || "Failed to login");
      }
    },
  });

  return (
    <button
      type="button"
      aria-label="Continue with Google"
      onClick={() => googleLogin()}
      disabled={isPending}
      className="w-full text-sm font-semibold text-neutral-600 border-[#dadce0] border-1 mt-3 py-2 px-4 bg-white rounded-full flex items-center justify-center gap-2 hover:bg-neutral-100 transition duration-200 disabled:opacity-80 disabled:cursor-not-allowed"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
};
export default GoogleAuthButton;
