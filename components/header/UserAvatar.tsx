"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import AvatarSkeleton from "../skeleton/AvatarSkeleton";
import { Button } from "../ui/button";
import { createClientClient } from "@/app/api/_utils/supabase/client";
import { UserRole } from "@/utils/types/user-role-enum";
import { IconUserFilled } from "@tabler/icons-react";

type UserAvatarProps = {
  className?: string;
};

export default function UserAvatar({ className }: UserAvatarProps) {
  const { initializing, user, session } = useAuth();
  const supabase = createClientClient();

  if (initializing) return <AvatarSkeleton />;

  return (
    <DropdownMenu>
      {!initializing && (
        <DropdownMenuTrigger>
          <Avatar className={className}>
            <AvatarFallback className="bg-gradient-to-r from-primary-light to-primary-dark text-[24px] text-white">
              <IconUserFilled />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent avoidCollisions collisionPadding={{ right: 16 }}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!initializing && session === null && (
          <>
            <DropdownMenuItem>
              <Link href="/login" className="underline">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/register" className="underline">
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {!initializing && session !== null && user !== null && (
          <>
            <DropdownMenuItem>
              <p className="font-bold mb-2">{user.email}</p>
            </DropdownMenuItem>
            {(user.user_metadata.roles as UserRole[]).includes(
              UserRole.MOD
            ) && (
              <DropdownMenuItem>
                <Link href="/moderator/products" className="underline">
                  Manage Products
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="!p-0 underline"
                onClick={() => {
                  supabase.auth
                    .signOut()
                    .then(() => supabase.auth.refreshSession());
                }}
              >
                Sign out
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
