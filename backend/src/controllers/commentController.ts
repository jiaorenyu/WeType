import { Request, Response } from 'express';
import { Comment, Vote, User, Post } from '../models';

interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

interface CreateCommentRequest extends AuthRequest {
  body: {
    content: string;
    postId: number;
    parentId?: number;
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

export const createComment = async (req: CreateCommentRequest, res: Response) => {
  try {
    const { content, postId, parentId } = req.body;
    const userId = req.user!.id;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Check if post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if parent comment exists
    if (parentId) {
      const parentComment = await Comment.findByPk(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }

    const comment = await Comment.create({
      content,
      postId,
      parentId,
      userId,
    });

    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId, parentId: null },
      include: [
        { model: User, attributes: ['id', 'username'] },
        { 
          model: Comment, 
          as: 'children',
          include: [
            { model: User, attributes: ['id', 'username'] },
            { model: Comment, as: 'children', include: [{ model: User, attributes: ['id', 'username'] }] }
          ]
        }
      ],
      order: [['score', 'DESC'], ['createdAt', 'ASC']],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const voteComment = async (req: VoteRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const userId = req.user!.id;

    if (value !== 1 && value !== -1) {
      return res.status(400).json({ message: 'Value must be 1 or -1' });
    }

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user has already voted
    const existingVote = await Vote.findOne({
      where: { userId, commentId: id },
    });

    if (existingVote) {
      // Update existing vote
      await existingVote.update({ value });
    } else {
      // Create new vote
      await Vote.create({ userId, commentId: parseInt(id), value });
    }

    // Update comment score
    const votes = await Vote.findAll({ where: { commentId: id } });
    const score = votes.reduce((sum, vote) => sum + vote.value, 0);
    await comment.update({ score });

    res.json({ message: 'Vote recorded successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};