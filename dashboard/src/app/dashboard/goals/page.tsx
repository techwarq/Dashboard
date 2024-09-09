"use client"
import dynamic from "next/dynamic";




import React from "react"

const ExcalidrawComponent = dynamic(() => import("../../components/ExcalidrawComponent"), {
  ssr: false,
});
export default function Goals() {

    return (
        <div className="p-6 max-w-7xl mx-auto">
         <ExcalidrawComponent />
        
      
      </div>
    )
}