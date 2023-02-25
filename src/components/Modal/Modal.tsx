import Button from '../../styles/Button.module.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import './Modal.scss';
import { SyntheticEvent, useContext, useRef, useState } from 'react';
import CLOSE_ICON from '../../assets/icons/burger-close.svg';
import { sendEmail } from '../../services/EmailService';
import Spinner from '../Spinner/Spinner';

const Modal = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormClosing, setIsFormClosing] = useState(false);
  const FORM_ANIMATION_DURATION = 300;

  const checkError = (formElement: 'name' | 'email' | 'message' | 'all'): boolean => {
    let isAnyError = false;
    if ((formElement == 'name' || formElement == 'all') && nameRef.current !== null) {
      const hasError = nameRef.current?.value.trim().length === 0;
      setNameError(hasError);
      isAnyError = isAnyError || hasError;
    }
    if ((formElement == 'email' || formElement == 'all') && emailRef.current !== null) {
      const hasError =
        emailRef.current?.value.trim().length === 0 || !emailRef.current?.value.includes('@');
      setEmailError(hasError);
      isAnyError = isAnyError || hasError;
    }
    if ((formElement == 'message' || formElement == 'all') && messageRef.current !== null) {
      const hasError = messageRef.current?.value.trim().length === 0;
      setMessageError(hasError);
      isAnyError = isAnyError || hasError;
    }
    return isAnyError;
  };

  const handleChangeName = (event: SyntheticEvent) => {
    const currentName = (event.currentTarget as HTMLTextAreaElement).value;
    setName(currentName);
    checkError('name');
  };

  const handleChangeEmail = (event: SyntheticEvent) => {
    const currentEmail = (event.currentTarget as HTMLTextAreaElement).value;
    setEmail(currentEmail);
    checkError('email');
  };

  const handleChangeMessage = (event: SyntheticEvent) => {
    const currentMessage = (event.currentTarget as HTMLTextAreaElement).value;
    setMessage(currentMessage);
    checkError('message');
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (checkError('all')) {
      return;
    } else {
      setIsLoading(true);
      sendEmail(name, email, message)
        .then(() => setIsMessageSent(true))
        .finally(() => setIsLoading(false));
    }
  };

  const handleOpenForm = () => {
    setIsFormShown(true);
  };

  const handleCloseForm = () => {
    setIsFormClosing(true);
    setTimeout(() => {
      setIsFormClosing(false);
      setIsMessageSent(false);
      setNameError(false);
      setEmailError(false);
      setMessageError(false);
      setEmail('');
      setMessage('');
      setName('');
      setIsFormShown(false);
    }, FORM_ANIMATION_DURATION);
  };

  const formContainerContent = () => {
    return (
      <div id="form-container">
        <div id="backdrop" onClick={handleCloseForm}></div>
        <form
          id="form-section"
          onSubmit={handleFormSubmit}
          data-animation={isFormClosing.toString()}>
          <div id="form-header">
            <h4 id="form-header-text">
              {languageMode == 'polish' ? 'Formularz kontaktowy' : 'Contact form'}
            </h4>
            <img id="form-close-icon" src={CLOSE_ICON} onClick={handleCloseForm} />
          </div>
          <div className="form-row">
            <label>{languageMode == 'polish' ? 'Imię' : 'Name'}</label>
            <input
              id="name-input"
              ref={nameRef}
              className={nameError == false ? '' : 'error-input'}
              placeholder={languageMode == 'polish' ? 'Wpisz swoje imię' : 'Type your name'}
              onChange={handleChangeName}
              value={name}></input>
          </div>
          {nameError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? 'Pole imienia musi zawierać przynajmniej jedną literę'
                : 'Name field must have at least one character'}
            </div>
          )}
          <div className="form-row">
            <label>E-mail</label>
            <input
              id="email-input"
              ref={emailRef}
              className={emailError == false ? '' : 'error-input'}
              placeholder={
                languageMode == 'polish' ? 'Wpisz swój adres e-mail' : 'Type in your e-mail address'
              }
              onChange={handleChangeEmail}
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
              ref={messageRef}
              className={messageError == false ? '' : 'error-input'}
              name="Text1"
              maxLength={500}
              placeholder={
                languageMode == 'polish' ? 'Opisz nam swoje pytanie' : 'Describe your question'
              }
              onChange={handleChangeMessage}
              value={message}></textarea>
          </div>
          {messageError && (
            <div className="error-message">
              {languageMode == 'polish'
                ? 'Pole wiadomości musi zawierać przynajmniej jedną literę'
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
        <div id="backdrop" onClick={handleCloseForm}></div>
        <form
          id="form-section"
          onSubmit={handleFormSubmit}
          data-animation={isFormClosing.toString()}>
          <div id="form-header">
            <h4 id="form-header-text">
              {languageMode == 'polish' ? 'Formularz kontaktowy' : 'Contact form'}
            </h4>
            <img id="form-close-icon" src={CLOSE_ICON} onClick={handleCloseForm} />
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
            onClick={handleCloseForm}>
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
        onClick={handleOpenForm}>
        {languageMode == 'polish' ? 'Skontaktuj się z nami' : 'Contact us'}
      </button>
      {isFormShown &&
        (isMessageSent ? formContainerContentAfterSendingMessage() : formContainerContent())}
    </>
  );
};

export default Modal;
