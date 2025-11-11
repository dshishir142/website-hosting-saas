import express from "express";
const router = express.Router();
import { getUsers, createUser, loginUser } from '../controllers/userController';

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);

export default router;