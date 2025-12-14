import express from "express";
const router = express.Router();
import { getUsers, createUser, loginUser, setSubDomainName, logOutUser } from '../controllers/userController';

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/subdomain', setSubDomainName);
router.post('/logout', logOutUser);

export default router;