import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useState } from 'react';

const Modal = ({ isModalShown = false }: { isModalShown: boolean }) => {
  const { languageMode } = useContext(LanguageModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const errorIdentifier = {
    NAME: 0,
    EMAIL: 1,
    MESSAGE: 2,
    ALL: 3,
  };

  const ChangeErrorState = (state: boolean, triggeredEroor: number) => {
    if (triggeredEroor == errorIdentifier.NAME) {
      setNameError(state);
    } else if (triggeredEroor == errorIdentifier.EMAIL) {
      setEmailError(state);
    } else if (triggeredEroor == errorIdentifier.MESSAGE) {
      setMessageError(state);
    } else if (triggeredEroor == errorIdentifier.ALL) {
      setNameError(state);
      setEmailError(state);
      setMessageError(state);
    }
  };

  const ChangeNameHandler = (event: SyntheticEvent) => {
    const currentName = (event.currentTarget as HTMLTextAreaElement).value;
    setName(currentName);
    if (currentName.trim().length == 0) {
      ChangeErrorState(true, errorIdentifier.NAME);
    } else {
      ChangeErrorState(false, errorIdentifier.NAME);
    }
    console.log(name);
  };

  const ChangeEmailHandler = (event: SyntheticEvent) => {
    const currentEmail = (event.currentTarget as HTMLTextAreaElement).value;
    setEmail(currentEmail);
    if (currentEmail.trim().length == 0 || !currentEmail.includes('@')) {
      ChangeErrorState(true, errorIdentifier.EMAIL);
    } else {
      ChangeErrorState(false, errorIdentifier.EMAIL);
    }
    console.log(email);
  };

  const ChangeMessageHandler = (event: SyntheticEvent) => {
    const currentMessage = (event.currentTarget as HTMLTextAreaElement).value;
    setMessage(currentMessage);
    if (currentMessage.trim().length == 0) {
      ChangeErrorState(true, errorIdentifier.MESSAGE);
    } else {
      ChangeErrorState(false, errorIdentifier.MESSAGE);
    }
    console.log(message);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim().length == 0 ||
      email.trim().length == 0 ||
      message.trim().length == 0 ||
      !email.includes('@')
    ) {
      return;
    } else {
      ChangeErrorState(false, errorIdentifier.ALL);
      setEmail('');
      setMessage('');
      setName('');
    }
  };

  return (
    <>
      <div className="backdrop">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              className={nameError == false ? 'correct' : 'error'}
              placeholder={languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'}
              onChange={ChangeNameHandler}
              value={name}></input>
          </div>
          {nameError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? 'Pole imię musi zawierać przynajmniej jedną literę'
                : 'Name field must have at least one character'}
            </div>
          )}
          <div className="form-row">
            <label>E-mail</label>
            <input
              className={emailError == false ? 'correct' : 'error'}
              placeholder={languageMode == 'polish' ? 'Wpisz e-mail' : 'Type e-mail'}
              onChange={ChangeEmailHandler}
              value={email}></input>
          </div>
          {emailError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? `Pole e-mail musi zawierać przynajmniej jedną literę oraz symbol ${'@'}`
                : `E-mail field must have at least one character and symgol ${'@'}`}
            </div>
          )}
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Wiadomość' : 'Message'}</label>
            <textarea
              className={messageError == false ? 'correct' : 'error-textarea'}
              name="Text1"
              maxLength={500}
              placeholder="What`s your problem kurwo?"
              onChange={ChangeMessageHandler}
              value={message}></textarea>
          </div>
          {messageError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? 'Pole wiadomość musi zawierać przynajmniej jedną literę'
                : 'Message field must have at least one character'}
            </div>
          )}
          <button type="submit" className={`${Button.button} ${Button.square} ${Button.filled}`}>
            {languageMode == 'polish' ? 'Wyślij' : 'Send'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
