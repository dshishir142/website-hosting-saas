import express from "express";
import { checkTenant, getTenant } from "../controllers/tenantController";
const router = express.Router();

router.get('/check/:subdomain', checkTenant);
router.get('/:subdomain', getTenant)

export default router;