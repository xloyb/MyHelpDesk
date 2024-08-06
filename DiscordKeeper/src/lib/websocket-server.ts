// import { Server } from 'ws';

// const wss = new Server({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   ws.on('message', (message) => {
//     console.log('Received:', message);

//     // Broadcast the message to all clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// console.log('WebSocket server running on ws://localhost:8080');

// export default wss;


import { Server } from 'ws';

const port = process.env.WEBSOCKET_PORT ? parseInt(process.env.WEBSOCKET_PORT, 10) : 8080;
const wss = new Server({ port });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on ws://localhost:${port}`);

export default wss;
