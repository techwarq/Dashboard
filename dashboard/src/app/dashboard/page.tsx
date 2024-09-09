"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PieChart, Pie, Cell, Label, Tooltip as ChartTooltip } from "recharts";
import { fetchDashboardMetrics } from "../actions/backend"; // Adjust the import path as needed
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Metrics {
  solvedQuestionsCount: number;
  topicsCount: number;
  completedTopicsCount: number;
  questionsCount: number;
  progressData: { category: string; value: number }[];
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await fetchDashboardMetrics(); // Use the helper function to fetch metrics
        setMetrics(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Transform data for PieChart (example transformation, adjust as necessary)
  const pieChartData = metrics?.progressData.map(item => ({
    name: item.category,
    value: item.value,
  })) || [];

  // Example total value for display in the center
  const totalValue = pieChartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <>
      {/* Display metrics on cards */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="bg-transparent text-white border-purple-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Total Solved Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.solvedQuestionsCount}/{metrics?.questionsCount}</div>
            <div className="text-xs text-muted-foreground">Based on recent changes</div>
          </CardContent>
        </Card>

        <Card className="bg-transparent text-white border-purple-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Total Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.topicsCount}</div>
            <div className="text-xs text-muted-foreground">Based on recent changes</div>
          </CardContent>
        </Card>

        <Card className="bg-transparent text-white border-purple-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Completed Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.completedTopicsCount}</div>
            <div className="text-xs text-muted-foreground">Topics fully completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2 border-purple-900 bg-transparent text-white">
          <CardHeader className="items-center pb-0">
            <CardTitle>Progress Data</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <div className="mx-auto aspect-square max-h-[250px]">
              <PieChart width={250} height={250}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={0}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#17126b" : "#82ca9d"} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl  font-bold"
                            >
                              {totalValue.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                <ChartTooltip />
              </PieChart>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              {/* Add a suitable icon if needed */}
            </div>
            <div className="leading-none text-muted-foreground">
              Showing progress data for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Recent Orders Card */}
        <Card className="bg-transparent border-purple-900 text-white">
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
            {/* Add additional recent order entries as needed */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
