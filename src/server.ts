import express from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { connectDB } from './db';
import { setupWebSocket } from './socket';
import routes from './routes'
import dotenv from 'dotenv';

const app = express();
const server: HTTPServer = createServer(app);

dotenv.config();

setupWebSocket(server);

app.use(express.json());

app.use('/api', routes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);

connectDB().then(() => {
  server.listen(PORT, () => {
    // console.log(`Server running at http://localhost:${PORT}`);
  });
});

export default app;