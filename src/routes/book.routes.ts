import { bookcontroller } from "../controllers/book.controller";
import { Express } from "express";
const router = require('express').Router();

import { auth } from '../middleware/auth';
import exp from "constants";

router.get ('/', auth, bookcontroller.getAllBooks);
router.post('/', auth, bookcontroller.addBook);
router.get ('/:id', auth, bookcontroller.getBookById);
router.patch ('/:id', auth, bookcontroller.updateBook);
router.delete('/:id', auth, bookcontroller.deleteBookById);

export default router;