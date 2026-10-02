import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";
import "./Dashboard.css";

function FindDoctor() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [doctorSearch, setDoctorSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [headerSearch, setHeaderSearch] = useState("");

    const navigate = useNavigate();

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const goTo = (path) => {
        closeSidebar();
        navigate(path);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();

        const doctor = doctorSearch.trim();
        const location = locationSearch.trim();

        if (doctor) {
            params.set("doctor", doctor);
        }

        if (location) {
            params.set("location", location);
        }

        const query = params.toString();

        goTo(
            query
                ? `/find-doctor-results?${query}`
                : "/find-doctor-results"
        );
    };

    const handleCurrent = () => {
        goTo("/find-doctor-results?mode=current");
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleHeaderSearch = (event) => {
        if (event.key === "Enter") {
            const value = headerSearch.trim();

            if (value) {
                goTo(
                    `/find-doctor-results?doctor=${encodeURIComponent(
                        value
                    )}`
                );
            }
        }
    };

    return (
        <div className="doctor-page">
            <div className="dashboard-body">

                {/* =====================================================
                    MOBILE SIDEBAR OVERLAY
                ====================================================== */}
                {sidebarOpen && (
                    <div
                        className="doctor-sidebar-overlay"
                        onClick={closeSidebar}
                    />
                )}

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}
                <aside
                    className={`sidebar ${
                        sidebarOpen ? "show" : ""
                    }`}
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
                        >
                            <span className="menu-icon">▤</span>
                            <span>Appointments</span>
                        </button>

                        <button
                            type="button"
                            className="menu-item active"
                        >
                            <span className="menu-icon">♟</span>
                            <span>Find Doctor</span>
                        </button>

                        <button
                            type="button"
                            className="menu-item"
                            onClick={() => goTo("/find-clinic")}
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
                            onClick={() => goTo("/marketplace")}
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

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <main className="main-content">
                    <section className="dashboard-content">

                        {/* =================================================
                            HERO
                        ================================================== */}
                        <section className="doctor-hero">

                            {/* TOP HEADER INSIDE PURPLE HERO */}
                            <header className="hero-topbar">

                                <div className="hero-left">

                                    <button
                                        type="button"
                                        className="hero-hamburger"
                                        onClick={() =>
                                            setSidebarOpen(
                                                (previous) => !previous
                                            )
                                        }
                                        aria-label="Toggle sidebar"
                                    >
                                        ☰
                                    </button>

                                    <div className="hero-breadcrumb">
                                        <div>
                                            <span className="breadcrumb-home">
                                                ⌂
                                            </span>

                                            <span className="breadcrumb-slash">
                                                /
                                            </span>

                                            <strong>
                                                Find Doctor
                                            </strong>
                                        </div>
                                    </div>

                                </div>

                                <div className="hero-right">

                                    <div className="hero-search">
                                        <span>⌕</span>

                                        <input
                                            type="text"
                                            placeholder="Type here..."
                                            value={headerSearch}
                                            onChange={(event) =>
                                                setHeaderSearch(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={
                                                handleHeaderSearch
                                            }
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="hero-logout"
                                        onClick={() => goTo("/login")}
                                    >
                                        ◉ Log out
                                    </button>

                                    <button
                                        type="button"
                                        className="hero-icon"
                                        onClick={() =>
                                            goTo("/settings")
                                        }
                                        aria-label="Settings"
                                    >
                                        ⚙
                                    </button>

                                    <button
                                        type="button"
                                        className="hero-icon"
                                        aria-label="Profile"
                                    >
                                        ♟
                                    </button>

                                </div>

                            </header>

                            {/* =================================================
                                HERO TITLE + SEARCH
                            ================================================== */}
                            <div className="hero-title">

                                <h1>Find a Doctor</h1>

                                <p>
                                    Search Doctors and schedule an
                                    appointment
                                </p>

                                <div className="search-row">

                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search a doctor by name, specialty"
                                        value={doctorSearch}
                                        onChange={(event) =>
                                            setDoctorSearch(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={handleEnter}
                                    />

                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Zip Code or Neighborhood"
                                        value={locationSearch}
                                        onChange={(event) =>
                                            setLocationSearch(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={handleEnter}
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

                        {/* =================================================
                            SPECIAL SERVICES
                        ================================================== */}
                        <section className="section">

                            <h2 className="section-title">
                                Special Services
                            </h2>

                            <div className="service-grid">

                                <button
                                    type="button"
                                    className="service-card"
                                    onClick={() =>
                                        goTo(
                                            "/find-doctor-results?service=primary-care"
                                        )
                                    }
                                >
                                    <div className="service-icon">
                                        🩺
                                    </div>

                                    <div className="service-text">
                                        <h3>
                                            Primary Care and Internal MD
                                        </h3>

                                        <p>
                                            Our Doctors Partner with you
                                            to help you reach your wellness
                                        </p>
                                    </div>

                                    <span className="arrow">›</span>
                                </button>

                                <button
                                    type="button"
                                    className="service-card"
                                    onClick={() =>
                                        goTo(
                                            "/find-doctor-results?service=emergency-care"
                                        )
                                    }
                                >
                                    <div className="service-icon">
                                        🫀
                                    </div>

                                    <div className="service-text">
                                        <h3>
                                            Emergency Care
                                        </h3>

                                        <p>
                                            We provide emergency care for
                                            adults and children
                                        </p>
                                    </div>

                                    <span className="arrow">›</span>
                                </button>

                                <button
                                    type="button"
                                    className="service-card"
                                    onClick={() =>
                                        goTo(
                                            "/find-doctor-results?service=imaging"
                                        )
                                    }
                                >
                                    <div className="service-icon">
                                        ❤️
                                    </div>

                                    <div className="service-text">
                                        <h3>
                                            Imaging Services
                                        </h3>

                                        <p>
                                            From Xray to MR scan we offer
                                            comprehensive imaging services
                                        </p>
                                    </div>

                                    <span className="arrow">›</span>
                                </button>

                                <button
                                    type="button"
                                    className="service-card"
                                    onClick={() =>
                                        goTo(
                                            "/find-doctor-results?service=urgent-care"
                                        )
                                    }
                                >
                                    <div className="service-icon">
                                        ⊕
                                    </div>

                                    <div className="service-text">
                                        <h3>
                                            Urgent Care
                                        </h3>

                                        <p>
                                            We offer urgent care for
                                            non-emergency medical needs
                                        </p>
                                    </div>

                                    <span className="arrow">›</span>
                                </button>

                            </div>

                        </section>

                        {/* =================================================
                            SPECIALTIES
                        ================================================== */}
                        <section className="section">

                            <h2 className="section-title">
                                Find Doctors By Specialty
                            </h2>

                            <p className="section-subtitle">
                                Select a Specialty to View all Doctors
                                and schedule an Appointment
                            </p>

                            <div className="specialty-grid">

                                {[
                                    "Anesthesiology",
                                    "Dermatology",
                                    "Emergency medicine",
                                    "Neurology",
                                    "Consultation",
                                    "Ophthalmology",
                                ].map((specialty) => (
                                    <button
                                        key={specialty}
                                        type="button"
                                        className="specialty"
                                        onClick={() =>
                                            goTo(
                                                `/find-doctor-results?specialty=${encodeURIComponent(
                                                    specialty
                                                )}`
                                            )
                                        }
                                    >
                                        <span>{specialty}</span>
                                        <span className="specialty-arrow">
                                            ›
                                        </span>
                                    </button>
                                ))}

                            </div>

                        </section>

                        {/* =================================================
                            FOOTER
                        ================================================== */}
                        <footer className="dashboard-footer">

                            <p>
                                © 2026, made with ♥ by MyPatientHUB
                                for a better web.
                            </p>

                            <div>
                                <a href="#mypatienthub">
                                    MyPatientHUB
                                </a>

                                <a href="#about">
                                    About Us
                                </a>

                                <a href="#blog">
                                    Blog
                                </a>
                            </div>

                        </footer>

                    </section>
                </main>

            </div>
        </div>
    );
}

export default FindDoctor;