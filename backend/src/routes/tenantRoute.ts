import express from "express";
import { checkTenant } from "../controllers/tenantController";
const router = express.Router();

router.get('/check/:subdomain', checkTenant);

export default router;