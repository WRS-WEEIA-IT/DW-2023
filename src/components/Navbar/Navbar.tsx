import './Navbar.scss';
import { navLinksEN, navLinksPL } from './NavLinks';
import Button from '../../styles/Button.module.scss';
import { useContext, useState } from 'react';
import { LanguageModeContext } from './../../contexts/LanguageContext';
import ARROW_RIGHT_ICON from '../../assets/icons/arrow-right.svg';
import BURGER_OPEN_ICON from '../../assets/icons/burger-open.svg';
import BURGER_CLOSE_ICON from '../../assets/icons/burger-close.svg';

const Navbar = () => {
  const languageMode = useContext(LanguageModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarTransparency, setNavbarTransparency] = useState(0);

  const handleNavbarColorChange = () => {
    const windowPosition = window.scrollY;
    const maxWindowPosition = 200;
    windowPosition <= maxWindowPosition
      ? setNavbarTransparency(windowPosition / maxWindowPosition)
      : setNavbarTransparency(1);
  };

  const handleBurgerToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addScrollHandler = () => {
    window.addEventListener('scroll', handleNavbarColorChange);
  };
  addScrollHandler();

  return (
    <div id="navbar-container" style={{ backgroundColor: `hsl(0, 0%, 5%, ${navbarTransparency})` }}>
      <div id="navbar-content">
        <div id="mobile-header-container">
          <h3 id="dw-logo">DW2023</h3>
          <div id="burger-container" onClick={handleBurgerToggle}>
            <img id="burger-icon" src={isMenuOpen ? BURGER_CLOSE_ICON : BURGER_OPEN_ICON} />
          </div>
        </div>
        <div id="navbar-links-container" className={isMenuOpen ? 'menu-open' : ''}>
          {(languageMode == 'polish' ? navLinksPL : navLinksEN).map((navLink, index) => (
            <h5 key={index} className="navbar-link">
              {navLink.title}
            </h5>
          ))}
        </div>
        <div id="navbar-buttons-container">
          <span>Jezyk</span>
          <button
            id="navbar-signup-button"
            className={`${Button.button} ${Button.filled} ${Button.square}`}>
            Zapisz się <img className="icon" id="arrow-right-icon" src={ARROW_RIGHT_ICON} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
