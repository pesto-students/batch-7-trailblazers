import mongoose from 'mongoose';
import config from './index';

export default {
  async connectDB() {
    let db;
    try {
      const { CONNECTION_URL } = config.database;
      db = await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
    } catch (exception) {
      console.log(`Exception occurred while connecting to Mongo ${exception}`);
      process.exit(1);
    }
    return db;
  },
  disconnectDB() {
    mongoose.connection.close();
  },
};
