"use client"
import { Ellipsis } from 'lucide-react';
import { Button } from "../../../components/ui/button"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Topic = {
  id: number;
  name: string;
  description: string;
};

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/topics");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Topics</h1>
        <p className="text-base mb-4">Create Your Topics and Conquer</p>
        <Link href="/dashboard/topics/create">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Add Topic
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <div key={topic.id} className="relative border border-gray-700 rounded-lg p-4 h-full flex flex-col justify-between hover:bg-gray-800 transition-colors">
            {/* Ellipsis dropdown button */}
            <DropdownMenu>
              <DropdownMenuTrigger className='absolute top-2 right-2'>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className='cursor-pointer'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Topic content */}
            <Link href={`/dashboard/topics/${topic.id}/questions`}>
              <div className="flex-grow">
                <h2 className="font-semibold text-lg mb-2">{topic.name}</h2>
                <p className="text-sm text-gray-400">{topic.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
