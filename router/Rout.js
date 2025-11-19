import { Router } from "express";
import adminrouter from "./adminrouter.js";
import blogrouter from "./blogroute.js";
const router=Router();
router.use('/',adminrouter);
router.use('/',blogrouter)
export default router;