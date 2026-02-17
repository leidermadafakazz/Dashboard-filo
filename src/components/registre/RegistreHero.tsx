import "./RegistreHero.css";

function RegistreHero() {
  return (
    <header className="registre-hero">
      <div>
        <p className="registre-hero__eyebrow">Panel de alta delivery</p>
        <h1 className="registre-hero__title">Activa tu comercio para entregas en minutos</h1>
        <p className="registre-hero__subtitle">
          Carga tu menu base, zona de despacho y contacto para empezar a recibir ordenes desde el dashboard.
        </p>
      </div>
      <div className="registre-hero__badge">
        <span>Estado del alta</span>
        <strong>modo express</strong>
      </div>
    </header>
  );
}

export default RegistreHero;
