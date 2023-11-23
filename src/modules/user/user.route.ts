import express from 'express';
import { UserController } from './user.controller';

// initialize router
const router = express.Router();

// ---------->> Create User Router <<------------ //
router.post('/', UserController.createUser);

// ---------->> Get All Users Router <<------------ //
router.get('/', UserController.getAllUsers);

export const userRoute = router;
