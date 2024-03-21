import express from 'express';
import { auth, login, register, secret, updateProfile } from '../controllers/auth.js';
import { isAdmin, requireSign } from '../middleware/auth.js';


const router = express.Router();


router.get('/user', auth);
router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/secret',requireSign, isAdmin, secret);
router.put('/user/profile', requireSign, updateProfile);

router.get("auth-check", requireSign, (req, res)=>{
    res.json({ok:true});
});

export default router;