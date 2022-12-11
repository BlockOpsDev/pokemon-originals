import React, { useState, useEffect } from "react";
import Image from "next/image";
import Connect from "./connect";

const NavLinks: { name: string; href: string }[] = [
  {
    name: "Originals DAO",
    href: "#",
  },
  {
    name: "My Journey",
    href: "#",
  },
  {
    name: "FAQ's",
    href: "#",
  },
  {
    name: "Rewards",
    href: "#",
  },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showMenu]);

  return (
    <nav className="bg-white fixed w-full">
      <div className="max-w-7xl mx-auto px-2 md:px-4 bg-purple-500">
        <div className="h-16 bg-red-500">
          <div className="relative float-left h-full w-48 bg-green-500">
            <Image
              src="/images/logo.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="bg-yellow-500 -translate-y-full fixed inset-x-0 bottom-0 w-screen h-[calc(100vh-76px)] flex items-center md:translate-y-0 md:w-max md:relative md:float-right md:h-full">
            <div className="flex items-center justify-end text-black text-base font-bold bg-blue-500">
              {NavLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-gray-700 mr-5"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center bg-orange-500">
              <Connect />
            </div>
          </div>
          <div className="flex h-full items-center float-right bg-yellow-500">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? (
                <svg
                  className="block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black h-3" />
    </nav>
  );
}
