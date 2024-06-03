import express from 'express';
import {
  google,
  signIn,
  signOut,
  signup,
} from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/logout', signOut);

export default router;
