import { Express } from "express";
const router = require('express').Router();

import { auth } from "../middleware/auth";
import { mechanismcontroller } from "../controllers/mechanism.controller";

router.post("/borrow/:id", auth, mechanismcontroller.borrow);
router.post("/return/:id", auth, mechanismcontroller.returnBook);
router.get("/", mechanismcontroller.healthCheck);

export default router;