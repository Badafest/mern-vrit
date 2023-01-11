import http from "http";
import webSocket from "ws";
import app from "./app";
import url from "url";
import userService from "../user/user.service";
import mongoose from "mongoose";
import socketService from "../utilities/SocketService";

const server = http.createServer(app);

const wss = new webSocket.Server({ server });

wss.on("connection", async function (ws: WebSocket, request: any) {
  const { user_id } = url.parse(request.url, true).query as {
    user_id: string;
  };
  try {
    await userService.getUserById(new mongoose.Types.ObjectId(user_id));
    await socketService.insertClient(user_id, ws);
    console.log("socket connected => ", user_id);
  } catch (error) {
    console.log(error);
    console.log("socket not connected => ", user_id);
    return;
  }
  wss.on("message", (message) => {});
  wss.on("close", () => {});
});

export default server;
