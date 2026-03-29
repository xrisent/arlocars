"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CustomButton, Logo } from "@/shared/ui";

import "./header.scss";

const links = [
  { title: "Cars For Sale", path: "" },
  { title: "Sell Your Car", path: "" },
  { title: "Finance", path: "" },
  { title: "Automative Solutions", path: "" },
  { title: "About Us", path: "" },
  { title: "FAQ", path: "" },
  { title: "Contact", path: "" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 py-4 Header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container flex justify-between items-center">
        <Logo />

        <nav className="flex gap-10">
          {links.map((item) => (
            <Link
              key={item.title}
              className="transition-colors duration-200 text-[15px] font-medium text-white"
              href={item.path}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <CustomButton>Get a Quote</CustomButton>
      </div>
    </header>
  );
};
