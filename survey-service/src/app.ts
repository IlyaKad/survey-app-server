import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import surveyRoutes from './routes/surveyRoutes';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(express.json());

// Routes
app.use('/api', surveyRoutes);

// Database connection
const mongoUri = process.env.MONGO_URI || '';

mongoose.connect(mongoUri)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Start server
app.listen(port, () => {
  console.log(`Survey service is running on port ${port}`);
});

export default app;