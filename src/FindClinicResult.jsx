import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindClinicResult.css";
import "./Dashboard.css";

const clinics = [
  {
    id: 1,
    name: "City Care Medical Clinic",
    service: "Primary Care • Family Medicine",
    category: "Family Medicine",
    location: "Central District",
    type: "Primary Care",
    marker: "marker-one",
  },
  {
    id: 2,
    name: "Family Wellness Clinic",
    service: "Family & Women's Health",
    category: "General Practice",
    location: "Riverside",
    type: "Primary Care",
    marker: "marker-two",
  },
  {
    id: 3,
    name: "Prime Diagnostic Center",
    service: "Laboratory & Diagnostic Services",
    category: "Internal Medicine",
    location: "Medical Center",
    type: "Diagnostic",
    marker: "marker-three",
  },
  {
    id: 4,
    name: "CarePlus Specialist Clinic",
    service: "Specialist Healthcare Services",
    category: "Pediatrics",
    location: "Central District",
    type: "Specialist",
    marker: "marker-four",
  },
];

function FindClinicResult() {
  const navigate = useNavigate();

  /* =========================
     SIDEBAR
  ========================= */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const goTo = (path) => {
    closeSidebar();
    navigate(path);
  };

  /* =========================
     SEARCH
  ========================= */

  const [clinicSearch, setClinicSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  /* =========================
     FILTERS
  ========================= */

  const [primaryCare, setPrimaryCare] = useState("");
  const [filterZip, setFilterZip] = useState("");

  const [filterBy, setFilterBy] = useState({
    specialty: false,
    gender: false,
    condition: false,
    languages: false,
  });

  const [ageFilter, setAgeFilter] = useState("");

  const [viewOnly, setViewOnly] = useState({
    onlineScheduling: false,
    primaryCare: false,
  });

  /* =========================
     MAP
  ========================= */

  const [locationActive, setLocationActive] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const search = clinicSearch.toLowerCase().trim();
      const location = locationSearch.toLowerCase().trim();
      const zip = filterZip.toLowerCase().trim();

      const matchesSearch =
        !search ||
        clinic.name.toLowerCase().includes(search) ||
        clinic.service.toLowerCase().includes(search) ||
        clinic.category.toLowerCase().includes(search);

      const matchesLocation =
        !location ||
        clinic.location.toLowerCase().includes(location);

      const matchesPrimaryCare =
        !primaryCare ||
        clinic.category === primaryCare;

      const matchesZip =
        !zip ||
        clinic.location.toLowerCase().includes(zip);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesPrimaryCare &&
        matchesZip
      );
    });
  }, [
    clinicSearch,
    locationSearch,
    primaryCare,
    filterZip,
  ]);

  /* =========================
     SEARCH
  ========================= */

  const searchClinics = () => {
    const params = new URLSearchParams();

    if (clinicSearch.trim()) {
      params.set("clinic", clinicSearch.trim());
    }

    if (locationSearch.trim()) {
      params.set("location", locationSearch.trim());
    }

    navigate(
      params.toString()
        ? `/find-clinic-results?${params.toString()}`
        : "/find-clinic-results"
    );
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchClinics();
    }
  };

  /* =========================
     CURRENT LOCATION
  ========================= */

  const showClinicLocation = () => {
    setLocationActive(true);
  };

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setPrimaryCare("");
    setFilterZip("");

    setFilterBy({
      specialty: false,
      gender: false,
      condition: false,
      languages: false,
    });

    setAgeFilter("");

    setViewOnly({
      onlineScheduling: false,
      primaryCare: false,
    });
  };

  /* =========================
     APPLY FILTER
  ========================= */

  const applyClinicFilters = () => {
    console.log({
      primaryCare,
      filterZip,
      filterBy,
      ageFilter,
      viewOnly,
    });
  };

  /* =========================
     MAP ZOOM
  ========================= */

  const zoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.15, 1.6));
  };

  const zoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.15, 0.7));
  };

  return (
    <div className="clinic-result-page dashboard-body">
      {/* ==================================
          SIDEBAR
      ================================== */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "show" : ""
        }`}
        id="sidebar"
      >
        <div className="logo-area">
          <div className="logo-icon">M</div>
          <span>MyPatientHUB</span>
        </div>

        <nav className="sidebar-menu">
          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/dashboard")}
          >
            <span className="menu-icon">▣</span>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/appointments")}
          >
            <span className="menu-icon">▤</span>
            <span>Appointments</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/find-doctor")}
          >
            <span className="menu-icon">♟</span>
            <span>Find Doctor</span>
          </button>

          <button
            type="button"
            className="menu-item active"
            onClick={() => goTo("/find-clinic")}
          >
            <span className="menu-icon">▦</span>
            <span>Find Clinic</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/chat")}
          >
            <span className="menu-icon">▣</span>
            <span>Chat</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/marketplace")}
          >
            <span className="menu-icon">▤</span>
            <span>Find Market-Place</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/pharmacy")}
          >
            <span className="menu-icon">▦</span>
            <span>Find Pharmacy</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/dependents")}
          >
            <span className="menu-icon">▤</span>
            <span>My Dependents</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/account")}
          >
            <span className="menu-icon">⚒</span>
            <span>My Account</span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => goTo("/settings")}
          >
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>
        </nav>

        <div className="help-box">
          <span>?</span>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      )}

      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <main className="main-content">
        <section className="dashboard-content">
          {/* ==================================
              CLINIC HERO
          ================================== */}

          <section className="clinic-hero">
            <div className="hero-decoration hero-decoration-one" />
            <div className="hero-decoration hero-decoration-two" />

            {/* TOP BAR */}

            <div className="hero-topbar">
              <div className="hero-left">
                <button
                  type="button"
                  className="hero-hamburger"
                  onClick={() =>
                    setSidebarOpen((prev) => !prev)
                  }
                  aria-label="Toggle sidebar"
                >
                  ☰
                </button>

                <div className="hero-breadcrumb">
                  <div>
                    <span>⌂</span>
                    <span>/</span>
                    Find Clinic
                    <span>/</span>
                    Results
                  </div>

                  <strong>Find Clinics</strong>
                </div>
              </div>

              <div className="hero-right">
                <div className="hero-search">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Type here..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchClinics();
                      }
                    }}
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
                  className="hero-icon settings-icon"
                  aria-label="Settings"
                  onClick={() => goTo("/settings")}
                >
                  ⚙
                </button>

                <button
                  type="button"
                  className="hero-icon profile-icon"
                  aria-label="Account"
                  onClick={() => goTo("/account")}
                >
                  ♟
                </button>
              </div>
            </div>

            {/* HERO TITLE + SEARCH */}

            <div className="hero-title">
              <h1>Find a Clinic</h1>

              <p>
                Find clinics and healthcare services near you
              </p>

              <div className="search-row">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search clinic by name or service"
                  value={clinicSearch}
                  onChange={(e) =>
                    setClinicSearch(e.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                />

                <input
                  type="text"
                  className="search-input"
                  placeholder="City, Zip Code or Neighborhood"
                  value={locationSearch}
                  onChange={(e) =>
                    setLocationSearch(e.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                />

                <button
                  type="button"
                  className="search-button current-button"
                  onClick={showClinicLocation}
                >
                  CURRENT
                </button>

                <button
                  type="button"
                  className="search-button"
                  onClick={searchClinics}
                >
                  SEARCH
                </button>
              </div>
            </div>
          </section>

          {/* ==================================
              RESULTS
          ================================== */}

          <section className="clinic-results-page">
            {/* NO DUPLICATE TITLE / SEARCH HERE */}

            <div className="results-toolbar">
              <div className="results-summary">
                <strong>
                  {filteredClinics.length}{" "}
                  {filteredClinics.length === 1
                    ? "Clinic"
                    : "Clinics"}{" "}
                  Found
                </strong>

                <span>
                  Search results based on your criteria
                </span>
              </div>

              <button
                type="button"
                className="results-current-btn"
                onClick={showClinicLocation}
              >
                📍 Use My Location
              </button>
            </div>

            {/* ==================================
                MAP + FILTER
            ================================== */}

            <div className="clinic-map-layout">
              {/* FILTER */}

              <aside className="clinic-filter-panel">
                <div className="filter-header">
                  <h2>Filters</h2>

                  <button
                    type="button"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>

                {/* PRIMARY CARE */}

                <div className="filter-section">
                  <label className="filter-label">
                    Primary Care
                  </label>

                  <select
                    value={primaryCare}
                    onChange={(e) =>
                      setPrimaryCare(e.target.value)
                    }
                  >
                    <option value="">
                      Select Primary Care
                    </option>

                    <option value="Family Medicine">
                      Family Medicine
                    </option>

                    <option value="Internal Medicine">
                      Internal Medicine
                    </option>

                    <option value="General Practice">
                      General Practice
                    </option>

                    <option value="Pediatrics">
                      Pediatrics
                    </option>
                  </select>
                </div>

                {/* ZIP */}

                <div className="filter-section">
                  <label className="filter-label">
                    ZIP Code
                  </label>

                  <input
                    type="text"
                    placeholder="Enter ZIP Code"
                    value={filterZip}
                    onChange={(e) =>
                      setFilterZip(e.target.value)
                    }
                  />
                </div>

                {/* FILTER BY */}

                <div className="filter-section">
                  <h3>Filter By</h3>

                  {[
                    ["specialty", "Specialty"],
                    ["gender", "Gender"],
                    ["condition", "Condition"],
                    ["languages", "Languages"],
                  ].map(([key, label]) => (
                    <label
                      className="checkbox-row"
                      key={key}
                    >
                      <input
                        type="checkbox"
                        checked={filterBy[key]}
                        onChange={(e) =>
                          setFilterBy({
                            ...filterBy,
                            [key]: e.target.checked,
                          })
                        }
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                {/* AGE */}

                <div className="filter-section">
                  <h3>Age</h3>

                  {[
                    ["all", "All Ages"],
                    ["children", "Children"],
                    ["adults", "Adults"],
                  ].map(([value, label]) => (
                    <label
                      className="checkbox-row"
                      key={value}
                    >
                      <input
                        type="checkbox"
                        checked={ageFilter === value}
                        onChange={() =>
                          setAgeFilter(
                            ageFilter === value
                              ? ""
                              : value
                          )
                        }
                      />

                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                {/* VIEW ONLY */}

                <div className="filter-section">
                  <h3>View Only</h3>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={
                        viewOnly.onlineScheduling
                      }
                      onChange={(e) =>
                        setViewOnly({
                          ...viewOnly,
                          onlineScheduling:
                            e.target.checked,
                        })
                      }
                    />

                    <span>Online Scheduling</span>
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={
                        viewOnly.primaryCare
                      }
                      onChange={(e) =>
                        setViewOnly({
                          ...viewOnly,
                          primaryCare:
                            e.target.checked,
                        })
                      }
                    />

                    <span>Primary Care</span>
                  </label>
                </div>

                <button
                  type="button"
                  className="apply-filter-btn"
                  onClick={applyClinicFilters}
                >
                  APPLY FILTER
                </button>
              </aside>

              {/* ==================================
                  MAP
              ================================== */}

              <section className="clinic-map-container">
                <div className="map-topbar">
                  <div>
                    <strong>Clinics Near You</strong>

                    <span>
                      {filteredClinics.length} clinics
                      found
                    </span>
                  </div>

                  <button
                    type="button"
                    className="map-location-btn"
                    onClick={showClinicLocation}
                  >
                    📍 My Location
                  </button>
                </div>

                <div className="map-wrapper">
                  <div
                    className="map-area"
                    style={{
                      transform: `scale(${mapZoom})`,
                      transformOrigin: "center",
                    }}
                  >
                    <div className="map-road road-one" />
                    <div className="map-road road-two" />
                    <div className="map-road road-three" />
                    <div className="map-road road-four" />

                    {filteredClinics.map((clinic) => (
                      <button
                        type="button"
                        key={clinic.id}
                        className={`map-marker ${clinic.marker}`}
                        title={clinic.name}
                        onClick={() =>
                          console.log(
                            "Selected clinic:",
                            clinic
                          )
                        }
                      >
                        🏥
                      </button>
                    ))}

                    <div
                      className={`current-location ${
                        locationActive
                          ? "location-active"
                          : ""
                      }`}
                    >
                      <span />
                    </div>

                    <div className="map-controls">
                      <button
                        type="button"
                        onClick={zoomIn}
                        aria-label="Zoom in"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={zoomOut}
                        aria-label="Zoom out"
                      >
                        −
                      </button>
                    </div>

                    <div className="map-label label-one">
                      Central District
                    </div>

                    <div className="map-label label-two">
                      Medical Center
                    </div>

                    <div className="map-label label-three">
                      Riverside
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ==================================
                CLINIC LIST
            ================================== */}

            <section className="clinic-list-section">
              <div className="clinic-list-heading">
                <div>
                  <h2>Available Clinics</h2>

                  <p>
                    Clinics matching your search
                  </p>
                </div>
              </div>

              <div className="clinic-list">
                {filteredClinics.length === 0 ? (
                  <div className="no-results">
                    <div className="no-results-icon">
                      🏥
                    </div>

                    <h3>No clinics found</h3>

                    <p>
                      Try changing your search or
                      filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                    >
                      CLEAR FILTERS
                    </button>
                  </div>
                ) : (
                  filteredClinics.map((clinic) => (
                    <div
                      className="clinic-card"
                      key={clinic.id}
                    >
                      <div className="clinic-card-icon">
                        🏥
                      </div>

                      <div className="clinic-card-info">
                        <div className="clinic-card-title">
                          <h3>{clinic.name}</h3>

                          <span className="clinic-type">
                            {clinic.type}
                          </span>
                        </div>

                        <p>{clinic.service}</p>

                        <span>
                          📍 {clinic.location}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          console.log(
                            "Selected clinic:",
                            clinic
                          )
                        }
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </section>

          {/* ==================================
              FOOTER
          ================================== */}

          <footer className="dashboard-footer">
            <p>
              ©️ 2026, made with ♥️ by MyPatientHUB
              for a better web.
            </p>

            <div>
              <a href="/dashboard">MyPatientHUB</a>
              <a href="/about">About Us</a>
              <a href="/blog">Blog</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default FindClinicResult;