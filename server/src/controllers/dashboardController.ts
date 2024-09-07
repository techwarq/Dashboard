import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const today = new Date();
const startOfToday = new Date(today.setHours(0, 0, 0, 0));
const endOfToday = new Date(today.setHours(23, 59, 59, 999));

// Subtract one day
const startOfPreviousDay = new Date(startOfToday);
startOfPreviousDay.setDate(startOfPreviousDay.getDate() - 1);
const endOfPreviousDay = new Date(endOfToday);
endOfPreviousDay.setDate(endOfPreviousDay.getDate() - 1);


export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const solvedQuestions = await prisma.question.findMany({
        take: 10,
        where: {
            isSolved: true,
            
        }

        
    })
    const topics = await prisma.topic.findMany({
        include: {
          questions: true, // Include related questions
        },
      });

     // Determine completed topics
     const completedTopicsCount = topics.filter(topic => 
        topic.questions.every(question => question.isSolved)
      ).length;
    // Count of solved questions
    const solvedQuestionsCount = await prisma.question.count({
      where: { isSolved: true },
    });

    // Count of topics covered
    const topicsCount = await prisma.topic.count();

    // Todo List example (assuming you have a 'todos' table)
    // This is a placeholder example. Replace with your actual todo list logic if needed.
    
    // Progress chart (pie chart data)
    const totalQuestions = await prisma.question.count();
    const unsolvedQuestionsCount = totalQuestions - solvedQuestionsCount;

    const progressData = [
      { category: "Solved", value: solvedQuestionsCount },
      { category: "Unsolved", value: unsolvedQuestionsCount },
    ];

    res.json({
      solvedQuestionsCount,
      topicsCount,
      solvedQuestions,
      progressData,
      completedTopicsCount
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  } finally {
    await prisma.$disconnect();
  }
};
