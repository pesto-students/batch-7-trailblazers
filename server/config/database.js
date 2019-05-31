import mongoose from 'mongoose';
import config from './index';
import server from '../app';

export default {
  async connectDB() {
    try {
      const { CONNECTION_URL } = config.database;
      await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
      server.close();
    } catch (exception) {
      // console.log(`Exception occurred while connecting to Mongo ${exception}`);
      process.exit(1);
    }
  },
};
