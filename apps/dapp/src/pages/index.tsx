import Head from "next/head";
import Image from "next/image";
import Connect from "../components/connect";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>99 Originals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Connect />
      {/* <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-around px-4 mt-[76px]">
        <div className="relative overflow-hidden aspect-square drop-shadow-lg w-full max-w-sm md:max-w-full md:w-2/5 mt-4 md:mt-8 rounded-md">
          <Image
            src="/images/hero.png"
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full max-w-sm md:max-w-full md:w-2/5 h-52 mt-6 md:mt-8">
          <ClaimCard />
        </div>
      </div> */}
    </div>
  );
}