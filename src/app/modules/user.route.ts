import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users', UserController.userCreate);
router.get('/users', UserController.allUsers);
router.get('/users/:userId', UserController.singleUser);
router.put('/users/:userId', UserController.updateOneUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId/orders', UserController.doOrder);
router.get('/users/:userId/orders', UserController.getOrders);
router.get('/users/:userId/orders/total-price', UserController.getTotalPrice)

export const UserRoutes = router;
