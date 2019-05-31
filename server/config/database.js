import mongoose from 'mongoose';
import config from './index';

export default {
  async connectDB() {
    try {
      const { CONNECTION_URL } = config.database;
      await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
      console.log('in Connect DB: DB connection successfull');
    } catch (exception) {
      console.log(`Exception occurred while connecting to Mongo ${exception}`);
      // process.exit(1);
    }
  },
};
