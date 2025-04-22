const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createRoomController } = require("../controllers/visioCallingController.js");
const router = express.Router();

router.post("/create-room" , createRoomController);
module.exports = router;