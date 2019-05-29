const { PORT, DATABASE_CONNECTION_STRING } = process.env;

export default {
  server: {
    SERVER_PORT: PORT || 8000
  },
  database: {
    CONNECTION_STRING:
      DATABASE_CONNECTION_STRING || "mongodb://localhost:27017/issues-tracker"
  }
};
