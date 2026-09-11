"use client";

import { UpOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CustomButton, Logo } from "@/shared/ui";

import "./header.scss";

const links = [
  { title: "Cars For Sale", path: "/cars" },
  { title: "Sell Your Car", path: "/sell-your-car" },
  { title: "Finance", path: "/finance" },
  { title: "Automotive Solutions", path: "/automotive-solutions" },
  { title: "About Us", path: "/about-us" },
  { title: "Contact", path: "/contact" },
];

const NOT_SCROLLED = ["/"];

export const Header = () => {
  const pathname = usePathname();
  const shouldNotBeScrolled = !NOT_SCROLLED.some((path) => pathname === path);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 py-4 Header ${isScrolled ? "scrolled" : ""} ${!shouldNotBeScrolled ? "" : "blacked"}`}
      >
        <div className="container flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="flex gap-10 Header-nav">
            {links.map((item) => (
              <Link
                key={item.title}
                className={`transition-colors duration-200 text-[15px] font-medium text-white ${pathname === item.path ? "active" : ""}`}
                href={item.path}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <Link href="/contact">
            <CustomButton className="Header-btn">Get a Quote</CustomButton>
          </Link>

          <div onClick={() => setDrawerOpen(true)} className="Header-burger"></div>
        </div>
      </header>

      <Drawer
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        closable={false}
        size={280}
        styles={{
          body: {
            padding: 0,
            background: "#000",
          },
          header: {
            display: "none",
          },
          section: {
            background: "#000",
          },
        }}
      >
        <div className="drawer-menu">
          <div className="drawer-header">
            <Logo />
            <div onClick={closeDrawer} className="drawer-close">
              ✕
            </div>
          </div>
          <div className="drawer-links">
            {links.map((item) => (
              <Link
                key={item.title}
                className={`drawer-link ${pathname === item.path ? "active" : ""}`}
                href={item.path}
                onClick={closeDrawer}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/contact" onClick={closeDrawer}>
              <CustomButton className="drawer-btn">Get a Quote</CustomButton>
            </Link>
          </div>
        </div>
      </Drawer>

      <div
        onClick={scrollToTop}
        className={`fixed right-[3%] bottom-[3%] w-[45px] h-[45px] go-top rounded-full opacity-0 flex items-center justify-center text-white z-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isScrolled ? "scrolled" : ""}`}
      >
        <UpOutlined />
      </div>
    </>
  );
};
