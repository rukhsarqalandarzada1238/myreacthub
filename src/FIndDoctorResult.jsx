import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./FindDoctorResult.css";

const doctors = [
    {
        id: 1,
        name: "Dr. Allan",
        specialty: "Cardiology",
        gender: "Male",
        location: "Central District",
        ageGroup: "Adults",
        onlineScheduling: true,
        primaryCare: false,
    },
    {
        id: 2,
        name: "Dr. Sarah Lee",
        specialty: "Dermatology",
        gender: "Female",
        location: "Medical Center",
        ageGroup: "Adults",
        onlineScheduling: true,
        primaryCare: false,
    },
    {
        id: 3,
        name: "Dr. Michael Khan",
        specialty: "Neurology",
        gender: "Male",
        location: "Riverside",
        ageGroup: "Adults",
        onlineScheduling: false,
        primaryCare: false,
    },
    {
        id: 4,
        name: "Dr. Emily Wilson",
        specialty: "Pediatrics",
        gender: "Female",
        location: "Central District",
        ageGroup: "Children",
        onlineScheduling: true,
        primaryCare: false,
    },
    {
        id: 5,
        name: "Dr. Daniel Smith",
        specialty: "General Medicine",
        gender: "Male",
        location: "North Avenue",
        ageGroup: "Adults",
        onlineScheduling: true,
        primaryCare: true,
    },
];

const initialFilters = {
    gender: false,
    condition: false,
    languages: false,
    allAges: false,
    children: false,
    adults: false,
    onlineScheduling: false,
    primaryCare: false,
};

function FindDoctorResult() {
    const navigate = useNavigate();

    /* =========================
       SIDEBAR
    ========================= */

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* =========================
       SEARCH
    ========================= */

    const [search, setSearch] = useState("");
    const [zipCode, setZipCode] = useState("");

    /* =========================
       FILTERS
    ========================= */

    const [specialty, setSpecialty] = useState("");
    const [filters, setFilters] = useState(initialFilters);

    /* =========================
       VIEW / SORT
    ========================= */

    const [viewMode, setViewMode] = useState("map");
    const [sortBy, setSortBy] = useState("relevance");

    /* =========================
       MAP
    ========================= */

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(false);
    const [mapScale, setMapScale] = useState(1);

    /* =========================
       NAVIGATION
    ========================= */

    const goTo = (path) => {
        setSidebarOpen(false);
        navigate(path);
    };

    /* =========================
       FILTER HANDLER
    ========================= */

    const handleFilterChange = (filterName) => {
        setFilters((previous) => ({
            ...previous,
            [filterName]: !previous[filterName],
        }));
    };

    /* =========================
       FILTER DOCTORS
    ========================= */

    const filteredDoctors = useMemo(() => {
        let results = [...doctors];

        const searchValue = search.toLowerCase().trim();
        const locationValue = zipCode.toLowerCase().trim();

        /* SEARCH */
        if (searchValue) {
            results = results.filter((doctor) => {
                return (
                    doctor.name.toLowerCase().includes(searchValue) ||
                    doctor.specialty.toLowerCase().includes(searchValue)
                );
            });
        }

        /* SPECIALTY */
        if (specialty) {
            results = results.filter(
                (doctor) => doctor.specialty === specialty
            );
        }

        /* LOCATION */
        if (locationValue) {
            results = results.filter((doctor) =>
                doctor.location.toLowerCase().includes(locationValue)
            );
        }

        /* GENDER */
        if (filters.gender) {
            results = results.filter((doctor) => doctor.gender === "Female");
        }

        /* CHILDREN */
        if (filters.children) {
            results = results.filter(
                (doctor) => doctor.ageGroup === "Children"
            );
        }

        /* ADULTS */
        if (filters.adults) {
            results = results.filter(
                (doctor) => doctor.ageGroup === "Adults"
            );
        }

        /* ONLINE */
        if (filters.onlineScheduling) {
            results = results.filter(
                (doctor) => doctor.onlineScheduling
            );
        }

        /* PRIMARY CARE */
        if (filters.primaryCare) {
            results = results.filter(
                (doctor) => doctor.primaryCare
            );
        }

        /* SORT */
        if (sortBy === "name") {
            results.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        if (sortBy === "specialty") {
            results.sort((a, b) =>
                a.specialty.localeCompare(b.specialty)
            );
        }

        return results;
    }, [
        search,
        zipCode,
        specialty,
        filters,
        sortBy,
    ]);

    /* =========================
       SEARCH
    ========================= */

    const handleSearch = () => {
        setSearch(search.trim());
        setZipCode(zipCode.trim());
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    /* =========================
       CLEAR FILTERS
    ========================= */

    const clearDoctorFilters = () => {
        setSpecialty("");
        setFilters(initialFilters);
    };

    /* =========================
       SELECT DOCTOR
    ========================= */

    const selectDoctor = (id) => {
        setSelectedDoctor(id);

        setTimeout(() => {
            setSelectedDoctor(null);
        }, 1500);
    };

    /* =========================
       CURRENT LOCATION
    ========================= */

    const showCurrentLocation = () => {
        setCurrentLocation(true);
    };

    /* =========================
       MAP ZOOM
    ========================= */

    const zoomIn = () => {
        setMapScale((previous) =>
            Math.min(previous + 0.1, 2)
        );
    };

    const zoomOut = () => {
        setMapScale((previous) =>
            Math.max(previous - 0.1, 0.7)
        );
    };

    return (
        <div className="dashboard-body doctor-results-page-wrapper">

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside
                className={`sidebar ${
                    sidebarOpen ? "show" : ""
                }`}
                id="sidebar"
            >
                <div className="logo-area">
                    <div className="logo-icon">
                        M
                    </div>

                    <span>
                        MyPatientHUB
                    </span>
                </div>

                <nav className="sidebar-menu">

                    <button
                        type="button"
                        className="menu-item"
                        onClick={() => goTo("/dashboard")}
                    >
                        <span className="menu-icon">▣</span>
                        <span className="menu-text">
                            Dashboard
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">▤</span>
                        <span className="menu-text">
                            Appointments
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item active"
                        onClick={() => goTo("/find-doctor")}
                    >
                        <span className="menu-icon">♟</span>
                        <span className="menu-text">
                            Find Doctor
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                        onClick={() => goTo("/find-clinic")}
                    >
                        <span className="menu-icon">▦</span>
                        <span className="menu-text">
                            Find Clinic
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">▣</span>
                        <span className="menu-text">
                            Chat
                        </span>
                    </button>

                    {/* MARKETPLACE FIX */}
                    <button
                        type="button"
                        className="menu-item"
                        onClick={() => goTo("/marketplace")}
                    >
                        <span className="menu-icon">▤</span>
                        <span className="menu-text">
                            Find Market-Place
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">▦</span>
                        <span className="menu-text">
                            Find Pharmacy
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">▤</span>
                        <span className="menu-text">
                            My Dependents
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">⚒</span>
                        <span className="menu-text">
                            My Account
                        </span>
                    </button>

                    <button
                        type="button"
                        className="menu-item"
                    >
                        <span className="menu-icon">⚙</span>
                        <span className="menu-text">
                            Settings
                        </span>
                    </button>

                </nav>

                <div className="help-box">
                    <span>?</span>
                </div>
            </aside>

            {/* MOBILE OVERLAY */}

            {sidebarOpen && (
                <div
                    className="doctor-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <main className="main-content">

                <section className="dashboard-content">

                    {/* ==================================================
                        PURPLE HERO
                    ================================================== */}

                    <section className="doctor-results-hero">

                        <div className="hero-decoration hero-decoration-one" />
                        <div className="hero-decoration hero-decoration-two" />

                        {/* TOP BAR */}

                        <div className="doctor-result-topbar">

                            <div className="doctor-result-top-left">

                                <button
                                    type="button"
                                    className="result-hamburger"
                                    onClick={() =>
                                        setSidebarOpen(
                                            !sidebarOpen
                                        )
                                    }
                                    aria-label="Open menu"
                                >
                                    ☰
                                </button>

                                <div className="result-breadcrumb">

                                    <div className="breadcrumb-line">
                                        <span>⌂</span>
                                        <span>/</span>
                                        <span>Find Doctor</span>
                                        <span>/</span>
                                        <span>Results</span>
                                    </div>

                                    <strong>
                                        Find Doctors
                                    </strong>

                                </div>

                            </div>

                            <div className="doctor-result-top-right">

                                <div className="top-search">

                                    <span>⌕</span>

                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={
                                            handleSearchKeyDown
                                        }
                                    />

                                </div>

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={() =>
                                        goTo("/login")
                                    }
                                >
                                    ◉ Log out
                                </button>

                                <span className="top-icon">
                                    ⚙
                                </span>

                                <span className="top-icon">
                                    ♟
                                </span>

                            </div>

                        </div>

                        {/* HERO CONTENT */}

                        <div className="doctor-result-hero-content">

                            <h1>
                                Find Doctors
                            </h1>

                            <p>
                                Search doctors and schedule an
                                appointment
                            </p>

                            <div className="hero-search-row">

                                <div className="hero-search-input">

                                    <span>⌕</span>

                                    <input
                                        type="text"
                                        placeholder="Doctor name or specialty"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={
                                            handleSearchKeyDown
                                        }
                                    />

                                </div>

                                <div className="hero-search-input">

                                    <span>📍</span>

                                    <input
                                        type="text"
                                        placeholder="ZIP Code or Neighborhood"
                                        value={zipCode}
                                        onChange={(event) =>
                                            setZipCode(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={
                                            handleSearchKeyDown
                                        }
                                    />

                                </div>

                                <button
                                    type="button"
                                    className="hero-search-button"
                                    onClick={handleSearch}
                                >
                                    SEARCH
                                </button>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        RESULTS
                    ================================================== */}

                    <section className="doctor-results-content">

                        {/* RESULTS TOOLBAR */}

                        <div className="results-toolbar">

                            <div className="results-heading">

                                <h2>
                                    Doctors Near You
                                </h2>

                                <p>
                                    {filteredDoctors.length}{" "}
                                    doctors found
                                </p>

                            </div>

                            <div className="results-toolbar-actions">

                                {/* MAP / LIST */}

                                <div className="view-switcher">

                                    <button
                                        type="button"
                                        className={
                                            viewMode === "map"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setViewMode("map")
                                        }
                                    >
                                        Map
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            viewMode === "list"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setViewMode("list")
                                        }
                                    >
                                        List
                                    </button>

                                </div>

                                {/* SORT */}

                                <div className="sort-wrapper">

                                    <label htmlFor="doctor-sort">
                                        Sort By
                                    </label>

                                    <select
                                        id="doctor-sort"
                                        value={sortBy}
                                        onChange={(event) =>
                                            setSortBy(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="relevance">
                                            Relevance
                                        </option>

                                        <option value="name">
                                            Name
                                        </option>

                                        <option value="specialty">
                                            Specialty
                                        </option>
                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* ==================================================
                            MAP VIEW
                        ================================================== */}

                        {viewMode === "map" && (
                            <div className="doctor-map-layout">

                                {/* FILTER PANEL */}

                                <aside className="doctor-filter-panel">

                                    <div className="filter-header">

                                        <h2>
                                            Filters
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={
                                                clearDoctorFilters
                                            }
                                        >
                                            Clear
                                        </button>

                                    </div>

                                    {/* SPECIALTY */}

                                    <div className="filter-section">

                                        <h3>
                                            Specialty
                                        </h3>

                                        <select
                                            value={specialty}
                                            onChange={(event) =>
                                                setSpecialty(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                All Specialties
                                            </option>

                                            <option value="Cardiology">
                                                Cardiology
                                            </option>

                                            <option value="Dermatology">
                                                Dermatology
                                            </option>

                                            <option value="Neurology">
                                                Neurology
                                            </option>

                                            <option value="Pediatrics">
                                                Pediatrics
                                            </option>

                                            <option value="General Medicine">
                                                General Medicine
                                            </option>
                                        </select>

                                    </div>

                                    {/* FILTER BY */}

                                    <div className="filter-section">

                                        <h3>
                                            Filter By
                                        </h3>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.gender
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "gender"
                                                    )
                                                }
                                            />
                                            <span>
                                                Female Doctors
                                            </span>
                                        </label>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.condition
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "condition"
                                                    )
                                                }
                                            />
                                            <span>
                                                Condition
                                            </span>
                                        </label>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.languages
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "languages"
                                                    )
                                                }
                                            />
                                            <span>
                                                Languages
                                            </span>
                                        </label>

                                    </div>

                                    {/* AGE */}

                                    <div className="filter-section">

                                        <h3>
                                            Patient Age
                                        </h3>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.allAges
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "allAges"
                                                    )
                                                }
                                            />
                                            <span>
                                                All Ages
                                            </span>
                                        </label>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.children
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "children"
                                                    )
                                                }
                                            />
                                            <span>
                                                Children
                                            </span>
                                        </label>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.adults
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "adults"
                                                    )
                                                }
                                            />
                                            <span>
                                                Adults
                                            </span>
                                        </label>

                                    </div>

                                    {/* VIEW ONLY */}

                                    <div className="filter-section">

                                        <h3>
                                            View Only
                                        </h3>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.onlineScheduling
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "onlineScheduling"
                                                    )
                                                }
                                            />
                                            <span>
                                                Online Scheduling
                                            </span>
                                        </label>

                                        <label className="checkbox-row">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    filters.primaryCare
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "primaryCare"
                                                    )
                                                }
                                            />
                                            <span>
                                                Primary Care
                                            </span>
                                        </label>

                                    </div>

                                    <button
                                        type="button"
                                        className="apply-filter-btn"
                                        onClick={() =>
                                            setViewMode("map")
                                        }
                                    >
                                        APPLY FILTER
                                    </button>

                                </aside>

                                {/* MAP */}

                                <section className="doctor-map-container">

                                    <div className="map-topbar">

                                        <div>
                                            <strong>
                                                Doctors Near You
                                            </strong>

                                            <span>
                                                {filteredDoctors.length}{" "}
                                                doctors found
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="map-location-btn"
                                            onClick={
                                                showCurrentLocation
                                            }
                                        >
                                            📍 My Location
                                        </button>

                                    </div>

                                    <div
                                        className="fake-map"
                                        style={{
                                            backgroundSize: `${180 * mapScale}px ${180 * mapScale}px`,
                                        }}
                                    >

                                        {/* ROADS */}

                                        <div className="fake-road road-a" />
                                        <div className="fake-road road-b" />
                                        <div className="fake-road road-c" />
                                        <div className="fake-road road-d" />

                                        {/* LABELS */}

                                        <div className="map-area-label label-a">
                                            Central District
                                        </div>

                                        <div className="map-area-label label-b">
                                            Medical Center
                                        </div>

                                        <div className="map-area-label label-c">
                                            Riverside
                                        </div>

                                        {/* MARKERS */}

                                        {doctors.map((doctor, index) => (
                                            <button
                                                type="button"
                                                key={doctor.id}
                                                className={`doctor-marker marker-${String.fromCharCode(
                                                    97 + index
                                                )} ${
                                                    selectedDoctor ===
                                                    doctor.id
                                                        ? "selected-marker"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    selectDoctor(
                                                        doctor.id
                                                    )
                                                }
                                                title={
                                                    doctor.name
                                                }
                                            >
                                                {doctor.gender ===
                                                "Female"
                                                    ? "👩‍⚕️"
                                                    : "👨‍⚕️"}
                                            </button>
                                        ))}

                                        {/* CURRENT LOCATION */}

                                        <div
                                            className={`fake-current-location ${
                                                currentLocation
                                                    ? "location-active"
                                                    : ""
                                            }`}
                                        />

                                        {/* MAP CONTROLS */}

                                        <div className="fake-map-controls">

                                            <button
                                                type="button"
                                                onClick={zoomIn}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                onClick={zoomOut}
                                            >
                                                −
                                            </button>

                                        </div>

                                    </div>

                                </section>

                            </div>
                        )}

                        {/* ==================================================
                            LIST VIEW
                        ================================================== */}

                        {viewMode === "list" && (
                            <section className="doctor-list-section list-only-section">

                                <div className="doctor-list">

                                    {filteredDoctors.length === 0 ? (
                                        <div className="no-doctors">
                                            No doctors found.
                                        </div>
                                    ) : (
                                        filteredDoctors.map(
                                            (doctor) => (
                                                <div
                                                    className="doctor-result-card"
                                                    key={doctor.id}
                                                >

                                                    <div className="doctor-result-avatar">
                                                        {doctor.gender ===
                                                        "Female"
                                                            ? "SL"
                                                            : "DR"}
                                                    </div>

                                                    <div className="doctor-result-info">

                                                        <h3>
                                                            {
                                                                doctor.name
                                                            }
                                                        </h3>

                                                        <p>
                                                            {
                                                                doctor.specialty
                                                            }
                                                        </p>

                                                        <span>
                                                            📍{" "}
                                                            {
                                                                doctor.location
                                                            }
                                                        </span>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setViewMode(
                                                                "map"
                                                            );
                                                            selectDoctor(
                                                                doctor.id
                                                            );
                                                        }}
                                                    >
                                                        VIEW ON MAP
                                                    </button>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>

                            </section>
                        )}

                        {/* ==================================================
                            AVAILABLE DOCTORS UNDER MAP
                        ================================================== */}

                        {viewMode === "map" && (
                            <section className="doctor-list-section">

                                <div className="list-section-header">

                                    <div>
                                        <h2>
                                            Available Doctors
                                        </h2>

                                        <p>
                                            Browse doctors from the map
                                            results
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setViewMode("list")
                                        }
                                    >
                                        View All
                                    </button>

                                </div>

                                <div className="doctor-list">

                                    {filteredDoctors.length === 0 ? (
                                        <div className="no-doctors">
                                            No doctors found.
                                        </div>
                                    ) : (
                                        filteredDoctors.map(
                                            (doctor) => (
                                                <div
                                                    className="doctor-result-card"
                                                    key={doctor.id}
                                                >

                                                    <div className="doctor-result-avatar">
                                                        {doctor.gender ===
                                                        "Female"
                                                            ? "SL"
                                                            : "DR"}
                                                    </div>

                                                    <div className="doctor-result-info">

                                                        <h3>
                                                            {
                                                                doctor.name
                                                            }
                                                        </h3>

                                                        <p>
                                                            {
                                                                doctor.specialty
                                                            }
                                                        </p>

                                                        <span>
                                                            📍{" "}
                                                            {
                                                                doctor.location
                                                            }
                                                        </span>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setViewMode(
                                                                "map"
                                                            );
                                                            selectDoctor(
                                                                doctor.id
                                                            );
                                                        }}
                                                    >
                                                        VIEW ON MAP
                                                    </button>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>

                            </section>
                        )}

                    </section>

                    {/* ==================================================
                        FOOTER
                    ================================================== */}

                    <footer className="dashboard-footer">

                        <p>
                            ©️ 2026, made with ♥️ by
                            MyPatientHUB for a better web.
                        </p>

                        <div>
                            <button
                                type="button"
                                onClick={() =>
                                    goTo("/dashboard")
                                }
                            >
                                MyPatientHUB
                            </button>

                            <button type="button">
                                About Us
                            </button>

                            <button type="button">
                                Blog
                            </button>
                        </div>

                    </footer>

                </section>

            </main>

        </div>
    );
}

export default FindDoctorResult;