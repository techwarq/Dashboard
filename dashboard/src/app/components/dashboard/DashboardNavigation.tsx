"use client"

import { cn } from "../../../lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation";
import React from "react";


const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },

    {
        name: "Topics",
        href: "/dashboard/topics"
    },

    {
        name: "Goals",
        href: "/dashboard/goals"

      
    },

    {
        name: "Farmers",
        href: "/dashboard/farmers"
    }
]




export function DashboardNavigation() {
    const pathname = usePathname();
    return (

        <>
       
            {links.map((link) => (
                <Link key={link.href} href={link.href} className={cn(
                    link.href === pathname
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
        >
                    {link.name}
                </Link>
            ))}
        </>
    );
}
