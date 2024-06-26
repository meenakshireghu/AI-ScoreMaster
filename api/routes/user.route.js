import express from 'express';
import { deleteUser ,test , updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { createValuator } from '../controllers/auth.controller.js';


const router = express.Router();
router.get('/test', test);
router.post('/update/:id', verifyToken ,updateUser);
router.delete('/delete/:id', verifyToken ,deleteUser);
router.post('/create-valuator', verifyToken, createValuator);

export default router;
