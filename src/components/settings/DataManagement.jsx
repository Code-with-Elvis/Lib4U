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
import { Database, Trash2 } from "lucide-react";
import { useAuth } from "@/store";
import { auth, db } from "@/firebase";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const DataManagement = () => {
  const [password, setPassword] = useState("");
  const storeUser = useAuth((state) => state.user);
  const user = auth.currentUser;
  //=== Check provider type
  const providerId = user.providerData[0]?.providerId;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No authenticated user found.");

      //=== If signed in with email/password, reauthenticate
      if (providerId === "password") {
        if (!password.trim())
          throw new Error("Password is required to confirm deletion.");

        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }

      //=== If signed in with Google, reauthenticate
      else if (providerId === "google.com") {
        if (password.trim().toUpperCase() !== "DELETE") {
          throw new Error('Type "DELETE" to confirm account deletion.');
        }
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      }

      //=== Delete favorites and comments belonging to this user
      const collectionsToDelete = ["favorites", "comments"];

      for (const collectionName of collectionsToDelete) {
        const q = query(
          collection(db, collectionName),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        const deletions = snapshot.docs.map((docItem) =>
          deleteDoc(doc(db, collectionName, docItem.id))
        );
        await Promise.all(deletions);
      }

      return true;
    },

    onSuccess: () => {
      toast.success("Your data has been successfully deleted.");
      setPassword("");
    },

    onError: (error) => {
      console.error(error);
      const msg =
        error.code === "auth/wrong-password"
          ? "Incorrect password. Please try again."
          : error.message.includes("Password is required")
          ? error.message
          : "Failed to delete data. Please try again.";
      toast.error(msg);
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <Card className="shadow-none rounded-lg mb-5">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 size-5" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Trash2 className="h-5 w-5 shrink-0 text-orange-500  max-[500px]:hidden" />
            <div>
              <h3 className="font-medium">Clear All Saved Data</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Remove all your saved your saved data (this cannot be undone)
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
                disabled={!storeUser || isPending}
              >
                {isPending ? "Clearing..." : "Clear Data"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Data</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete all your saved data. This
                  cannot be undone. Are you sure you want to continue?
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
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isPending ? "Clearing..." : "Clear All Data"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
export default DataManagement;
