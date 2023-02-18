import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { useContext, useState } from 'react';

const Modal = (isModalShown: boolean) => {
  const { languageMode } = useContext(LanguageModeContext);

  return (
    <>
      <div className="backdrop">
        <form className="form-container">
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              placeholder={
                languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'
              }></input>
          </div>
          <div className="form-row">
            <label>E-mail</label>
            <input placeholder={languageMode == 'polish' ? 'Wpisz e-mail' : 'Type e-mail'}></input>
          </div>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Wiadomość' : 'Message'}</label>
            <textarea
              name="Text1"
              maxLength={500}
              placeholder="What`s your problem kurwo?"></textarea>
          </div>
          <button type="submit" className={`${Button.button} ${Button.square} ${Button.filled}`}>
            {languageMode == 'polish' ? 'Wyślij' : 'Send'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
