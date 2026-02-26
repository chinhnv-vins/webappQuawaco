'use client';
import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import ChartSetup from '@/components/ChartSetup';
import FilterBar from '@/components/FilterBar/FilterBar';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function HrDashboard() {
    const { data, loading, filters, onFilterChange } = useDashboardData('hr');

    if (!data) return <DashboardLayout><div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</div></DashboardLayout>;

    const revenueDoughnut = { labels: data.sideRevenue.breakdown.map((b: any) => b.label), datasets: [{ data: data.sideRevenue.breakdown.map((b: any) => b.value), backgroundColor: data.sideRevenue.breakdown.map((b: any) => b.color), borderWidth: 0, cutout: '55%' }] };
    const revenueChart = {
        labels: data.totalRevenue.labels, datasets: [
            { label: 'Doanh thu', data: data.totalRevenue.revenue, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2 },
            { label: 'Chi phí', data: data.totalRevenue.expenses, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)', fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2 },
        ]
    };
    const profitChart = { labels: data.totalProfit.labels, datasets: [{ data: data.totalProfit.data, backgroundColor: 'rgba(59,130,246,0.6)', borderRadius: 6, barThickness: 16 }] };
    const sessionsChart = {
        labels: data.totalSessions.labels, datasets: [
            { label: 'Phiên', data: data.totalSessions.data, borderColor: '#22c55e', backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#22c55e', borderWidth: 2 },
            { label: 'Xu hướng', data: data.totalSessions.data.map((_: any, i: number, arr: number[]) => { const avg = arr.slice(Math.max(0, i - 1), i + 2).reduce((a: number, b: number) => a + b, 0) / Math.min(3, i < 1 ? i + 2 : i >= arr.length - 1 ? arr.length - i + 1 : 3); return Math.round(avg); }), borderColor: '#818cf8', backgroundColor: 'transparent', tension: 0.4, pointRadius: 0, borderWidth: 2, borderDash: [5, 3] },
        ]
    };

    const co: any = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#5a6f8a', font: { size: 10 } } }, y: { grid: { color: 'rgba(56,97,150,0.12)' }, ticks: { color: '#5a6f8a', font: { size: 10 } }, border: { display: false } } } };

    return (
        <DashboardLayout>
            <ChartSetup />
            <h2 className="page-title">{data.title}</h2>
            <FilterBar filters={data.filters} values={filters} onChange={onFilterChange} />
            {loading && <div style={{ position: 'fixed', top: 80, right: 20, background: 'var(--accent-blue)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, zIndex: 999 }}>Đang cập nhật...</div>}

            <div className="dashboard-grid grid-4">
                {data.kpiCards.map((card: any, i: number) => (
                    <div className="glass-card" key={i} style={{ padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 24 }}>{['👁️', '👥', '👤', '🔔'][i]}</span>
                            <span className={card.change >= 0 ? 'change-positive' : 'change-negative'} style={{ fontSize: 12, fontWeight: 600 }}>
                                {card.change >= 0 ? '▲' : '▼'} {Math.abs(card.change)}%
                            </span>
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{card.value.toLocaleString()}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{card.label}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid grid-2" style={{ marginTop: 16 }}>
                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tổng doanh thu</h3><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{data.totalRevenue.period}</span></div>
                    <div className="big-number" style={{ margin: '8px 0' }}>{data.totalRevenue.value.toLocaleString('vi-VN')} <span style={{ fontSize: 14, fontWeight: 500 }}>VNĐ</span> <span className="change change-positive" style={{ background: 'rgba(34,197,94,0.1)' }}>▲ {data.totalRevenue.change}%</span></div>
                    <div style={{ height: 180 }}><Line data={revenueChart} options={{ ...co, plugins: { legend: { display: true, position: 'top' as const, labels: { color: '#8899b4', font: { size: 10 }, boxWidth: 10, padding: 8 } } } }} /></div>
                </div>
                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tổng lợi nhuận</h3></div>
                    <div className="big-number" style={{ margin: '8px 0' }}>{data.totalProfit.value.toLocaleString('vi-VN')} <span style={{ fontSize: 14, fontWeight: 500 }}>VNĐ</span> <span className="change change-positive" style={{ background: 'rgba(34,197,94,0.1)' }}>▲ {data.totalProfit.change}%</span></div>
                    <div style={{ height: 180 }}><Bar data={profitChart} options={co} /></div>
                </div>
            </div>

            <div className="dashboard-grid grid-2" style={{ marginTop: 16 }}>
                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tổng phiên truy cập</h3></div>
                    <div className="big-number" style={{ margin: '8px 0' }}>{data.totalSessions.value} <span className="change change-positive" style={{ background: 'rgba(34,197,94,0.1)' }}>▲ {data.totalSessions.change}%</span></div>
                    <div style={{ height: 180 }}><Line data={sessionsChart} options={{ ...co, plugins: { legend: { display: true, position: 'top' as const, labels: { color: '#8899b4', font: { size: 10 }, boxWidth: 10, padding: 8 } } } }} /></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div className="card-header"><h3>TỔNG DOANH THU</h3></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 100, height: 100, position: 'relative' }}>
                                <Doughnut data={revenueDoughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 14, fontWeight: 700 }}>{data.sideRevenue.value}</div><div style={{ fontSize: 7, color: 'var(--text-muted)' }}>TRIỆU VNĐ</div></div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 600 }}>LỢI NHUẬN</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-green)' }}>{data.sideRevenue.profitLoss}%</div>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div className="card-header"><h3>NHÂN VIÊN MỚI</h3></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data.newUsers.map((u: any, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: `hsl(${i * 55 + 180},55%,50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600 }}>{u.name.charAt(0)}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</div><div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{u.role}</div></div>
                                    <div style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{u.joinedDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
