const { Server } = require("socket.io");
const { link } = require("../routes/visioCallingRoutes");
const { getProfile } = require("../services/profileService");
const admin = require("firebase-admin");
const {sendMailToUser} = require("../utils/mailSender");

const users = {}; // Stocke { userId: socketId }
const initSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        // Associer un userId à son socketId
        socket.on("register-user", (userId) => {
            users[userId] = socket.id;
        });
        socket.on("sendNotificationCalling", async ({ userId,senderId, roomId, message }) => {
            
                try {
                    const user = await getProfile(senderId); // Attendre la récupération du profil
                    console.log("roomId", roomId);
                    userName = user? user.name: "Inconnu"; // Assurez-vous que le profil a un champ "name"
                    console.log("user", user);
                    const notification = {
                        message: message,
                        from: userName,
                        link: `https://meet.jit.si/${roomId}`
                    };
                    const userEmail = await admin.auth().getUser(userId);
                    const senderEmail = await admin.auth().getUser(senderId);
                    const result = sendMailToUser(userEmail.email, senderEmail.email, roomId);
                    if( result  ){
                        console.log("Email envoyé avec succès à l'utilisateur :", result);
                    }else {
                        console.log("Erreur lors de l'envoi de l'email :", result);
                    }
                    io.emit(`notification-${userId}`, notification);
                    
            } catch (error) {
                console.error("Erreur lors de la récupération du profil :", error);
            }
            
        });
        // Récupérer l'ID socket d'un utilisateur (exemple d'utilisation)
        socket.on("get-socket-id", (userId, callback) => {
            if (users[userId]) {
                callback(users[userId]); // Renvoie l'ID socket au client
            } else {
                callback(null); // L'utilisateur n'est pas connecté
            }
        });

        // Supprimer l'utilisateur quand il se déconnecte
        socket.on("disconnect", () => {
            const userId = Object.keys(users).find((key) => users[key] === socket.id);
            if (userId) {
                delete users[userId];
                console.log(`🔴 Utilisateur ${userId} déconnecté`);
            }
        });
        socket.on("call-user", ({ to, roomId, from }) => {
            io.to(to).emit("incoming-call", { from, roomId });
        });

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`👥 Utilisateur rejoint la salle : ${roomId}`);
        });
    });

    return io;
};

module.exports = initSocket;
