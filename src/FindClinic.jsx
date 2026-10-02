import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindClinic.css";
import "./Dashboard.css";

function FindClinic() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinicSearch, setClinicSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCurrent = () => {
    navigate("/find-clinic-results?mode=current");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (clinicSearch.trim() !== "") {
      params.set("clinic", clinicSearch.trim());
    }

    if (locationSearch.trim() !== "") {
      params.set("location", locationSearch.trim());
    }

    const query = params.toString();

    if (query) {
      navigate(`/find-clinic-results?${query}`);
    } else {
      navigate("/find-clinic-results");
    }
  };

  return (
    <div className="clinic-page">
      <div className="dashboard-body">

        {/* ================= SIDEBAR ================= */}

        <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

          <div className="logo-area">
            <div className="logo-icon">M</div>
            <span>MyPatientHUB</span>
          </div>

          <nav className="sidebar-menu">

            <button
              type="button"
              className="menu-item"
              onClick={() => navigate("/dashboard")}
            >
              <span className="menu-icon">▣</span>
              <span>Dashboard</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">▤</span>
              <span>Appointments</span>
            </button>

            <button
              type="button"
              className="menu-item"
              onClick={() => navigate("/find-doctor")}
            >
              <span className="menu-icon">♟</span>
              <span>Find Doctor</span>
            </button>

            <button
              type="button"
              className="menu-item active"
            >
              <span className="menu-icon">▦</span>
              <span>Find Clinic</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">▣</span>
              <span>Chat</span>
            </button>
            <button
              type="button"
              className="menu-item"
              onClick={() => navigate("/marketplace")}
            >
              <span className="menu-icon">▤</span>
              <span>Find Market-Place</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">▦</span>
              <span>Find Pharmacy</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">▤</span>
              <span>My Dependents</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">⚒</span>
              <span>My Account</span>
            </button>

            <button type="button" className="menu-item">
              <span className="menu-icon">⚙</span>
              <span>Settings</span>
            </button>

          </nav>

          <div className="help-box">
            <span>?</span>
          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="main-content">

          <section className="dashboard-content">

            {/* ================= HERO ================= */}

            <section className="clinic-hero">

              <div className="hero-topbar">

                <div className="hero-left">

                  <button
                    type="button"
                    className="hero-hamburger"
                    onClick={toggleSidebar}
                    aria-label="Open menu"
                  >
                    ☰
                  </button>

                  <div className="hero-breadcrumb">

                    <div>
                      <span className="breadcrumb-home">⌂</span>
                      <span>/</span>
                      <span>Find Clinic</span>
                    </div>

                    <strong>Find Clinic</strong>

                  </div>

                </div>


                <div className="hero-right">

                  <div className="hero-search">

                    <span>⌕</span>

                    <input
                      type="text"
                      placeholder="Type here..."
                    />

                  </div>

                  <button
                    type="button"
                    className="hero-logout"
                    onClick={() => navigate("/login")}
                  >
                    ◉ Log out
                  </button>

                  <span className="hero-icon">⚙</span>
                  <span className="hero-icon">♟</span>

                </div>

              </div>


              {/* ================= HERO TITLE ================= */}

              <div className="hero-title">

                <h1>Find a Clinic</h1>

                <p>
                  Discover healthcare clinics and find the right care for you
                </p>


                {/* ================= SEARCH ================= */}

                <div className="search-row">

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search clinic by name or service"
                    value={clinicSearch}
                    onChange={(e) =>
                      setClinicSearch(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Zip Code or Neighborhood"
                    value={locationSearch}
                    onChange={(e) =>
                      setLocationSearch(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="search-button current-button"
                    onClick={handleCurrent}
                  >
                    CURRENT
                  </button>

                  <button
                    type="button"
                    className="search-button"
                    onClick={handleSearch}
                  >
                    SEARCH
                  </button>

                </div>

              </div>

            </section>


            {/* ================= CLINIC SERVICES ================= */}

            <section className="section">

              <h2 className="section-title">
                Clinic Services
              </h2>

              <div className="service-grid">

                <div className="service-card">

                  <div className="service-icon">
                    🏥
                  </div>

                  <div className="service-text">

                    <h3>
                      General Medical Care
                    </h3>

                    <p>
                      Everyday healthcare, health checks,
                      consultations and treatment.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>


                <div className="service-card">

                  <div className="service-icon">
                    🦷
                  </div>

                  <div className="service-text">

                    <h3>
                      Dental Services
                    </h3>

                    <p>
                      Professional dental checkups,
                      cleaning and oral care.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>


                <div className="service-card">

                  <div className="service-icon">
                    🧪
                  </div>

                  <div className="service-text">

                    <h3>
                      Laboratory Services
                    </h3>

                    <p>
                      Medical testing and laboratory
                      services for your healthcare needs.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>


                <div className="service-card">

                  <div className="service-icon">
                    🩻
                  </div>

                  <div className="service-text">

                    <h3>
                      Diagnostic Imaging
                    </h3>

                    <p>
                      Access imaging and diagnostic
                      services in one place.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>


                <div className="service-card">

                  <div className="service-icon">
                    🧘
                  </div>

                  <div className="service-text">

                    <h3>
                      Physiotherapy
                    </h3>

                    <p>
                      Rehabilitation and physical therapy
                      services for better recovery.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>


                <div className="service-card">

                  <div className="service-icon">
                    👩‍⚕️
                  </div>

                  <div className="service-text">

                    <h3>
                      Women's Health
                    </h3>

                    <p>
                      Healthcare services designed around
                      women's health and wellbeing.
                    </p>

                  </div>

                  <span className="arrow">
                    ⌄
                  </span>

                </div>

              </div>

            </section>


            {/* ================= CLINIC TYPES ================= */}

            <section className="section">

              <h2 className="section-title">
                Find Clinics By Type
              </h2>

              <p className="section-subtitle">
                Choose a clinic type to explore available
                healthcare services
              </p>


              <div className="specialty-grid">

                <div className="specialty">
                  <span>General Medical Clinic</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Dental Clinic</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Specialist Clinic</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Children's Clinic</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Women's Health Clinic</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Diagnostic Center</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Physiotherapy Center</span>
                  <span>⌄</span>
                </div>

                <div className="specialty">
                  <span>Urgent Care Clinic</span>
                  <span>⌄</span>
                </div>

              </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="dashboard-footer">

              <p>
                ©️ 2026, made with ♥️ by MyPatientHUB
                for a better web.
              </p>

              <div>
                <a href="#">MyPatientHUB</a>
                <a href="#">About Us</a>
                <a href="#">Blog</a>
              </div>

            </footer>

          </section>

        </main>

      </div>
    </div>
  );
}

export default FindClinic;