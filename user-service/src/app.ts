import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Database connection
const mongoUri = process.env.MONGO_ATLAS_URI || '';

mongoose.connect(mongoUri)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
