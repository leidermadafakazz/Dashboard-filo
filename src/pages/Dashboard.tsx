import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <h1>Nombre de la tienda</h1>
            <p>Panel de control</p>

            <div className="card-area">
                <div className="big-card">
                    Información de la tienda
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;