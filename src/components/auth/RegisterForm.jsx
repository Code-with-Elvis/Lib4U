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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAccountModal, useAuth } from "@/store";
import GoogleAuthButton from "./GoogleAuthButton";
import { LiaTimesSolid } from "react-icons/lia";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .regex(
        /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/,
        "Full name must contain exactly two names"
      ),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Weak password"),
    confirmPassword: z.string().min(6, "This field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // 👈 This tells Zod where to show the error
  });
const RegisterForm = () => {
  const close = useAccountModal((state) => state.close);
  const login = useAuth((state) => state.login);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerUser = async ({ fullName, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save to Firestore
    await setDoc(doc(db, "profiles", user.uid), {
      full_name: fullName,
      email: email,
      img_url: "",
      createdAt: new Date().toISOString(),
    });

    return {
      uid: user.uid,
      fullName,
      email,
      img_url: "",
      createdAt: new Date().toISOString(),
    };
  };

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      login(data);
      toast.success("Your account has been created.");
    },
    onError: (error) => {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please provide a valid email address.");
      } else if (error.code === "auth/operation-not-allowed") {
        toast.error("Email/password sign-up is not enabled.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please choose a stronger one.");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please try again.");
      } else {
        toast.error(error?.message || "Failed to create account");
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        close();
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
              <Label htmlFor="fullName" className="text-sm ml-1 mb-1">
                Full Name
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
            <div className="mb-2">
              <Label htmlFor="confirmPassword" className="text-sm ml-1 mb-1">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="********"
                {...register("confirmPassword")}
                className={` py-5 ${
                  errors.confirmPassword
                    ? "border-red-400"
                    : "border-neutral-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                  * {errors.confirmPassword.message}
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
              className="w-full text-base rounded-full bg-yellow-500 font-medium disabled:cursor-not-allowed   py-2 hover:scale-[1.02] active:scale-[1]  transition duration-100 disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              {isPending ? <Loader2 className="animate-spin" /> : " Sign Up"}
            </Button>
            <p className="text-center text-sm text-neutral-600 font-anek dark:text-neutral-300">
              Already have an account?{" "}
              <Link
                to="?form=login"
                className="text-neutral-700 dark:text-neutral-200 hover:underline font-semibold transition-all duration-100 ease-in-out"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default RegisterForm;
