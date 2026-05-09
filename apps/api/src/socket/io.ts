import { Server as IOServer } from "socket.io";

export let io: IOServer;

export const initSocket = (instance: IOServer) => {
  io = instance;
  io.on("connection", (socket) => {
    socket.on("disconnect", () => undefined);
  });
};
