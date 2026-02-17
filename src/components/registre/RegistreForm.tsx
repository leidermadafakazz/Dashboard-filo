import type { ChangeEvent, FormEvent } from "react";
import type { FormState } from "./types";
import "./RegistreForm.css";

type RegistreFormProps = {
  form: FormState;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function RegistreForm({ form, onChange, onSubmit }: RegistreFormProps) {
  return (
    <form className="registre-form" onSubmit={onSubmit}>
      <section className="registre-form__hero">
        <p className="registre-form__eyebrow">Registro filo</p>
        <h1 className="registre-form__title">Publica tu comercio</h1>
        <p className="registre-form__subtitle">Completa el formulario y activa tu operacion en filo.</p>
      </section>

      <section className="registre-form__section">
        <h2>Informacion general</h2>
        <label className="registre-form__field">
          Nombre
          <input
            name="nombre"
            type="text"
            placeholder="Nombre del comercio"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </label>
        <label className="registre-form__field">
          Descripcion
          <textarea
            name="descripcion"
            placeholder="Describe el comercio"
            rows={3}
            value={form.descripcion}
            onChange={onChange}
            required
          />
        </label>
        <label className="registre-form__field">
          Categorias
          <input
            name="categorias"
            type="text"
            placeholder="Ej: Panaderia, Cafeteria"
            value={form.categorias}
            onChange={onChange}
          />
          <span className="registre-form__hint">Separa multiples categorias con comas.</span>
        </label>
      </section>

      <section className="registre-form__section">
        <h2>Datos del comercio</h2>
        <label className="registre-form__field">
          Direccion
          <input
            name="direccion"
            type="text"
            placeholder="Calle y numero"
            value={form.direccion}
            onChange={onChange}
            required
          />
        </label>
        <div className="registre-form__grid">
          <label className="registre-form__field">
            Ciudad
            <input
              name="ciudad"
              type="text"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={onChange}
              required
            />
          </label>
          <label className="registre-form__field">
            Telefono
            <input
              name="telefono"
              type="tel"
              placeholder="+57 300 000 0000"
              value={form.telefono}
              onChange={onChange}
              required
            />
          </label>
        </div>
      </section>

      <div className="registre-form__actions">
        <button className="registre-form__button" type="submit">
          Guardar y continuar
        </button>
      </div>
    </form>
  );
}

export default RegistreForm;
