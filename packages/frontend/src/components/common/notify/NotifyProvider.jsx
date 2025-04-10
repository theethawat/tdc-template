import ErrorNotify from "./ErrorNotify";
import SuccessNotify from "./SuccessNotify";
import NotifyContext from "./NotifyContext";
import { useState, useEffect } from "react";
import "../../../assets/css/fade.css";

// Create the fade in and fade out function using GPT-4o in GitHub Copilot
const NotifyProvider = ({ children }) => {
  const [isSuccessShow, setIsSuccessShow] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [detail, setDetail] = useState(null);
  const [fadeOutClass, setFadeOutClass] = useState(""); // New state for fade-out class

  useEffect(() => {
    let timeout;
    if (isSuccessShow) {
      // Start fade-out after 3 seconds
      timeout = setTimeout(() => {
        setFadeOutClass("fade-out");
        setTimeout(() => {
          setIsSuccessShow(false);
          setTitle(null);
          setDetail(null);
          setFadeOutClass(""); // Reset fade-out class
        }, 500); // Match fade-out animation duration
      }, 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSuccessShow]);

  useEffect(() => {
    let timeout;
    if (isErrorShow) {
      // Start fade-out after 3 seconds
      timeout = setTimeout(() => {
        setFadeOutClass("fade-out");
        setTimeout(() => {
          setIsErrorShow(false);
          setTitle(null);
          setDetail(null);
          setFadeOutClass(""); // Reset fade-out class
        }, 500); // Match fade-out animation duration
      }, 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isErrorShow]);

  return (
    <NotifyContext.Provider
      value={{
        success: ({ title, message }) => {
          setIsSuccessShow(true);
          setTitle(title);
          setDetail(message);
        },
        error: ({ title, message }) => {
          setIsErrorShow(true);
          setTitle(title);
          setDetail(message);
        },
      }}
    >
      <div className='static'>
        {children}

        {isSuccessShow && (
          <div className={`absolute right-1 top-1 fade-in ${fadeOutClass}`}>
            <SuccessNotify title={title} message={detail} />
          </div>
        )}
        {isErrorShow && (
          <div className={`absolute right-1 top-1 fade-in ${fadeOutClass}`}>
            <ErrorNotify title={title} message={detail} />
          </div>
        )}
      </div>
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
