import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/appError';
import { createToken } from './utils';
var nodemailer = require("nodemailer");

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(payload.email);
    const { _id, name, email, phone, role, address, picture, followers, following, isBlocked, isDeleted, status, coverPhoto } = user

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client

    const jwtPayload = {
        userId: user.email,
        role: user.role,
        name: user.name,
        id: user._id,
        picture: picture,
        followers: followers,
        following: following,
        isDeleted: isDeleted,
        isBlocked: isBlocked,
        status: status,
        coverPhoto: coverPhoto
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {
        accessToken,
        refreshToken,
        jwtPayload,
        _id,
        name,
        email,
        phone,
        address,
        role,
        picture,
        followers,
        following,
        isDeleted,
        isBlocked,
        status,
        coverPhoto

        // needsPasswordChange: user?.needsPasswordChange,
    };
};

const changePassword = async (
    oldPassword: string,
    newPassword: string,
    email: string,
) => {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Check if the old password matches the current one
    const isPasswordMatched = await User.isPasswordMatched(oldPassword, user.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password does not match!");
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(
        newPassword,
        Number(config.bcrypt_salt_rounds) || 10 // Default to 10 rounds if not provided
    );

    // Update the password and set `passwordChangedAt`
    const updatedUser = await User.findOneAndUpdate(
        { email: email },  // Use `_id` for MongoDB
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        },
        { new: true } // Return the updated document
    );

    if (!updatedUser) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update password");
    }

    return updatedUser;
};


const forgetPassword = async (email: string) => {
    try {
        // Check if the user exists
        const oldUser = await User.findOne({ email }); // Corrected: Search user by email
        if (!oldUser) {
            throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
        }

        // Create a reset token using a secret based on user's password hash
        // const secret = config.jwt_access_secret + oldUser.password;
        // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        //     expiresIn: '15m', // Token valid for 15 minutes
        // });

        // Create reset password link
        // const code = `http://localhost:5100/api/auth/reset-password/${oldUser._id}/${token}`;

        const code = oldUser?.verifiedCode

        // Set up nodemailer for sending email
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'md.alim1042@gmail.com',  // Use environment variables for sensitive info
        //         pass: "melf jmhd tyqc rozr"
        //     },
        // });

        // var mailOptions = {
        //     from: "md.alim1042@gmail.com", // Use environment variable for sender email
        //     to: "apshoratasnim956@gmail.com",
        //     subject: 'Password Reset Request',
        //     html: `<p>You requested a password reset. Click <a href="${link}">here</a> to reset your password. The link is valid for 15 minutes.</p>`,
        // };

        // await transporter.sendMail(mailOptions);
        // console.log(`Password reset link sent to ${email}: ${link}`);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'md.alim1042@gmail.com',
                pass: "melfjmhdtyqcrozr"
            }, tls: {
                rejectUnauthorized: false  // Disable strict validation of certificates
            }
        });

        var mailOptions = {
            from: 'md.alim1042@gmail.com',
            to: email,
            subject: 'Recovery password',
            text: `${code}`
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error)
            } else {
                console.log('Email sent: ' + info.response);
                throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'problem')
            }
        });

        return {
            message: 'Password reset email sent successfully!',
            resetLink: code,  // For testing, you can return the link
        };
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not send password reset email');
    }
};

const getForgetPassword = async (verifiedCode: number, newPassword: string) => {
    const oldUser = await User.findOne({ verifiedCode });
    if (!oldUser) {
        throw new AppError(httpStatus.FORBIDDEN, 'Invalid code');
    }
    if (oldUser.verifiedCode === verifiedCode) {
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await User.updateOne(
            { verifiedCode: verifiedCode },
            { $set: { password: encryptedPassword } }
        );

        return updatePassword;
    }
    else {
        throw new AppError(httpStatus.FORBIDDEN, 'Invalid code');
    }


    // const secret = config.jwt_access_secret + oldUser.password;

    // try {
    //     const verify = jwt.verify(token, secret) as JwtPayload | string;

    //     if (typeof verify === 'string') {
    //         throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token format');
    //     }

    //     return { email: verify.email, status: "Not Verified" };
    // } catch (error) {
    //     console.log(error);
    //     return "Not Verified";
    // }
};

const postForgetPassword = async (userId: string, password: string) => {
    const oldUser = await User.findById(userId);
    if (!oldUser) {
        throw new AppError(httpStatus.FORBIDDEN, 'User does not exist');
    }

    // const secret = config.jwt_access_secret + oldUser.password;

    try {
        // const verify = jwt.verify(token, secret) as JwtPayload | string;

        // if (typeof verify === 'string') {
        //     throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token format');
        // }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const updatePassword = await User.updateOne(
            { _id: userId },
            { $set: { password: encryptedPassword } }
        );

        return updatePassword;
    } catch (error) {
        console.log(error);
        return { status: "password update failed" };
    }
};



const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }



    // if (
    //     user.passwordChangedAt &&
    //     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    // ) {
    //     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // }

    const jwtPayload = {
        userId: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    getForgetPassword,
    postForgetPassword

};