import { useEffect, useRef } from "react";

const JitsiMeetComponent = ({ roomName }) => {
  const jitsiContainer = useRef(null);

  useEffect(() => {
    // Vérifie si le script est déjà chargé
    if (!document.getElementById("jitsi-script")) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.id = "jitsi-script";
      script.onload = () => initJitsi();
      document.body.appendChild(script);
    } else {
      initJitsi();
    }

    function initJitsi() {
      if (window.JitsiMeetExternalAPI) {
        const domain = "meet.jit.si";
        const options = {
          roomName,
          parentNode: jitsiContainer.current,
          width: "100%",
          height: "500px",
          configOverwrite: {
            // Autorise les participants à rejoindre sans connexion
            disableThirdPartyRequests: true,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            // D'autres options comme la suppression de l'authentification
          },
          interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
          },
        };
        new window.JitsiMeetExternalAPI(domain, options);
      } else {
        console.error("Jitsi Meet API non disponible.");
      }
    }

    return () => {
      // Nettoyage si nécessaire
    };
  }, [roomName]);

  return (
    <div ref={jitsiContainer} style={{ width: "100%", height: "500px" }} />
  );
};

export default JitsiMeetComponent;
