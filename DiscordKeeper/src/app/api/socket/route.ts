import { WebSocketServer, WebSocket } from 'ws';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as HttpServer, IncomingMessage } from 'http';
import { Socket } from 'net';
import { EventEmitter } from 'events';

interface ExtendedWebSocketServer extends WebSocketServer {
  emit(event: string, ...args: any[]): boolean;
}

let wss: ExtendedWebSocketServer | null = null;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true }) as ExtendedWebSocketServer;

    const server = (res.socket as any).server as HttpServer;

    if (server) {
      server.on('upgrade', (request: IncomingMessage, socket: Socket, head: Buffer) => {
        wss!.handleUpgrade(request, socket, head, (ws: WebSocket) => {
          wss!.emit('connection', ws, request);
        });
      });

      wss.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
          const data = JSON.parse(message.toString());

          if (data.event === 'newComment') {
            wss!.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'newComment', data: data.comment }));
              }
            });
          }
        });
      });
    }
  }

  res.status(200).end();
};

export default handler;
