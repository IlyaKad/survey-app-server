import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    const { user, token } = await authService.register(fullName, email, password);
    res.status(201).send({ user, token });
  } catch (error) {
    const err = error as Error;
    res.status(400).send(err.message);
  }
};

// Login a user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.login(email, password);
    res.send({ user, token });
  } catch (error) {
    const err = error as Error;
    res.status(404).send(err.message);
  }
};

// Middleware to authenticate JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = authService.authenticateJWT(token);
    req.user = verified;
    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).send(err.message);
  }
};
