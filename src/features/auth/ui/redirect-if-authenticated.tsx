"use client";

import { Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useAuthSession } from "@/features/auth/model/hooks";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, isReady } = useAuthSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isReady || !isAuthenticated) return;
    const redirect = searchParams.get("redirect");
    router.replace(redirect && redirect.startsWith("/admin") ? redirect : "/admin/cars");
  }, [isAuthenticated, isReady, router, searchParams]);

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
