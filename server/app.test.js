import http from 'http';
import mongoose from 'mongoose';
import config from './config';

const port = config.server.PORT;

describe('httpServer', () => {
  let server;

  beforeAll(() => {
    server = http.createServer((req, res) => {
      res.write('ok');
      res.end();
    });
    server.listen(port);
  });

  afterAll(() => {
    server.close();
  });

  describe('/', () => {
    test('should return 200', (done) => {
      http.get(`http://localhost:${port}`, (res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});

describe('MongoDB connection', () => {
  let database;
  beforeAll(async () => {
    database = await mongoose.connect(config.database.CONNECTION_URL, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await database.disconnect();
  });

  it('should insert a doc into collection', async (done) => {
    expect(database).not.toBe(null);
    done();
  });
});
