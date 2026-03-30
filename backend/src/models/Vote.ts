import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Post from './Post';
import Comment from './Comment';

class Vote extends Model {
  public id!: number;
  public userId!: number;
  public postId?: number;
  public commentId?: number;
  public value!: number; // 1 for upvote, -1 for downvote
  public createdAt!: Date;
  public updatedAt!: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Post,
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Comment,
        key: 'id',
      },
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, -1]],
      },
    },
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'],
        where: {
          commentId: null,
        },
      },
      {
        unique: true,
        fields: ['userId', 'commentId'],
        where: {
          postId: null,
        },
      },
    ],
  }
);

Vote.belongsTo(User, { foreignKey: 'userId' });
Vote.belongsTo(Post, { foreignKey: 'postId' });
Vote.belongsTo(Comment, { foreignKey: 'commentId' });

User.hasMany(Vote, { foreignKey: 'userId' });
Post.hasMany(Vote, { foreignKey: 'postId' });
Comment.hasMany(Vote, { foreignKey: 'commentId' });

export default Vote;