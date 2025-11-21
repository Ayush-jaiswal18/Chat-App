import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type == "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomID
            });
        }

        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");

            let currentUserRoom = null;

            // find user's room
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.socket === socket) {
                    currentUserRoom = allSockets[i]?.room;
                }
            }

            for (let i = 0; i < allSockets.length; i++) {
                if (
                    allSockets[i]?.room === currentUserRoom &&
                    allSockets[i]?.socket !== socket   
                ) {
                    allSockets[i]?.socket.send(parsedMessage.payload.message);
                }
            }
        }

    });

});
