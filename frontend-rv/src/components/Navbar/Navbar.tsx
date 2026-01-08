import navbarStyles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useTheme} from "../../library/theme.tsx";
import {useAuthUser} from "../../library/auth.ts";
import {useState} from "react";

async function logout() {
    const url = `http://localhost:3000/api/auth/logout`;
    await fetch(url, {
        method: 'POST',
        credentials: 'include',
    });
    window.location.href = '/';

}

export default function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    useAuthUser().then((data) => {
        if (data) {
            setIsAuthenticated(true);
            setName(data.user.name);
        }
    });
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
                    <span className={navbarStyles.greeting}>Hello, {name}</span>
                    <button className={navbarStyles.logoutButton} onClick={logout}>Logout</button>
                </div>
            ) : (
                <Link to="/login" className={navbarStyles.loginButton}>Login</Link>
            )}
        </nav>
    )
}