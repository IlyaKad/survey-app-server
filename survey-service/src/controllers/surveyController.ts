import { Request, Response, NextFunction } from 'express';
import surveyService from '../services/surveyService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const createSurvey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveyToAdd = req.body;
    if (!surveyToAdd) {
      return res.status(400).send({ error: 'No survey data' });
    }
    const survey = await surveyService.createSurvey(req.body);
    res.status(201).json(survey);
  } catch (error) {
    next(error);
  }
};

export const getUserSurveys = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user && (req.user as any).userId;
    if (!userId) {
      return res.status(400).send({ error: 'User ID is required' });
    }
    const surveys = await surveyService.getUserSurveys(userId);

    if (!surveys || surveys.length === 0) {
      return res.status(404).send({ error: 'No surveys found for the user' });
    }
    res.status(200).send(surveys);
  } catch (error) {
    next(error);
  }
};

export const getSurveyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveyId = req.params.id;
    if (!surveyId) {
      return res.status(400).send({ error: 'Survey ID is required' });
    }
    const survey = await surveyService.getSurveyById(surveyId);

    if (!survey) {
      return res.status(404).send({ error: `No surveys found for this id: ${surveyId}` });
    }
    res.status(200).send(survey);
  } catch (error) {
    next(error);
  }
};

export const updateSurvey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveyId = req.params.id;
    if (!surveyId) {
      return res.status(400).send({ error: 'Survey ID is required' });
    }
    const updatedSurvey = await surveyService.updateSurvey(surveyId, req.body);

    if (!updatedSurvey) {
      return res.status(404).send();
    }
    res.status(200).send(updatedSurvey);
  } catch (error) {
    next(error);
  }
};

export const deleteSurvey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const surveyId = req.params.id;
    if (!surveyId) {
      return res.status(400).send({ error: 'Survey ID is required' });
    }
    await surveyService.deleteSurvey(surveyId);

    res.status(200).send({ message: 'Survey deleted successfully' });
  } catch (error) {
    next(error);
  }
};
