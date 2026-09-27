import React, { useMemo, useState } from "react";
import "./style.css";
import "./FindDoctorResult.css";
const doctors = [
    {
        id: 1,
        name: "Dr. Allan",
        specialty: "Cardiology",
        gender: "Male",
        location: "Central District",
    },
    {
        id: 2,
        name: "Dr. Sarah Lee",
        specialty: "Dermatology",
        gender: "Female",
        location: "Medical Center",
    },
    {
        id: 3,
        name: "Dr. Michael Khan",
        specialty: "Neurology",
        gender: "Male",
        location: "Riverside",
    },
    {
        id: 4,
        name: "Dr. Emily Wilson",
        specialty: "Pediatrics",
        gender: "Female",
        location: "Central District",
    },
    {
        id: 5,
        name: "Dr. Daniel Smith",
        specialty: "General Medicine",
        gender: "Male",
        location: "North Avenue",
    },
];
function FindDoctorResult() {
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
    const [filters, setFilters] = useState({
        gender: false,
        condition: false,
        languages: false,
        allAges: false,
        children: false,
        adults: false,
        onlineScheduling: false,
        primaryCare: false,
    });
    /* =========================
       MAP
    ========================= */
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(false);
    const [mapScale, setMapScale] = useState(1);
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
        const searchValue =
            search.toLowerCase().trim();
        const locationValue =
            zipCode.toLowerCase().trim();
        /* SEARCH NAME / SPECIALTY */
        if (searchValue) {
            results = results.filter((doctor) => {
                return (
                    doctor.name
                        .toLowerCase()
                        .includes(searchValue) ||
                    doctor.specialty
                        .toLowerCase()
                        .includes(searchValue)
                );
            });
        }
        /* SPECIALTY */
        if (specialty) {
            results = results.filter(
                (doctor) =>
                    doctor.specialty === specialty
            );
        }
        /* LOCATION */
        if (locationValue) {
            results = results.filter((doctor) => {
                return doctor.location
                    .toLowerCase()
                    .includes(locationValue);
            });
        }
        return results;
    }, [search, zipCode, specialty]);
    /* =========================
       SEARCH
    ========================= */
    const handleSearch = () => {
        setSearch(search.trim());
        setZipCode(zipCode.trim());
    };
    /* =========================
       CLEAR FILTERS
    ========================= */
    const clearDoctorFilters = () => {
        setSpecialty("");
        setFilters({
            gender: false,
            condition: false,
            languages: false,
            allAges: false,
            children: false,
            adults: false,
            onlineScheduling: false,
            primaryCare: false,
        });
    };
    /* =========================
       APPLY FILTERS
    ========================= */
    const applyDoctorFilters = () => {
        // Filtering is already reactive.
        // This function can later be connected
        // to an API request.
        console.log("Filters applied");
    };
    /* =========================
       SELECT DOCTOR
    ========================= */
    const selectDoctor = (id) => {
        setSelectedDoctor(id);
        setTimeout(() => {
            setSelectedDoctor(null);
        }, 1200);
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
        <div className="dashboard-body">
            {/* ==================================================
                SIDEBAR
            ================================================== */}
            <aside
                className={`sidebar ${
                    sidebarOpen ? "show" : ""
                }`}
                id="sidebar"
            >
                {/* LOGO */}
                <div className="logo-area">
                    <div className="logo-icon">
                        M
                    </div>
                    <span>
                        MyPatientHUB
                    </span>
                </div>
                {/* MENU */}
                <nav className="sidebar-menu">
                    <a
                        href="/dashboard"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▣
                        </span>
                        <span className="menu-text">
                            Dashboard
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▤
                        </span>
                        <span className="menu-text">
                            Appointments
                        </span>
                    </a>
                    <a
                        href="/find-doctor"
                        className="menu-item active"
                    >
                        <span className="menu-icon">
                            ♟
                        </span>
                        <span className="menu-text">
                            Find Doctor
                        </span>
                    </a>
                    <a
                        href="/find-clinic"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▦
                        </span>
                        <span className="menu-text">
                            Find Clinic
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▣
                        </span>
                        <span className="menu-text">
                            Chat
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▤
                        </span>
                        <span className="menu-text">
                            Find Market-Place
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▦
                        </span>
                        <span className="menu-text">
                            Find Pharmacy
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ▤
                        </span>
                        <span className="menu-text">
                            My Dependents
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ⚒
                        </span>
                        <span className="menu-text">
                            My Account
                        </span>
                    </a>
                    <a
                        href="#"
                        className="menu-item"
                    >
                        <span className="menu-icon">
                            ⚙
                        </span>
                        <span className="menu-text">
                            Settings
                        </span>
                    </a>
                </nav>
                {/* HELP */}
                <div className="help-box">
                    <span>
                        ?
                    </span>
                </div>
            </aside>
            {/* ==================================================
                MAIN CONTENT
            ================================================== */}
            <main className="main-content">
                <section className="dashboard-content">
                    {/* ==================================================
                        DOCTOR HERO
                    ================================================== */}
                    <section className="doctor-hero">
                        {/* TOP BAR */}
                        <div className="hero-topbar">
                            <div className="hero-left">
                                {/* MOBILE SIDEBAR BUTTON */}
                                <button
                                    type="button"
                                    className="hero-hamburger"
                                    onClick={() =>
                                        setSidebarOpen(
                                            !sidebarOpen
                                        )
                                    }
                                >
                                    ☰
                                </button>
                                <div className="hero-breadcrumb">
                                    <div>
                                        <span>
                                            ⌂
                                        </span>
                                        <span>
                                            /
                                        </span>
                                        <span>
                                            Find Doctor
                                        </span>
                                        <span>
                                            /
                                        </span>
                                        <span>
                                            Results
                                        </span>
                                    </div>
                                    <strong>
                                        Find Doctors
                                    </strong>
                                </div>
                            </div>
                            {/* HERO RIGHT */}
                            <div className="hero-right">
                                <div className="hero-search">
                                    <span>
                                        ⌕
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key ===
                                                "Enter"
                                            ) {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                </div>
                                <a
                                    href="/"
                                    className="hero-logout"
                                >
                                    ◉ Log out
                                </a>
                                <span className="hero-icon">
                                    ⚙
                                </span>
                                <span className="hero-icon">
                                    ♟
                                </span>
                            </div>
                        </div>
                        {/* HERO TITLE */}
                        <div className="hero-title">
                            <h1>
                                Find Doctors
                            </h1>
                            <p>
                                Search doctors and
                                schedule an appointment
                            </p>
                            <div className="search-row">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Doctor name or specialty"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="ZIP Code or Neighborhood"
                                    value={zipCode}
                                    onChange={(e) =>
                                        setZipCode(
                                            e.target.value
                                        )
                                    }
                                />
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
                    {/* ==================================================
                        RESULTS PAGE
                    ================================================== */}
                    <section className="doctor-results-page">
                        <div className="doctor-results-header">
                            <h1>
                                Find Doctors
                            </h1>
                            <p>
                                Search doctors and
                                schedule an appointment
                            </p>
                        </div>
                        {/* SEARCH BAR */}
                        <div className="doctor-results-search">
                            <div className="results-search-box">
                                <span>
                                    ⌕
                                </span>
                                <input
                                    type="text"
                                    placeholder="Doctor name or specialty"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="results-search-box">
                                <span>
                                    📍
                                </span>
                                <input
                                    type="text"
                                    placeholder="ZIP Code or Neighborhood"
                                    value={zipCode}
                                    onChange={(e) =>
                                        setZipCode(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <button
                                className="results-search-btn"
                                onClick={handleSearch}
                            >
                                SEARCH
                            </button>
                        </div>
                        {/* ==================================================
                            MAP LAYOUT
                        ================================================== */}
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
                                        onChange={(e) =>
                                            setSpecialty(
                                                e.target.value
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
                                            Gender
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
                                        All Ages
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
                                    className="apply-filter-btn"
                                    onClick={
                                        applyDoctorFilters
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
                                            {
                                                filteredDoctors.length
                                            }{" "}
                                            doctors found
                                        </span>
                                    </div>
                                    <button
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
                                        backgroundSize:
                                            `${
                                                180 *
                                                mapScale
                                            }px ${
                                                180 *
                                                mapScale
                                            }px`,
                                    }}
                                >
                                    {/* ROADS */}
                                    <div className="fake-road road-a"></div>
                                    <div className="fake-road road-b"></div>
                                    <div className="fake-road road-c"></div>
                                    <div className="fake-road road-d"></div>
                                    {/* AREA LABELS */}
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
                                    <button
                                        className={`doctor-marker marker-a ${
                                            selectedDoctor === 1
                                                ? "selected-marker"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectDoctor(1)
                                        }
                                    >
                                        👨‍⚕️
                                    </button>
                                    <button
                                        className={`doctor-marker marker-b ${
                                            selectedDoctor === 2
                                                ? "selected-marker"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectDoctor(2)
                                        }
                                    >
                                        👩‍⚕️
                                    </button>
                                    <button
                                        className={`doctor-marker marker-c ${
                                            selectedDoctor === 3
                                                ? "selected-marker"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectDoctor(3)
                                        }
                                    >
                                        👨‍⚕️
                                    </button>
                                    <button
                                        className={`doctor-marker marker-d ${
                                            selectedDoctor === 4
                                                ? "selected-marker"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectDoctor(4)
                                        }
                                    >
                                        👩‍⚕️
                                    </button>
                                    <button
                                        className={`doctor-marker marker-e ${
                                            selectedDoctor === 5
                                                ? "selected-marker"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectDoctor(5)
                                        }
                                    >
                                        👨‍⚕️
                                    </button>
                                    {/* CURRENT LOCATION */}
                                    <div
                                        className={`fake-current-location ${
                                            currentLocation
                                                ? "location-active"
                                                : ""
                                        }`}
                                    ></div>
                                    {/* MAP CONTROLS */}
                                    <div className="fake-map-controls">
                                        <button
                                            onClick={
                                                zoomIn
                                            }
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={
                                                zoomOut
                                            }
                                        >
                                            −
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* ==================================================
                            DOCTOR LIST
                        ================================================== */}
                        <section className="doctor-list-section">
                            <h2>
                                Available Doctors
                            </h2>
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
                                                    DR
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
                                                    onClick={() =>
                                                        selectDoctor(
                                                            doctor.id
                                                        )
                                                    }
                                                >
                                                    VIEW ON MAP
                                                </button>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </section>
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
                            <a href="#">
                                MyPatientHUB
                            </a>
                            <a href="#">
                                About Us
                            </a>
                            <a href="#">
                                Blog
                            </a>
                        </div>
                    </footer>
                </section>
            </main>
        </div>
    );
}
export default FindDoctorResult;