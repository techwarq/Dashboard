import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center bg-gray-900 justify-center h-screen w-full text-center px-4">
      <h1 className="text-3xl sm:text-4xl max-w-[62rem] md:text-5xl lg:text-5xl font-bold text-neutral-100 mb-6">
        Create Your Own{" "}
        <span className="text-purple-800">DashBoard</span> And Get Into{" "}
        <span className="text-purple-800">Beast Mode</span> With Your Goals
      </h1>

      <Link href="/dashboard"><Button variant="outline" className=" rounded-full w-64 h-14 hover:bg-purple-400 cursor-pointer">Get Started</Button></Link>
    </section>
  );
}
