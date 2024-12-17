import "./Navbar.scss";
import { navLinksEN, navLinksPL } from "./NavLinks";
import Button from "../../styles/Button.module.scss";
import { useContext, useState } from "react";
import { LanguageModeContext } from "./../../contexts/LanguageContext";
import ARROW_RIGHT_ICON from "../../assets/icons/arrow-right.svg";
import BURGER_OPEN_ICON from "../../assets/icons/burger-open.svg";
import BURGER_CLOSE_ICON from "../../assets/icons/burger-close.svg";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { HashLink as Link } from "react-router-hash-link";
import { WELCOME_SECTION_ID } from "./NavLinks";
import { m } from "framer-motion";
import {
  cardViewportProperties,
  createAnimateOnScroll,
} from "../../animations/animateOnScroll";
import scrollWithOffset from "../../constants/scrollWithOffset";
import { FORM_LINK } from "../../services/Links";

const Navbar = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarTransparency, setNavbarTransparency] = useState(0);

  const handleNavbarColorChange = () => {
    const windowPosition = window.scrollY;
    const maxWindowPosition = 200;
    windowPosition <= maxWindowPosition
      ? setNavbarTransparency(windowPosition / maxWindowPosition)
      : setNavbarTransparency(1);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const addScrollHandler = () => {
    window.addEventListener("scroll", handleNavbarColorChange);
  };
  addScrollHandler();

  return (
    <div
      id="navbar-container"
      style={{ backgroundColor: `hsl(0, 0%, 5%, ${navbarTransparency})` }}
    >
      <div id="navbar-content">
        <div id="mobile-header-container">
          <Link to={WELCOME_SECTION_ID} id="dw-logo-link" smooth>
            <m.h3
              initial="hidden"
              whileInView="visible"
              viewport={cardViewportProperties}
              variants={createAnimateOnScroll(0)}
              id="dw-logo"
            >
              DW2025
            </m.h3>
          </Link>
          <div id="burger-container" onClick={handleMenuToggle}>
            <img
              id="burger-icon"
              src={isMenuOpen ? BURGER_CLOSE_ICON : BURGER_OPEN_ICON}
            />
          </div>
        </div>
        <div
          id="navbar-links-container"
          className={isMenuOpen ? "menu-open" : ""}
        >
          {(languageMode == "polish" ? navLinksPL : navLinksEN).map((
            navLink,
            index,
          ) => (
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: false }}
              variants={createAnimateOnScroll(0.1)}
              key={index}
            >
              <Link
                to={navLink.sectionId}
                className="navbar-link"
                smooth
                onClick={closeMenu}
                scroll={scrollWithOffset}
              >
                {navLink.title}
              </Link>
            </m.div>
          ))}
          <LanguageSwitch className="language-switch-mobile" />
        </div>
        <div id="navbar-buttons-container">
          <LanguageSwitch />
          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="button-link"
          >
            <button
              id="navbar-signup-button"
              className={`${Button.button} ${Button.filled} ${Button.square}`}
            >
              {languageMode == "polish" ? "Zapisz się" : "Sign up"}
              <img
                className="icon"
                id="arrow-right-icon"
                src={ARROW_RIGHT_ICON}
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
