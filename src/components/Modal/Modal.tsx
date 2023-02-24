import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useState } from 'react';
import CLOSE_ICON from '../../assets/icons/burger-close.svg';
import { sendEmail } from '../../services/EmailService';
import Spinner from '../Spinner/Spinner';

const Modal = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0) {
      setIsLoading(true);
      sendEmail(name, email, message)
        .then((_message) => setIsMessageSent(true))
        .finally(() => setIsLoading(false));
    }
  };

  const changeFormShowState = () => {
    setShowForm(!showForm);
    setIsMessageSent(false);
    changeErrorState(false, 'all');
    setEmail('');
    setMessage('');
    setName('');
  };

  const formContainerContent = () => {
    return (
      <div id="form-container">
        <div id="backdrop" onClick={changeFormShowState}></div>
        <form id="form-section" onSubmit={onSubmitHandler}>
          <div id="form-header">
            <h4 id="form-header-text">
              {languageMode == 'polish' ? 'Formularz kontaktowy' : 'Contact form'}
            </h4>
            <img id="form-close-icon" src={CLOSE_ICON} onClick={changeFormShowState} />
          </div>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              id="name-input"
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
              id="email-input"
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
              id="message-input"
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
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              id="submit-button"
              type="submit"
              className={`${Button.button} ${Button.square} ${Button.filled}`}>
              {languageMode == 'polish' ? 'Wyślij' : 'Send'}
            </button>
          )}
        </form>
      </div>
    );
  };

  const formContainerContentAfterSendingMessage = () => {
    return (
      <div id="form-container">
        <div id="backdrop" onClick={changeFormShowState}></div>
        <form id="form-section" onSubmit={onSubmitHandler}>
          <div id="form-header">
            <h4 id="form-header-text">
              {languageMode == 'polish' ? 'Formularz kontaktowy' : 'Contact form'}
            </h4>
            <img id="form-close-icon" src={CLOSE_ICON} onClick={changeFormShowState} />
          </div>
          <h5 id="form-message-sent-header">
            {languageMode == 'polish' ? 'Email wysłany!' : 'Email sent!'}
          </h5>
          <p id="form-message-sent-description">
            {languageMode == 'polish'
              ? 'Odpowiemy na twoją wiadomość najszybciej jak się da na twój adres email'
              : 'We will reply as fast as possible on your email address'}
          </p>
          <button
            className={`${Button.button} ${Button.square} ${Button.filled}`}
            onClick={changeFormShowState}>
            {languageMode == 'polish' ? 'Gotowe' : 'OK'}
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
      {showForm &&
        (isMessageSent ? formContainerContentAfterSendingMessage() : formContainerContent())}
    </>
  );
};

export default Modal;
