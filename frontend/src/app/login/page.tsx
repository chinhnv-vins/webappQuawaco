'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { api } from '@/lib/api';
import styles from './login.module.css';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isRegister) {
                await api.register(username, password, fullName);
                setIsRegister(false);
                setError('');
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
            } else {
                const data = await api.login(username, password);
                login(data.access_token, data.user);
                window.location.href = '/dashboard';
            }
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <button className={styles.themeBtn} onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className={`glass-card ${styles.loginCard}`}>
                <div className={styles.loginLogo}>
                    <h1>QUAWACO</h1>
                    <p>Trung tâm Điều hành Thông minh</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}
                    {isRegister && (
                        <div className={styles.formGroup}>
                            <label>Họ và tên</label>
                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nhập họ và tên" required />
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label>Tên đăng nhập</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nhập tên đăng nhập" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mật khẩu</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu" required />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Đang xử lý...' : isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    </button>
                </form>
                <div className={styles.toggleLink}>
                    {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
                    <a onClick={() => { setIsRegister(!isRegister); setError(''); }}>
                        {isRegister ? 'Đăng nhập' : 'Đăng ký'}
                    </a>
                </div>
            </div>
        </div>
    );
}
