import { LogOut, SettingsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/store";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";

const AccountActions = () => {
  const logout = useAuth((state) => state.logout);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      logout(); // === Clear user state after logout
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
      console.error("Error logging out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-none rounded-md mb-5">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SettingsIcon className="mr-2 h-5 w-5" />
          Account Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <LogOut className="h-5 w-5 text-gray-500 dark:text-neutral-400 shrink-0" />
            <div>
              <h3 className="font-medium">Sign Out</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Sign out of your account
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            {loading ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountActions;
