
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FindDoctor.css";
import "./Dashboard.css";

function FindDoctor() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [doctorSearch, setDoctorSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [headerSearch, setHeaderSearch] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const closeSidebar = () => setSidebarOpen(false);

    const goTo = (path) => {
        closeSidebar();
        navigate(path);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        const doctor = doctorSearch.trim();
        const place = locationSearch.trim();

        if (doctor) params.set("doctor", doctor);
        if (place) params.set("location", place);

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
        if (event.key === "Enter") handleSearch();
    };

    const handleHeaderSearch = (event) => {
        if (event.key === "Enter") {
            const value = headerSearch.trim();

            if (value) {
                goTo(
                    `/find-doctor-results?doctor=${encodeURIComponent(value)}`
                );
            }
        }
    };

    const menuItems = [
        { label: "Dashboard", icon: "▣", path: "/dashboard" },
        { label: "Appointments", icon: "▤", path: "/appointments" },
        { label: "Find Doctor", icon: "♟", path: "/find-doctor" },
        { label: "Find Clinic", icon: "▦", path: "/find-clinic" },
        { label: "Chat", icon: "▣", path: "/chat" },
        { label: "Find Market-Place", icon: "▤", path: "/marketplace" },
        { label: "Find Pharmacy", icon: "▦", path: "/find-pharmacy" },
        { label: "My Dependents", icon: "▤", path: "/my-dependents" },
        { label: "My Account", icon: "⚒", path: "/account" },
        { label: "Settings", icon: "⚙", path: "/settings" },
    ];

    return (
        <div className="doctor-page">
            <div className="dashboard-body">

                {/* MOBILE SIDEBAR OVERLAY */}
                {sidebarOpen && (
                    <div
                        className="doctor-sidebar-overlay"
                        onClick={closeSidebar}
                    />
                )}

                {/* SIDEBAR — SAME DESIGN AS FIND PHARMACY */}
                <aside
                    className={`pharmacy-sidebar ${
                        sidebarOpen ? "show" : ""
                    }`}
                >
                    <div className="pharmacy-logo">
                        <div className="logo-mark">
                            M<span>HUB</span>
                        </div>
                        <span className="logo-text">MyPatientHUB</span>
                    </div>

                    <nav className="pharmacy-sidebar-menu">
                        {menuItems.map((item) => {
                            const isActive =
                                location.pathname === item.path;

                            return (
                                <button
                                    key={item.path}
                                    type="button"
                                    className={`pharmacy-menu-item ${
                                        isActive ? "active" : ""
                                    }`}
                                    onClick={() => goTo(item.path)}
                                >
                                    <span
                                        className={`pharmacy-menu-icon ${
                                            isActive ? "active-icon" : ""
                                        }`}
                                    >
                                        {item.icon}
                                    </span>

                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="pharmacy-help">
                        <div className="help-icon">?</div>
                        <div>
                            <h4>Need Help?</h4>
                            <p>Contact our support team</p>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT — ORIGINAL CONTENT PRESERVED */}
                <main className="main-content">
                    <section className="dashboard-content">

                        {/* HERO */}
                        <section className="doctor-hero">
                            <header className="hero-topbar">
                                <div className="hero-left">
                                    <button
                                        type="button"
                                        className="hero-hamburger"
                                        onClick={() =>
                                            setSidebarOpen((previous) => !previous)
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
                                            <strong>Find Doctor</strong>
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
                                                setHeaderSearch(event.target.value)
                                            }
                                            onKeyDown={handleHeaderSearch}
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
                                        onClick={() => goTo("/settings")}
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

                            <div className="hero-title">
                                <h1>Find a Doctor</h1>
                                <p>
                                    Search Doctors and schedule an appointment
                                </p>

                                <div className="search-row">
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search a doctor by name, specialty"
                                        value={doctorSearch}
                                        onChange={(event) =>
                                            setDoctorSearch(event.target.value)
                                        }
                                        onKeyDown={handleEnter}
                                    />

                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Zip Code or Neighborhood"
                                        value={locationSearch}
                                        onChange={(event) =>
                                            setLocationSearch(event.target.value)
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

                        {/* SPECIAL SERVICES */}
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
                                    <div className="service-icon">🩺</div>
                                    <div className="service-text">
                                        <h3>Primary Care and Internal MD</h3>
                                        <p>
                                            Our Doctors Partner with you to help
                                            you reach your wellness
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
                                    <div className="service-icon">🫀</div>
                                    <div className="service-text">
                                        <h3>Emergency Care</h3>
                                        <p>
                                            We provide emergency care for adults
                                            and children
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
                                    <div className="service-icon">❤️</div>
                                    <div className="service-text">
                                        <h3>Imaging Services</h3>
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
                                    <div className="service-icon">⊕</div>
                                    <div className="service-text">
                                        <h3>Urgent Care</h3>
                                        <p>
                                            We offer urgent care for
                                            non-emergency medical needs
                                        </p>
                                    </div>
                                    <span className="arrow">›</span>
                                </button>
                            </div>
                        </section>

                        {/* SPECIALTIES */}
                        <section className="section">
                            <h2 className="section-title">
                                Find Doctors By Specialty
                            </h2>

                            <p className="section-subtitle">
                                Select a Specialty to View all Doctors and
                                schedule an Appointment
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

                        {/* FOOTER */}
                        <footer className="dashboard-footer">
                            <p>
                                © 2026, made with ♥ by MyPatientHUB for a
                                better web.
                            </p>

                            <div>
                                <a href="#mypatienthub">MyPatientHUB</a>
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

export default FindDoctor;