"use client";

import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import UserAvatar from "./UserAvatar";
import AvatarSkeleton from "../skeleton/AvatarSkeleton";

export default function AuthInputGroup() {
  const { initializing, user, session } = useAuth();
  return (
    <div className="sm:flex gap-4 hidden">
      {initializing && <AvatarSkeleton />}
      {!initializing && session === null && (
        <>
          <Link href="/login" className="underline">
            Login
          </Link>
          <Link href="/sign-up" className="underline">
            Sign Up
          </Link>
        </>
      )}
      {!initializing && session !== null && user !== null && (
        <UserAvatar className="border border-border h-12 w-12" />
      )}
    </div>
  );
}
