import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";
import "./Dashboard.css";

function FindDoctor() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [doctorSearch, setDoctorSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (doctorSearch.trim()) {
            params.set("doctor", doctorSearch.trim());
        }

        if (locationSearch.trim()) {
            params.set("location", locationSearch.trim());
        }

        const query = params.toString();

        navigate(
            query
                ? `/find-doctor-results?${query}`
                : "/find-doctor-results"
        );
    };

    const handleCurrent = () => {
        navigate("/find-doctor-results?mode=current");
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="doctor-page">
            <div className="dashboard-body">

                {/* SIDEBAR */}
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
                            className="menu-item active"
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

                        <button type="button" className="menu-item">
                            <span className="menu-icon">▣</span>
                            <span>Chat</span>
                        </button>

                        <button type="button" className="menu-item">
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

                {/* MAIN */}
                <main className="main-content">

                    {/* HEADER */}
                    <header className="top-header">

                        <div className="header-left">

                            <button
                                type="button"
                                className="hamburger"
                                onClick={() =>
                                    setSidebarOpen((prev) => !prev)
                                }
                            >
                                ☰
                            </button>

                            <div>
                                <div className="breadcrumb">
                                    <span>⌂</span>
                                    <span>/</span>
                                    <span>Find Doctor</span>
                                </div>

                                <h2>Find Doctor</h2>
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

                    {/* CONTENT */}
                    <section className="dashboard-content">

                        <section className="doctor-hero">

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
                                        onChange={(e) =>
                                            setDoctorSearch(e.target.value)
                                        }
                                        onKeyDown={handleEnter}
                                    />

                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Zip Code or Neighborhood"
                                        value={locationSearch}
                                        onChange={(e) =>
                                            setLocationSearch(e.target.value)
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

                        <section className="section">

                            <h2 className="section-title">
                                Special Services
                            </h2>

                            <div className="service-grid">

                                <div className="service-card">
                                    <div className="service-icon">🩺</div>

                                    <div className="service-text">
                                        <h3>
                                            Primary Care and Internal MD
                                        </h3>

                                        <p>
                                            Our Doctors Partner with you to
                                            help you reach your wellness
                                        </p>
                                    </div>

                                    <span className="arrow">⌄</span>
                                </div>

                                <div className="service-card">
                                    <div className="service-icon">🫀</div>

                                    <div className="service-text">
                                        <h3>Emergency Care</h3>

                                        <p>
                                            We provide emergency care for
                                            adults and children
                                        </p>
                                    </div>

                                    <span className="arrow">⌄</span>
                                </div>

                                <div className="service-card">
                                    <div className="service-icon">❤️</div>

                                    <div className="service-text">
                                        <h3>Imaging Services</h3>

                                        <p>
                                            From Xray to MR scan we offer...
                                        </p>
                                    </div>

                                    <span className="arrow">⌄</span>
                                </div>

                                <div className="service-card">
                                    <div className="service-icon">⊕</div>

                                    <div className="service-text">
                                        <h3>Urgent Care</h3>

                                        <p>
                                            We offer urgent care for none...
                                        </p>
                                    </div>

                                    <span className="arrow">⌄</span>
                                </div>

                            </div>
                        </section>

                        <section className="section">

                            <h2 className="section-title">
                                Find Doctors By Specialty
                            </h2>

                            <p className="section-subtitle">
                                Select a Specialty to View all Doctors and
                                schedule an Appointment
                            </p>

                            <div className="specialty-grid">

                                <div className="specialty">
                                    <span>Anesthesiology</span>
                                    <span>⌄</span>
                                </div>

                                <div className="specialty">
                                    <span>Dermatology</span>
                                    <span>⌄</span>
                                </div>

                                <div className="specialty">
                                    <span>Emergency medicine</span>
                                    <span>⌄</span>
                                </div>

                                <div className="specialty">
                                    <span>Neurology</span>
                                    <span>⌄</span>
                                </div>

                                <div className="specialty">
                                    <span>Consultation</span>
                                    <span>⌄</span>
                                </div>

                                <div className="specialty">
                                    <span>Ophthalmology</span>
                                    <span>⌄</span>
                                </div>

                            </div>
                        </section>

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

export default FindDoctor;