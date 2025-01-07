import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToggleTheme = ({isDark}) => {

return (
  <button>
    <span className={`${isDark ===  false ? "text-white" : "text-yellow-300"}`}>
      <FontAwesomeIcon icon={isDark === false ? faMoon : faSun} />
    </span>     
  </button>
)
}

export default ToggleTheme;