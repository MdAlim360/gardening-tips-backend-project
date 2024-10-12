import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken, jwtPayload, _id, name, email, role, address, phone } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `${jwtPayload.role} is logged in successfully`,
        token: accessToken,
        data: {
            _id,
            name,
            email,
            phone,
            role,
            address

        },
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword, email } = req.body;

    const result = await AuthServices.changePassword(oldPassword, newPassword, email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is changed succesfully!',
        data: result,
    });
});
const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;

    const result = await AuthServices.forgetPassword(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is recovering',
        data: result,
    });
});
const getForgetPassword = catchAsync(async (req, res) => {
    // const { id, token } = req.params;
    const { verifiedCode, userId, newPassword } = req.body

    const result = await AuthServices.getForgetPassword(verifiedCode, newPassword);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'You are verified',
        data: result,
    });
});
const postForgetPassword = catchAsync(async (req, res) => {
    const { userId, password } = req.body;

    const result = await AuthServices.postForgetPassword(userId, password);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    });
});

const refreshToken = catchAsync(async (req, res) => {

    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    getForgetPassword,
    postForgetPassword,
};