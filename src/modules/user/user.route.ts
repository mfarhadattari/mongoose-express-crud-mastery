import express from 'express';
import { UserController } from './user.controller';

// initialize router
const router = express.Router();

// ---------->> Create User Router <<------------ //
router.post('/', UserController.createUser);

// ---------->> Get All Users Router <<------------ //
router.get('/', UserController.getAllUsers);

// ---------->> Ger A users router <<------------ //
router.get('/:userId', UserController.getUserById);

// ---------->> Update users router <<------------ //
router.put('/:userId', UserController.updateUser);

export const userRoute = router;
