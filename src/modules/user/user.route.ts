import express from 'express';
import { UserController } from './user.controller';

// initialize router
const router = express.Router();

// ---------->> Create User Route <<------------ //
router.post('/', UserController.createUser);

// ---------->> Get All Users Route <<------------ //
router.get('/', UserController.getAllUsers);

// ---------->> Ger A users Route <<------------ //
router.get('/:userId', UserController.getUserById);

// ---------->> Update users Route <<------------ //
router.put('/:userId', UserController.updateUser);

// ---------->> Delete users Route <<------------ //
router.delete('/:userId', UserController.deleteUser);

// ----------->> Add Order Route <<------------ //
router.put('/:userId/orders', UserController.addOrder);

// ----------->> Add Order Route <<------------ //
router.get('/:userId/orders', UserController.getUserOrders);

// --------->> Get Total Orders Price Route <<---------- //
router.get('/:userId/orders/total-price', UserController.getTotalOrdersPrice);

export const userRoute = router;
