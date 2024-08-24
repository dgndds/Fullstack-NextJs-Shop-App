"use client";

import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer
        {...{
          position: "bottom-right",
          autoClose: 3000,
          newestOnTop: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "light",
        }}
      />
    </QueryClientProvider>
  );
};

export default Providers;
