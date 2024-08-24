"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CartMartLogo from "@/components/CartMartLogo";
import { toast } from "react-toastify";
import { createClientClient } from "@/app/api/_utils/supabase/client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  SignUpRequestType,
  signUpSchema,
} from "@/app/api/auth/_schemas/sign-up-schema";
import { signUpModerator } from "@/app/utils/auth/api-calls";

export default function ModSignUpPage() {
  const router = useRouter();

  const supabase = createClientClient();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async ({ email, password }: SignUpRequestType) => {
    signUpModerator({ email, password })
      .then(async () => {
        await supabase.auth.refreshSession();

        setSubmitting(false);
        toast.success("Signed up successfully");

        router.replace("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setSubmitting(false);
      });
  };

  const form = useForm<SignUpRequestType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col gap-8 w-full max-w-[450px]">
      <div className="flex items-center justify-center gap-4">
        <CartMartLogo></CartMartLogo>
        <h1 className="text-logo-text">CartMart</h1>
      </div>
      <Card className="shadow">
        <CardHeader>
          <CardTitle>
            <h1 className="text-title-3 !font-extrabold text-center">
              Moderator Sign Up
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-5 gap-2 "
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input placeholder="Email adress" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <span>Password</span>
                    </FormLabel>

                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input
                          placeholder="Password"
                          {...field}
                          type={isPasswordVisible ? `text` : `password`}
                        />
                        <div
                          className="text-white bg-primary p-2 rounded-md cursor-pointer hover:bg-primary-dark"
                          onClick={() =>
                            setIsPasswordVisible((visible) => !visible)
                          }
                        >
                          {isPasswordVisible ? (
                            <IconEyeOff className="text-surface-secondary-300" />
                          ) : (
                            <IconEye className="text-surface-secondary-300" />
                          )}
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="secondary"
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white"
                disabled={submitting}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="mt-5 w-full flex flex-col items-center justify-center gap-2">
            <Link
              prefetch={true}
              href="/sign-up/moderator"
              className="font-semibold hover:text-primary-dark underline"
            >
              Sign Up as Moderator
            </Link>
            <Link
              prefetch={true}
              href="/login"
              className="font-semibold hover:text-primary-dark underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
