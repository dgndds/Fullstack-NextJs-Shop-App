"use client";

import { Suspense } from "react";
import ModProductsPage from "./ModProductsPage";

export default function ModProducts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModProductsPage />
    </Suspense>
  );
}
