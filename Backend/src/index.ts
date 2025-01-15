import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "create") {
      console.log(`Room created: ${parsedMessage.payload.roomId}`);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "join") {
      console.log(`User  joined room: ${parsedMessage.payload.roomId}`);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "message") {
      const { roomId, message } = parsedMessage.payload;

      // Send the message only to users in the same room
      allSockets.forEach((user) => {
        if (user.room === roomId) {
          user.socket.send(JSON.stringify({
            type: "message",
            payload: {
              message: message,
            },
          }));
        }
      });
    }

    if (parsedMessage.type === "leave") {
      allSockets = allSockets.filter((user) => user.socket !== socket);
    }
  });

  socket.on("close", () => {
    console.log("User  disconnected");
    allSockets = allSockets.filter((user) => user.socket !== socket);
  });
});