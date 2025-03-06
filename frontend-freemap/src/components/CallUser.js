import { useState } from "react";
import socket from "../services/socket";

import api from "../services/apiService";

const CallUser = ({ userId }) => {
  const [roomId, setRoomId] = useState("");

  const startCall = async () => {
    const res = await api.post("/visio-calling/create-room");
    const data = await res.data;

    setRoomId(data.roomId);
    socket.emit("call-user", {
      to: userId,
      from: socket.id,
      roomId: data.roomId,
    });
  };

  return (
    <div>
      <button onClick={startCall} className="btn btn-primary">
        📞 Appeler
      </button>
      {roomId && (
        <p>
          ID Salle : {roomId}{" "}
          <a href={`https://meet.jit.si/${roomId}`}>Accéder a la réunion</a>
        </p>
      )}
    </div>
  );
};

export default CallUser;
