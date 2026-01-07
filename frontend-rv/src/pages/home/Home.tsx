import styles from "./Home.module.scss"
import navbarStyles from "./Navbar.module.scss"
import pic from "../../assets/recipe-home.jpg"

export default function Home() {
    return (
        <main>
            <nav className={navbarStyles.navbar}>
                <p>Home</p>
                <p>Recipes</p>
                <p>Ingredients</p>
                <button className={navbarStyles.loginButton}>Login</button>
            </nav>
            <div className={styles.homePage}>
                <div className={styles.firstDiv}>
                    <p>Recipe</p>
                    <p>🍳🥗🍜</p>
                </div>
                <img
                    src={pic}
                    alt="Yummy food pic failed to load :("
                    className={styles.frontImage}
                />
                <div className={styles.secondDiv}>
                    <p>📖✅📝</p>
                    <p>Viewer</p>
                </div>
            </div>
        </main>
    );
}