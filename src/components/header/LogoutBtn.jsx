import { BiLogOutCircle } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/store";
const LogoutBtn = () => {
  const logout = useAuth((state) => state.logout);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      logout(); // Clear user state after logout
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
      console.error("Error logging out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="px-2" onClick={handleLogout}>
      <Button
        className="w-full rounded-full text-yellow-500"
        variant="ghost"
        disabled={loading}
      >
        <BiLogOutCircle className="size-5" />
        <span className="font-semibold ">
          {loading ? "Logging out..." : "Log Out"}
        </span>
      </Button>
    </footer>
  );
};
export default LogoutBtn;
