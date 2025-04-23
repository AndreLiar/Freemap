import { io } from "socket.io-client";

const socket = io("https://freemap-backend.onrender.com/");
// Associe l'ID utilisateur au socket après connexion
socket.on("connect", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user!==null) {
    console.log("🔵 Utilisateur connecté :", user);
    socket.emit("register-user", user.userId);
  }
});
export default socket;
