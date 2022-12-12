import React from "react";
import Image from "next/image";
import Connect from "./connect";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks: { name: string; href: string }[] = [
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

const Navbar: React.FC = () => {
  return (
    <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <div className="relative flex h-16 w-48 flex-shrink-0 items-center md:mr-auto">
                  <Image
                    className="block h-8 w-auto object-contain"
                    src="/logo.png"
                    alt="Originals"
                    fill
                    sizes="192px"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="flex space-x-4">
                    {navLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={
                          "font-poppins font-bold text-black hover:text-gray-700"
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden items-center pr-2 md:static md:inset-auto md:ml-6 md:block md:pr-0">
                <Connect />
              </div>
            </div>
          </div>
          <div className="h-3 bg-black" />

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    "font-poppins block px-3 py-2 text-base font-bold text-black hover:text-gray-700"
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="mx-3 mb-4 flex w-5/12 items-center justify-start md:hidden">
              <Connect />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
