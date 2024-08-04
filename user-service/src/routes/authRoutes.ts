import { Router } from 'express';
import { register, login, authenticateJWT } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

export default router;
