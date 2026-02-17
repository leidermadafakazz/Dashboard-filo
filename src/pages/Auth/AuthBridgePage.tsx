import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCommerceId, setToken, setUserId } from "../../Auth/auth";
import { exchangeBridgeCode } from "../../api/CodigoAcceso.api";
import "./AuthBridgePage.css";

const SOURCE_ORIGIN = "http://localhost:3000";

type BridgeMessage = {
  code?: unknown;
};

function AuthBridgePage() {
  const [status, setStatus] = useState<"waiting" | "loading" | "success" | "error">("waiting");
  const inFlight = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<BridgeMessage>) => {
      if (event.origin !== SOURCE_ORIGIN || inFlight.current) return;

      const accessCode = typeof event.data?.code === "string" ? event.data.code.trim() : "";
      if (!accessCode) {
        setStatus("error");
        return;
      }

      inFlight.current = true;
      setStatus("loading");

      try {
        const data = await exchangeBridgeCode({
          accessCode,
          audience: "ControlGastosClients",
        });

        setToken(data.token);
        setUserId(String(data.id));
        setCommerceId(data.comercioId);

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
  }, [navigate]);

  return (
    <div className="auth-bridge-page">
      <div className="auth-bridge-loader-wrap" aria-live="polite" aria-busy="true">
        <div className={`auth-bridge-loader auth-bridge-loader--${status}`} />
      </div>
    </div>
  );
}

export default AuthBridgePage;
