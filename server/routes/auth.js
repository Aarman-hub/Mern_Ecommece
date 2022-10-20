import express from 'express';
import { auth, login, register, secret } from '../controllers/auth.js';
import { isAdmin, requireSign } from '../middleware/auth.js';


const router = express.Router();


router.get('/', auth);
router.post('/register', register);
router.post('/login', login);
router.get('/secret',requireSign, isAdmin, secret);


export default router;