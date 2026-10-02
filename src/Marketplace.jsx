import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Marketplace.css";

function Marketplace() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const products = [
        {
            id: 1,
            name: "Food Panda",
            price: "5 RM",
            category: "Healthy Diet",
            description:
                "As Uber works through a huge amount of internal management turmoil.",
            color: "food-panda",
        },
        {
            id: 2,
            name: "Grab Food",
            price: "10 RM",
            category: "Healthy Diet",
            description:
                "Music is something that every person has or ing that every person has his or",
            color: "grab-food",
        },
        {
            id: 3,
            name: "Deliveroo",
            price: "15 RM",
            category: "Healthy Diet",
            description:
                "Different people have different taste, and various types of music.",
            color: "deliveroo",
        },
        {
            id: 4,
            name: "Minimalist",
            price: "20 RM",
            category: "Healthy Diet",
            description:
                "Different people have different taste, and various types of music.",
            color: "minimalist",
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
        },
        {
            name: "Healthy Diet",
            category: "Food",
            service: "Grab Food",
            discount: "5",
            price: "15 RM",
            id: "243598235",
        },
        {
            name: "Healthy Diet",
            category: "Food",
            service: "Deliveroo",
            discount: "10",
            price: "20 RM",
            id: "243598236",
        },
    ];

    const filteredResults = tableResults.filter((item) =>
        `${item.name} ${item.category} ${item.service}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="marketplace-body">

            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

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
                        className="menu-item"
                        onClick={() => navigate("/find-doctor")}
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

                   <button
  type="button"
  className="menu-item"
  onClick={() => navigate("/marketplace")}
>
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

            {/* MAIN CONTENT */}
            <main className="main-content">

                {/* HEADER */}
                <header className="top-header">

                    <div className="header-left">

                        <button
                            className="hamburger"
                            onClick={toggleSidebar}
                            type="button"
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

                {/* MARKETPLACE CONTENT */}
                <section className="marketplace-content">

                    <div className="marketplace-card">

                        <h1>Search Marketplaces and order what you need</h1>

                        <div className="product-grid">

                            {products.map((product) => (
                                <div className="product-card" key={product.id}>

                                    <div className={`product-image ${product.color}`}>
                                        <div className="food-image">
                                            <div className="plate">
                                                <div className="food-piece"></div>
                                                <div className="food-piece second"></div>
                                            </div>

                                            <div className="drink"></div>
                                            <div className="fruit"></div>
                                            <div className="side-dish"></div>
                                        </div>
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
                                                {product.name === "Food Panda" && "●"}
                                                {product.name === "Grab Food" && "grab"}
                                                {product.name === "Deliveroo" && "Grab"}
                                                {product.name === "Minimalist" && "●"}
                                            </div>

                                            <h3>{product.name}</h3>

                                        </div>

                                        <p>{product.description}</p>

                                        <button
                                            type="button"
                                            className="buy-button"
                                        >
                                            BUY NOW
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* OTHER RESULTS */}
                    <div className="results-card">

                        <h2>Other results for healthy diet search</h2>

                        <div className="results-toolbar">

                            <div className="entries-select">
                                <select defaultValue="7">
                                    <option value="7">7</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>

                                <span>entries per page</span>
                            </div>

                            <div className="table-search">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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

                                    {filteredResults.map((item) => (
                                        <tr key={item.id}>

                                            <td>
                                                <div className="table-name">

                                                    <div className="small-food-image">
                                                        <div className="small-plate"></div>
                                                    </div>

                                                    <span>{item.name}</span>

                                                </div>
                                            </td>

                                            <td>{item.category}</td>

                                            <td>
                                                <div className="service-cell">

                                                    <span className="service-logo">
                                                        ●
                                                    </span>

                                                    <span>{item.service}</span>

                                                </div>
                                            </td>

                                            <td>{item.discount}</td>

                                            <td>{item.price}</td>

                                            <td>{item.id}</td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {filteredResults.length === 0 && (
                            <div className="no-results">
                                No results found.
                            </div>
                        )}

                    </div>

                </section>

                {/* FOOTER */}
                <footer className="dashboard-footer">

                    <p>
                        ©️ 2026, made with ♥️ by MyPiHUB
                        for a better web.
                    </p>

                    <div>
                        <a href="#">MyPatientHUB</a>
                        <a href="#">About Us</a>
                        <a href="#">Blog</a>
                    </div>

                </footer>

            </main>

        </div>
    );
}

export default Marketplace;
