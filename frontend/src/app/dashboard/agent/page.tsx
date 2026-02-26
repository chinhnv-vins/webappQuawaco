'use client';
import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import ChartSetup from '@/components/ChartSetup';
import FilterBar from '@/components/FilterBar/FilterBar';
import { useDashboardData } from '@/hooks/useDashboardData';
import Image from 'next/image';

export default function AgentDashboard() {
    const { data, loading, filters, onFilterChange } = useDashboardData('agent');

    if (!data) return <DashboardLayout><div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</div></DashboardLayout>;

    const revenueDoughnut = { labels: data.totalRevenue.breakdown.map((b: any) => b.label), datasets: [{ data: data.totalRevenue.breakdown.map((b: any) => b.value), backgroundColor: data.totalRevenue.breakdown.map((b: any) => b.color), borderWidth: 0, cutout: '55%' }] };
    const waveChartData = { labels: data.waveChart.labels, datasets: data.waveChart.datasets.map((ds: any) => ({ label: ds.label, data: ds.data, borderColor: ds.color, backgroundColor: ds.color + '15', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 })) };
    const co: any = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false, drawBorder: false }, ticks: { color: '#5a6f8a', font: { size: 10 } } }, y: { grid: { color: 'rgba(56,97,150,0.12)', drawBorder: false }, ticks: { color: '#5a6f8a', font: { size: 10 } }, border: { display: false } } } };

    const calDays: (number | null)[] = [];
    const firstDay = new Date(data.calendar.year, 0, 1).getDay();
    for (let i = 0; i < firstDay; i++) calDays.push(null);
    for (let i = 1; i <= 31; i++) calDays.push(i);

    return (
        <DashboardLayout>
            <ChartSetup />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 className="page-title" style={{ margin: 0 }}>{data.title}</h2>
                <Image src="/quawaco-logo.svg" alt="Quawaco AI" width={50} height={50} style={{ borderRadius: '50%' }} />
            </div>
            <FilterBar filters={data.filters} values={filters} onChange={onFilterChange} />
            {loading && <div style={{ position: 'fixed', top: 80, right: 20, background: 'var(--accent-blue)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, zIndex: 999 }}>Đang cập nhật...</div>}

            <div className="dashboard-grid grid-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="dashboard-grid grid-2" style={{ padding: 0 }}>
                        <div className="glass-card" style={{ padding: 16 }}>
                            <div className="card-header"><h3>TỔNG DOANH THU</h3></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 110, height: 110, position: 'relative' }}>
                                    <Doughnut data={revenueDoughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 14, fontWeight: 700 }}>{data.totalRevenue.value}</div><div style={{ fontSize: 7, color: 'var(--text-muted)' }}>TRIỆU VNĐ</div></div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 600 }}>LỢI NHUẬN</div>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-green)' }}>{data.totalRevenue.profitLoss}%</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6 }}>
                                        {data.totalRevenue.breakdown.map((b: any) => (<span key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 8 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: b.color, display: 'inline-block' }}></span>{b.label}</span>))}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 8 }}>KHOẢNG: {data.totalRevenue.monthRange} | NĂM: {data.totalRevenue.year}</div>
                        </div>
                        <div className="glass-card" style={{ padding: 16 }}>
                            <div className="card-header"><h3>NHÂN VIÊN MỚI</h3></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {data.newUsers.map((u: any, i: number) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `hsl(${i * 50 + 180},55%,50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{u.name.charAt(0)}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div><div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{u.role}</div></div>
                                        <div style={{ fontSize: 9, color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}><div>Ngày TG:</div><div style={{ fontWeight: 500 }}>{u.joinedDate}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="dashboard-grid grid-3" style={{ padding: 0 }}>
                        {data.dataCards.map((card: any, i: number) => (
                            <div key={i} className="glass-card" style={{ padding: 16, borderTop: `3px solid ${card.color}` }}>
                                <div style={{ fontSize: 24, fontWeight: 800, color: card.color }}>{card.value.toLocaleString()}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{card.title}</div>
                                <div style={{ height: 50, marginTop: 8 }}>
                                    <Line data={{ labels: card.data.map((_: any, j: number) => j), datasets: [{ data: card.data, borderColor: card.color, backgroundColor: card.color + '20', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 }] }} options={{ ...co, scales: { x: { display: false }, y: { display: false } }, plugins: { legend: { display: false } } }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card" style={{ padding: 16 }}>
                        <div className="card-header"><h3>Biểu đồ phân tích</h3><div style={{ display: 'flex', gap: 12 }}>{data.waveChart.datasets.map((ds: any, i: number) => (<span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}><span style={{ width: 10, height: 3, background: ds.color, borderRadius: 2, display: 'inline-block' }}></span>{ds.label}</span>))}</div></div>
                        <div style={{ height: 180 }}><Line data={waveChartData} options={co} /></div>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid grid-3" style={{ marginTop: 16 }}>
                <div className="glass-card" style={{ padding: 16 }}>
                    <div className="card-header"><h3>{data.circularProgress.title}</h3></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                        <div style={{ width: 100, height: 100, position: 'relative' }}>
                            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}><circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-input)" strokeWidth="10" /><circle cx="50" cy="50" r="42" fill="none" stroke="#8b5cf6" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 42 * data.circularProgress.value / 100} ${2 * Math.PI * 42 * (1 - data.circularProgress.value / 100)}`} strokeLinecap="round" /></svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 800 }}>{data.circularProgress.value}%</div></div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{data.circularProgress.label}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {data.horizontalBars.map((bar: any, i: number) => (
                            <div key={i}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}><span style={{ color: 'var(--text-secondary)' }}>{bar.label}</span><span style={{ fontWeight: 600 }}>{bar.value}%</span></div><div style={{ height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: `${Math.min(bar.value, 100)}%`, background: bar.color, borderRadius: 3, transition: 'width 0.5s' }}></div></div></div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 16 }}>
                    <div className="card-header"><h3>HOẠT ĐỘNG</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        {data.activities.map((act: any, i: number) => (
                            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 11 }}><div style={{ color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0, width: 40 }}>{act.time}</div><div style={{ borderLeft: `2px solid ${act.type === 'success' ? '#22c55e' : act.type === 'warning' ? '#facc15' : '#06b6d4'}`, paddingLeft: 10, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{act.text}</div></div>
                        ))}
                    </div>
                    <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 12, marginBottom: 8, color: 'var(--accent-yellow)' }}>📅 {data.calendar.month} {data.calendar.year}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, textAlign: 'center', fontSize: 10 }}>
                            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (<div key={d} style={{ color: 'var(--text-muted)', fontWeight: 600, padding: 2 }}>{d}</div>))}
                            {calDays.map((day, i) => (<div key={i} style={{ padding: 3, borderRadius: 4, background: day && data.calendar.events.includes(day) ? '#8b5cf6' : 'transparent', color: day ? (data.calendar.events.includes(day) ? '#fff' : 'var(--text-secondary)') : 'transparent', fontWeight: day && data.calendar.events.includes(day) ? 700 : 400, fontSize: 10 }}>{day || ''}</div>))}
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 16 }}>
                    <div className="card-header"><h3>CHỈ SỐ TIẾN ĐỘ</h3></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                        {data.progressIndicators.map((ind: any, i: number) => {
                            const colors = ['#facc15', '#22c55e', '#f472b6', '#06b6d4', '#8b5cf6']; const v = Math.min(ind.value, 100); return (
                                <div key={i} style={{ textAlign: 'center', width: 80 }}><div style={{ width: 60, height: 60, position: 'relative', margin: '0 auto' }}><svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}><circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-input)" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="none" stroke={colors[i]} strokeWidth="8" strokeDasharray={`${2 * Math.PI * 40 * v / 100} ${2 * Math.PI * 40 * (1 - v / 100)}`} strokeLinecap="round" /></svg><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 13, fontWeight: 700 }}>{v}%</div></div><div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 4 }}>{ind.label}</div></div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 16, paddingRight: 8 }}>
                <Image src="/quawaco-logo.svg" alt="Quawaco AI" width={30} height={30} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Quawaco AI</span>
            </div>
        </DashboardLayout>
    );
}
