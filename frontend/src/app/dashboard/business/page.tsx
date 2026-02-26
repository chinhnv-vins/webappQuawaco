'use client';
import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import ChartSetup from '@/components/ChartSetup';
import FilterBar from '@/components/FilterBar/FilterBar';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function BusinessDashboard() {
    const { data, loading, filters, onFilterChange } = useDashboardData('business');

    if (!data) return <DashboardLayout><div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</div></DashboardLayout>;

    const trafficDoughnut = { labels: ['TK tự nhiên', 'TK trả phí'], datasets: [{ data: [data.trafficSource.organicSearch, data.trafficSource.paidSearch], backgroundColor: ['#ec4899', '#22c55e'], borderWidth: 0, cutout: '72%' }] };
    const conversionBarData = {
        labels: data.conversionSource.channels.map((ch: any) => ch.name), datasets: [
            { label: 'Đăng ký', data: data.conversionSource.channels.map((ch: any) => ch.signUp), backgroundColor: '#facc15', borderRadius: 4, barThickness: 14 },
            { label: 'Mua hàng', data: data.conversionSource.channels.map((ch: any) => ch.purchase), backgroundColor: '#ec4899', borderRadius: 4, barThickness: 14 },
            { label: 'Bản tin', data: data.conversionSource.channels.map((ch: any) => ch.newsletter), backgroundColor: '#818cf8', borderRadius: 4, barThickness: 14 },
        ]
    };
    const visitorHeatmap = {
        labels: data.visitorsByLocation.years.map(String), datasets: data.visitorsByLocation.locations.map((loc: any, i: number) => ({
            label: loc.name, data: loc.data, backgroundColor: ['rgba(59,130,246,0.9)', 'rgba(99,102,241,0.7)', 'rgba(139,92,246,0.5)', 'rgba(168,85,247,0.3)'][i], borderRadius: 2, barThickness: 16
        }))
    };
    const avgVisitorsChart = { labels: data.avgVisitors.labels, datasets: [{ label: 'Khách', data: data.avgVisitors.data, backgroundColor: data.avgVisitors.data.map((v: number) => v > 200 ? '#facc15' : 'rgba(99,102,241,0.6)'), borderRadius: 6, barThickness: 20 }] };
    const avgTimeChart = {
        labels: data.avgTime.labels, datasets: [
            { label: 'Trên trang web', data: data.avgTime.data[0], backgroundColor: '#facc15', borderRadius: 4, barThickness: 14 },
            { label: 'Trên trang', data: data.avgTime.data[1], backgroundColor: '#ec4899', borderRadius: 4, barThickness: 14 },
            { label: 'Bản tin', data: data.avgTime.data[2], backgroundColor: '#818cf8', borderRadius: 4, barThickness: 14 },
        ]
    };
    const uniqueVisitorsChart = { labels: data.uniqueVisitors.labels, datasets: [{ label: 'Khách', data: data.uniqueVisitors.data, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.08)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#06b6d4', pointBorderColor: '#0a1628', pointBorderWidth: 2, borderWidth: 2 }] };

    const co: any = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#5a6f8a', font: { size: 10 } } }, y: { grid: { color: 'rgba(56,97,150,0.12)' }, ticks: { color: '#5a6f8a', font: { size: 10 } }, border: { display: false } } } };

    return (
        <DashboardLayout>
            <ChartSetup />
            <h2 className="page-title">{data.title}</h2>
            <FilterBar filters={data.filters} values={filters} onChange={onFilterChange} />
            {loading && <div style={{ position: 'fixed', top: 80, right: 20, background: 'var(--accent-blue)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, zIndex: 999 }}>Đang cập nhật...</div>}

            <div className="dashboard-grid grid-3">
                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Nguồn truy cập</h3></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 16 }}><div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>TK tự nhiên</div><div style={{ fontSize: 32, fontWeight: 800 }}>{data.trafficSource.organicSearch}%</div></div>
                            <div><div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>TK trả phí</div><div style={{ fontSize: 20, fontWeight: 700 }}>{data.trafficSource.paidSearch}%</div></div>
                        </div>
                        <div style={{ width: 140, height: 140, position: 'relative' }}>
                            <Doughnut data={trafficDoughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 800 }}>{(data.trafficSource.total / 1000).toFixed(0)}k</div><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>TB/ngày</div></div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Nguồn chuyển đổi</h3></div>
                    <div style={{ height: 160 }}><Bar data={conversionBarData} options={{ ...co, indexAxis: 'y' as const }} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Khách theo vị trí</h3></div>
                    <div style={{ height: 180 }}><Bar data={visitorHeatmap} options={{ ...co, scales: { ...co.scales, x: { ...co.scales.x, stacked: true }, y: { ...co.scales.y, stacked: true } } }} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Lượng khách TB</h3></div>
                    <div style={{ height: 180 }}><Bar data={avgVisitorsChart} options={co} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Thời gian trung bình</h3></div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                        <div style={{ borderLeft: '3px solid #facc15', paddingLeft: 8 }}><div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>TB trang web</div><div style={{ fontSize: 20, fontWeight: 700 }}>{data.avgTime.onSite.value} <span style={{ fontSize: 11 }}>phút</span></div></div>
                        <div style={{ borderLeft: '3px solid #ec4899', paddingLeft: 8 }}><div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>TB trang</div><div style={{ fontSize: 20, fontWeight: 700 }}>{data.avgTime.onPage.value} <span style={{ fontSize: 11 }}>phút</span></div></div>
                        <div style={{ borderLeft: '3px solid #818cf8', paddingLeft: 8 }}><div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>TB bản tin</div><div style={{ fontSize: 20, fontWeight: 700 }}>{data.avgTime.onNewsletter.value} <span style={{ fontSize: 11 }}>phút</span></div></div>
                    </div>
                    <div style={{ height: 120 }}><Bar data={avgTimeChart} options={{ ...co, scales: { ...co.scales, x: { ...co.scales.x, stacked: true }, y: { ...co.scales.y, stacked: true } } }} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tài khoản KH</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {data.leadsAccount.map((l: any, i: number) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: i < data.leadsAccount.length - 1 ? 10 : 0, borderBottom: i < data.leadsAccount.length - 1 ? '1px solid var(--border-card)' : 'none' }}>
                                <div><div style={{ fontWeight: 600 }}>TK {l.account}</div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{l.type} · {l.date}</div></div>
                                <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 600 }}>{l.amount.toLocaleString('vi-VN')} VNĐ</div><span className={`badge badge-${l.status.toLowerCase()}`}>{l.status === 'Completed' ? 'Hoàn thành' : l.status === 'Pending' ? 'Chờ xử lý' : 'Đã hủy'}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card grid-span-2" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Khách truy cập duy nhất</h3></div>
                    <div style={{ height: 180 }}><Line data={uniqueVisitorsChart} options={co} /></div>
                </div>
            </div>
        </DashboardLayout>
    );
}
