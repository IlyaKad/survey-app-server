import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: `Validation error: ${err.message}` });
  } else if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: `Cast error: ${err.message}` });
  } else {
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

export default errorHandler;