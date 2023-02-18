import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useState } from 'react';

const Modal = ({ isModalShown = false }: { isModalShown: boolean }) => {
  const { languageMode } = useContext(LanguageModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const ChangeNameHandler = (event: SyntheticEvent) => {
    setName((event.currentTarget as HTMLTextAreaElement).value);
    console.log(name);
  };

  const ChangeEmailHandler = (event: SyntheticEvent) => {
    setEmail((event.currentTarget as HTMLTextAreaElement).value);
    console.log(email);
  };

  const ChangeMessageHandler = (event: SyntheticEvent) => {
    setMessage((event.currentTarget as HTMLTextAreaElement).value);
    console.log(message);
  };

  return (
    <>
      <div className="backdrop">
        <form className="form-container">
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              placeholder={languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'}
              onChange={ChangeNameHandler}></input>
          </div>
          <div className="form-row">
            <label>E-mail</label>
            <input
              placeholder={languageMode == 'polish' ? 'Wpisz e-mail' : 'Type e-mail'}
              onChange={ChangeEmailHandler}></input>
          </div>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Wiadomość' : 'Message'}</label>
            <textarea
              name="Text1"
              maxLength={500}
              placeholder="What`s your problem kurwo?"
              onChange={ChangeMessageHandler}></textarea>
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
