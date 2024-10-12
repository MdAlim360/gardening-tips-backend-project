import express from 'express';
import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';


const router = express.Router();

router.post(
    '/login',
    validationRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    '/change-password',
    validationRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
);
router.post(
    '/forget-password',
    AuthControllers.forgetPassword,
);

router.post(
    "/verified-code",
    // validationRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.getForgetPassword,
);
router.post(
    "/update-password",
    // validationRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.postForgetPassword,
);

router.post(
    '/refresh-token',
    // validationRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);


export const AuthRoutes = router;