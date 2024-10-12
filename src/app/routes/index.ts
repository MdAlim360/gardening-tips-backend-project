import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { roomRoutes } from "../modules/room/room.route";
import { slotRoutes } from "../modules/slots/slot.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { postRoutes } from "../modules/post/post.route";
import { verifyUserRoutes } from "../modules/verify/verifyUser.route";
import { imageRoutes } from "../modules/image_gallary/image.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes
    },
    {
        path: '/rooms',
        route: roomRoutes
    },
    {
        path: '/slots',
        route: slotRoutes
    },
    {
        path: '/',
        route: postRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/payment',
        route: paymentRoutes
    },
    {
        path: '/',
        route: verifyUserRoutes
    },
    {
        path: '/',
        route: imageRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;