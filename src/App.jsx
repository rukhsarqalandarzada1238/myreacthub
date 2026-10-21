import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Dashboard.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import FindDoctor from "./FindDoctor";
import FindDoctorResult from "./FindDoctorResult";
import FindClinic from "./FindClinic";
import FindClinicResult from "./FindClinicResult";
import Marketplace from "./Marketplace";
import FindPharmacy from "./FindPharmacy";
import MyDependents from "./MyDependents";
feature-login
import Appointment from "./Appointment";
import AccountSetting from "./AccountSetting";
main

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

        {/* Sign Up */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Appointments */}
        <Route
          path="/appointments"
          element={<Appointment />}
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

 feature-login
=======
        <Route
          path="/pharmacy"
          element={<FindPharmacy />}
        />

 main
        {/* My Dependents */}
        <Route
          path="/my-dependents"
          element={<MyDependents />}
        />

 feature-login
        {/* Old Pharmacy URL */}

        {/* ===== Settings (Account Setting) ===== */}
main
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
