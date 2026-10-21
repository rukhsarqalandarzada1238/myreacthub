import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Dashboard.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import FindDoctor from "./FindDoctor";
import FindDoctorResult from "./FindDoctorResult";
import FindClinic from "./FindClinic";
import FindClinicResult from "./FindClinicResult";
import Marketplace from "./Marketplace";
import FindPharmacy from "./FindPharmacy";
import MyDependents from "./MyDependents";
import AccountSetting from "./AccountSetting";
import Chat from "./Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
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

        {/* Chat */}
        <Route
          path="/chat"
          element={<Chat />}
        />

        {/* Find Doctor */}
        <Route
          path="/find-doctor"
          element={<FindDoctor />}
        />

        <Route
          path="/find-doctor-results"
          element={<FindDoctorResult />}
        />

        {/* Find Clinic */}
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

        {/* Find Pharmacy */}
        <Route
          path="/find-pharmacy"
          element={<FindPharmacy />}
        />

        <Route
          path="/pharmacy"
          element={<FindPharmacy />}
        />

        {/* My Dependents */}
        <Route
          path="/my-dependents"
          element={<MyDependents />}
        />

        {/* ===== Settings (Account Setting) ===== */}
        <Route
          path="/settings"
          element={<AccountSetting />}
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