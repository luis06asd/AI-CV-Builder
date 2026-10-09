import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { checkDatabaseConnection } from './config/database.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import cvRouter from './routes/cv.routes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());
app.use('/api/cvs', cvRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
  app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
  });

  try {
    await checkDatabaseConnection();
    console.log('MySQL connection established.');
  } catch (error) {
    console.error('Unable to connect to MySQL. Check the configured environment variables.', error);
  }
};

void startServer();
