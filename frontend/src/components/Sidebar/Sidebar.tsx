'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import styles from './Sidebar.module.css';

const navItems = [
    { path: '/dashboard', icon: '⚙️', label: 'Điều hành chung' },
    { path: '/dashboard/production', icon: '🏭', label: 'Điều hành Sản xuất' },
    { path: '/dashboard/network', icon: '🌐', label: 'Điều hành Mạng lưới' },
    { path: '/dashboard/business', icon: '📊', label: 'Điều hành Kinh doanh' },
    { path: '/dashboard/hr', icon: '👥', label: 'Điều hành Nhân sự' },
    { path: '/dashboard/hr-management', icon: '📝', label: 'Quản lý Nhân sự' },
    { path: '/dashboard/agent', icon: '🤖', label: 'Nhân viên số (AI Agent)' },
    { path: '/dashboard/plants', icon: '🏗️', label: 'Quản lý Nhà máy' },
    { path: '#', icon: '🔄', label: 'Làm sạch Dữ liệu', disabled: true },
    { path: '#', icon: '💧', label: 'Quản lý thất thoát', disabled: true },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
            <div className={`${styles.overlay} ${mobileOpen ? styles.show : ''}`} onClick={() => setMobileOpen(false)} />

            <aside className={`${styles.sidebar} ${expanded ? styles.expanded : ''} ${mobileOpen ? styles.open : ''}`}>
                {/* Logo */}
                <div className={styles.logoArea}>
                    <Image src="/quawaco-logo.svg" alt="Quawaco" width={40} height={40} className={styles.logoImg} />
                    <span className={styles.logoText}>QUAWACO</span>
                </div>

                {/* Toggle */}
                <button className={styles.toggleBtn} onClick={() => setExpanded(!expanded)} title={expanded ? 'Thu gọn' : 'Mở rộng'}>
                    {expanded ? '◂' : '▸'}
                </button>

                {/* Nav */}
                <nav className={styles.navItems}>
                    {navItems.map(item => (
                        <div
                            key={item.path + item.label}
                            className={`${styles.navItem} ${pathname === item.path ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
                            onClick={() => { if (!item.disabled) { router.push(item.path); setMobileOpen(false); } }}
                            title={item.label}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </div>
                    ))}
                </nav>

                {/* Bottom */}
                <div className={styles.bottomActions}>
                    <button className={styles.themeToggle} onClick={toggleTheme} title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}>
                        <span className={styles.navIcon}>{theme === 'dark' ? '☀️' : '🌙'}</span>
                        <span className={styles.themeLabel}>{theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}</span>
                    </button>

                    <div className={styles.userArea} onClick={logout} title="Đăng xuất">
                        <div className={styles.userAvatar}>
                            {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className={styles.userName}>
                            <div style={{ fontWeight: 600 }}>{user?.fullName || 'User'}</div>
                            <div className={styles.logoutText}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
