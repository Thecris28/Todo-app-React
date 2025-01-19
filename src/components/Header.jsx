import { useState } from "react";

import imgDark from '../assets/images/icon-moon.svg'
import imgLight from '../assets/images/icon-sun.svg'

export const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

  return (
    <header className="app-header">
      <h1>Todo</h1>
      <button className="switch-mode" onClick={handleDarkMode}>
        <img src={darkMode ? imgDark : imgLight} alt="darkmode-img" />
      </button>
    </header>
  );
};
