import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get the email value
    const email = e.target.email.value.trim();

    // Extra validation to make sure @ exists
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Login successful
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-hero"></div>

      <div className="login-container">
        <div className="login-content">

          <div className="welcome-text">
            <h1>Welcome to MyPatientHUB</h1>
            <p>
              We provide smart healthcare services in your hands.
            </p>
          </div>

          <div className="login-card">
            <h2>Sign in to MyPatientHUB</h2>

            <div className="social-login">
              <button
                type="button"
                className="social-btn facebook"
              >
                <span>f</span>
              </button>

              <button
                type="button"
                className="social-btn google"
              >
                <span>G</span>
              </button>
            </div>

            <form onSubmit={handleLogin} autoComplete="off">

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                required
              />

              <button
                type="submit"
                className="signin-btn"
              >
                SIGN IN
              </button>

            </form>

            <div className="login-options">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>

              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            <div className="or">
              <span>or</span>
            </div>

            <button
              type="button"
              className="signup-btn"
              onClick={() => navigate("/dashboard")}
            >
              SIGN UP
            </button>
          </div>

        </div>
      </div>

      <footer className="login-footer">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Google Play Store APP
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          App Store APP
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          About MyPatientHUB
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          About Us
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Our Blog
        </a>
      </footer>
    </div>
  );
}

export default Login;