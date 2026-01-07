import styles from "./Home.module.scss"

export default function Home() {
    return (
        <main>
            <nav className={styles.navbar}>
                <p>Home</p>
                <p>Recipes</p>
                <p>Ingredients</p>
                <button className={styles.loginButton}>Login</button>
            </nav>
        </main>
    );
}