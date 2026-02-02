import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token, userId) => {
  if (!token || !userId) {
    return;
  }

  if (socket) {
    return socket;
  }

  socket = io(import.meta.env.VITE_API_URL, {
    auth: { token, userId },
    transports: ["websocket"],
  });
  socket.on("connect", () => {
    //console.log("🔌 SOCKET CONNECTED:", socket.id);
    //console.log(userId);
    socket.emit("userLoggedIn", { userId });
  });

  socket.on("connect_error", (err) => { });
  //console.error(" SOCKET ERROR:", err.message);// add new
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
