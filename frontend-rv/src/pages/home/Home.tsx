import styles from "./Home.module.scss"
import pic from "../../assets/recipe-home.jpg"

export default function Home() {
    return (
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
    );
}