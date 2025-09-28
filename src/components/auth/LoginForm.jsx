import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleAuthButton from "./GoogleAuthButton";
import { useAccountModal, useAuth } from "@/store";
import { LiaTimesSolid } from "react-icons/lia";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "This field is required" }),
});

const LoginForm = () => {
  const close = useAccountModal((state) => state.close);
  const login = useAuth((state) => state.login);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Login function
  const loginUser = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "profiles", user.uid));
    if (!userDoc.exists()) throw new Error("User profile not found");

    const userData = userDoc.data();

    return userData;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Update Redux store
      toast.success("Welcome back!");
      login({
        email: data.email,
        name: data.full_name,
        img_url: data.img_url,
        uid: data.uid,
        createdAt: data.createdAt || new Date().toISOString(),
      });
      close();
    },
    onError: (error) => {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credentials provided.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Try again later.");
      } else {
        toast.error(error?.message || "Failed to login");
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent"
          onClick={close}
        >
          <LiaTimesSolid />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] max-[460px]:w-full"
      >
        <Card>
          <CardHeader>
            <GoogleAuthButton />
            <div className="flex items-center gap-2 mt-4">
              <span className="border-1 border-neutral-300 inline-block flex-1 dark:border-neutral-600"></span>
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                OR
              </span>
              <span className="border-1 border-neutral-300 inline-block flex-1 dark:border-neutral-600"></span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Label htmlFor="email" className="text-sm ml-1 mb-1">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="e.g john@gmail.com "
                {...register("email")}
                className={` py-5 ${
                  errors.email ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="password" className="text-sm ml-1 mb-1">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="********"
                {...register("password")}
                className={` py-5 ${
                  errors.password ? "border-red-400" : "border-neutral-300"
                }`}
              />
              {errors.password && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2.5 pt-3">
            <Button
              type="submit"
              size={"lg"}
              aria-label="Sign In"
              disabled={isPending}
              className="w-full bg-yellow-500 text-base rounded-full font-medium disabled:cursor-not-allowed py-2 hover:scale-[1.02] active:scale-[1]  transition duration-100 disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
            <p className="text-center text-sm text-neutral-600 font-anek dark:text-neutral-300">
              Don't have an account?{" "}
              <Link
                to="?form=signup"
                className="text-neutral-700 dark:text-neutral-200 hover:underline font-semibold transition-all duration-100 ease-in-out"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default LoginForm;
