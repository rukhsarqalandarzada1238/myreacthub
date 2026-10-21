import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountSetting() {
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [invisible, setInvisible] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "Alec",
    lastName: "Thompson",
    gender: "Male",
    birthMonth: "February",
    birthDay: "1",
    birthYear: "2021",
    email: "example@email.com",
    bloodGroup: "A+",
    location: "Sydney, A",
    phone: "+40 735 631 620",
    height: "",
    weight: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [smsNumber, setSmsNumber] = useState("+3012374423");
  const [editingSms, setEditingSms] = useState(false);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Bucharest 68.133.163.201",
      sub: "Your current session",
      badge: "ACTIVE",
      location: "EU",
      current: true,
    },
    { id: 2, device: "Chrome on macOS", sub: "US", location: "US" },
    { id: 3, device: "Safari on iPhone", sub: "US", location: "US" },
  ]);

  const showSuccess = (msg) => {
    setSavedMessage(msg);
    setErrorMessage("");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setSavedMessage("");
    setTimeout(() => setErrorMessage(""), 4000);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;

      if (q.includes("profile")) {
        setActiveTab("profile");
        e.target.value = "";
      } else if (q.includes("basic") || q.includes("info")) {
        setActiveTab("basic");
        e.target.value = "";
      } else if (q.includes("password") || q.includes("pass")) {
        setActiveTab("password");
        e.target.value = "";
      } else if (q.includes("2fa") || q.includes("two factor")) {
        setActiveTab("2fa");
        e.target.value = "";
      } else if (q.includes("session")) {
        setActiveTab("sessions");
        e.target.value = "";
      } else if (q.includes("delete")) {
        setActiveTab("delete");
        e.target.value = "";
      }
      
      else if (q.includes("doctor")) {
        navigate("/find-doctor");
        e.target.value = "";
      } else if (q.includes("clinic")) {
        navigate("/find-clinic");
        e.target.value = "";
      } else if (q.includes("market")) {
        navigate("/marketplace");
        e.target.value = "";
      } else if (q.includes("pharmacy")) {
        navigate("/find-pharmacy");
        e.target.value = "";
      } else if (q.includes("depend")) {
        navigate("/my-dependents");
        e.target.value = "";
      } else if (q.includes("dashboard") || q.includes("home")) {
        navigate("/dashboard");
        e.target.value = "";
      } else if (q.includes("settings") || q.includes("account")) {
        navigate("/settings");
        e.target.value = "";
      } else {
        alert(`No results found for: "${q}"`);
        e.target.value = "";
      }
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveBasicInfo = () => {
    if (!formData.firstName.trim())
      return showError("⚠️ First name is required");
    if (!formData.lastName.trim())
      return showError("⚠️ Last name is required");
    if (formData.email && !formData.email.includes("@"))
      return showError("⚠️ Please enter a valid email");
    setTimeout(() => showSuccess("✅ Basic Info saved successfully!"), 300);
  };

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleUpdatePassword = () => {
    if (!passwords.current) return showError("⚠️ Enter current password");
    if (!passwords.newPass) return showError("⚠️ Enter new password");
    if (passwords.newPass.length < 6)
      return showError("⚠️ Password min 6 characters");
    if (!/[0-9]/.test(passwords.newPass))
      return showError("⚠️ Must contain a number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPass))
      return showError("⚠️ Must contain a special character");
    if (!passwords.confirm) return showError("⚠️ Confirm your new password");
    if (passwords.newPass !== passwords.confirm)
      return showError("⚠️ Passwords do not match");
    if (passwords.current === passwords.newPass)
      return showError("⚠️ New password must be different");
    setTimeout(() => {
      showSuccess("✅ Password updated successfully!");
      setPasswords({ current: "", newPass: "", confirm: "" });
    }, 300);
  };

  const handleAddSecurityKey = () => {
    const key = window.prompt("Enter a name for your security key:");
    if (key) showSuccess(`🔐 Security key "${key}" added`);
  };

  const handleEditSms = () => {
    if (editingSms) {
      if (!smsNumber.trim() || smsNumber.length < 6)
        return showError("⚠️ Enter a valid SMS number");
      showSuccess("✅ SMS number updated");
      setEditingSms(false);
    } else setEditingSms(true);
  };

  const handleSetupAuthenticator = () =>
    showSuccess("📱 Authenticator app setup started");

  const handleToggleTwoFactor = () => {
    setTwoFactor(!twoFactor);
    showSuccess(twoFactor ? "🔓 2FA disabled" : "🔒 2FA enabled");
  };

  const handleRemoveSession = (id) => {
    const sess = sessions.find((s) => s.id === id);
    if (sess.current) return showError("⚠️ Cannot remove current session");
    if (window.confirm(`Remove session: ${sess.device}?`)) {
      setSessions(sessions.filter((s) => s.id !== id));
      showSuccess("✅ Session removed");
    }
  };

  const handleSeeMoreSession = (sess) => {
    alert(
      `Device: ${sess.device}\nLocation: ${sess.location || "Unknown"}\nStatus: ${
        sess.current ? "Current session" : "Logged in previously"
      }`
    );
  };

  const handleDeactivate = () => {
    if (window.confirm("Deactivate your account temporarily?"))
      showSuccess("🔒 Account deactivated");
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) return showError("⚠️ Toggle Confirm first");
    const input = window.prompt("Type DELETE to confirm:");
    if (input === "DELETE") showSuccess("❌ Account deleted permanently");
    else if (input !== null) showError("Deletion cancelled");
  };

  const handleToggleInvisible = () => {
    setInvisible(!invisible);
    showSuccess(invisible ? "👁 Visible mode" : "🙈 Invisible mode");
  };

  const sidebarItems = [
    { label: "Dashboard", icon: "▣", path: "/dashboard" },
    { label: "Appointments", icon: "▤", path: "/appointments" },
    { label: "Find Doctor", icon: "♙", path: "/find-doctor" },
    { label: "Find Clinic", icon: "▦", path: "/find-clinic" },
    { label: "Chat", icon: "▣", path: "/chat" },
    { label: "Find MarketPlace", icon: "▤", path: "/marketplace" },
    { label: "Find Pharmacy", icon: "▦", path: "/find-pharmacy" },
    { label: "My Dependents", icon: "▤", path: "/my-dependents" },
    { label: "My Account", icon: "⚒", path: "/settings" },
    { label: "Settings", icon: "⚙", path: "/settings" },
  ];

  const menuItems = [
    { id: "profile", label: "Profile", icon: "🚀" },
    { id: "basic", label: "Basic Info", icon: "📋" },
    { id: "password", label: "Change Password", icon: "📦" },
    { id: "2fa", label: "2FA", icon: "🏪" },
    { id: "sessions", label: "Sessions", icon: "🛠" },
    { id: "delete", label: "Delete Account", icon: "💳" },
  ];

  return (
    <div className="app-layout">
  
      <aside className={`app-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">M</div>
          {!sidebarCollapsed && <span>MyPatientHUB</span>}
        </div>

        <nav className="sidebar-navigation">
          {sidebarItems.map((item) => (
            <div
              key={item.path + item.label}
              onClick={() => navigate(item.path)}
              className={`sidebar-link ${
                window.location.pathname === item.path ? "active" : ""
              }`}
              title={item.label}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="sidebar-link-label">{item.label}</span>
              )}
            </div>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="download-app-card">
            <div className="download-app-question">?</div>
            <div className="download-app-title">Download</div>
            <div className="download-app-subtitle">
              MyPIHUB Mobile App
            </div>
            <div className="download-app-buttons">
              <button className="download-store-btn">🍎</button>
              <button className="download-store-btn">🤖</button>
            </div>
          </div>
        )}
      </aside>

      <main className="app-main">
      
        <header className="dashboard-topbar">
          <div className="dashboard-heading-left">
            <button
              className="hamburger-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              type="button"
              aria-label="Toggle Sidebar"
              title={sidebarCollapsed ? "Show menu" : "Hide menu"}
            >
              ☰
            </button>

            <div className="dashboard-heading-text">
              <div className="breadcrumb">
                <span>⌂</span>
                <span>/</span>
                <span>Accountsetting</span>
              </div>
              <h2>Accountsetting</h2>
            </div>
          </div>

          <div className="dashboard-topbar-actions">
            <label className="dashboard-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Type here..."
                onKeyDown={handleSearch}
              />
            </label>

            <button
              className="topbar-action"
              type="button"
              onClick={() => navigate("/login")}
            >
              ⦿ <span>Log out</span>
            </button>

            <button
              className="topbar-icon-button"
              type="button"
              aria-label="Settings"
            >
              ⚙
            </button>

            <button
              className="topbar-icon-button"
              type="button"
              aria-label="Notifications"
            >
              ♟
            </button>
          </div>
        </header>

        <div className="account-page">
          {savedMessage && (
            <div className="account-alert account-alert-success">
              {savedMessage}
            </div>
          )}
          {errorMessage && (
            <div className="account-alert account-alert-error">
              {errorMessage}
            </div>
          )}

          <div className="account-layout">
            <div className="account-sidebar">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`account-menu-item ${
                    activeTab === item.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="account-menu-icon">{item.icon}</span>
                  <span className="account-menu-label">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="account-content">
            
              {activeTab === "profile" && (
                <div className="account-card">
                  <div className="profile-row">
                    <img
                      className="profile-avatar"
                      src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop"
                      alt="Profile"
                    />
                    <div className="profile-info">
                      <h3 className="profile-name">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="profile-role">Patient</p>
                    </div>
                  </div>

                  <div className="profile-switch-row">
                    <span className="account-switch-label">
                      Switch to invisible
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={invisible}
                        onChange={handleToggleInvisible}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "basic" && (
                <div className="account-card">
                  <h3 className="account-title">Basic Info</h3>

                  <div className="account-grid-2">
                    <div>
                      <label className="account-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="account-input"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="account-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="account-input"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="account-grid-2">
                    <div>
                      <label className="account-label">I'm</label>
                      <select
                        name="gender"
                        className="account-input"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="account-label">Birth Date</label>
                      <div className="account-grid-3">
                        <select
                          name="birthMonth"
                          className="account-input"
                          value={formData.birthMonth}
                          onChange={handleChange}
                        >
                          <option>February</option>
                          <option>January</option>
                          <option>March</option>
                        </select>
                        <select
                          name="birthDay"
                          className="account-input"
                          value={formData.birthDay}
                          onChange={handleChange}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                        <select
                          name="birthYear"
                          className="account-input"
                          value={formData.birthYear}
                          onChange={handleChange}
                        >
                          <option>2021</option>
                          <option>2020</option>
                          <option>2019</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="account-grid-2">
                    <div>
                      <label className="account-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="account-input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="account-label">Blood Group</label>
                      <input
                        type="text"
                        name="bloodGroup"
                        className="account-input"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="account-grid-2">
                    <div>
                      <label className="account-label">Your Location</label>
                      <input
                        type="text"
                        name="location"
                        className="account-input"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="account-label">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="account-input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="account-grid-2">
                    <div>
                      <label className="account-label">Height</label>
                      <input
                        type="text"
                        name="height"
                        className="account-input"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Height"
                      />
                    </div>
                    <div>
                      <label className="account-label">Weight</label>
                      <input
                        type="text"
                        name="weight"
                        className="account-input"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight"
                      />
                    </div>
                  </div>

                  <div className="account-btn-right">
                    <button className="btn-dark" onClick={handleSaveBasicInfo}>
                      SAVE CHANGES
                    </button>
                  </div>
                </div>
              )}

                      {activeTab === "password" && (
                <div className="account-card">
                  <h3 className="account-title">Change Password</h3>

                  <label className="account-label">Current Password</label>
                  <input
                    type="password"
                    name="current"
                    className="account-input"
                    placeholder="Current Password"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                  />

                  <label className="account-label">New Password</label>
                  <input
                    type="password"
                    name="newPass"
                    className="account-input"
                    placeholder="New Password"
                    value={passwords.newPass}
                    onChange={handlePasswordChange}
                  />

                  <label className="account-label">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirm"
                    className="account-input"
                    placeholder="Confirm Password"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />

                  <h3 className="account-title" style={{ marginTop: 20 }}>
                    Password requirements
                  </h3>
                  <p className="account-muted">
                    Please follow this guide for a strong password
                  </p>
                  <ul className="account-list">
                    <li>One special characters</li>
                    <li>Min 6 characters</li>
                    <li>One number (2 are recommended)</li>
                    <li>Change it often</li>
                  </ul>

                  <div className="account-btn-right">
                    <button className="btn-dark" onClick={handleUpdatePassword}>
                      UPDATE PASSWORD
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "2fa" && (
                <div className="account-card">
                  <div className="account-row" style={{ marginBottom: 20 }}>
                    <h3 className="account-title" style={{ margin: 0 }}>
                      Two-factor authentication
                    </h3>
                    <span
                      className="badge-enabled"
                      style={{ cursor: "pointer" }}
                      onClick={handleToggleTwoFactor}
                    >
                      {twoFactor ? "ENABLED" : "DISABLED"}
                    </span>
                  </div>

                  <div className="account-section">
                    <p className="account-subtitle">Security keys</p>
                    <p className="account-muted">No Security keys</p>
                    <button
                      className="btn-outline"
                      onClick={handleAddSecurityKey}
                    >
                      ADD
                    </button>
                  </div>

                  <div className="account-section">
                    <p className="account-subtitle">SMS number</p>
                    {editingSms ? (
                      <input
                        type="text"
                        className="account-input"
                        value={smsNumber}
                        onChange={(e) => setSmsNumber(e.target.value)}
                        style={{ marginBottom: 10 }}
                      />
                    ) : (
                      <p className="account-muted">{smsNumber}</p>
                    )}
                    <button className="btn-outline" onClick={handleEditSms}>
                      {editingSms ? "SAVE" : "EDIT"}
                    </button>
                  </div>

                  <div className="account-section">
                    <p className="account-subtitle">Authenticator app</p>
                    <p className="account-muted">
                      {twoFactor ? "Configured" : "Not Configured"}
                    </p>
                    <button
                      className="btn-outline"
                      onClick={handleSetupAuthenticator}
                    >
                      SET UP
                    </button>
                  </div>
                </div>
              )}


              {activeTab === "sessions" && (
                <div className="account-card">
                  <h3 className="account-title">Sessions</h3>
                  <p className="account-muted" style={{ marginBottom: 20 }}>
                    This is a list of devices that have logged into your
                    account. Remove those that you do not recognize.
                  </p>

                  {sessions.map((sess) => (
                    <div className="session-item" key={sess.id}>
                      <i className="session-icon">
                        {sess.device.includes("iPhone") ? "📱" : "🖥"}
                      </i>
                      <div className="session-info">
                        <strong>{sess.device}</strong>
                        <span>{sess.sub}</span>
                      </div>
                      {sess.badge && (
                        <span className="badge-active">{sess.badge}</span>
                      )}
                      {sess.location && (
                        <span className="session-loc">{sess.location}</span>
                      )}
                      {sess.current ? (
                        <a
                          href="#!"
                          className="session-action"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSeeMoreSession(sess);
                          }}
                        >
                          See more →
                        </a>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          <a
                            href="#!"
                            className="session-action"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSeeMoreSession(sess);
                            }}
                          >
                            See more →
                          </a>
                          <a
                            href="#!"
                            className="session-action"
                            style={{ color: "#e74c3c" }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveSession(sess.id);
                            }}
                          >
                            Remove
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "delete" && (
                <div className="account-card">
                  <h3 className="account-title">Delete Account</h3>
                  <p className="account-muted" style={{ marginBottom: 20 }}>
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>

                  <div
                    className="account-row"
                    style={{ justifyContent: "flex-start", marginBottom: 25 }}
                  >
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={confirmDelete}
                        onChange={() => setConfirmDelete(!confirmDelete)}
                      />
                      <span className="slider"></span>
                    </label>
                    <div style={{ marginLeft: 15 }}>
                      <p
                        className="account-subtitle"
                        style={{ marginBottom: 3 }}
                      >
                        Confirm
                      </p>
                      <p className="account-muted">
                        I want to delete my account.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="btn-outline" onClick={handleDeactivate}>
                      DEACTIVATE
                    </button>
                    <button
                      className="btn-red"
                      onClick={handleDeleteAccount}
                      style={{
                        opacity: confirmDelete ? 1 : 0.6,
                        cursor: confirmDelete ? "pointer" : "not-allowed",
                      }}
                    >
                      DELETE ACCOUNT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}