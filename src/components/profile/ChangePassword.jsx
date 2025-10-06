import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "sonner";
import { useAuth } from "@/store";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Weak password"),
    confirmNewPassword: z.string().min(6, "This field is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"], // 👈 This tells Zod where to show the error
  });

const ChangePassword = () => {
  const storeUser = useAuth((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      if (!auth.currentUser) throw new Error("No authenticated user found.");

      const user = auth.currentUser;

      // 🔒 Ensure user logged in with email/password
      if (user.providerData[0]?.providerId !== "password") {
        throw new Error(
          "You signed in with Google. Password changes are managed via Google."
        );
      }

      const credential = EmailAuthProvider.credential(
        storeUser.email,
        currentPassword
      );

      // 🔁 Reauthenticate before updating password
      await reauthenticateWithCredential(user, credential);

      // 🔄 Update password
      await updatePassword(user, newPassword);

      return true;
    },

    onSuccess: () => {
      toast.success("Your password has been updated successfully!");
      reset();
    },

    onError: (error) => {
      console.error(error);
      const message =
        error.code === "auth/wrong-password"
          ? "Your current password is incorrect."
          : error.code === "auth/too-many-requests"
          ? "Too many attempts. Please try again later."
          : error.message.includes("signed in with Google")
          ? error.message
          : "Failed to update password. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="mr-2 size-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label htmlFor="current-password" className="text-sm ml-1 mb-1">
              Current Password
            </Label>
            <Input
              type="password"
              id="current-password"
              placeholder="********"
              {...register("currentPassword")}
              className={` py-5 ${
                errors.password ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.currentPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label htmlFor="new-password" className="text-sm ml-1 mb-1">
              New Password
            </Label>
            <Input
              type="password"
              id="new-password"
              placeholder="********"
              {...register("newPassword")}
              className={` py-5 ${
                errors.newPassword ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label htmlFor="confirm-new-password" className="text-sm ml-1 mb-1">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirm-new-password"
              placeholder="********"
              {...register("confirmNewPassword")}
              className={` py-5 ${
                errors.confirmNewPassword
                  ? "border-red-400"
                  : "border-neutral-300"
              }`}
            />
            {errors.confirmNewPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="mt-3 bg-yellow-500">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ChangePassword;
