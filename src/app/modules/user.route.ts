import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users', UserController.userCreate);
router.get('/users', UserController.allUsers);
router.get('/users/:userId', UserController.singleUser);
router.put('/users/:userId', UserController.updateOneUser);
router.delete('/users/:userId', UserController.deleteUser);

export const UserRoutes = router;
