import styles from "./Loading.module.scss";

export default function Loading({text = "Loading..."}: { text?: string }) {
    return (
        <div className={styles.loading} role="status" aria-live="polite">
            <div className={styles.card}>
                <div className={styles.spinner} aria-hidden="true"/>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
}

