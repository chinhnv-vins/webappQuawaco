'use client';
import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import ChartSetup from '@/components/ChartSetup';
import FilterBar from '@/components/FilterBar/FilterBar';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function ProductionDashboard() {
    const { data, loading, filters, onFilterChange } = useDashboardData('production');

    if (!data) return <DashboardLayout><div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</div></DashboardLayout>;

    const conversionChartData = {
        labels: data.conversionRate.data.map((d: any) => d.label),
        datasets: [{
            data: data.conversionRate.data.map((d: any) => d.value),
            backgroundColor: data.conversionRate.data.map((d: any) => d.color),
            borderWidth: 0, cutout: '65%',
        }],
    };

    const salesChartData = {
        labels: data.salesThisMonth.labels,
        datasets: [{
            label: 'Doanh thu',
            data: data.salesThisMonth.data,
            borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)',
            fill: true, tension: 0.4, pointRadius: 2, pointBackgroundColor: '#22c55e', borderWidth: 2,
        }],
    };

    const discountChartData = {
        labels: data.discountedSales.labels,
        datasets: [{
            label: 'Giảm giá',
            data: data.discountedSales.data,
            backgroundColor: ['#f472b6', '#facc15', '#818cf8', '#34d399', '#f97316'],
            borderRadius: 6, barThickness: 18,
        }],
    };

    const sessionChartData = {
        labels: data.avgSessionDuration.labels,
        datasets: [
            { label: 'Thời lượng', data: data.avgSessionDuration.duration, backgroundColor: 'rgba(59,130,246,0.8)', borderRadius: 4, barThickness: 12 },
            { label: 'Tổng khách', data: data.avgSessionDuration.totalVisitors, backgroundColor: 'rgba(139,92,246,0.8)', borderRadius: 4, barThickness: 12 },
            { label: 'Khách mới', data: data.avgSessionDuration.newVisitors, backgroundColor: 'rgba(99,102,241,0.5)', borderRadius: 4, barThickness: 12 },
        ],
    };

    const chartOptions: any = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#5a6f8a', font: { size: 10 } } },
            y: { grid: { color: 'rgba(56,97,150,0.12)' }, ticks: { color: '#5a6f8a', font: { size: 10 } }, border: { display: false } }
        },
    };

    return (
        <DashboardLayout>
            <ChartSetup />
            <h2 className="page-title">{data.title}</h2>
            <FilterBar filters={data.filters} values={filters} onChange={onFilterChange} />
            {loading && <div style={{ position: 'fixed', top: 80, right: 20, background: 'var(--accent-blue)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 12, zIndex: 999 }}>Đang cập nhật...</div>}

            <div className="dashboard-grid grid-3">
                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Trang hàng đầu</h3><span className="card-action">›</span></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {data.topPages.map((p: any, i: number) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 22 }}>{['🏠', '👤', '✉️', '💲'][i]}</span>
                                <div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.name}</div>
                                    <div style={{ fontSize: 22, fontWeight: 700 }}>{p.value.toLocaleString()}</div>
                                    <span className={p.change >= 0 ? 'change-positive' : 'change-negative'} style={{ fontSize: 11, fontWeight: 600 }}>
                                        {p.change >= 0 ? '▲' : '▼'} {Math.abs(p.change)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tỷ lệ chuyển đổi</h3></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                            {data.conversionRate.data.map((d: any, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, display: 'inline-block' }}></span>
                                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.label}</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 'auto' }}>{d.value}%</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ width: 140, height: 140, position: 'relative' }}>
                            <Doughnut data={conversionChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Tỷ lệ</div>
                                <div style={{ fontSize: 11, fontWeight: 600 }}>chuyển đổi</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Thời lượng phiên TB</h3></div>
                    <div style={{ height: 200 }}>
                        <Bar data={sessionChartData} options={{ ...chartOptions, plugins: { legend: { display: true, position: 'top' as const, labels: { color: '#8899b4', font: { size: 9 }, boxWidth: 10, padding: 8 } } } }} />
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Doanh thu tháng này</h3><span className="card-action">⋯</span></div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Người dùng từ tất cả kênh</div>
                    <div className="big-number" style={{ margin: '8px 0' }}>
                        {data.salesThisMonth.value.toLocaleString('vi-VN')} <span style={{ fontSize: 14, fontWeight: 500 }}>VNĐ</span>
                        <span className="change change-positive" style={{ background: 'rgba(34,197,94,0.1)' }}>▲ {data.salesThisMonth.change}%</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Còn {data.salesThisMonth.goal.toLocaleString('vi-VN')} VNĐ để đạt mục tiêu</div>
                    <div style={{ height: 140, marginTop: 12 }}><Line data={salesChartData} options={chartOptions} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>SP giảm giá đã bán</h3><span className="card-action">⋯</span></div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Người dùng từ tất cả kênh</div>
                    <div className="big-number" style={{ margin: '8px 0' }}>
                        {data.discountedSales.value.toLocaleString('vi-VN')} <span style={{ fontSize: 14, fontWeight: 500 }}>VNĐ</span>
                        <span className="change change-positive" style={{ background: 'rgba(34,197,94,0.1)' }}>▲ {data.discountedSales.change}%</span>
                    </div>
                    <div style={{ height: 140, marginTop: 12 }}><Bar data={discountChartData} options={chartOptions} /></div>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div className="card-header"><h3>Tài khoản khách hàng</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {data.leadsAccount.map((lead: any, i: number) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, paddingBottom: i < data.leadsAccount.length - 1 ? 10 : 0, borderBottom: i < data.leadsAccount.length - 1 ? '1px solid var(--border-card)' : 'none' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Tài khoản {lead.account}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{lead.type} · {lead.date}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600 }}>{lead.amount.toLocaleString('vi-VN')} VNĐ</div>
                                    <span className={`badge badge-${lead.status.toLowerCase()}`}>
                                        {lead.status === 'Completed' ? 'Hoàn thành' : lead.status === 'Pending' ? 'Chờ xử lý' : 'Đã hủy'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
