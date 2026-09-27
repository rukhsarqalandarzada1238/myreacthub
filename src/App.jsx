import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import FindDoctor from "./FindDoctor";

import FindClinic from "./FindClinic";
import FindDoctorResult from "./FindDoctorResult";
import FindClinicResult from "./FindClinicResult";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/find-doctor" element={<FindDoctor />} />

        <Route
          path="/find-doctor-results"
          element={<FindDoctorResult />}
        />

        <Route path="/find-clinic" element={<FindClinic />} />

        <Route
          path="/find-clinic-results"
          element={<FindClinicResult />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;