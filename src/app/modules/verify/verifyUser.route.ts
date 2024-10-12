import express from 'express'

import auth from '../../middleware/auth'
import { verifyUserController } from './verifyUser.controller';
const router = express.Router()
router.post('/verify-user',
    verifyUserController.createVerifyUser
);

// router.get('/bookings', auth('admin'), bookingController.getAllBookings)
// router.get('/my-bookings', auth('user'), bookingController.getMyBookings)
// router.put('/bookings/:id', auth('admin'), bookingController.updateBookings)
// router.delete('/bookings/:id', bookingController.deleteBooking)

export const verifyUserRoutes = router;