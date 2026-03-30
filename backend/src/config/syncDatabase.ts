import sequelize from './database';
import { User, Post, Comment, Vote } from '../models';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export default syncDatabase;