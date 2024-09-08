"use client";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag } from "lucide-react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default function Dashboard() {

    

// Function to manually reset the chat





   
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 ">

                
                <Card className="bg-transparent text-white border-purple-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-6">
                            Total Purchases
                            
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rs 100,000</div>
                        <div className="text-xs text-muted-foreground">Based on 100 charges</div>
                    </CardContent>
                </Card>

                <Card className="bg-transparent  border-purple-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-6">
                            Total Buy
                            <ShoppingBag className="h-4 w-4 text-green-600" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5000</div>
                        <div className="text-xs text-muted-foreground">Total sales</div>
                    </CardContent>
                </Card>

                <Card className="bg-transparent  border-purple-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-6">
                            Total Sales
                            <ShoppingBag className="h-4 w-4 text-green-600" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5000</div>
                        <div className="text-xs text-muted-foreground">Total sales</div>
                    </CardContent>
                </Card>

                <Card className="bg-transparent  border-purple-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-6">
                            Total Sales
                            <ShoppingBag className="h-4 w-4 text-green-600" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5000</div>
                        <div className="text-xs text-muted-foreground">Total sales</div>
                    </CardContent>
                </Card>

                {/* Repeat the other cards similarly... */}
            </div>

            <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2  border-purple-900 bg-transparent text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-6">Transactions</CardTitle>
                        <CardDescription>Recent Transactions from your store</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-transparent  border-purple-900 text-white">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
    <div className="flex items-center gap-4">
        <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="text-sm font-medium">Sunil</p>
            <p className="text-sm text-muted-foreground">ramesh@test.com</p>
        </div>
        <p className="ml-auto font-medium">+Rs 1,99,999</p>
    </div>
    <div className="flex items-center gap-4">
        <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="text-sm font-medium">Suresh</p>
            <p className="text-sm text-muted-foreground">sanjay@test.com</p>
        </div>
        <p className="ml-auto font-medium">+Rs 1,99,999</p>
    </div>
    <div className="flex items-center gap-4">
        <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="text-sm font-medium">Ramesh </p>
            <p className="text-sm text-muted-foreground">ramesh@test.com</p>
        </div>
        <p className="ml-auto font-medium">+Rs 1,99,999</p>
    </div>
    <div className="flex items-center gap-4">
        <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="text-sm font-medium">Sanjay </p>
            <p className="text-sm text-muted-foreground">sanjay@test.com</p>
        </div>
        <p className="ml-auto font-medium">+Rs 1,99,999</p>
    </div>
</CardContent>

                </Card>

            </div>
        </>
    );
}
