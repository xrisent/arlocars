"use client";

import { AuthGuard } from "@/features/auth/ui";
import { AdminLayout } from "@/widgets/admin-layout";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}
