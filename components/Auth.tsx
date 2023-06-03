"use client";
import React from "react";
import InputTextField from "./InputTextField";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const formData: any = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `${window.location.origin}/items`,
      redirect: true,
    });
  };
  const { status, data } = useSession();
  if (status !== "unauthenticated" && status !== "loading") {
    return redirect("/items");
  }

  return (
    <section className="w-full flex flex-col items-center h-screen justify-center">
      <div className="w-1/3 bg-white p-10 shadow-sm rounded-md">
        <header className="flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" />
        </header>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          <InputTextField
            inputType="text"
            label="Email"
            name="email"
            placeholder="Enter email"
            required={true}
            removeTextBtn={false}
          />
          <InputTextField
            inputType="password"
            label="Password"
            name="password"
            placeholder="Enter password"
            required={true}
            removeTextBtn={false}
          />
          <div className="flex flex-col justify-center gap-4">
            <button
              type="submit"
              className="rounded-xl py-5 px-8 outline-none bg-primary-theme-color text-[#34333A] font-medium"
            >
              Login
            </button>
            <h5 className="text-base font-normal text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="text-primary-theme-color text-bold"
              >
                Sign Up
              </Link>
            </h5>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
