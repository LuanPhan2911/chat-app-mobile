import { getItemAsync } from "expo-secure-store";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export async function createSocket() {
  const token = await getItemAsync("token");

  if (!token) {
    throw new Error("User must logging first");
  }

  if (!socket) {
    socket = io("ws://10.0.2.2:3000", {
      extraHeaders: {
        token,
      },
    });
    socket.on("connect", () => {
      console.log("Socket connected", socket?.connected);
    });
    socket.on("connect_error", (err) => {
      console.log("connect error", err);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return socket;
}

export function getSocket() {
  return socket;
}
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
