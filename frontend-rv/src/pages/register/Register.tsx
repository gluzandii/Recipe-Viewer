import * as React from 'react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Register.module.scss';

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(pw: string): boolean {
    return pw.length >= 5 && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw);
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = useMemo(() => isValidEmail(email), [email]);
    const isNameValid = useMemo(() => name.trim().length > 0, [name]);
    const isPasswordValid = useMemo(() => isStrongPassword(password), [password]);

    const isCreateEnabled = isEmailValid && isNameValid && isPasswordValid;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCreateEnabled) return;

        try {
            const url = `/api/auth/register`;
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                // TODO: Show error message to user
                return;
            }

            // Navigate to home page and refresh
            window.location.href = '/';
        } catch (err) {
            console.error('Error during registration:', err);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerBox}>
                <h1 className={styles.registerTitle}>Create account</h1>
                <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
                    {/* Email */}
                    <div className={styles.formGroup}>
                        <label htmlFor="reg-email" className={styles.label}>Email</label>
                        <input
                            id="reg-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                        {email && !isEmailValid && (
                            <span className={styles.error}>Please enter a valid email</span>
                        )}
                    </div>

                    {/* Name */}
                    <div className={styles.formGroup}>
                        <label htmlFor="reg-name" className={styles.label}>Name</label>
                        <input
                            id="reg-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            placeholder="Your name"
                            autoComplete="name"
                            required
                        />
                        {name !== '' && !isNameValid && (
                            <span className={styles.error}>Name can't be empty</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles.formGroup}>
                        <label htmlFor="reg-password" className={styles.label}>Password</label>
                        <input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="••••••"
                            autoComplete="new-password"
                            required
                        />
                        {password && !isPasswordValid && (
                            <span className={styles.error}>
                                Must be at least 5 chars with upper, lower, and a number
                            </span>
                        )}
                    </div>

                    <button type="submit" className={styles.registerButton} disabled={!isCreateEnabled}>
                        Create account
                    </button>

                    <Link to="/login" className={styles.loginLink}>
                        Already have an account? Log in
                    </Link>
                </form>
            </div>
        </div>
    );
}