import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <section className="dashboard-page">
      <h1 className="dashboard-page__title">Nombre de la tienda</h1>
      <p className="dashboard-page__subtitle">Panel de control</p>

      <div className="dashboard-page__card-area">
        <div className="dashboard-page__card">Informacion de la tienda</div>
      </div>
    </section>
  );
};

export default DashboardPage;
