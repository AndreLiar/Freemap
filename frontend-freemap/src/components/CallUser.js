import { useState } from "react";
import socket from "../services/socket";

import api from "../services/apiService";

const CallUser = ({ userId }) => {

  const startCall = async () => {
    const res = await api.post("/visio-calling/create-room");
    const data = await res.data;
    const user = JSON.parse(localStorage.getItem("user"));
    const senderId = user.userId;
    socket.emit("sendNotificationCalling", { userId,senderId, roomId:data.roomId, message: "Nouvelle alerte !" });
    window.open(`https://meet.jit.si/${data.roomId}`, "_blank");
  };
 
  return (
    <div>
      <button onClick={startCall} className="btn btn-primary">
        📞 Appeler
      </button>
    </div>
  );
};

export default CallUser;
