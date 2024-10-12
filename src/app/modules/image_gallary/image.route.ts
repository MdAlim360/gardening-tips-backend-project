import express from 'express'
import validationRequest from '../../middleware/validateRequest'
import auth from '../../middleware/auth'
import { imageController } from './image.controller';
const router = express.Router()


router.post('/images',

    imageController.createImage
);
router.get('/images', imageController.getAllImage)


export const imageRoutes = router;