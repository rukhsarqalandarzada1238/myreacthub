
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindClinic.css";
import "./Dashboard.css";

function FindClinic() {
 const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clinicSearch, setClinicSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleCurrent = () => {
    navigate("/find-clinic-results?mode=current");
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    const clinic = clinicSearch.trim();
    const location = locationSearch.trim();

    if (clinic) params.set("clinic", clinic);
    if (location) params.set("location", location);

    const query = params.toString();

    navigate(
      query
        ? `/find-clinic-results?${query}`
        : "/find-clinic-results"
    );
  };

  const menuItems = [
    { label: "Dashboard", icon: "▣", path: "/dashboard" },
    { label: "Appointments", icon: "▤", path: "/appointments" },
    { label: "Find Doctor", icon: "▥", path: "/find-doctor" },
    { label: "Find Clinic", icon: "▣", path: "/find-clinic", active: true },
    { label: "Chat", icon: "▤", path: "/chat" },
    { label: "Find MarketPlace", icon: "▰", path: "/marketplace" },
    { label: "Find Pharmacy", icon: "🚀", path: "/pharmacy" },
    { label: "My Dependents", icon: "▤", path: "/my-dependents" },
    { label: "My Account", icon: "♟", path: "/account" },
    { label: "Settings", icon: "⚙", path: "/settings" },
  ];

  return (
    <div
      className={`clinic-page ${
        sidebarOpen ? "clinic-sidebar-open" : "clinic-sidebar-closed"
      }`}
    >
      <div className="dashboard-body">
        {/* SIDEBAR */}
        <aside
          className={`pharmacy-sidebar ${
            sidebarOpen ? "show" : ""
          }`}
        >
          <div className="pharmacy-logo">
            <div className="logo-mark">
              M<span>HUB</span>
            </div>

            <div className="logo-text">MyPatientHUB</div>
          </div>

          <nav className="pharmacy-sidebar-menu">
            {menuItems.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`pharmacy-menu-item ${
                  item.active ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.path)}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span
                  className={`pharmacy-menu-icon ${
                    item.active ? "active-icon" : ""
                  }`}
                >
                  {item.icon}
                </span>

                <span className="pharmacy-menu-label">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="pharmacy-help">
            <div className="help-icon">?</div>

            <div className="pharmacy-help-text">
              <h4>Need Help?</h4>
              <p>Contact our support team</p>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR OVERLAY */}
        <div
          className={`clinic-sidebar-overlay ${
            sidebarOpen ? "visible" : ""
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* MAIN CONTENT */}
        <main className="main-content">
          <section className="dashboard-content">
            {/* HERO */}
            <section className="clinic-hero">
              <div className="hero-topbar">
                <div className="hero-left">
                  <button
                    type="button"
                    className="hero-hamburger"
                    onClick={toggleSidebar}
                    aria-label={
                      sidebarOpen ? "Close sidebar" : "Open sidebar"
                    }
                    aria-expanded={sidebarOpen}
                  >
                    <span />
                    <span />
                    <span />
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
                      aria-label="Search"
                    />
                  </div>

                  <button
                    type="button"
                    className="hero-logout"
                    onClick={() => navigate("/login")}
                  >
                    ◉ Log out
                  </button>

                  <button
                    type="button"
                    className="hero-icon"
                    onClick={() => navigate("/settings")}
                    aria-label="Settings"
                  >
                    ⚙
                  </button>

                  <button
                    type="button"
                    className="hero-icon"
                    onClick={() => navigate("/account")}
                    aria-label="My account"
                  >
                    ♟
                  </button>
                </div>
              </div>

              {/* HERO TITLE AND SEARCH */}
              <div className="hero-title">
                <h1>Find a Clinic</h1>

                <p>
                  Discover healthcare clinics and find the right care for you
                </p>

                <form
                  className="search-row"
                  onSubmit={handleSearch}
                >
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search clinic by name or service"
                    value={clinicSearch}
                    onChange={(e) => setClinicSearch(e.target.value)}
                  />

                  <input
                    type="text"
                    className="search-input"
                    placeholder="Zip Code or Neighborhood"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />

                  <button
                    type="button"
                    className="search-button current-button"
                    onClick={handleCurrent}
                  >
                    CURRENT
                  </button>

                  <button
                    type="submit"
                    className="search-button"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </section>

            {/* CLINIC SERVICES */}
            <section className="section">
              <h2 className="section-title">Clinic Services</h2>

              <div className="service-grid">
                <div className="service-card">
                  <div className="service-icon">🏥</div>
                  <div className="service-text">
                    <h3>General Medical Care</h3>
                    <p>
                      Everyday healthcare, health checks, consultations and
                      treatment.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>

                <div className="service-card">
                  <div className="service-icon">🦷</div>
                  <div className="service-text">
                    <h3>Dental Services</h3>
                    <p>
                      Professional dental checkups, cleaning and oral care.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>

                <div className="service-card">
                  <div className="service-icon">🧪</div>
                  <div className="service-text">
                    <h3>Laboratory Services</h3>
                    <p>
                      Medical testing and laboratory services for your
                      healthcare needs.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>

                <div className="service-card">
                  <div className="service-icon">🩻</div>
                  <div className="service-text">
                    <h3>Diagnostic Imaging</h3>
                    <p>
                      Access imaging and diagnostic services in one place.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>

                <div className="service-card">
                  <div className="service-icon">🧘</div>
                  <div className="service-text">
                    <h3>Physiotherapy</h3>
                    <p>
                      Rehabilitation and physical therapy services for better
                      recovery.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>

                <div className="service-card">
                  <div className="service-icon">👩‍⚕️</div>
                  <div className="service-text">
                    <h3>Women's Health</h3>
                    <p>
                      Healthcare services designed around women's health and
                      wellbeing.
                    </p>
                  </div>
                  <span className="arrow">⌄</span>
                </div>
              </div>
            </section>

            {/* CLINIC TYPES */}
            <section className="section">
              <h2 className="section-title">Find Clinics By Type</h2>

              <p className="section-subtitle">
                Choose a clinic type to explore available healthcare services
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

            {/* FOOTER */}
            <footer className="dashboard-footer">
              <p>
                © 2026, made with ♥ by MyPatientHUB for a better web.
              </p>

              <div>
                <a href="#top">MyPatientHUB</a>
                <a href="#about">About Us</a>
                <a href="#blog">Blog</a>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FindClinic;
