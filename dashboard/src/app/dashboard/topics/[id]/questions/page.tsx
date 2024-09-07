"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../../../../../components/ui/table";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { saveQuestion, getQuestionsByTopicId, deleteQuestion } from "../../../../actions/backend";

type Question = {
  id: number;
  title: string;
  isSolved: boolean;
  solvedAt?: string | null;
};

export default function Questions() {
  const { id } = useParams();
  const topicId = typeof id === 'string' ? parseInt(id) : undefined;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");

  useEffect(() => {
    if (topicId === undefined) return;

    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsByTopicId(topicId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const handleSaveQuestion = async () => {
    if (topicId === undefined || newQuestion.trim() === "") return;

    try {
      const questionData = {
        title: newQuestion,
        topicId: topicId,
        isSolved: false,
      };

      const savedQuestion = await saveQuestion(questionData);

      const transformedQuestion: Question = {
        id: savedQuestion.id,
        title: savedQuestion.title,
        isSolved: savedQuestion.isSolved,
        solvedAt: savedQuestion.solvedAt,
      };

      setQuestions((prevQuestions) => [...prevQuestions, transformedQuestion]);
      setNewQuestion(""); // Reset the input field
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (topicId === undefined) return;
  
    try {
      await deleteQuestion(questionId, topicId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
      // Optionally, you can set a success message here
      // setSuccessMessage('Question deleted successfully');
    } catch (error) {
      console.error(`Error deleting question ${questionId}:`, error);
      
    }
  };
  

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Question</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Question</DialogTitle>
              <DialogDescription>Add one question to this topic</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Question
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveQuestion}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-gray-700 bg-transparent text-white">
        <CardHeader>
          <CardTitle>Questions</CardTitle>
          <CardDescription>Manage your questions here</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Solved At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.title}</TableCell>
                  <TableCell>{question.isSolved ? "Solved" : "Unsolved"}</TableCell>
                  <TableCell>{question.solvedAt ? question.solvedAt : "N/A"}</TableCell>
                  <TableCell>
                  <Button variant="destructive" onClick={() => handleDeleteQuestion(question.id)}>
        Delete
      </Button>
                  </TableCell>
                </TableRow>

                
              ))}
               

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

