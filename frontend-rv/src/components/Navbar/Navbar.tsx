import navbarStyles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useTheme} from "../../library/theme.tsx";
import {useAuth} from "../../library/auth.tsx";

export default function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const {isAuthenticated, user, logout} = useAuth();
    return (
        <nav className={navbarStyles.navbar}>
            <Link to="/" className={navbarStyles.navbarLink}>Home</Link>
            {isAuthenticated && (
                <Link to="/recipes" className={navbarStyles.navbarLink}>Recipes</Link>
            )}
            <button className={navbarStyles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
            {isAuthenticated ? (
                <div className={navbarStyles.authArea}>
                    <span className={navbarStyles.greeting}>Hello, {user?.name || 'User'}</span>
                    <button className={navbarStyles.logoutButton} onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link to="/login" className={navbarStyles.loginButton}>Login</Link>
            )}
        </nav>
    )
}