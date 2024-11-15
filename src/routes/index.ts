import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';
import bookroute from './book.routes';
import mechanismroute from './mechanism.routes';

router.use('/auth', authroute);
router.use('/book', bookroute);
router.use('/mechanism', mechanismroute);

export default router;