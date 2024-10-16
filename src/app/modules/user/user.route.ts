import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';



const router = express.Router()

router.post('/signup',
    validationRequest(userValidation.userValidationSchema),
    userController.createUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getSingleUser);
router.put('/users/:id', userController.updateUsers)
export const userRoutes = router;