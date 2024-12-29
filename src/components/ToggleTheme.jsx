import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToggleTheme = () => {

const theme = useSelector((state) => state.theme.theme); //accessing the theme(initialState) of themeSlice

// adding theme class to root element in index.html
useEffect(() => {
  const previousTheme = theme === "dark" ? "light" : "dark";
  const root = window.document.documentElement;
  root.classList.remove(previousTheme);
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
},[theme]);


return (
  <button>
    <span className={`${theme === "dark" ? "text-yellow-300" : "text-white"}`}>
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
    </span>     
  </button>
)
}

export default ToggleTheme;