"use client"

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <p className="text-white">Loading Excalidraw...</p>,
  }
);

export default function Goals() {
  const [dimensions, setDimensions] = useState({ width: '100vw', height: '100vh' });

  useEffect(() => {
    const updateDimensions = () => {
      const headerHeight = document.querySelector('h1')?.offsetHeight || 0;
      setDimensions({
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - headerHeight}px`,
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      
      <h1 className="text-center text-3xl font-mono text-white py-4">Draw Your Goals</h1>
      <div className="flex-grow" style={{ width: dimensions.width, height: dimensions.height }}>
        <Excalidraw
          theme="dark"
          initialData={{
            appState: {
              viewBackgroundColor: "#1F2937", // Tailwind's gray-800
            },
          }}
        />
      </div>
    </div>
  );
}