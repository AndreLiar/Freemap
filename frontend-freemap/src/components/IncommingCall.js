import { useEffect, useState } from "react";
import socket from "../services/socket";
// import { useNavigate } from "react-router-dom";

const JitsiRoom = () => {
  const [callInfo, setCallInfo] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    socket.on("incoming-call", ({ from, roomId }) => {
      setCallInfo({ from, roomId });
    });

    return () => socket.off("incoming-call");
  }, []);

  return (
    <div>
      {callInfo && (
        <div>
          <p>📞 Appel entrant de {callInfo.from}</p>
          <a
            href={`https://meet.jit.si/${callInfo.roomId}`}
            className="btn btn-success"
          >
            Accepter
          </a>
        </div>
      )}
    </div>
  );
};

export default JitsiRoom;
