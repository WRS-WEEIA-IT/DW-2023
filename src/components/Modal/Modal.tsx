import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useState } from 'react';

const Modal = ({ isModalShown = false }: { isModalShown: boolean }) => {
  const { languageMode } = useContext(LanguageModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

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

  const ChangeErrorState = (state: boolean) => {
    setError(state);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (name.length == 0 || email.length == 0 || message.length == 0 || !email.includes('@')) {
      ChangeErrorState(true);
      return;
    }
  };

  return (
    <>
      <div className="backdrop">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              className={error == false ? 'correct' : 'error'}
              placeholder={languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'}
              onChange={ChangeNameHandler}></input>
          </div>
          <div className="form-row">
            <label>E-mail</label>
            <input
              className={error == false ? 'correct' : 'error'}
              placeholder={languageMode == 'polish' ? 'Wpisz e-mail' : 'Type e-mail'}
              onChange={ChangeEmailHandler}></input>
          </div>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Wiadomość' : 'Message'}</label>
            <textarea
              className={error == false ? 'correct' : 'error-textarea'}
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
