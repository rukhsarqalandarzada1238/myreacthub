import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FindPharmacy.css";

const pharmacyImage =
  "/images/WhatsApp%20Image%202026-10-09%20at%201.19.56%20PM.jpeg";

const FindPharmacy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: "▣", path: "/dashboard" },
    { label: "Appointments", icon: "▤", path: "/appointments" },
    { label: "Find Doctor", icon: "▥", path: "/find-doctor" },
    { label: "Find Clinic", icon: "▣", path: "/find-clinic" },
    { label: "Chat", icon: "▤", path: "/chat" },
    { label: "Find MarketPlace", icon: "▰", path: "/marketplace" },
    { label: "Find Pharmacy", icon: "💊", path: "/pharmacy" },
   { label: "My Dependents", icon: "▤", path: "/my-dependents" },
    { label: "My Account", icon: "♟", path: "/account" },
    { label: "Settings", icon: "⚙", path: "/settings" },
  ];

  const medicines = [
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "Caring Pharmacy",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "1%",
      price: "5 RM",
      id: "8234",
    },
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "OK Pharmacy",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "3%",
      price: "9 RM",
      id: "872",
    },
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "Hilton Medical",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "5%",
      price: "7 RM",
      id: "0134",
    },
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "Hinucon Pharma",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "5%",
      price: "9 RM",
      id: "113",
    },
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "Hamza Medical Pharmacy",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "7%",
      price: "20 RM",
      id: "629",
    },
    {
      name: "Esso",
      category: "Tablet",
      pharmacy: "Food Panda",
      pharmacyImage,
      medicineImage: pharmacyImage,
      discount: "0%",
      price: "20 RM",
      id: "634729",
    },
  ];

  const cardMedicines = [
    {
      name: "Esomeprazole",
      price: "10 RM",
      pharmacy: "Caring Medical",
      initials: "CM",
      description:
        "Caring Medical provides quality medicines and pharmacy services.",
    },
    {
      name: "Esomeprazole",
      price: "9 RM",
      pharmacy: "Pool Medical",
      initials: "PM",
      description:
        "High quality medicines and friendly pharmacy services.",
    },
    {
      name: "Esomeprazole",
      price: "8 RM",
      pharmacy: "OK Pharmacy",
      initials: "OK",
      description:
        "Explore different medicines and available tablet options.",
    },
    {
      name: "Esomeprazole",
      price: "11 RM",
      pharmacy: "Hamza Pharma",
      initials: "HP",
      description:
        "Find medicines and pharmacy services in one place.",
    },
  ];

  const searchValue = search.trim().toLowerCase();

  const filteredMedicines = medicines.filter((medicine) => {
    return (
      medicine.name.toLowerCase().includes(searchValue) ||
      medicine.category.toLowerCase().includes(searchValue) ||
      medicine.pharmacy.toLowerCase().includes(searchValue) ||
      medicine.id.toLowerCase().includes(searchValue) ||
      medicine.price.toLowerCase().includes(searchValue) ||
      medicine.discount.toLowerCase().includes(searchValue)
    );
  });

  const displayedMedicines = filteredMedicines.slice(
    0,
    entriesPerPage
  );

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.style.display = "none";
  };

  return (
    <div className="pharmacy-page">
      {/* SIDEBAR */}
      <aside
        className={`pharmacy-sidebar ${sidebarOpen ? "show" : ""}`}
      >
        <div className="pharmacy-logo">
          <div className="logo-mark">
            M
            <span>HUB</span>
          </div>

          <div className="logo-text">MyPatientHUB</div>
        </div>

        <div className="pharmacy-sidebar-menu">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                className={`pharmacy-menu-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="pharmacy-menu-icon">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="pharmacy-help">
          <div className="help-icon">?</div>
          <div>
            <h4>Need Help?</h4>
            <p>Contact our support team</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pharmacy-main">
        {/* HEADER */}
        <header className="pharmacy-header">
          <div className="pharmacy-header-left">
            <button
              type="button"
              className="mobile-menu-button"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((previous) => !previous)}
            >
              ☰
            </button>

            <div className="breadcrumb">
              <span>⌂</span>
              <span>/</span>
              <span>Pharmacyplace</span>
            </div>

            <h2>Pharmacyplace</h2>
          </div>

          <div className="pharmacy-header-right">
            <div className="top-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Type here..."
                aria-label="Search pharmacies and medicines"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={() => navigate("/login")}
            >
              ● Log out
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

        {/* PHARMACY CARDS */}
        <section className="pharmacy-content">
          <h1>Search Pharmacies for Medicines</h1>

          <div className="pharmacy-grid">
            {cardMedicines.map((item) => (
              <article className="pharmacy-card" key={item.pharmacy}>
                <div className="medicine-image">
                  <img
                    src={pharmacyImage}
                    alt={item.name}
                    onError={handleImageError}
                  />
                </div>

                <div className="medicine-row">
                  <span>{item.name}</span>
                  <strong>{item.price}</strong>
                </div>

                <div className="pharmacy-name">
                  <div className="pharmacy-avatar">
                    {item.initials}
                  </div>
                  <h3>{item.pharmacy}</h3>
                </div>

                <p>{item.description}</p>

                <button
                  type="button"
                  className="buy-button"
                  onClick={() => navigate("/login")}
                >
                  BUY NOW
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* MEDICINE TABLE */}
        <section className="pharmacy-table-container">
          <h1>
            {filteredMedicines.length} Medicine
            {filteredMedicines.length !== 1 ? "s" : ""} returned
            for the keyword {search.trim() || "Esso"}
          </h1>

          {/* TABLE CONTROLS */}
          <div className="table-controls">
            <div className="entries-control">
              <select
                value={entriesPerPage}
                onChange={(event) =>
                  setEntriesPerPage(Number(event.target.value))
                }
                aria-label="Entries per page"
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
              </select>

              <span>entries per page</span>
            </div>

            <div className="table-search">
              <input
                type="text"
                placeholder="Search medicines..."
                aria-label="Search medicines"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="pharmacy-table-wrapper">
            <table className="pharmacy-table">
              <thead>
                <tr>
                  <th>
                    NAME <span className="sort-icon">↕</span>
                  </th>
                  <th>
                    CATEGORY <span className="sort-icon">↕</span>
                  </th>
                  <th>
                    SERVICE BY <span className="sort-icon">↕</span>
                  </th>
                  <th>
                    DISCOUNT <span className="sort-icon">↕</span>
                  </th>
                  <th>
                    PRICE <span className="sort-icon">↕</span>
                  </th>
                  <th>
                    ID <span className="sort-icon">↕</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayedMedicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>
                      <div className="medicine-cell">
                        <img
                          src={medicine.medicineImage}
                          alt={medicine.name}
                          onError={handleImageError}
                        />
                        <span>{medicine.name}</span>
                      </div>
                    </td>

                    <td>{medicine.category}</td>

                    <td>
                      <div className="service-cell">
                        <img
                          src={medicine.pharmacyImage}
                          alt={medicine.pharmacy}
                          onError={handleImageError}
                        />
                        <span>{medicine.pharmacy}</span>
                      </div>
                    </td>

                    <td>{medicine.discount}</td>
                    <td>{medicine.price}</td>
                    <td>{medicine.id}</td>
                  </tr>
                ))}

                {displayedMedicines.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-results">
                      No medicines found. Try another search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="table-bottom">
            <span>
              Showing {displayedMedicines.length > 0 ? 1 : 0} to{" "}
              {displayedMedicines.length} of {filteredMedicines.length}{" "}
              entries
            </span>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pharmacy-footer">
          <p>
            © 2026, made with ♥ by <strong>MyPiHUB</strong> for a
            better web.
          </p>

          <div className="footer-links">
            <a href="#mypatienthub">MyPatientHUB</a>
            <a href="#about">About Us</a>
            <a href="#blog">Blog</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FindPharmacy;