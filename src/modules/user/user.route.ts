import express from 'express';
import { UserController } from './user.controller';

// initialize router
const router = express.Router();

// ---------->> Create User Router <<------------ //
router.post('/', UserController.createUser);

export const userRoute = router;
