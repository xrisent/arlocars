import Link from "next/link";

import { CustomButton } from "@/shared/ui";

export default function NotFound() {
  return (
    <main className="container flex flex-col items-center justify-center gap-6 py-[200px] text-center">
      <h1
        className="title text-[48px]"
        style={{
          fontFamily: "var(--font-heading)",
        }}
      >
        Page not found
      </h1>
      <p className="max-w-md text-[16px] text-[var(--color-medium)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <nav className="flex flex-wrap justify-center gap-4">
        <Link href="/">
          <CustomButton>Home</CustomButton>
        </Link>
      </nav>
    </main>
  );
}
