import express from 'express';
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

app.use('/api', dashboardRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

const PORT = process.env.PORT || 3005;

testDatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});