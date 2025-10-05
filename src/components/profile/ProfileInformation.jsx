import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2, User } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

const profileInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
      "Full name must contain exactly two names"
    ),
  email: z.email("Invalid email address"),
  image: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value), {
      message: "Invalid URL format*",
    }),
});
const ProfileInformation = () => {
  const user = useAuth((state) => state.user);
  const login = useAuth((state) => state.login);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      image: user?.img_url || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.name || "",
        email: user.email || "",
        image: user.img_url || "",
      });
    }
  }, [user, reset]);

  // === MUTATION
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async ({ fullName, image }) => {
      if (!user?.uid) throw new Error("User not logged in");

      const userRef = doc(db, "profiles", user.uid);
      await updateDoc(userRef, {
        full_name: fullName,
        img_url: image || user.img_url || "",
        updatedAt: new Date().toISOString(),
      });

      // Return updated data
      return { ...user, name: fullName, img_url: image || "" };
    },

    onSuccess: (updatedUser) => {
      login(updatedUser); // update local store
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["user", updatedUser.uid]);
    },

    onError: (err) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const onSubmit = (data) => {
    updateProfile(data);
  };

  return (
    <Card className="mb-5 rounded-md shadow-none mt-5">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 size-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Avatar className="mb-4 size-20">
            <AvatarImage src={user?.img_url} className="object-cover" />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <div className="mb-2">
            <Label htmlFor="fullName" className="text-sm ml-1 mb-1">
              Full Name*
            </Label>
            <Input
              type="text"
              id="fullName"
              placeholder="e.g John Doe"
              {...register("fullName")}
              className={` py-5 ${
                errors.fullName ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label htmlFor="email" className="text-sm ml-1 mb-1">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              disabled
              placeholder="e.g john@gmail.com "
              {...register("email")}
              className={` py-5 ${
                errors.email ? "border-red-400" : "border-neutral-300"
              }`}
            />
            <p className="text-xs pl-1 mt-1 text-gray-500">
              Email cannot be changed
            </p>
            {errors.email && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <Label htmlFor="image" className="text-sm ml-1 mb-1">
              Profile Image URL (Optional)
            </Label>
            <Input
              type="text"
              id="image"
              placeholder="e.g https://example.com/image.jpg"
              {...register("image")}
              className={` py-5 ${
                errors.image ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.image && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.image.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-3 bg-yellow-500"
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ProfileInformation;
