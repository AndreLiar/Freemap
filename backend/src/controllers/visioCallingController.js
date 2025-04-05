
    const { v4: uuidv4 } = require("uuid");

    // Route pour créer une salle Jitsi
    const createRoomController = async (req, res) => {
        try {
            console.log("Création de la salle");
            const roomId = uuidv4(); // Générer un ID de salle unique
            
            res.status(200).json({ roomId });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la salle" });
        }
    };


// Exporter la fonction sous forme d'objet
module.exports = { createRoomController };
