import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const sidebarItems = [
  { label: "Dashboard", icon: "▦", path: "/dashboard" },
  { label: "Appointments", icon: "▤", path: "/appointments" },
  { label: "Find Doctor", icon: "♙", path: "/find-doctor" },
  { label: "Find Clinic", icon: "✚", path: "/find-clinic", active: true },
  { label: "Chat", icon: "▣", path: "/chat" },
  { label: "Find Market-Place", icon: "▤", path: "/marketplace" },
  { label: "Find Pharmacy", icon: "✚", path: "/pharmacy" },
  { label: "My Dependents", icon: "♧", path: "/dependents" },
  { label: "My Account", icon: "♙", path: "/account" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

function FindClinicResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const goTo = (path) => {
    closeSidebar();
    navigate(path);
  };

  // SEARCH
  const [clinicSearch, setClinicSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  // Read search values when the URL changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setClinicSearch(params.get("clinic") || "");
    setLocationSearch(params.get("location") || "");
  }, [location.search]);

  // FILTERS
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

  // MAP
  const [locationActive, setLocationActive] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  // SEARCH + FILTER
  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const search = clinicSearch.toLowerCase().trim();
      const locationQuery = locationSearch.toLowerCase().trim();
      const zip = filterZip.toLowerCase().trim();

      const matchesSearch =
        !search ||
        clinic.name.toLowerCase().includes(search) ||
        clinic.service.toLowerCase().includes(search) ||
        clinic.category.toLowerCase().includes(search);

      const matchesLocation =
        !locationQuery ||
        clinic.location.toLowerCase().includes(locationQuery);

      const matchesPrimaryCare =
        !primaryCare || clinic.category === primaryCare;

      const matchesZip =
        !zip || clinic.location.toLowerCase().includes(zip);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesPrimaryCare &&
        matchesZip
      );
    });
  }, [clinicSearch, locationSearch, primaryCare, filterZip]);

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

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      searchClinics();
    }
  };

  const showClinicLocation = () => {
    setLocationActive(true);
  };

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

  const applyClinicFilters = () => {
    // Primary Care and ZIP filters are applied automatically.
    // The remaining options are retained for future clinic data.
    console.log("Clinic filters:", {
      primaryCare,
      filterZip,
      filterBy,
      ageFilter,
      viewOnly,
    });
  };

  const zoomIn = () => {
    setMapZoom((previous) => Math.min(previous + 0.15, 1.6));
  };

  const zoomOut = () => {
    setMapZoom((previous) => Math.max(previous - 0.15, 0.7));
  };

  return (
    <div className="clinic-result-page dashboard-body">
      {/* SIDEBAR */}
      <aside
        className={`pharmacy-sidebar ${
          sidebarOpen ? "show" : ""
        }`}
        id="clinic-result-sidebar"
        aria-label="Main navigation"
      >
        <div className="pharmacy-logo">
          <div className="logo-mark">
            M<span>HUB</span>
          </div>

          <div className="logo-text">MyPatientHUB</div>
        </div>

        <nav className="pharmacy-sidebar-menu">
          {sidebarItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={`pharmacy-menu-item ${
                item.active ? "active" : ""
              }`}
              onClick={() => goTo(item.path)}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="pharmacy-menu-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pharmacy-help">
          <div className="pharmacy-help-icon">?</div>
          <div>
            <strong>Need Help?</strong>
            <p>Contact our support team</p>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          className="clinic-sidebar-overlay"
          aria-label="Close sidebar"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="main-content">
        <section className="dashboard-content">
          {/* HERO */}
          <section className="clinic-hero">
            <div className="hero-decoration hero-decoration-one" />
            <div className="hero-decoration hero-decoration-two" />

            <div className="hero-topbar">
              <div className="hero-left">
                <button
                  type="button"
                  className="hero-hamburger"
                  onClick={() => setSidebarOpen((previous) => !previous)}
                  aria-label="Toggle sidebar"
                  aria-expanded={sidebarOpen}
                  aria-controls="clinic-result-sidebar"
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
                    aria-label="Quick search"
                    onChange={(event) => {
                      // Quick-search field; Enter applies the value
                      // to the clinic search.
                      if (event.target.value === "") {
                        return;
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setClinicSearch(event.currentTarget.value);
                        const params = new URLSearchParams(location.search);
                        const value = event.currentTarget.value.trim();

                        if (value) {
                          params.set("clinic", value);
                        } else {
                          params.delete("clinic");
                        }

                        navigate(
                          params.toString()
                            ? `/find-clinic-results?${params.toString()}`
                            : "/find-clinic-results"
                        );
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

            <div className="hero-title">
              <h1>Find a Clinic</h1>
              <p>Find clinics and healthcare services near you</p>

              <div className="search-row">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search clinic by name or service"
                  value={clinicSearch}
                  onChange={(event) => setClinicSearch(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />

                <input
                  type="text"
                  className="search-input"
                  placeholder="City, Zip Code or Neighborhood"
                  value={locationSearch}
                  onChange={(event) => setLocationSearch(event.target.value)}
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

          {/* RESULTS */}
          <section className="clinic-results-page">
            <div className="results-toolbar">
              <div className="results-summary">
                <strong>
                  {filteredClinics.length}{" "}
                  {filteredClinics.length === 1 ? "Clinic" : "Clinics"} Found
                </strong>

                <span>Search results based on your criteria</span>
              </div>

              <button
                type="button"
                className="results-current-btn"
                onClick={showClinicLocation}
              >
                📍 Use My Location
              </button>
            </div>

            {/* FILTERS + MAP */}
            <div className="clinic-map-layout">
              <aside className="clinic-filter-panel">
                <div className="filter-header">
                  <h2>Filters</h2>

                  <button type="button" onClick={clearFilters}>
                    Clear
                  </button>
                </div>

                <div className="filter-section">
                  <label className="filter-label" htmlFor="clinic-category">
                    Primary Care
                  </label>

                  <select
                    id="clinic-category"
                    value={primaryCare}
                    onChange={(event) => setPrimaryCare(event.target.value)}
                  >
                    <option value="">Select Primary Care</option>
                    <option value="Family Medicine">Family Medicine</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="General Practice">General Practice</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div className="filter-section">
                  <label className="filter-label" htmlFor="clinic-zip">
                    ZIP Code
                  </label>

                  <input
                    id="clinic-zip"
                    type="text"
                    placeholder="Enter ZIP Code or area"
                    value={filterZip}
                    onChange={(event) => setFilterZip(event.target.value)}
                  />
                </div>

                <div className="filter-section">
                  <h3>Filter By</h3>

                  {[
                    ["specialty", "Specialty"],
                    ["gender", "Gender"],
                    ["condition", "Condition"],
                    ["languages", "Languages"],
                  ].map(([key, label]) => (
                    <label className="checkbox-row" key={key}>
                      <input
                        type="checkbox"
                        checked={filterBy[key]}
                        onChange={(event) =>
                          setFilterBy((previous) => ({
                            ...previous,
                            [key]: event.target.checked,
                          }))
                        }
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <h3>Age</h3>

                  {[
                    ["all", "All Ages"],
                    ["children", "Children"],
                    ["adults", "Adults"],
                  ].map(([value, label]) => (
                    <label className="checkbox-row" key={value}>
                      <input
                        type="checkbox"
                        checked={ageFilter === value}
                        onChange={() =>
                          setAgeFilter((previous) =>
                            previous === value ? "" : value
                          )
                        }
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <h3>View Only</h3>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={viewOnly.onlineScheduling}
                      onChange={(event) =>
                        setViewOnly((previous) => ({
                          ...previous,
                          onlineScheduling: event.target.checked,
                        }))
                      }
                    />
                    <span>Online Scheduling</span>
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={viewOnly.primaryCare}
                      onChange={(event) =>
                        setViewOnly((previous) => ({
                          ...previous,
                          primaryCare: event.target.checked,
                        }))
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

              {/* MAP */}
              <section className="clinic-map-container">
                <div className="map-topbar">
                  <div>
                    <strong>Clinics Near You</strong>
                    <span>{filteredClinics.length} clinics found</span>
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
                        aria-label={`Select ${clinic.name}`}
                        onClick={() => console.log("Selected clinic:", clinic)}
                      >
                        🏥
                      </button>
                    ))}

                    <div
                      className={`current-location ${
                        locationActive ? "location-active" : ""
                      }`}
                      aria-label={
                        locationActive
                          ? "Current location selected"
                          : "Current location"
                      }
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
                    <div className="map-label label-three">Riverside</div>
                  </div>
                </div>
              </section>
            </div>

            {/* CLINIC LIST */}
            <section className="clinic-list-section">
              <div className="clinic-list-heading">
                <div>
                  <h2>Available Clinics</h2>
                  <p>Clinics matching your search</p>
                </div>
              </div>

              <div className="clinic-list">
                {filteredClinics.length === 0 ? (
                  <div className="no-results">
                    <div className="no-results-icon">🏥</div>
                    <h3>No clinics found</h3>
                    <p>Try changing your search or filters.</p>

                    <button type="button" onClick={clearFilters}>
                      CLEAR FILTERS
                    </button>
                  </div>
                ) : (
                  filteredClinics.map((clinic) => (
                    <div className="clinic-card" key={clinic.id}>
                      <div className="clinic-card-icon">🏥</div>

                      <div className="clinic-card-info">
                        <div className="clinic-card-title">
                          <h3>{clinic.name}</h3>
                          <span className="clinic-type">{clinic.type}</span>
                        </div>

                        <p>{clinic.service}</p>
                        <span>📍 {clinic.location}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => console.log("Selected clinic:", clinic)}
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </section>

          {/* FOOTER */}
          <footer className="dashboard-footer">
            <p>© 2026, made with ♥ by MyPatientHUB for a better web.</p>

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