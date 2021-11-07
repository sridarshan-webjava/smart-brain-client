import Logo from "./brain-icon.png";
import "./Navigation.css";
import Tilt from "react-parallax-tilt";

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
        <a href="#" onClick={() => onRouteChange("signin")}>
          Sign Out
        </a>
      )}
    </nav>
  );
};

export default Navigation;
