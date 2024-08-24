"use client";

import AuthorizedRoleLayoutClient from "@/components/auth/AuthClient";
import { UserRole } from "@/utils/types/user-role-enum";
import { PropsWithChildren, useEffect } from "react";

function Layout_Moderator({ children }: PropsWithChildren) {
  return children;
}

export default AuthorizedRoleLayoutClient({
  allowedRoles: [UserRole.MOD],
  Layout: Layout_Moderator,
  toastMessage:
    "You are not authorized to access this page. Please login as a moderator.",
});
