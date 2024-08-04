import { Router } from 'express';
import { createSurvey, getUserSurveys, getSurveyById, updateSurvey, deleteSurvey } from '../controllers/surveyController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/surveys', authenticateJWT, createSurvey);
router.get('/surveys', authenticateJWT, getUserSurveys);
router.get('/surveys/:id', authenticateJWT, getSurveyById);
router.put('/surveys/:id', authenticateJWT, updateSurvey);
router.delete('/surveys/:id', authenticateJWT, deleteSurvey);

export default router;
