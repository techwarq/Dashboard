"use client"

import { saveTopics } from "../../../actions/backend";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function CreateTopics() {
  const router = useRouter();
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topicName) {
      alert("Please enter a topic name");
      return;
    }

    try {
      const newTopic = { name: topicName, description: topicDescription };
      await saveTopics(newTopic);
      setTopicName("");
      setTopicDescription("");
      router.push("/dashboard/topics"); // Redirect to topics page after submission
    } catch (error) {
      console.error("Error saving topic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Link href="/topics">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Topic</h1>
      </div>
      <Card className="bg-transparent text-white w-72 mt-5">
        <CardHeader>
          <CardTitle>Topic Details</CardTitle>
          <CardDescription>In this form, you can create your topic.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Topic Name</Label>
              <Input
                type="text"
                placeholder="Your Topic Name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Topic Description</Label>
              <Textarea
                placeholder="Describe your topic"
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-6" type="submit">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}