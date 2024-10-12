import express from 'express'
import { postController } from './post.controller'
import validationRequest from '../../middleware/validateRequest'
import auth from '../../middleware/auth'
import { postValidation } from './post.validation'
const router = express.Router()


router.post('/posts',
    validationRequest(postValidation.postValidationSchema),
    postController.createPost
);
router.get('/posts', postController.getAllPost)
router.get('/my-post/:id', auth('user', 'admin'), postController.getMyPost)
router.get('/posts/:id', postController.getSinglePost);
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)

export const postRoutes = router;