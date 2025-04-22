import { WebSocketServer, WebSocket } from 'ws';

//this function receive http server (from express), then attach WebSocketServer into it
export function setupWebSocket(server: import('http').Server): void {

  //create WebSocketServer instance
  const wss: WebSocketServer = new WebSocketServer({ server });

  //listen when client connect to WebSocketServer
  wss.on('connection', (socket: WebSocket) => {
    console.log('WebSocket connected');

    //listen when client send message to WebSocketServer
    socket.on('message', (message: string | Buffer) => {
      const data: string = message.toString();
      console.log('Received:', data);

      //send the same message to all other clients that are currently connected
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`Broadcast: ${data}`);
        }
      });
    });

    //send message when the client first connects
    socket.send('Welcome to Uni Vote App');
  });
}
