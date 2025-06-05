"use client";

import Image from "next/image";
import Link from "next/link";

import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { signIn } from "@/lib/auth-client";

export default function SignIn() {
  return (
    <div className="flex h-[100dvh] w-full justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-0 dark:from-gray-900 dark:to-gray-900">
      <div className="my-0 flex w-full max-w-md flex-grow flex-col rounded-none bg-white p-6 shadow-lg md:my-16 md:rounded-2xl md:p-8 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="mb-1 p-3 text-sm text-gray-500 dark:text-gray-400">
            Login to continue
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <Button className="w-full cursor-pointer rounded-md py-2 text-white transition">
            Log In
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-white px-2 text-sm text-gray-400 dark:bg-gray-900">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="flex w-full cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-left transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={signIn}
          >
            <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <button className="flex w-full cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-left transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>

          <button className="flex w-full cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-left transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <FaGithub className="h-5 w-5 text-black dark:text-white" />
            <span className="text-sm font-medium">Continue with GitHub</span>
          </button>
        </div>

        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-purple-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
