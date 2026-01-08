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

    const isLoginEnabled = isEmailValid && password.length > 0;


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoginEnabled) {
            try {

                const url = `http://localhost:3000/api/auth/login`;
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password}),
                });

                if (!response.ok) {
                    // Handle error response
                    console.error('Login failed');
                    return;
                }

                // Navigate to home page and refresh
                window.location.href = '/';
            } catch (err) {
                console.error('Error during login:', err);
            }
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