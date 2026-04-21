"use client";

import { UpOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
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
      <header className={`fixed top-0 w-full z-50 py-4 Header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container flex justify-between items-center">
          <Logo />

          <nav className="flex gap-10 Header-nav">
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

          <CustomButton className="Header-btn">Get a Quote</CustomButton>

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
              <Link key={item.title} className="drawer-link" href={item.path} onClick={closeDrawer}>
                {item.title}
              </Link>
            ))}
            <CustomButton className="drawer-btn" onClick={closeDrawer}>
              Get a Quote
            </CustomButton>
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
