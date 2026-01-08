import React from "react";
import styles from "./Message.module.scss";

type Variant = "info" | "error" | "success";

interface Props {
    variant?: Variant;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

export default function Message({variant = "info", title, description, children}: Props) {
    const icon = variant === "error" ? "⚠️" : variant === "success" ? "✅" : "ℹ️";
    return (
        <div className={`${styles.message} ${styles[variant]}`} role={variant === 'error' ? 'alert' : 'status'}
             aria-live={variant === 'error' ? 'assertive' : 'polite'}>
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            <div className={styles.content}>
                {title && <p className={styles.title}>{title}</p>}
                {description && <p className={styles.description}>{description}</p>}
                {children}
            </div>
        </div>
    );
}

