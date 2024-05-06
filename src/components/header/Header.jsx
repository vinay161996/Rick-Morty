import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [navToggle, setNavToggle] = useState(false);

  return (
    <header className="nav-header">
      <div className="container nav-wrapper">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <span>Rick&Morty</span>
        </div>
        <button
          onClick={() => setNavToggle((prev) => !prev)}
          className="mobile-nav-toggle"
          aria-controls="navigation"
        >
          {navToggle ? (
            <IoCloseCircleOutline className="fs-700 icon-close" />
          ) : (
            <GiHamburgerMenu className="fs-700 icon-hamburger" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>

        <nav className={`navigation ${navToggle ? "opened" : ""}`}>
          <ul id="navigation" role="list" className="nav-list">
            <li>
              <NavLink onClick={() => setNavToggle((prev) => !prev)} to="./">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setNavToggle((prev) => !prev)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setNavToggle((prev) => !prev)}>
                Contact us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
