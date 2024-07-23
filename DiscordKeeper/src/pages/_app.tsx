// import { useEffect } from 'react';

// const WebSocketClient = () => {
//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080');

//     ws.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     ws.onmessage = (event) => {
//       console.log('Message from server:', event.data);
//     };

//     ws.onclose = () => {
//       console.log('Disconnected from WebSocket server');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return null;
// };

// export default WebSocketClient;

import { useEffect, useState } from 'react';

const WebSocketClient = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
      // Update state to trigger a re-render
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketClient;
