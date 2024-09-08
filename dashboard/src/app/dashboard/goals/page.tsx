import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import React from "react"

export default function Goals() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
      <Card className="bg-transparent text-white border-gray-700">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
          </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center space-x-4 rounded-md border border-gray-700 p-4">

                    </div>
               </CardContent>
  
         </Card>

         <Card className="bg-transparent text-white border-gray-700">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
          </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center space-x-4 rounded-md border border-gray-700 p-4">

                    </div>
               </CardContent>
  
         </Card>


         <Card className="bg-transparent text-white border-gray-700">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
          </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center space-x-4 rounded-md border border-gray-700 p-4">

                    </div>
               </CardContent>
  
         </Card>





      </div>
      </div>
    )
}