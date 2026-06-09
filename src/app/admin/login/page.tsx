import { Suspense } from "react";

import { RedirectIfAuthenticated } from "@/features/auth/ui";
import { AdminLoginPage } from "@/views/admin";

export default function AdminLoginRoute() {
  return (
    <Suspense>
      <RedirectIfAuthenticated>
        <AdminLoginPage />
      </RedirectIfAuthenticated>
    </Suspense>
  );
}
