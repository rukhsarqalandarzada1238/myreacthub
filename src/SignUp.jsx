import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Validate first name
    if (!firstName) {
      setError("Please enter your first name.");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
      setError("First name can only contain letters.");
      return;
    }

    // Validate last name
    if (!lastName) {
      setError("Please enter your last name.");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
      setError("Last name can only contain letters.");
      return;
    }

    // Validate email
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address, e.g. name@gmail.com.");
      return;
    }

    // Validate phone number
    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Start loading
    setError("");
    setLoading(true);

    // Demo registration process
    setTimeout(() => {
      setLoading(false);

      alert("Success! Your registration form has been submitted successfully.");

      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="signup-page">
      <div className="signup-hero"></div>

      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-welcome">
            <h1>MyPatientHUB</h1>
            <p>Create your account and start your health journey</p>
          </div>

          <div className="signup-card">
            <h2>Create Account</h2>

            <p className="signup-subtitle">
              Join MyPatientHUB
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="signup-name-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                  disabled={loading}
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                  disabled={loading}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={loading}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                disabled={loading}
              />

              <input
                type="password"
                name="password"
                placeholder="Password (minimum 8 characters)"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={loading}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={loading}
              />

              {error && (
                <p className="signup-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </button>
            </form>

            <p className="signup-login-link">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="signup-footer">
        <span>© MyPatientHUB</span>
        <span>Privacy Policy</span>
        <span>Terms &amp; Conditions</span>
      </footer>
    </div>
  );
}

export default SignUp;