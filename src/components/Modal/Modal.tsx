import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useState } from 'react';

const Modal = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const changeErrorState = (
    state: boolean,
    triggeredError: 'name' | 'email' | 'message' | 'all'
  ) => {
    if (triggeredError == 'name') {
      setNameError(state);
    } else if (triggeredError == 'email') {
      setEmailError(state);
    } else if (triggeredError == 'message') {
      setMessageError(state);
    } else if (triggeredError == 'all') {
      setNameError(state);
      setEmailError(state);
      setMessageError(state);
    }
  };

  const changeNameHandler = (event: SyntheticEvent) => {
    const currentName = (event.currentTarget as HTMLTextAreaElement).value;
    setName(currentName);
    changeErrorState(currentName.trim().length == 0, 'name');
  };

  const changeEmailHandler = (event: SyntheticEvent) => {
    const currentEmail = (event.currentTarget as HTMLTextAreaElement).value;
    setEmail(currentEmail);
    changeErrorState(currentEmail.trim().length == 0 || !currentEmail.includes('@'), 'email');
  };

  const changeMessageHandler = (event: SyntheticEvent) => {
    const currentMessage = (event.currentTarget as HTMLTextAreaElement).value;
    setMessage(currentMessage);
    changeErrorState(currentMessage.trim().length == 0, 'message');
  };

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    changeErrorState(name.trim().length == 0, 'name');
    changeErrorState(email.trim().length == 0 || !email.includes('@'), 'email');
    changeErrorState(message.trim().length == 0, 'message');
    if (emailError || nameError || messageError) {
      return;
    } else if (name.length > 0 && message.length > 0 && email.length > 0) {
      changeErrorState(false, 'all');
      setEmail('');
      setMessage('');
      setName('');
      setShowForm(false);
    }
  };

  const changeFormShowState = () => {
    setShowForm(!showForm);
    changeErrorState(false, 'all');
    setEmail('');
    setMessage('');
    setName('');
  };

  const formContainerContent = () => {
    return (
      <div className="form-container">
        <div className="backdrop" onClick={changeFormShowState}></div>
        <form className="form-section" onSubmit={onSubmitHandler}>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              className={nameError == false ? '' : 'error-input'}
              placeholder={languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'}
              onChange={changeNameHandler}
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
              className={emailError == false ? '' : 'error-input'}
              placeholder={
                languageMode == 'polish' ? 'Wpisz swój adres e-mail' : 'Type in your e-mail address'
              }
              onChange={changeEmailHandler}
              value={email}></input>
          </div>
          {emailError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? `Pole e-mail musi zawierać symbol ${'@'}`
                : `E-mail field must have at least one character and symbol ${'@'}`}
            </div>
          )}
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Wiadomość' : 'Message'}</label>
            <textarea
              className={messageError == false ? '' : 'error-textarea'}
              name="Text1"
              maxLength={500}
              placeholder={
                languageMode == 'polish' ? 'Opisz nam swoje pytanie' : 'Describe your question'
              }
              onChange={changeMessageHandler}
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
    );
  };

  return (
    <>
      <button
        className={`${Button.button} ${Button.square} ${Button.filled}`}
        onClick={changeFormShowState}>
        {languageMode == 'polish' ? 'Skontaktuj się z nami' : 'Contact us'}
      </button>
      {showForm == false ? '' : formContainerContent()}
    </>
  );
};

export default Modal;
