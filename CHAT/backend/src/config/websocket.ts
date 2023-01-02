import http from "http";
import WebSocket from "ws";
import app from "./app";

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  console.log("Connected to client");

  ws.on("message", (message) => {
    console.log("Message => ", message);
  });

  ws.on("close", () => {});
});

export default server;
