import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
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
              <input
                type="text"
                placeholder="Enter your email"
                autoComplete="off"
                required
              />

              <input
                type="password"
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
              <a href="#">Forgot password?</a>

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
        <a href="#">Google Play Store APP</a>
        <a href="#">App Store APP</a>
        <a href="#">About MyPatientHUB</a>
        <a href="#">About Us</a>
        <a href="#">Our Blog</a>
      </footer>
    </div>
  );
}

export default Login;