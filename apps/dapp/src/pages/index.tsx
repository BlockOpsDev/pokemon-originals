import Head from "next/head";
import Image from "next/image";
import ClaimCard from "../components/ClaimCard/card";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Originals</title>
        <link rel="icon" href="/99-Favicon.svg" />
      </Head>

      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-around px-4 mt-[76px]">
        <div className="relative overflow-hidden aspect-square drop-shadow-lg w-full max-w-sm md:max-w-full md:w-2/5 mt-4 md:mt-8 rounded-md object-contain">
          <Image src="/hero.png" alt="hero" fill priority={true} />
        </div>
        <div className="w-full max-w-sm md:max-w-full md:w-2/5 h-52 mt-6 md:mt-8">
          <ClaimCard />
        </div>
      </div>
    </div>
  );
}
