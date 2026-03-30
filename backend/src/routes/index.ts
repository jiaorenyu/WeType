import express from 'express';
import { register, login } from '../controllers/authController';
import { createPost, getPosts, getPostById, votePost } from '../controllers/postController';
import { createComment, getCommentsByPostId, voteComment } from '../controllers/commentController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Post routes
router.post('/posts', authenticate, createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.post('/posts/:id/vote', authenticate, votePost);

// Comment routes
router.post('/comments', authenticate, createComment);
router.get('/comments/post/:postId', getCommentsByPostId);
router.post('/comments/:id/vote', authenticate, voteComment);

export default router;