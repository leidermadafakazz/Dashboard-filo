import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import PrivateLayout from "./layout/PrivateLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductsPage from "./pages/products/ProductsPage";
import RegistrePage from "./pages/registrarComercio/RegistrePage";
import AuthBridgePage from "./pages/Auth/AuthBridgePage";
import { hasCommerce } from "./Auth/auth";

function App() {
  const commerceReady = hasCommerce();

  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/registre"
          element={commerceReady ? <Navigate to="/dashboard" replace /> : <RegistrePage />}
        />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/productos" element={<ProductsPage />} />
        </Route>
      </Route>

      <Route path="/auth/bridge" element={<AuthBridgePage />} />
      <Route path="*" element={<h1>Pagina no encontrada</h1>} />
    </Routes>
  );
}

export default App;
