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
import { Checkbox } from "../../../../../components/ui/checkbox";
import { saveQuestion, getQuestionsByTopicId, deleteQuestion, updateQuestion } from "../../../../actions/backend";

type Question = {
  id: number;
  title: string;
  isSolved: boolean;
  solvedAt?: string | null;
  link?: string;
  youtube?: string;
};

export default function Questions() {
  const { id } = useParams();
  const topicId = typeof id === 'string' ? parseInt(id) : undefined;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");
  const [newYoutube, setNewYoutube] = useState<string>("");

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
        link: newLink,
        youtube: newYoutube,
      };

      const savedQuestion = await saveQuestion(questionData);

      const transformedQuestion: Question = {
        id: savedQuestion.id,
        title: savedQuestion.title,
        isSolved: savedQuestion.isSolved,
        solvedAt: savedQuestion.solvedAt,
        link: savedQuestion.link,
        youtube: savedQuestion.youtube,
      };

      setQuestions((prevQuestions) => [...prevQuestions, transformedQuestion]);
      setNewQuestion(""); // Reset the input fields
      setNewLink("");
      setNewYoutube("");
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    console.log('Deleting question:', questionId);
    if (topicId === undefined) return;
  
    try {
      await deleteQuestion(questionId, topicId);
      console.log('Deleted question successfully');
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error(`Error deleting question ${questionId}:`, error);
    }
  };
  

  const handleToggleIsSolved = async (questionId: number, currentIsSolved: boolean) => {
    if (topicId === undefined) return;

    try {
      const updatedQuestion = await updateQuestion(questionId, topicId, { isSolved: !currentIsSolved });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, isSolved: updatedQuestion.isSolved, solvedAt: updatedQuestion.solvedAt } : q
        )
      );
    } catch (error) {
      console.error(`Error updating question ${questionId}:`, error);
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
                <Label htmlFor="title" className="text-right">
                  Question
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  placeholder="Enter link to full question..."
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="youtube" className="text-right">
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  placeholder="Enter YouTube video link..."
                  value={newYoutube}
                  onChange={(e) => setNewYoutube(e.target.value)}
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
              <TableRow className="hover:bg-transparent">
                <TableHead>Solved</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Status</TableHead>
               
                <TableHead>Link</TableHead>
                <TableHead>YouTube</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id} className="hover:bg-transparent">
                  <TableCell>
                    <Checkbox
                     className=" border-gray-500"
                      checked={question.isSolved}
                      onCheckedChange={() => handleToggleIsSolved(question.id, question.isSolved)}
                    />
                  </TableCell>
                  <TableCell>{question.title}</TableCell>
                  <TableCell>{question.isSolved ? "Solved" : "Unsolved"}</TableCell>
                  
                  <TableCell>
                    {question.link ? (
                      <a href={question.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Link
                      </a>
                    ) : "N/A"}
                  </TableCell>
                  <TableCell>
                    {question.youtube ? (
                      <a href={question.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        YouTube
                      </a>
                    ) : "N/A"}
                  </TableCell>
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