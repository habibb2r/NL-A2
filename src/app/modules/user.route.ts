import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users', UserController.userCreate);
router.get('/users', UserController.allUsers);

export const UserRoutes = router;
