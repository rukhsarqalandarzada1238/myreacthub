import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home: redirect to Login */}
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

        {/* My Dependents */}
        <Route
          path="/my-dependents"
          element={<MyDependents />}
        />

        {/* Old Pharmacy URL - keep it working */}
        <Route
          path="/pharmacy"
          element={<FindPharmacy />}
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