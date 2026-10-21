import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Marketplace.css";

function Marketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHamburger = () => {
    if (window.matchMedia("(max-width: 950px)").matches) {
      setSidebarOpen((previous) => !previous);
    } else {
      setDesktopCollapsed((previous) => !previous);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  // ===== MEDICAL PRODUCTS (Patient HUB) =====
        const products = [
          {
            id: 1,
            name: "Digital Thermometer",
            price: "25 RM",
            category: "Medical Device",
            description: "Fast and accurate body temperature reading for home and clinical use.",
            color: "medical-blue",
            image: "public/images/tm.webp",
          },
    {
      id: 2,
      name: "Blood Pressure Monitor",
      price: "120 RM",
      category: "Medical Device",
      description: "Automatic upper arm blood pressure monitor with memory and large display.",
      color: "medical-red",
      image: "public/images/bp.webp",
    },
    {
      id: 3,
      name: "First Aid Kit",
      price: "45 RM",
      category: "Emergency Care",
      description: "Complete first aid kit with bandages, antiseptics, and essential tools.",
      color: "medical-green",
      image: "public/images/fa.webp",
    },
    {
      id: 4,
      name: "Vitamin D3 Supplement",
      price: "35 RM",
      category: "Pharmacy",
      description: "Daily vitamin D3 supplement to support bone health and immunity.",
      color: "medical-purple",
      image: "public/images/vs.webp",
    },
  ];

  const tableResults = [
    {
      name: "Digital Thermometer",
      category: "Device",
      service: "MediCare Store",
      discount: "0",
      price: "25 RM",
      id: "MED-1001",
      image: "/public/images/tm.webp",
    },
    {
      name: "Blood Pressure Monitor",
      category: "Device",
      service: "HealthPlus",
      discount: "5",
      price: "120 RM",
      id: "MED-1002",
      image: "/public/images/bp.webp",
    },
    {
      name: "First Aid Kit",
      category: "Emergency",
      service: "SafeCare",
      discount: "10",
      price: "45 RM",
      id: "MED-1003",
      image: "/public/images/fa.webp",
    },
    {
      name: "Vitamin D3",
      category: "Pharmacy",
      service: "PharmaCare",
      discount: "5",
      price: "35 RM",
      id: "MED-1004",
      image: "/public/images/vs.webp",
    },
  ];

  const searchValue = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  const filteredResults = tableResults.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  const displayedResults = filteredResults.slice(0, entriesPerPage);

  const handleHeaderSearch = (event) => {
    event.preventDefault();
    setSearch(headerSearch);
    document
      .getElementById("marketplace-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageError = (event) => {
    event.currentTarget.src =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect width="150" height="150" fill="#eef1f5"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="#9aa3b0" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'
      );
  };

  const menuItems = [
    { label: "Dashboard", icon: "▣", path: "/dashboard" },
    { label: "Appointments", icon: "▤", path: "/appointments" },
    { label: "Find Doctor", icon: "♟", path: "/find-doctor" },
    { label: "Find Clinic", icon: "▦", path: "/find-clinic" },
    { label: "Chat", icon: "▣", path: "/chat" },
    { label: "Find Market-Place", icon: "▤", path: "/marketplace" },
    { label: "Find Pharmacy", icon: "💊", path: "/pharmacy" },
    { label: "My Dependents", icon: "▤", path: "/my-dependents" },
    { label: "My Account", icon: "⚒", path: "/account" },
    { label: "Settings", icon: "⚙", path: "/settings" },
  ];

  return (
    <div className={`marketplace-body ${desktopCollapsed ? "sidebar-collapsed" : ""}`}>
      {sidebarOpen && (
        <button
          type="button"
          className="marketplace-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close navigation sidebar"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="logo-area">
          <div className="logo-icon">M</div>
          <span>MyPatientHUB</span>
        </div>

        <nav className="sidebar-menu" aria-label="Main navigation">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="help-box">
          <span>?</span>
          <div>
            <h4>Need Help?</h4>
            <p>Contact our support team.</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button
              type="button"
              className="hamburger"
              onClick={handleHamburger}
              aria-label="Toggle navigation sidebar"
            >
              ☰
            </button>

            <div className="header-title">
              <div className="breadcrumb">
                <span>⌂</span>
                <span>/</span>
                <span>Marketplace</span>
              </div>
              <h2>Marketplace</h2>
            </div>
          </div>

          <div className="header-right">
            <form className="search-box" onSubmit={handleHeaderSearch}>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search medical product here..."
                aria-label="Search marketplace results"
                value={headerSearch}
                onChange={(event) => setHeaderSearch(event.target.value)}
              />
            </form>

            <button
              type="button"
              className="header-link"
              onClick={() => handleNavigation("/login")}
            >
              ◉ Log out
            </button>

            <button
              type="button"
              className="header-icon"
              aria-label="Settings"
              onClick={() => handleNavigation("/settings")}
            >
              ⚙
            </button>

            <button
              type="button"
              className="header-icon"
              aria-label="My account"
              onClick={() => handleNavigation("/account")}
            >
              ♟
            </button>
          </div>
        </header>

        <section className="marketplace-content">
          <div className="marketplace-intro">
            Explore medical products, pharmacy items, and health devices — trusted by MyPatientHUB.
          </div>

          <div className="marketplace-card">
            <h1>Search medical products and order what you need</h1>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div
                    className={`product-image ${product.color}`}
                    style={{ padding: 0, overflow: "hidden", display: "flex" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={handleImageError}
                    />
                  </div>

                  <div className="product-info">
                    <div className="product-top">
                      <span className="product-category">{product.category}</span>
                      <span className="product-price">{product.price}</span>
                    </div>

                    <div className="provider">
                      <div className={`provider-logo ${product.color}`}>
                        {product.name === "Digital Thermometer" && "🌡"}
                        {product.name === "Blood Pressure Monitor" && "❤"}
                        {product.name === "First Aid Kit" && "✚"}
                        {product.name === "Vitamin D3 Supplement" && "💊"}
                      </div>
                      <h3>{product.name}</h3>
                    </div>

                    <p>{product.description}</p>

                    <button
                      type="button"
                      className="buy-button"
                      onClick={() => navigate("/login")}
                    >
                      BUY NOW
                    </button>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 && (
                <p className="no-products-found">No products found for "{search}"</p>
              )}
            </div>
          </div>

          <div className="results-card" id="marketplace-results">
            <h2>Other medical results</h2>

            <div className="results-toolbar">
              <label className="entries-select">
                <select
                  value={entriesPerPage}
                  onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                  aria-label="Entries per page"
                >
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries per page</span>
              </label>

              <div className="table-search">
                <input
                  type="search"
                  placeholder="Search..."
                  aria-label="Filter table results"
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
                          <div
                            className="small-food-image"
                            style={{ overflow: "hidden", borderRadius: "50%" }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={handleImageError}
                            />
                          </div>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td>{item.category}</td>

                      <td>
                        <div className="service-cell">
                          <span className="service-logo">●</span>
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
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-bottom">
              <span>
                Showing {displayedResults.length} of {filteredResults.length} entries
              </span>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>© 2026, made with ♥ by MyPiHUB for a better web.</p>

          <div>
            <a href="#marketplace-results">MyPatientHUB</a>
            <a href="#marketplace-results">About Us</a>
            <a href="#marketplace-results">Blog</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Marketplace;