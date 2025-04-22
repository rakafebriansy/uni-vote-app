import express, { Request, Response } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { connectDB } from './db';
import { setupWebSocket } from './socket';

const app = express();
const server: HTTPServer = createServer(app);

//setting up web socket
setupWebSocket(server);

app.get('/', (req: Request, res: Response): void => {
  res.send('Voting App is running!');
});

const PORT: number = parseInt(process.env.PORT || '3000', 10);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
