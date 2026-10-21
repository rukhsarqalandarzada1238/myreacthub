import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (loading) return;

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validate email
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!email.includes("@") || !email.toLowerCase().endsWith(".com")) {
      alert("Invalid email! Your email must contain @ and end with .com.");
      return;
    }

    // Validate password
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    // Start loading
    setLoading(true);

    // Demo login process
    setTimeout(() => {
      setLoading(false);

      alert("Success! Your login form has been submitted successfully.");

      navigate("/dashboard");
    }, 1500);
  };

  // Open Facebook
  const handleFacebookLogin = () => {
    window.open(
      "https://www.facebook.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Open Google
  const handleGoogleLogin = () => {
    window.open(
      "https://www.google.com/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="login-page">
      <div className="login-hero"></div>

      <div className="login-container">
        <div className="login-content">
          <div className="welcome-text">
            <h1>Welcome to MyPatientHUB</h1>
            <p>We provide smart healthcare services in your hands.</p>
          </div>

          <div className="login-card">
            <h2>Sign in to MyPatientHUB</h2>

            <div className="social-login">
              <button
                type="button"
                className="social-btn facebook"
                aria-label="Open Facebook"
                onClick={handleFacebookLogin}
              >
                <span>f</span>
              </button>

              <button
                type="button"
                className="social-btn google"
                aria-label="Open Google"
                onClick={handleGoogleLogin}
              >
                <span>G</span>
              </button>
            </div>

            <form onSubmit={handleLogin} autoComplete="off">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                defaultValue=""
                required
                disabled={loading}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                defaultValue=""
                required
                disabled={loading}
              />

              <button
                type="submit"
                className="signin-btn"
                disabled={loading}
              >
                {loading ? "Loading..." : "SIGN IN"}
              </button>
            </form>

            <div className="login-options">
              <a
                href="#forgot-password"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>

              <label>
                <input type="checkbox" disabled={loading} />
                Remember me
              </label>
            </div>

            <div className="or">
              <span>or</span>
            </div>

            <button
              type="button"
              className="signup-btn"
              onClick={() => navigate("/signup")}
              disabled={loading}
            >
              SIGN UP
            </button>

            <p className="login-register-text">
              Don't have an account?{" "}
              <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <a href="#google-play">Google Play Store APP</a>
        <a href="#app-store">App Store APP</a>
        <a href="#about-hub">About MyPatientHUB</a>
        <a href="#about-us">About Us</a>
        <a href="#blog">Our Blog</a>
      </footer>
    </div>
  );
}

export default Login;