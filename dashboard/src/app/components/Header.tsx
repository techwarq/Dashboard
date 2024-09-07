"use client"
import React from "react"
import { navigation } from "../constants/intex"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Header(){
    const pathname = usePathname();
    return (
        <div className="fixed top-0 z-50 bg-neutral-900 backdrop-blur-sm border-b border-neutral-600 lg:bg-neutral-900 lg:backdrop-blur-sm w-full">
            <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                <h1 className="font-bold text-2xl">DashBoard</h1>

                <nav className="hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-neutral-800 lg:static lg:flex lg:mx-auto lg:bg-transparent">
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {navigation.map((item) => (
                            <Link key={item.id} href={item.url} className={`block relative font-mono text-2xl uppercase text-neutral-100 transition-colors hover:text-purple-800 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.5 lg:text-xs lg:font-semibold ${item.url === pathname ? "z-2 text-purple-900" : "text-neutral-100"} lg:leading-5 lg:hover:text-neutral-100 xl:px-12`}>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="shrink-0 md:hidden ml-auto">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-neutral-800">
                        <nav className="grid gap-6 text-lg font-medium">
                            {navigation.map((item) => (
                                <Link key={item.id} href={item.url} className={`block relative font-mono text-2xl uppercase text-neutral-100 transition-colors hover:text-purple-800 px-6 py-6 md:py-8 lg:-mr-0.5 lg:text-xs lg:font-semibold ${item.url === pathname ? "z-2 text-purple-900" : "text-neutral-100"} lg:leading-5 lg:hover:text-neutral-100 xl:px-12`}>
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                <div className="hidden lg:flex items-center space-x-4">
                    <Link href="/signup" className="text-neutral-100 transition-colors hover:text-neutral-100">
                        New Account
                    </Link>
                    <Button variant="outline" className="border-purple-700">Sign Up</Button>
                </div>
            </div>
        </div>
    )
}
