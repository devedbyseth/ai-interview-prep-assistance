"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import { email } from "zod/v4";

// Define a specific type for the form mode

const formValidate = ({ type }: { type: string }) => {
  return z.object({
    name: type === "sign-up" ?  z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = formValidate({type});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log("hi");
        toast.success("Successfully Sing Up");
        router.push("/sign-in");
        return;
      }
      console.log("Hi");
      toast.success("Successfully Sing In");
      router.push("/");
    } catch (error) {
      alert("Error");
      toast.error(`Error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex card flex-col px-10 py-12 gap-4">
        <div className="flex flex-row justify-center gap-2">
          <Image src="./logo.svg" alt="logo" width={38} height={38} />
          <h2>Advance Prep</h2>
        </div>
        <h4 className="text-center">Ai assistence for your inteveiw prep</h4>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full lg:w-[85%] space-y-6 form mt-6 mx-auto"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Name"
              />
            )}
            <FormField
              control={form.control}
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />

            <FormField
              control={form.control}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />

            <Button className="btn" type="submit">
              {!isSignIn ? "Create an Account" : "Sign in"}
            </Button>
            <p className="text-center">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="font-bold ml-1 text-user-primary"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default AuthForm;
