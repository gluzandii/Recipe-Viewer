import * as React from 'react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Login.module.scss';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Email validation
    const isEmailValid = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, [email]);

    // Password validation
    const isPasswordValid = useMemo(() => {
        if (password.length <= 5) return false;

        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return hasLower && hasUpper && hasNumber;
    }, [password]);

    // Button enabled only if both validations pass
    const isLoginEnabled = isEmailValid && isPasswordValid;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoginEnabled) {
            console.log('Login submitted', {email, password});
            // Logic Here
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                        {email && !isEmailValid && (
                            <span className={styles.error}>Please enter a valid email</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                        {password && !isPasswordValid && (
                            <span className={styles.error}>
                                Password must be longer than 5 characters and contain at least one lowercase, one uppercase, and one number
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={!isLoginEnabled}
                    >
                        Login
                    </button>

                    <Link to="/register" className={styles.createAccountLink}>
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}