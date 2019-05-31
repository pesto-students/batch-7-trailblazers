const { PORT, DATABASE_CONNECTION_STRING } = process.env;

export default {
  server: {
    PORT: PORT || 8000,
  },
  database: {
    CONNECTION_URL:
      'mongodb+srv://trailblazer:trailblazer@issues-tracker-juky2.mongodb.net/test?retryWrites=true&w=majority'
      || 'mongodb://localhost:27017/issues-tracker',
  },
};
