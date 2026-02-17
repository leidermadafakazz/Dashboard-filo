import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import PayloadPreview from "../../components/registre/PayloadPreview";
import RegistreForm from "../../components/registre/RegistreForm";
import type { FormState, Payload } from "../../components/registre/types";
import { registrarComercio } from "../../api/RegistrarComercio.api";
import "./RegistrePage.css";
import { useNavigate } from "react-router-dom";
const initialForm: FormState = {
  nombre: "",
  descripcion: "",
  categorias: "",
  direccion: "",
  ciudad: "",
  telefono: "",
};

function RegistrePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const comercioId = localStorage.getItem("comercioId");

    if (userId && comercioId) {
      navigate("/dashboard", { replace: true });
      return;
    }

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      console.log("Codigo recibido:", event.data?.code);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categorias = form.categorias
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const data: Payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      categorias,
      infoComercio: {
        direccion: form.direccion.trim(),
        ciudad: form.ciudad.trim(),
        telefono: form.telefono.trim(),
      },
      imgBannerUrl: "string",
    };

    try {
      const response = await registrarComercio(data);
      console.log("Comercio registrado:", response);
      if (response) navigate("/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al registrar comercio:", error.response?.status, error.response?.data);
      } else {
        console.error("Error al registrar comercio:", error);
      }
    }
  };

  return (
    <div className="registre-page">
      <main className="registre-shell">
        <section className="registre-shell__column registre-shell__column--left">
          <RegistreForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
        </section>
        <section className="registre-shell__column registre-shell__column--right">
          <PayloadPreview  /> 
        </section>
      </main>
    </div>
  );
}

export default RegistrePage;
