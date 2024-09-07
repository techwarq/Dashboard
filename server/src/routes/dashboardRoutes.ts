import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { getDashboardMetrics } from '../controllers/dashboardController';

const router = express.Router();
const prisma = new PrismaClient();

// Async handler to catch errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all topics
router.get('/topics', asyncHandler(async (req: Request, res: Response) => {
  const topics = await prisma.topic.findMany();
  res.json(topics);
}));

// Get a specific topic by ID with questions
router.get('/topics/:id', asyncHandler(async (req: Request, res: Response) => {
  const topic = await prisma.topic.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { questions: true },
  });
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  res.json(topic);
}));

// Create a new topic
router.post('/topics', asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newTopic = await prisma.topic.create({
    data: { name, description },
  });
  res.status(201).json(newTopic);
}));

// Update a topic by ID
router.put('/topics/:id', asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const updatedTopic = await prisma.topic.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description },
    });
    res.json(updatedTopic);
  } catch (error) {
    res.status(404).json({ error: 'Topic not found' });
  }
}));

// Delete a topic by ID
router.delete('/topics/:id', asyncHandler(async (req: Request, res: Response) => {
  try {
    await prisma.topic.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Topic not found' });
  }
}));

// Get all questions for a specific topic
router.get('/topics/:topicId/questions', asyncHandler(async (req: Request, res: Response) => {
  const questions = await prisma.question.findMany({
    where: { topicId: parseInt(req.params.topicId) },
  });
  res.json(questions);
}));

router.get('/topics/:topicId/questions/:questionId', asyncHandler(async (req: Request, res: Response) => {
  const topicId = parseInt(req.params.topicId);
  const questionId = parseInt(req.params.questionId);

  try {
    const question = await prisma.question.findUnique({
      where: { 
        id: questionId,
        topicId: topicId
      },
    });

    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
}));

// Create a new question
router.post('/topics/:topicId/questions', asyncHandler(async (req: Request, res: Response) => {
  const { title, isSolved } = req.body;
  const topicId = parseInt(req.params.topicId);
  const newQuestion = await prisma.question.create({
    data: { title, isSolved, topicId },
  });
  res.status(201).json(newQuestion);
}));

// Update a question by ID
router.put('/topics/:topicId/questions/:questionid', asyncHandler(async (req: Request, res: Response) => {
  const { title, isSolved } = req.body;
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(req.params.questionid) },
      data: { title, isSolved },
    });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(404).json({ error: 'Question not found' });
  }
}));

// Delete a question by ID

router.delete('/topics/:topicId/questions/:questionid', asyncHandler(async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.questionid);
    const topicId = parseInt(req.params.topicId);

    const deletedQuestion = await prisma.question.delete({
      where: { 
        id: questionId,
        topicId: topicId // Ensure the question belongs to the specified topic
      },
    });

    if (deletedQuestion) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
}));
// Get dashboard metrics
router.get('/metrics', asyncHandler(getDashboardMetrics));

export default router;
