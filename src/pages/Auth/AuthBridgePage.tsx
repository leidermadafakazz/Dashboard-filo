import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeBridgeCode } from "../../api/CodigoAcceso.api";
import { useAuth } from "../../context/AuthContext";
import "./AuthBridgePage.css";

const SOURCE_ORIGIN = import.meta.env.VITE_AUTH_BRIDGE_SOURCE_ORIGIN ?? "http://localhost:4002";

type BridgeMessage = {
  code?: unknown;
};

function AuthBridgePage() {
  const [status, setStatus] = useState<"waiting" | "loading" | "success" | "error">("waiting");
  const inFlight = useRef(false);
  const navigate = useNavigate();
  const { setSession } = useAuth();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<BridgeMessage>) => {
      if (event.origin !== SOURCE_ORIGIN || inFlight.current) return;

      const codigo = typeof event.data?.code === "string" ? event.data.code.trim() : "";
      if (!codigo) {
        setStatus("error");
        return;
      }

      inFlight.current = true;
      setStatus("loading");

      try {
        const data = await exchangeBridgeCode({
          codigo,
        });
        setSession(data);

        setStatus("success");
        navigate("/dashboard", { replace: true });
      } catch {
        setStatus("error");
      } finally {
        inFlight.current = false;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate, setSession]);

  return (
    <div className="auth-bridge-page">
      <div className="auth-bridge-loader-wrap" aria-live="polite" aria-busy="true">
        <div className={`auth-bridge-loader auth-bridge-loader--${status}`} />
      </div>
    </div>
  );
}

export default AuthBridgePage;
