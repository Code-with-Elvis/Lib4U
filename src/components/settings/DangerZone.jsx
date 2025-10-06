import { Shield, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAuth } from "@/store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { auth, db } from "@/firebase";
import {
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "sonner";

const DangerZone = () => {
  const [password, setPassword] = useState("");

  const user = useAuth((state) => state.user);
  const navigate = useNavigate();

  const currentUser = auth.currentUser;
  const providerId = currentUser?.providerData[0]?.providerId;

  // === Mutation for account deletion
  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("You must be logged in");

      // === Step 1: Reauthenticate user
      if (providerId === "password") {
        if (!password.trim())
          throw new Error("Password required for reauthentication");
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await reauthenticateWithCredential(currentUser, credential);
      } else if (providerId === "google.com") {
        if (password.trim().toUpperCase() !== "DELETE") {
          throw new Error('Type "DELETE" to confirm account deletion.');
        }
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(currentUser, provider);
      }

      // === Step 2: Delete related data
      const deleteCollection = async (collectionName, field) => {
        const q = query(
          collection(db, collectionName),
          where(field, "==", user.uid)
        );
        const snap = await getDocs(q);
        const deletions = snap.docs.map((d) =>
          deleteDoc(doc(db, collectionName, d.id))
        );
        await Promise.all(deletions);
      };

      await Promise.all([
        deleteCollection("favorites", "userUid"),
        deleteCollection("comments", "userId"),
        deleteDoc(doc(db, "profiles", user.uid)),
      ]);

      // === Step 3: Delete account itself
      await deleteUser(currentUser);
    },
    onSuccess: () => {
      toast.success("Your account and all data have been deleted.");
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      if (err.code === "auth/wrong-password")
        toast.error("Incorrect password. Please try again.");
      else if (err.code === "auth/requires-recent-login")
        toast.error("Please reauthenticate to continue.");
      else toast.error(err.message || "Failed to delete account.");
    },
  });

  const handleDelete = () => {
    deleteAccount();
  };

  return (
    <Card className="border-red-200 shadow-none rounded-lg mb-5">
      <CardHeader>
        <CardTitle className="flex items-center text-red-600">
          <Shield className="mr-2 h-5 w-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 ">
          <div className="flex items-center space-x-3">
            <Trash2 className="h-5 w-5 shrink-0 text-red-500  max-[500px]:hidden" />
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={!user || isPending}
                className="dark:bg-red-500 hover:opacity-80"
              >
                {isPending ? "Deleting..." : "Delete Account"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete your account and all
                  associated data including:
                  <br />• All your favorite blogs
                  <br />• Your profile information
                  <br />• All account settings
                  <br />
                  <br />
                  This action cannot be undone. Are you absolutely sure?
                </AlertDialogDescription>
                <div className="mb-2">
                  <Label htmlFor="password" className="text-sm ml-1 mb-1">
                    {providerId === "google.com"
                      ? 'Type "DELETE" to confirm'
                      : "Password"}
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password to confirm"
                    className="border-neutral-300 py-5"
                  />
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isPending ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
export default DangerZone;
