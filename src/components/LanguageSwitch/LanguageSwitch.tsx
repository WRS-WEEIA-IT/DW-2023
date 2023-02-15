import './LanguageSwitch.scss';
import PL_IMG from '../../assets/icons/poland.png';
import EN_IMG from '../../assets/icons/united-kingdom.png';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

const LanguageSwitch = () => {
  const { languageMode, setLanguageMode } = useContext(LanguageModeContext);

  const toggleLanguageMode = () => {
    setLanguageMode((prevLanguage) => (prevLanguage === 'polish' ? 'english' : 'polish'));
  };

  return (
    <div id="language-mode-switch" onClick={toggleLanguageMode}>
      <img src={languageMode === 'polish' ? EN_IMG : PL_IMG} id="language-switch-icon" />
    </div>
  );
};

export default LanguageSwitch;
