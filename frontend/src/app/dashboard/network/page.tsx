'use client';
import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import ChartSetup from '@/components/ChartSetup';
import FilterBar from '@/components/FilterBar/FilterBar';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function NetworkDashboard() {
    const { data, loading, filters, onFilterChange } = useDashboardData('network');

    if (!data) return <DashboardLayout><div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</div></DashboardLayout>;

    const revenueDoughnut = { labels: data.totalRevenue.breakdown.map((b: any) => b.label), datasets: [{ data: data.totalRevenue.breakdown.map((b: any) => b.value), backgroundColor: data.totalRevenue.breakdown.map((b: any) => b.color), borderWidth: 0, cutout: '60%' }] };
    const productivityChart = { labels: data.totalProductivity.labels, datasets: [{ label: 'Năng suất/giờ', data: data.totalProductivity.profitPerHour, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.12)', fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2 }] };
    const saleReportChart = { labels: data.monthlySaleReport.labels, datasets: [{ data: data.monthlySaleReport.data, backgroundColor: ['#facc15', '#ec4899', '#818cf8', '#22c55e'], borderRadius: 6, barThickness: 20 }] };

    const co: any = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#5a6f8a', font: { size: 10 } } }, y: { grid: { color: 'rgba(56,97,150,0.12)' }, ticks: { color: '#5a6f8a', font: { size: 10 } }, border: { display: false } } } };

    return (
        <DashboardLayout>
            <ChartSetup />
            <h2 className="page-title">{data.title}</h2>
            <FilterBar filters={data.filters} values={filters} onChange={onFilterChange} />
            {loading && <div style={{ position: 'fixed', top: 80, right: 20, background: 'var(--accent-blue)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, zIndex: 999 }}>Đang cập nhật...</div>}

            <div className="dashboard-grid grid-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="dashboard-grid grid-2" style={{ padding: 0 }}>
                        <div className="glass-card" style={{ padding: 20 }}>
                            <div className="card-header"><h3>TỔNG DOANH THU</h3></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 120, height: 120, position: 'relative' }}>
                                    <Doughnut data={revenueDoughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 16, fontWeight: 700 }}>{data.totalRevenue.value}</div><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>TRIỆU VNĐ</div></div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 600 }}>LỢI NHUẬN</div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-green)' }}>{data.totalRevenue.profitLoss}%</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                                        {data.totalRevenue.breakdown.map((b: any) => (<div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, display: 'inline-block' }}></span><span style={{ color: 'var(--text-secondary)' }}>{b.label}</span></div>))}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 12 }}>KHOẢNG: {data.totalRevenue.monthRange} | NĂM: {data.totalRevenue.year}</div>
                        </div>
                        <div className="glass-card" style={{ padding: 20 }}>
                            <div className="card-header"><h3>TỔNG NĂNG SUẤT</h3></div>
                            <div style={{ height: 150 }}><Line data={productivityChart} options={co} /></div>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: 20 }}>
                        <div className="card-header"><h3>NHÂN VIÊN MỚI</h3></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {data.newUsers.map((u: any, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: i < data.newUsers.length - 1 ? 10 : 0, borderBottom: i < data.newUsers.length - 1 ? '1px solid var(--border-card)' : 'none' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${i * 55 + 180},55%,50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}>{u.name.charAt(0)}</div>
                                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.role}</div></div>
                                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'right' }}><div>Ngày TG:</div><div style={{ fontWeight: 500 }}>{u.joinedDate}</div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="dashboard-grid grid-2" style={{ padding: 0 }}>
                        <div className="glass-card" style={{ padding: 20 }}>
                            <div className="card-header"><h3>NGÀY VÀ GIỜ</h3></div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-yellow)', marginBottom: 16 }}>{data.dateTime}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div style={{ textAlign: 'center', padding: 12, background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}><div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4 }}>DOANH SỐ HÔM NAY</div><div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-cyan)' }}>{data.todaySales.percentage}%</div><div style={{ fontSize: 9, color: 'var(--text-muted)' }}>TỔNG {data.todaySales.total} SP</div></div>
                                <div style={{ textAlign: 'center', padding: 12, background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}><div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4 }}>KHÁCH HÀNG NGÀY</div><div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-green)' }}>{data.dailyVisitors.percentage}%</div><div style={{ fontSize: 9, color: 'var(--text-muted)' }}>TỔNG {data.dailyVisitors.total} khách</div></div>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: 20 }}>
                            <div className="card-header"><h3>BÁO CÁO BÁN HÀNG</h3></div>
                            <div style={{ height: 120 }}><Bar data={saleReportChart} options={co} /></div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: 20, minHeight: 500 }}>
                    <div className="card-header"><h3>🗺️ Bản đồ mạng lưới</h3></div>
                    <div style={{ height: 'calc(100% - 40px)', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}><span style={{ fontSize: 60 }}>🗺️</span><div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600, marginTop: 8 }}>Bản đồ mạng lưới cấp nước</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hiệu ứng nhiệt + Điểm phân phối</div></div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
