
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";

/* =========================
   CHART DATA
========================= */

const clinicData = [
  { name: "Klinik Lee Healthcare", value: 19, color: "#e90091" },
  { name: "Klinik Bandar Baru Nilai", value: 4, color: "#2866e9" },
  { name: "Klinik Mediviron Giant Nilai", value: 10, color: "#f5c832" },
  { name: "KLINIK NILAI IMPIAN", value: 21, color: "#16ad4d" },
  { name: "Klinik Mediviron", value: 2, color: "#303b69" },
];

const pharmacyData = [
  { name: "ALPRO PHARMACY NILAI", value: 15, color: "#2866e9" },
  { name: "ALPRO PHARMACY PEKAN NILAI", value: 12, color: "#b9c7df" },
  { name: "OK PHARMACY", value: 5, color: "#e90091" },
  { name: "PHARMART PHARMACY NILAI", value: 9, color: "#16ad4d" },
  { name: "Health Lane Family Pharmacy", value: 14, color: "#303b69" },
];

const marketData = [
  { name: "Food Panda", value: 25, color: "#e90091" },
  { name: "Grab Food", value: 15, color: "#2866e9" },
  { name: "Other", value: 10, color: "#16ad4d" },
];

const healthData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 61 },
  { month: "May", value: 58 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 65 },
  { month: "Aug", value: 82 },
  { month: "Sep", value: 75 },
  { month: "Oct", value: 91 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 96 },
];

/* =========================
   SIDEBAR MENU / SEARCH DATA
========================= */

const menuItems = [
  { label: "Dashboard", icon: "▦", path: "/dashboard" },
  { label: "Appointments", icon: "▣", path: "/appointments" },
  { label: "Find Doctor", icon: "⚕", path: "/find-doctor" },
  { label: "Find Clinic", icon: "⌂", path: "/find-clinic" },
  { label: "Chat", icon: "▤", path: "/chat" },
  { label: "Find Market-Place", icon: "▧", path: "/marketplace" },
  { label: "Find Pharmacy", icon: "✚", path: "/find-pharmacy" },
  { label: "My Dependents", icon: "♧", path: "/my-dependents" },
  { label: "My Account", icon: "♙", path: "/account" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

const extraSearchPages = [
  { label: "Notifications", icon: "♧", path: "/notifications" },
];

/* =========================
   PROMOTION DONUT CHART
========================= */

function PromotionChart({ data }) {
  return (
    <div className="donut real-donut">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="90%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #edf0f4",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* =========================
   CHART LEGEND
========================= */

function ChartLegend({ data }) {
  return (
    <div className="legend">
      {data.map((item) => (
        <div key={item.name}>
          <i style={{ backgroundColor: item.color }} />
          <span>{item.name}</span>
          <b>{item.value}%</b>
        </div>
      ))}
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef(null);

  const searchPages = [...menuItems, ...extraSearchPages];

  const filteredPages = search.trim()
    ? searchPages.filter((page) =>
        page.label.toLowerCase().includes(search.trim().toLowerCase())
      )
    : [];

  /* CLOSE SEARCH WHEN CLICKING OUTSIDE */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* NAVIGATION */

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setShowSearchResults(false);
  };

  const handleSearchNavigation = (path) => {
    navigate(path);
    setSearch("");
    setShowSearchResults(false);
    setSidebarOpen(false);
  };

  /* SEARCH KEYBOARD */

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && filteredPages.length > 0) {
      event.preventDefault();
      handleSearchNavigation(filteredPages[0].path);
    }

    if (event.key === "Escape") {
      setShowSearchResults(false);
    }
  };

  /* SIDEBAR KEYBOARD */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`dashboard-body ${
        sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      {/* MOBILE / TABLET OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="dashboard-sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`pharmacy-sidebar ${sidebarOpen ? "show" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="pharmacy-logo">
          <div className="logo-mark">
            M
            <span>HUB</span>
          </div>

          <div className="logo-text">MyPatientHUB</div>
        </div>

        <nav className="pharmacy-sidebar-menu">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={`pharmacy-menu-item ${
                item.path === "/dashboard" ? "active" : ""
              }`}
              onClick={() => handleNavigation(item.path)}
              tabIndex={sidebarOpen ? 0 : -1}
            >
              <span className="pharmacy-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pharmacy-help">
          <div className="help-icon">?</div>

          <div>
            <h4>Need Help?</h4>
            <p>Contact our support team.</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">
        {/* HEADER */}

        <header className="top-header">
          <div className="header-left">
            {/* HAMBURGER ON ALL SCREEN SIZES */}

<button
  type="button"
  className={`hamburger ${sidebarOpen ? "is-open" : ""}`}
  aria-label={sidebarOpen ? "Close menu" : "Open menu"}
  aria-expanded={sidebarOpen}
  onClick={() => setSidebarOpen((previous) => !previous)}
>
  <span>☰</span>
</button>

            <div className="header-heading">
              <div className="breadcrumb">
                <span>Home</span>
                <span>/</span>
                <span>Dashboard</span>
              </div>

              <h2>Dashboard</h2>
            </div>
          </div>

          <div className="header-right">
            {/* SEARCH */}

            <div
              className="dashboard-search-wrapper"
              ref={searchRef}
            >
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="search"
                  placeholder="Search pages..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onKeyDown={handleSearchKeyDown}
                  aria-label="Search dashboard pages"
                  aria-expanded={
                    showSearchResults && search.trim().length > 0
                  }
                  autoComplete="off"
                />
              </div>

              {showSearchResults && search.trim() !== "" && (
                <div className="dashboard-search-results">
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                      <button
                        type="button"
                        key={page.path}
                        className="dashboard-search-result"
                        onClick={() =>
                          handleSearchNavigation(page.path)
                        }
                      >
                        <span className="search-result-icon">
                          {page.icon}
                        </span>

                        <span>{page.label}</span>

                        <span className="search-result-arrow">→</span>
                      </button>
                    ))
                  ) : (
                    <div className="dashboard-search-empty">
                      No pages found for "{search}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="header-icon"
              aria-label="Notifications"
              onClick={() => handleNavigation("/notifications")}
            >
              ♧
            </button>

            <button
              type="button"
              className="header-icon"
              aria-label="My account"
              onClick={() => handleNavigation("/account")}
            >
              ♙
            </button>

            <button
              type="button"
              className="header-link"
              onClick={() => handleNavigation("/login")}
            >
              Log out
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}

        <section className="dashboard-content">
          <h1>Dashboard Overview</h1>

          {/* CHART CARDS */}

          <div className="cards-grid">
            <article className="dashboard-card">
              <div className="card-title">
                <h3>Promotion by Clinics</h3>
                <span title="Clinic promotion distribution">ⓘ</span>
              </div>

              <div className="chart-content">
                <PromotionChart data={clinicData} />
                <ChartLegend data={clinicData} />
              </div>

              <button
                type="button"
                className="details-btn"
                onClick={() => handleNavigation("/find-clinic")}
              >
                VIEW MORE DETAILS
              </button>
            </article>

            <article className="dashboard-card">
              <div className="card-title">
                <h3>Promotion by Pharmacies</h3>
                <span title="Pharmacy promotion distribution">ⓘ</span>
              </div>

              <div className="chart-content">
                <PromotionChart data={pharmacyData} />
                <ChartLegend data={pharmacyData} />
              </div>

              <button
                type="button"
                className="details-btn"
                onClick={() => handleNavigation("/find-pharmacy")}
              >
                VIEW MORE DETAILS
              </button>
            </article>

            <article className="dashboard-card">
              <div className="card-title">
                <h3>Smart Market Usage by App</h3>
                <span title="Market usage distribution">ⓘ</span>
              </div>

              <div className="chart-content">
                <PromotionChart data={marketData} />
                <ChartLegend data={marketData} />
              </div>

              <button
                type="button"
                className="details-btn"
                onClick={() => handleNavigation("/marketplace")}
              >
                VIEW MORE DETAILS
              </button>
            </article>

            <article className="dashboard-card">
              <div className="card-title">
                <h3>Health Index</h3>
                <span title="Monthly health index trend">ⓘ</span>
              </div>

              <div className="line-chart real-line-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={healthData}
                    margin={{
                      top: 10,
                      right: 12,
                      left: -15,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e8edf4"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#8190a9", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tick={{ fill: "#8190a9", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={35}
                    />

                    <Tooltip
                      formatter={(value) => [value, "Health Index"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #edf0f4",
                        fontSize: "12px",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Health Index"
                      stroke="#e500a8"
                      strokeWidth={3}
                      dot={{
                        r: 3,
                        fill: "#e500a8",
                        strokeWidth: 0,
                      }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <button
                type="button"
                className="details-btn"
                onClick={() => handleNavigation("/dashboard")}
              >
                VIEW HEALTH INDEX
              </button>
            </article>
          </div>

          {/* UPCOMING APPOINTMENTS */}

          <section className="appointment-card">
            <div className="appointment-header">
              <h3>Upcoming Appointments</h3>

              <button
                type="button"
                onClick={() => handleNavigation("/appointments")}
              >
                VIEW ALL
              </button>
            </div>

            <div className="appointment-row">
              <div className="doctor">
                <div className="doctor-avatar">DR</div>

                <div className="doctor-details">
                  <strong>Dr. Allan</strong>
                  <span>Cardiology</span>
                </div>
              </div>

              <div className="appointment-info">
                <strong>Appointment</strong>
                <span>
                  Check your appointment list for details
                </span>
              </div>
            </div>
          </section>
        </section>

        {/* FOOTER */}

        <footer className="dashboard-footer">
          <p>
            © {new Date().getFullYear()} MyPatientHUB. All rights reserved.
          </p>

          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/help">Help</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
