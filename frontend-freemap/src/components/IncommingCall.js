import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../services/socket";
// import { useNavigate } from "react-router-dom";
const JitsiRoom = () => {
  const [callInfo, setCallInfo] = useState(null);
  const [userId, setUserId] = useState(() => {
    // Initialisation de l'état avec une fonction
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).userId : null;
  });


  // const navigate = useNavigate();

  useEffect(() => {
    socket.on(`notification-${userId}`, (notification) => {
      toast.info(
        <div className="custom-toast">
          <h4>📞 Appel entrant de {notification.from}</h4>
          <p>{notification.message}</p>
          <a
            target="_blank"
            href={notification.link}
            className="btn btn-success"
          >
            Accepter
          </a>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    });

    return () => socket.off(`notification-${userId}`);
  }, [userId]);

};

export default JitsiRoom;
