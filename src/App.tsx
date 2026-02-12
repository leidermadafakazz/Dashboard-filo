import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Productos */}
      

      {/* Ruta 404 opcional */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;