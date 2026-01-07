import styles from "./Home.module.scss"
import pic from "../../assets/recipe-home.jpg"

export default function Home() {
    return (
        <main>
            <nav className={styles.navbar}>
                <p>Home</p>
                <p>Recipes</p>
                <p>Ingredients</p>
                <button className={styles.loginButton}>Login</button>
            </nav>
            <div className={styles.frontImageWrapper}>
                <img
                    src={pic}
                    alt="Yummy food pic failed to load :("
                    className={styles.frontImage}
                />
            </div>

        </main>
    );
}