import { Request, Response } from 'express';
import { Post, Vote, User } from '../models';

interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

interface CreatePostRequest extends AuthRequest {
  body: {
    title: string;
    content?: string;
    url?: string;
  };
}

interface VoteRequest extends AuthRequest {
  body: {
    value: number;
  };
  params: {
    id: string;
  };
}

export const createPost = async (req: CreatePostRequest, res: Response) => {
  try {
    const { title, content, url } = req.body;
    const userId = req.user!.id;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!content && !url) {
      return res.status(400).json({ message: 'Either content or url is required' });
    }

    const post = await Post.create({
      title,
      content,
      url,
      userId,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['score', 'DESC'], ['createdAt', 'DESC']],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const votePost = async (req: VoteRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const userId = req.user!.id;

    if (value !== 1 && value !== -1) {
      return res.status(400).json({ message: 'Value must be 1 or -1' });
    }

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user has already voted
    const existingVote = await Vote.findOne({
      where: { userId, postId: id },
    });

    if (existingVote) {
      // Update existing vote
      await existingVote.update({ value });
    } else {
      // Create new vote
      await Vote.create({ userId, postId: parseInt(id), value });
    }

    // Update post score
    const votes = await Vote.findAll({ where: { postId: id } });
    const score = votes.reduce((sum, vote) => sum + vote.value, 0);
    await post.update({ score });

    res.json({ message: 'Vote recorded successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};