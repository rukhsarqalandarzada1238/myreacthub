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
  const location = useLocation(); // برای تشخیص اینکه در کدام صفحه هستیم

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

  // اضافه کردن عکس واقعی برای هر محصول
  const products = [
    {
      id: 1,
      name: "Food Panda",
      price: "5 RM",
      category: "Healthy Diet",
      description: "As Uber works through a huge amount of internal management turmoil.",
      color: "food-panda",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", // عکس غذا
    },
    {
      id: 2,
      name: "Grab Food",
      price: "10 RM",
      category: "Healthy Diet",
      description: "Music is something that every person has or ing that every person has his or.",
      color: "grab-food",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", // عکس سالاد
    },
    {
      id: 3,
      name: "Deliveroo",
      price: "15 RM",
      category: "Healthy Diet",
      description: "Different people have different taste, and various types of music.",
      color: "deliveroo",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80", // عکس غذا
    },
    {
      id: 4,
      name: "Minimalist",
      price: "20 RM",
      category: "Healthy Diet",
      description: "Different people have different taste, and various types of music.",
      color: "minimalist",
      image: "https://images.unsplash.com/photo-1498837167922-41c00ff4c4b1?auto=format&fit=crop&w=400&q=80", // عکس غذا
    },
  ];

  const tableResults = [
    {
      name: "Healthy Diet",
      category: "Food",
      service: "Food panda",
      discount: "0",
      price: "10 RM",
      id: "243598234",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Healthy Diet",
      category: "Food",
      service: "Grab Food",
      discount: "5",
      price: "15 RM",
      id: "243598235",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Healthy Diet",
      category: "Food",
      service: "Deliveroo",
      discount: "10",
      price: "20 RM",
      id: "243598236",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=100&q=80",
    },
  ];

  // فقط بر اساس اسم محصول جستجو میکند
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
    event.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
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
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          className="marketplace-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close navigation sidebar"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="logo-area">
          <div className="logo-icon">M</div>
          <span>MyPatientHUB</span>
        </div>

        <nav className="sidebar-menu" aria-label="Main navigation">
          {menuItems.map((item) => {
            // چک میکنیم کاربر در کدام صفحه است تا آیکون را فعال کند
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

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
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
                placeholder="Type product name here..."
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

            {/* دکمه تنظیمات (چرخ دنده) */}
            <button
              type="button"
              className="header-icon"
              aria-label="Settings"
              onClick={() => handleNavigation("/settings")}
            >
              ⚙
            </button>

            {/* دکمه حساب کاربری (آدمک) */}
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

        {/* MARKETPLACE CONTENT */}
        <section className="marketplace-content">
          <div className="marketplace-intro">
            Explore available marketplaces and find what you need.
          </div>

          <div className="marketplace-card">
            <h1>Search Marketplaces and order what you need</h1>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  {/* عکس واقعی محصول به جای CSS */}
                  <div className={`product-image ${product.color}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
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
                        {product.name === "Food Panda" && "●"}
                        {product.name === "Grab Food" && "grab"}
                        {product.name === "Deliveroo" && "D"}
                        {product.name === "Minimalist" && "●"}
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

          {/* OTHER RESULTS */}
          <div className="results-card" id="marketplace-results">
            <h2>Other results for healthy diet search</h2>

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
                          {/* عکس کوچک برای جدول */}
                          <div className="small-food-image" style={{ overflow: "hidden", borderRadius: "8px" }}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
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

        {/* FOOTER */}
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