'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import styles from './dashboard.module.css';

const modules = [
    { name: 'Điều hành chung', icon: '⚙️', path: '/dashboard' },
    { name: 'Điều hành Sản xuất', icon: '🏭', path: '/dashboard/production' },
    { name: 'Điều hành Kinh doanh', icon: '📊', path: '/dashboard/business' },
    { name: 'Điều hành Mạng lưới', icon: '🌐', path: '/dashboard/network' },
    { name: 'Điều hành Nhân sự', icon: '👥', path: '/dashboard/hr' },
    { name: 'Điều hành Nhân viên số\n(AI Agent)', icon: '🤖', path: '/dashboard' },
    { name: 'Làm sạch Dữ liệu', icon: '🔄', path: '/dashboard' },
    { name: 'Quản lý thất thoát', icon: '💧', path: '/dashboard' },
];

export default function GeneralDashboard() {
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className={styles.generalPage}>
                <div className={styles.title}>
                    <h1>TRUNG TÂM ĐIỀU HÀNH THÔNG MINH QUAWACO</h1>
                    <p>QUAWACO INTELLIGENT OPERATIONS CENTER</p>
                </div>
                <div className={styles.modulesCircle}>
                    <div className={styles.centerOrb}></div>
                    {modules.map((mod, i) => (
                        <div
                            key={i}
                            className={`${styles.moduleItem} ${styles[`pos${i}`]}`}
                            onClick={() => router.push(mod.path)}
                        >
                            <div className={styles.moduleIcon}>{mod.icon}</div>
                            <span className={styles.moduleName}>{mod.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
