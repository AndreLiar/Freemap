const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("🔵 Utilisateur connecté :", socket.id);

        socket.on("call-user", ({ to, roomId, from }) => {
            io.to(to).emit("incoming-call", { from, roomId });
        });

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`👥 Utilisateur rejoint la salle : ${roomId}`);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Utilisateur déconnecté :", socket.id);
        });
    });

    return io;
};

module.exports = initSocket;
