// // socket-server.js
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

// const server = createServer();
// const wss = new WebSocketServer({ noServer: true });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log('Received message:', message);

//     // Broadcast message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === client.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server is running on ws://localhost:3001');
// });



// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

// const server = createServer();
// const wss = new WebSocketServer({ noServer: true });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log('Received message:', message);
//     console.log('Broadcasting message:', message);

//     // Broadcast message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === client.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });

//   ws.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server is running on ws://localhost:3001');
// });

//socket-server.js

// import WebSocket, { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 3001 });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (data) => {
//     // Check if the message is binary and convert it to text
//     const messageData = typeof data === 'string' ? data : new TextDecoder().decode(new Uint8Array(data));

//     try {
//       // Ensure message is a valid JSON string
//       if (messageData.trim()) {
//         const message = JSON.parse(messageData);
//         console.log('Received message:', message);

//         // Broadcast the message to all connected clients
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(message));
//           }
//         });
//       }
//     } catch (error) {
//       console.error('Error parsing message:', error);
//     }
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });

//   ws.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });
// });

// console.log('WebSocket server running on ws://localhost:3001');



import WebSocket, { WebSocketServer } from 'ws';

// Use environment variable for port or fallback to 3001
 const port = process.env.WEBSOCKET_SERVER_PORT;

const wss = new WebSocketServer({ port : 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    // Check if the message is binary and convert it to text
    const messageData = typeof data === 'string' ? data : new TextDecoder().decode(new Uint8Array(data));

    try {
      // Ensure message is a valid JSON string
      if (messageData.trim()) {
        const message = JSON.parse(messageData);
        console.log('Received message:', message);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log(`WebSocket server running on ws://localhost:${port}`);

export default wss;
