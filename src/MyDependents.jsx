
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyDependents.css";

const menuItems = [
  { label: "Dashboard", icon: "▦", path: "/dashboard" },
  { label: "Appointments", icon: "▤", path: "/appointments" },
  { label: "Find Doctor", icon: "♙", path: "/find-doctor" },
  { label: "Find Clinic", icon: "▣", path: "/find-clinic" },
  { label: "Chat", icon: "▤", path: "/chat" },
  { label: "Find MarketPlace", icon: "▤", path: "/marketplace" },
  { label: "Find Pharmacy", icon: "🚀", path: "/find-pharmacy" },
  { label: "My Dependents", icon: "▤", path: "/my-dependents" },
  { label: "My Account", icon: "⚒", path: "/my-account" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

const initialDependent = {
  firstName: "",
  lastName: "",
  birthDate: "",
  relation: "",
  gender: "",
};

const initialHealth = {
  bloodGroup: "",
  allergies: "",
  conditions: "",
  medications: "",
  emergencyContact: "",
};

const initialCare = {
  careNeeds: "",
  doctorVisits: "",
  notes: "",
  consent: false,
};

const steps = [
  "Dependents Registration",
  "Dependents Health Records",
  "Family Care Plan",
];

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div className="dependent-field">
      <label htmlFor={name}>
        {label}{required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="dependent-field full-width">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );
}

export default function MyDependents() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [topSearch, setTopSearch] = useState("");

  const [dependent, setDependent] = useState(initialDependent);
  const [health, setHealth] = useState(initialHealth);
  const [care, setCare] = useState(initialCare);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const updateDependent = (event) => {
    const { name, value } = event.target;

    setDependent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateHealth = (event) => {
    const { name, value } = event.target;

    setHealth((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateCare = (event) => {
    const { name, value, checked, type } = event.target;

    setCare((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextStep = (event) => {
    event.preventDefault();

    if (step < 3) {
      setStep((previous) => previous + 1);
      scrollTop();
    }
  };

  const previousStep = () => {
    setStep((previous) => Math.max(1, previous - 1));
    scrollTop();
  };

  const resetForm = () => {
    setDependent({ ...initialDependent });
    setHealth({ ...initialHealth });
    setCare({ ...initialCare });
    setStep(1);
    setSubmitted(false);
    scrollTop();
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!care.consent) return;

    setSubmitted(true);
    scrollTop();
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = topSearch.trim();

    if (!query) return;

    const normalized = query.toLowerCase();

    const matchingItem = menuItems.find((item) =>
      item.label.toLowerCase().includes(normalized)
    );

    if (matchingItem) {
      navigate(matchingItem.path);
    }
  };

  return (
    <div
      className={`dependents-app ${
        sidebarOpen ? "" : "sidebar-collapsed"
      }`}
    >
      {/* Sidebar */}
      <aside className="dependent-sidebar">
        <div className="dependent-brand">
          <div className="dependent-brand-mark">
            <span>M</span>
            <small>HUB</small>
          </div>

          <strong>MyPatientHUB</strong>
        </div>

        <nav className="dependent-nav">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={`dependent-nav-item ${
                item.path === "/my-dependents" ? "selected" : ""
              }`}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <span className="dependent-nav-icon">
                {item.icon}
              </span>

              <span className="dependent-nav-label">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="dependent-help">
          <span className="dependent-help-icon">?</span>

          <div>
            <strong>Need help?</strong>
            <p>Contact our support team</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="dependents-main">
        {/* Top header */}
        <header className="dependent-topbar">
          <div className="dependent-heading-left">
            <div className="dependent-breadcrumb">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                aria-label="Go to dashboard"
              >
                ◆
              </button>

              <span>/</span>
              <span>Mydependents</span>
            </div>

            <h2>Mydependents</h2>
          </div>

          <button
            type="button"
            className="dependent-menu-toggle"
            onClick={() =>
              setSidebarOpen((previous) => !previous)
            }
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <div className="dependent-topbar-right">
            <form
              className="dependent-top-search"
              onSubmit={handleSearch}
            >
              <button type="submit" aria-label="Search pages">
                ⌕
              </button>

              <input
                type="search"
                value={topSearch}
                onChange={(event) =>
                  setTopSearch(event.target.value)
                }
                placeholder="Type here..."
                aria-label="Search pages"
              />
            </form>

            <button
              type="button"
              className="dependent-logout"
              onClick={() => navigate("/login")}
            >
              <span>●</span> Log out
            </button>

            <button
              type="button"
              className="dependent-top-icon"
              aria-label="Settings"
              onClick={() => navigate("/settings")}
            >
              ⚙
            </button>

            <button
              type="button"
              className="dependent-top-icon"
              aria-label="Notifications"
              title="Notifications"
            >
              ♟
            </button>
          </div>
        </header>

        <div className="dependents-content">
          {/* Page introduction */}
          <section className="dependent-intro">
            <h1>
              {submitted
                ? "Profile Completed"
                : "Build Your Profile"}
            </h1>

            <p>
              This information will let us know more about your Family.
            </p>
          </section>

          {!submitted && (
            <>
              {/* Three-step progress */}
              <section
                className="dependent-stepper"
                aria-label="Registration progress"
              >
                <div className="dependent-progress-line">
                  <span
                    style={{
                      width: `${((step - 1) / 2) * 100}%`,
                    }}
                  />
                </div>

                {steps.map((title, index) => {
                  const number = index + 1;
                  const active = step === number;
                  const completed = step > number;

                  return (
                    <div
                      key={title}
                      className={`dependent-step ${
                        active ? "active" : ""
                      } ${completed ? "completed" : ""}`}
                    >
                      <span className="dependent-step-dot">
                        {completed ? "✓" : ""}
                      </span>

                      <span className="dependent-step-label">
                        {title}
                      </span>
                    </div>
                  );
                })}
              </section>

              <form
                className="dependent-form-card"
                onSubmit={step === 3 ? submitForm : nextStep}
              >
                {/* STEP 1: Registration */}
                {step === 1 && (
                  <>
                    <div className="dependent-card-intro">
                      <h2>
                        Let's start with the basic information
                      </h2>

                      <p>
                        Let us know with name and last name, contacting
                        you at
                      </p>
                    </div>

                    <div className="dependent-form-grid">
                      <Field
                        label="First Name"
                        name="firstName"
                        value={dependent.firstName}
                        onChange={updateDependent}
                        placeholder="Eg. Michael"
                        required
                      />

                      <Field
                        label="Last Name"
                        name="lastName"
                        value={dependent.lastName}
                        onChange={updateDependent}
                        placeholder="Eg. Tomson"
                        required
                      />

                      {/* Standard single date input */}
                      <Field
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        value={dependent.birthDate}
                        onChange={updateDependent}
                        required
                      />

                      <div className="dependent-field">
                        <label htmlFor="relation">
                          Relationship *
                        </label>

                        <select
                          id="relation"
                          name="relation"
                          value={dependent.relation}
                          onChange={updateDependent}
                          required
                        >
                          <option value="">
                            Select relationship
                          </option>
                          <option value="Child">Child</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="dependent-field">
                        <label htmlFor="gender">Gender *</label>

                        <select
                          id="gender"
                          name="gender"
                          value={dependent.gender}
                          onChange={updateDependent}
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="dependent-form-actions">
                      <button
                        type="button"
                        className="dependent-button secondary"
                        onClick={resetForm}
                      >
                        Clear Form
                      </button>

                      <button
                        type="submit"
                        className="dependent-button primary"
                      >
                        Continue <span>→</span>
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 2: Health records */}
                {step === 2 && (
                  <>
                    <div className="dependent-card-intro">
                      <h2>Dependents Health Records</h2>

                      <p>
                        Provide available medical information for your
                        family member.
                      </p>
                    </div>

                    <div className="dependent-form-grid">
                      <div className="dependent-field">
                        <label htmlFor="bloodGroup">
                          Blood Group
                        </label>

                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          value={health.bloodGroup}
                          onChange={updateHealth}
                        >
                          <option value="">
                            Select blood group
                          </option>

                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                            "Unknown",
                          ].map((group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Field
                        label="Emergency Contact"
                        name="emergencyContact"
                        type="tel"
                        value={health.emergencyContact}
                        onChange={updateHealth}
                        placeholder="Enter phone number"
                      />

                      <TextArea
                        label="Known Allergies"
                        name="allergies"
                        value={health.allergies}
                        onChange={updateHealth}
                        placeholder="List allergies, or enter None"
                      />

                      <TextArea
                        label="Existing Medical Conditions"
                        name="conditions"
                        value={health.conditions}
                        onChange={updateHealth}
                        placeholder="Describe any known medical conditions"
                      />

                      <TextArea
                        label="Current Medications"
                        name="medications"
                        value={health.medications}
                        onChange={updateHealth}
                        placeholder="List current medications, if any"
                      />
                    </div>

                    <div className="dependent-form-actions">
                      <button
                        type="button"
                        className="dependent-button secondary"
                        onClick={previousStep}
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        className="dependent-button primary"
                      >
                        Continue <span>→</span>
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 3: Care plan and review */}
                {step === 3 && (
                  <>
                    <div className="dependent-card-intro">
                      <h2>Family Care Plan</h2>

                      <p>
                        Add care preferences and review the information
                        before finishing.
                      </p>
                    </div>

                    <div className="dependent-form-grid">
                      <TextArea
                        label="Care Needs"
                        name="careNeeds"
                        value={care.careNeeds}
                        onChange={updateCare}
                        placeholder="Describe any support or care needs"
                      />

                      <TextArea
                        label="Doctor Visits and Follow-ups"
                        name="doctorVisits"
                        value={care.doctorVisits}
                        onChange={updateCare}
                        placeholder="Add upcoming visits or follow-up details"
                      />

                      <TextArea
                        label="Additional Notes"
                        name="notes"
                        value={care.notes}
                        onChange={updateCare}
                        placeholder="Enter any additional information"
                      />
                    </div>

                    <div className="dependent-review">
                      <h3>Review Information</h3>

                      <div className="dependent-review-grid">
                        <p>
                          <strong>Name:</strong>{" "}
                          {dependent.firstName} {dependent.lastName}
                        </p>

                        <p>
                          <strong>Birth Date:</strong>{" "}
                          {dependent.birthDate}
                        </p>

                        <p>
                          <strong>Relationship:</strong>{" "}
                          {dependent.relation}
                        </p>

                        <p>
                          <strong>Gender:</strong> {dependent.gender}
                        </p>

                        <p>
                          <strong>Blood Group:</strong>{" "}
                          {health.bloodGroup || "Not provided"}
                        </p>

                        <p>
                          <strong>Emergency Contact:</strong>{" "}
                          {health.emergencyContact || "Not provided"}
                        </p>

                        <p>
                          <strong>Allergies:</strong>{" "}
                          {health.allergies || "Not provided"}
                        </p>

                        <p>
                          <strong>Conditions:</strong>{" "}
                          {health.conditions || "Not provided"}
                        </p>

                        <p>
                          <strong>Medications:</strong>{" "}
                          {health.medications || "Not provided"}
                        </p>

                        <p>
                          <strong>Care Needs:</strong>{" "}
                          {care.careNeeds || "Not provided"}
                        </p>

                        <p>
                          <strong>Doctor Visits:</strong>{" "}
                          {care.doctorVisits || "Not provided"}
                        </p>

                        <p>
                          <strong>Additional Notes:</strong>{" "}
                          {care.notes || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <label className="dependent-consent">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={care.consent}
                        onChange={updateCare}
                        required
                      />

                      <span>
                        I confirm that the information provided is
                        accurate and that I am authorized to provide it.
                      </span>
                    </label>

                    <div className="dependent-form-actions">
                      <button
                        type="button"
                        className="dependent-button secondary"
                        onClick={previousStep}
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        className="dependent-button primary"
                        disabled={!care.consent}
                      >
                        Complete Registration ✓
                      </button>
                    </div>
                  </>
                )}
              </form>
            </>
          )}

          {/* Success screen */}
          {submitted && (
            <section className="dependent-form-card dependent-success">
              <div className="dependent-success-icon">✓</div>

              <h2>Registration Completed!</h2>

              <p>
                The dependent information form has been completed
                successfully.
              </p>

              <div className="dependent-success-summary">
                <p>
                  <strong>Name:</strong>{" "}
                  {dependent.firstName} {dependent.lastName}
                </p>

                <p>
                  <strong>Relationship:</strong> {dependent.relation}
                </p>

                <p>
                  <strong>Date of Birth:</strong> {dependent.birthDate}
                </p>
              </div>

              <div className="dependent-form-actions centered">
                <button
                  type="button"
                  className="dependent-button secondary"
                  onClick={resetForm}
                >
                  + Add Another Dependent
                </button>

                <button
                  type="button"
                  className="dependent-button primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}