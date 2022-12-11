import ClaimCard from "@components/ClaimCard/card";
import Connect from "@components/connect";
import Navbar from "@components/navbar";
import Button from "@components/primaryButton";
import { useModal } from "connectkit";
import useClaim from "hooks/useClaim";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-around px-4">
        <div className="relative overflow-hidden aspect-square drop-shadow-lg w-full max-w-sm md:max-w-full md:w-2/5 mt-4 md:mt-8 rounded-md">
          <Image
            src="/images/hero.png"
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full max-w-sm md:max-w-full md:w-2/5 h-52 mt-6 md:mt-8 bg-green-500"></div>
      </div>
    </>
  );
}
