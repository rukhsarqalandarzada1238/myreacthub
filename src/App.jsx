import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import FindDoctor from "./FindDoctor";
import FindClinic from "./FindClinic";
import FindDoctorResult from "./FindDoctorResult";
import FindClinicResult from "./FindClinicResult";
import Marketplace from "./Marketplace";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Website start */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Doctor */}
        <Route
          path="/find-doctor"
          element={<FindDoctor />}
        />

        <Route
          path="/find-doctor-results"
          element={<FindDoctorResult />}
        />

        {/* Clinic */}
        <Route
          path="/find-clinic"
          element={<FindClinic />}
        />

        <Route
          path="/find-clinic-results"
          element={<FindClinicResult />}
        />

        {/* Marketplace */}
        <Route
          path="/marketplace"
          element={<Marketplace />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
