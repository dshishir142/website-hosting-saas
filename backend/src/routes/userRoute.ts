import express from 'express';
const router = express.Router();
import { getUsers } from '../controllers/userController';

router.get('/getUsers', getUsers);

export default router;