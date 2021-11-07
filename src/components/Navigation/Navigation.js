import Tilt from "react-parallax-tilt";
import Logo from "./brain-icon.png";
import User from "./user.svg";
import "./Navigation.css";

const Navigation = ({ onRouteChange, currentPage }) => {
  return (
    <nav className="flex-container nav-container">
      <Tilt>
        <div className="wrapper">
          <img src={Logo} alt="logo" />
        </div>
      </Tilt>
      {currentPage === "signin" || currentPage === "register" ? (
        <div className="links">
          <a href="#" onClick={() => onRouteChange("signin")}>
            Sign In
          </a>
          <a href="#" onClick={() => onRouteChange("register")}>
            Register
          </a>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            id="logged-user"
            className="logged-user-input"
          />
          <label htmlFor="logged-user" className="user-details">
            <img src={User} alt="user-logo" />
            <ul className="user-options">
              <li className="user-option">
                <a href="#" onClick={() => onRouteChange("signin")}>
                  Sign Out
                </a>
              </li>
            </ul>
          </label>
        </>
      )}
    </nav>
  );
};

export default Navigation;
