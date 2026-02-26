'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import AiChat from '@/components/AiChat/AiChat';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            setReady(true);
        }
    }, [router]);

    if (!ready) return null;

    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.mainContent}>{children}</main>
            <AiChat />
        </div>
    );
}

