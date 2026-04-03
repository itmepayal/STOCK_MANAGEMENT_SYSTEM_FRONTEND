"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormData } from "@/schemas/register";
import { Loader2Icon, Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Custom Hook
  const { register: registerUser, isLoading } = useRegister();

  // Submit Handler
  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;

    const promise = registerUser(payload);

    toast.promise(promise, {
      loading: "Creating account...",
      success: () => {
        reset();
        router.push("/login");
        return "Account created successfully";
      },
      error: (err: any) => err?.data?.message || "Registration failed",
    });

    try {
      await promise;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* USERNAME */}
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  type="text"
                  {...register("username")}
                  placeholder="john"
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>

              {/* EMAIL */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="john@gmail.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel>Password</FieldLabel>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="********"
                    className="pr-10"
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* CONFIRM PASSWORD */}
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="********"
                    className="pr-10"
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              {/* BUTTON */}
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2Icon className="animate-spin mr-2" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <FieldDescription className="text-center mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="underline">
                    Login
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
