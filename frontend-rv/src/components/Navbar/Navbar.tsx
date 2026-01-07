import navbarStyles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function Navbar() {
    const [loggedIn] = useState(true);
    return (
        <nav className={navbarStyles.navbar}>
            <Link to="/" className={navbarStyles.navbarLink}>Home</Link>
            <Link to="/recipes" className={navbarStyles.navbarLink}>Recipes</Link>
            {/*<Link to="/ingredients" className={navbarStyles.navbarLink}>Ingredients</Link>*/}
            {loggedIn && (
                <Link to="/login" className={navbarStyles.loginButton}>Login</Link>
            )}
        </nav>
    )
}