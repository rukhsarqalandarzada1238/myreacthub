
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Marketplace.css";

const products = [
    {
        id: 1,
        name: "Medical Supplies",
        price: "25 RM",
        category: "Medical Equipment",
        description:
            "Discover everyday medical supplies and essential products for patient care at home.",
        color: "food-panda",
        image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
        provider: "Care Supplies",
        initials: "CS",
    },
    {
        id: 2,
        name: "Health & Wellness",
        price: "35 RM",
        category: "Wellness",
        description:
            "Explore wellness essentials designed to support healthy routines and everyday wellbeing.",
        color: "grab-food",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        provider: "Wellness Hub",
        initials: "WH",
    },
    {
        id: 3,
        name: "Diagnostic Equipment",
        price: "45 RM",
        category: "Health Equipment",
        description:
            "Find healthcare monitoring equipment and tools to support your everyday health needs.",
        color: "deliveroo",
        image:
            "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
        provider: "Health Essentials",
        initials: "HE",
    },
    {
        id: 4,
        name: "Healthy Living",
        price: "20 RM",
        category: "Nutrition & Wellness",
        description:
            "Browse healthy living essentials to help you build better habits and support your wellbeing.",
        color: "minimalist",
        image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
        provider: "Healthy Living Hub",
        initials: "HL",
    },
];

const tableResults = [
    {
        name: "Digital Thermometer",
        category: "Medical Equipment",
        service: "Care Supplies",
        discount: "5%",
        price: "25 RM",
        id: "243598234",
        image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=150&q=80",
    },
    {
        name: "Wellness Essentials",
        category: "Wellness",
        service: "Wellness Hub",
        discount: "10%",
        price: "35 RM",
        id: "243598235",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&q=80",
    },
    {
        name: "Health Monitoring",
        category: "Health Equipment",
        service: "Health Essentials",
        discount: "8%",
        price: "45 RM",
        id: "243598236",
        image:
            "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=150&q=80",
    },
    {
        name: "Healthy Nutrition",
        category: "Nutrition",
        service: "Healthy Living Hub",
        discount: "5%",
        price: "20 RM",
        id: "243598237",
        image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=150&q=80",
    },
];

function Marketplace() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(7);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    const menuItems = [
        { label: "Dashboard", icon: "▣", path: "/dashboard" },
        { label: "Appointments", icon: "▤", path: "/appointments" },
        { label: "Find Doctor", icon: "♟", path: "/find-doctor" },
        { label: "Find Clinic", icon: "▦", path: "/find-clinic" },
        { label: "Chat", icon: "▣", path: "/chat" },
        { label: "Find Market-Place", icon: "🛍️", path: "/marketplace" },
        { label: "Find Pharmacy", icon: "💊", path: "/find-pharmacy" },
        { label: "My Dependents", icon: "▤", path: "/my-dependents" },
        { label: "My Account", icon: "♟", path: "/account" },
        { label: "Settings", icon: "⚙", path: "/settings" },
    ];

    const filteredResults = tableResults.filter((item) =>
        `${item.name} ${item.category} ${item.service} ${item.id}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    const displayedResults = filteredResults.slice(0, entriesPerPage);

    const handleImageError = (event) => {
        event.currentTarget.style.display = "none";
    };

    return (
        <div className="marketplace-body">
            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
                <div className="logo-area">
                    <div className="logo-icon">M</div>
                    <span>MyPatientHUB</span>
                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`menu-item ${
                                location.pathname === item.path ? "active" : ""
                            }`}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="help-box">
                    <span>?</span>
                    <div>
                        <h4>Need Help?</h4>
                        <p>Contact our support team</p>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                {/* HEADER */}
                <header className="top-header">
                    <div className="header-left">
                        <button
                            className="hamburger"
                            type="button"
                            aria-label="Toggle sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen((previous) => !previous)}
                        >
                            ☰
                        </button>

                        <div>
                            <div className="breadcrumb">
                                <span>⌂</span>
                                <span>/</span>
                                <span>Marketplace</span>
                            </div>
                            <h2>Marketplace</h2>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="search-box">
                            <span>⌕</span>
                            <input
                                type="text"
                                placeholder="Search healthcare products..."
                                aria-label="Search healthcare products"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="header-link"
                            onClick={() => navigate("/login")}
                        >
                            ◉ Log out
                        </button>

                        <button
                            type="button"
                            className="header-icon"
                            aria-label="Settings"
                            onClick={() => navigate("/settings")}
                        >
                            ⚙
                        </button>

                        <button
                            type="button"
                            className="header-icon"
                            aria-label="My account"
                            onClick={() => navigate("/account")}
                        >
                            ♟
                        </button>
                    </div>
                </header>

                {/* MARKETPLACE CONTENT */}
                <section className="marketplace-content">
                    <div className="marketplace-card">
                        <h1>Healthcare Products & Patient Essentials</h1>
                        <p className="marketplace-intro">
                            Explore medical supplies, wellness products, and everyday
                            essentials to support you and your family.
                        </p>

                        <div className="product-grid">
                            {products.map((product) => (
                                <article className="product-card" key={product.id}>
                                    <div className={`product-image ${product.color}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    <div className="product-info">
                                        <div className="product-top">
                                            <span className="product-category">
                                                {product.category}
                                            </span>
                                            <span className="product-price">
                                                {product.price}
                                            </span>
                                        </div>

                                        <div className="provider">
                                            <div className={`provider-logo ${product.color}`}>
                                                {product.initials}
                                            </div>
                                            <h3>{product.name}</h3>
                                        </div>

                                        <p>{product.description}</p>

                                        <button
                                            type="button"
                                            className="buy-button"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: {
                                                        message:
                                                            `Please log in to continue with ${product.name}.`,
                                                    },
                                                })
                                            }
                                        >
                                            VIEW DETAILS
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* OTHER RESULTS */}
                    <div className="results-card">
                        <h2>Healthcare Products & Services</h2>

                        <div className="results-toolbar">
                            <div className="entries-select">
                                <select
                                    value={entriesPerPage}
                                    onChange={(event) =>
                                        setEntriesPerPage(Number(event.target.value))
                                    }
                                    aria-label="Entries per page"
                                >
                                    <option value={7}>7</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <span>entries per page</span>
                            </div>

                            <div className="table-search">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    aria-label="Search healthcare products"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="table-wrapper">
                            <table className="marketplace-table">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>CATEGORY</th>
                                        <th>SERVICE BY</th>
                                        <th>DISCOUNT</th>
                                        <th>PRICE</th>
                                        <th>ID</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {displayedResults.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="table-name">
                                                    <div className="small-food-image">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            loading="lazy"
                                                            onError={handleImageError}
                                                        />
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                            </td>
                                            <td>{item.category}</td>
                                            <td>
                                                <div className="service-cell">
                                                    <span className="service-logo">✚</span>
                                                    <span>{item.service}</span>
                                                </div>
                                            </td>
                                            <td>{item.discount}</td>
                                            <td>{item.price}</td>
                                            <td>{item.id}</td>
                                        </tr>
                                    ))}

                                    {displayedResults.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="no-results">
                                                No healthcare products found. Try another search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="table-bottom">
                            Showing {displayedResults.length > 0 ? 1 : 0} to{" "}
                            {displayedResults.length} of {filteredResults.length} entries
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="dashboard-footer">
                    <p>
                        © 2026, made with ♥ by MyPatientHUB for a better web.
                    </p>

                    <div>
                        <a href="#mypatienthub">MyPatientHUB</a>
                        <a href="#about">About Us</a>
                        <a href="#blog">Blog</a>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default Marketplace;