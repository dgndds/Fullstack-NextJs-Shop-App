"use client";

import { UserRole } from "@/utils/types/user-role-enum";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";

export interface ILayoutProps<T extends Record<string, unknown>> {
  params: T;
}

/**
 * `Higher-order` component for creating layouts with `role-based` authorization.
 */
export default function AuthorizedRoleLayoutClient<
  T extends Record<string, unknown>
>({
  allowedRoles,
  Layout,
  redirectTo,
  toastMessage,
}: {
  allowedRoles?: UserRole[];
  notAllowedRoles?: UserRole[];
  Layout?: FC<PropsWithChildren<ILayoutProps<T>>>;
  redirectTo?: string;
  toastMessage: string;
}) {
  return ({ children, params }: { children: React.ReactNode; params: T }) => {
    const [hasAccess, setHasAccess] = useState(false);

    const { initializing, session } = useAuth();

    useEffect(() => {
      if (!initializing) {
        const canAccess =
          allowedRoles !== undefined &&
          session !== undefined &&
          session !== null &&
          (session.user.user_metadata.roles as UserRole[]).some((role) =>
            allowedRoles.includes(role)
          );

        setHasAccess(canAccess);

        if (!canAccess) {
          toast.info(toastMessage);
          return redirect(redirectTo ?? "/");
        }
      }
    }, [initializing, session]);

    if (!hasAccess) return <></>;

    if (Layout) return <Layout params={params}>{children}</Layout>;

    return children;
  };
}
