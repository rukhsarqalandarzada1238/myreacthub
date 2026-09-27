import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-body">
      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

        <div className="logo-area">
          <div className="logo-icon">M</div>
          <span>MyPatientHUB</span>
        </div>

        <nav className="sidebar-menu">

          <button
            type="button"
            className="menu-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span className="menu-icon">▣</span>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
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
            className="menu-item"
            onClick={() => navigate("/find-clinic")}
          >
            <span className="menu-icon">▦</span>
            <span>Find Clinic</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">▣</span>
            <span>Chat</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">▤</span>
            <span>Find Market-Place</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">▦</span>
            <span>Find Pharmacy</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">▤</span>
            <span>My Dependents</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">⚒</span>
            <span>My Account</span>
          </button>

          <button
            type="button"
            className="menu-item"
          >
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>

        </nav>

        <div className="help-box">
          <span>?</span>
        </div>

      </aside>
      <main className="main-content">
        <header className="top-header">

          <div className="header-left">

            <button
              className="hamburger"
              onClick={toggleSidebar}
              type="button"
            >
              ☰
            </button>

            <div>
              <div className="breadcrumb">
                <span>⌂</span>
                <span>/</span>
                <span>Dashboard</span>
              </div>

              <h2>Dashboard</h2>
            </div>

          </div>

          <div className="header-right">

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Type here..."
              />
            </div>

            <button
              type="button"
              className="header-link"
              onClick={() => navigate("/login")}
            >
              ◉ Log out
            </button>

            <span className="header-icon">⚙</span>
            <span className="header-icon">♟</span>

          </div>

        </header>
        <section className="dashboard-content">

          <h1>Welcome To MyPatientHUB!</h1>

          <div className="cards-grid">
            <div className="dashboard-card">

              <div className="card-title">
                <h3>Promotion by Clinics</h3>
                <span>ⓘ</span>
              </div>

              <div className="chart-content">

                <div className="donut chart-clinic"></div>

                <div className="legend">

                  <div>
                    <i className="pink"></i>
                    <span>Klinik Lee Healthcare</span>
                    <b>19%</b>
                  </div>

                  <div>
                    <i className="blue"></i>
                    <span>Klinik Bandar Baru Nilai</span>
                    <b>4%</b>
                  </div>

                  <div>
                    <i className="yellow"></i>
                    <span>Klinik Mediviron Giant Nilai</span>
                    <b>10%</b>
                  </div>

                  <div>
                    <i className="green"></i>
                    <span>KLINIK NILAI IMPIAN</span>
                    <b>21%</b>
                  </div>

                  <div>
                    <i className="darkblue"></i>
                    <span>Klinik Mediviron</span>
                    <b>2%</b>
                  </div>

                </div>

              </div>

              <button
                className="details-btn"
                type="button"
              >
                MORE DETAILS
              </button>

            </div>
            <div className="dashboard-card">

              <div className="card-title">
                <h3>Promotion by Pharmacies</h3>
                <span>ⓘ</span>
              </div>

              <div className="chart-content">

                <div className="donut chart-pharmacy"></div>

                <div className="legend">

                  <div>
                    <i className="blue"></i>
                    <span>ALPRO PHARMACY NILAI</span>
                    <b>15%</b>
                  </div>

                  <div>
                    <i className="lightblue"></i>
                    <span>ALPRO PHARMACY PEKAN NILAI</span>
                    <b>12%</b>
                  </div>

                  <div>
                    <i className="pink"></i>
                    <span>OK PHARMACY</span>
                    <b>5%</b>
                  </div>

                  <div>
                    <i className="green"></i>
                    <span>PHARMART PHARMACY NILAI</span>
                    <b>9%</b>
                  </div>

                  <div>
                    <i className="darkblue"></i>
                    <span>Health Lane Family Pharmacy</span>
                    <b>14%</b>
                  </div>

                </div>

              </div>

              <button
                className="details-btn"
                type="button"
              >
                MORE DETAILS
              </button>

            </div>
            <div className="dashboard-card">

              <div className="card-title">
                <h3>Smart Market Usage by app</h3>
                <span>ⓘ</span>
              </div>

              <div className="chart-content">

                <div className="donut chart-market"></div>

                <div className="legend">

                  <div>
                    <i className="pink"></i>
                    <span>Food Panda</span>
                    <b>25%</b>
                  </div>

                  <div>
                    <i className="blue"></i>
                    <span>Grab Food</span>
                    <b>15%</b>
                  </div>

                  <div>
                    <i className="green"></i>
                    <span>Other</span>
                    <b>10%</b>
                  </div>

                </div>

              </div>

            </div>
            <div className="dashboard-card">

              <div className="card-title">
                <h3>Health index</h3>
                <span>ⓘ</span>
              </div>

              <div className="line-chart">

                <svg
                  viewBox="0 0 600 180"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="
                      0,145
                      50,135
                      100,142
                      150,125
                      200,130
                      250,105
                      300,120
                      350,75
                      400,95
                      450,60
                      500,80
                      550,50
                      600,35
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>

              </div>

            </div>

          </div>
          <div className="appointment-card">

            <div className="appointment-header">
              <h3>Upcoming Appointments</h3>

              <button type="button">
                VIEW ALL
              </button>
            </div>

            <div className="appointment-row">

              <div className="doctor">

                <div className="doctor-avatar">
                  DR
                </div>

                <div>
                  <strong>Dr Allan</strong>
                  <span>Cardiologist</span>
                </div>

              </div>

              <div className="appointment-info">
                <strong>RM 400</strong>
                <span>40%</span>
              </div>

            </div>

          </div>

        </section>
        <footer className="dashboard-footer">

          <p>
            ©️ 2026, made with ♥️ by MyPiHUB
            for a better web.
          </p>

          <div>
            <a href="#">MyPatientHUB</a>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
          </div>

        </footer>

      </main>
    </div>
  );
}

export default Dashboard;