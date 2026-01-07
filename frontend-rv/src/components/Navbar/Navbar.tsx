import navbarStyles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useTheme} from "../../library/theme.tsx";

export default function Navbar() {
    const [loggedIn] = useState(false);
    const {theme, toggleTheme} = useTheme();
    return (
        <nav className={navbarStyles.navbar}>
            <Link to="/" className={navbarStyles.navbarLink}>Home</Link>
            <Link to="/recipes" className={navbarStyles.navbarLink}>Recipes</Link>
            {/*<Link to="/ingredients" className={navbarStyles.navbarLink}>Ingredients</Link>*/}
            <button className={navbarStyles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
            {!loggedIn && (
                <Link to="/login" className={navbarStyles.loginButton}>Login</Link>
            )}
        </nav>
    )
}