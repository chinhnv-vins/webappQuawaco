'use client';
import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { api } from '@/lib/api';
import styles from './plants.module.css';

interface Plant {
    id: string;
    name: string;
    location: string;
    capacity: number;
    currentOutput: number;
    status: 'active' | 'maintenance' | 'inactive';
    manager: string;
    phone: string;
    operatingCost: number;
    revenue: number;
    employeeCount: number;
    waterQualityScore: number;
    establishedYear: number;
    lastMaintenance: string;
    description: string;
}

const emptyPlant: Omit<Plant, 'id'> = {
    name: '', location: '', capacity: 0, currentOutput: 0, status: 'inactive',
    manager: '', phone: '', operatingCost: 0, revenue: 0, employeeCount: 0,
    waterQualityScore: 0, establishedYear: new Date().getFullYear(), lastMaintenance: '', description: '',
};

const statusMap = { active: 'Hoạt động', maintenance: 'Bảo trì', inactive: 'Ngừng hoạt động' };
const statusColorMap = { active: '#22c55e', maintenance: '#facc15', inactive: '#ef4444' };

function formatVND(n: number): string {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace('.0', '') + ' tỷ';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + ' triệu';
    return n.toLocaleString('vi-VN');
}

export default function PlantsPage() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
    const [form, setForm] = useState<Omit<Plant, 'id'>>(emptyPlant);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [viewPlant, setViewPlant] = useState<Plant | null>(null);

    const fetchPlants = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.getPlants();
            setPlants(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    }, []);

    useEffect(() => { fetchPlants(); }, [fetchPlants]);

    const openCreate = () => {
        setEditingPlant(null);
        setForm({ ...emptyPlant });
        setModalOpen(true);
    };

    const openEdit = (plant: Plant) => {
        setEditingPlant(plant);
        setForm({ name: plant.name, location: plant.location, capacity: plant.capacity, currentOutput: plant.currentOutput, status: plant.status, manager: plant.manager, phone: plant.phone, operatingCost: plant.operatingCost, revenue: plant.revenue, employeeCount: plant.employeeCount, waterQualityScore: plant.waterQualityScore, establishedYear: plant.establishedYear, lastMaintenance: plant.lastMaintenance, description: plant.description });
        setModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editingPlant) {
                await api.updatePlant(editingPlant.id, form);
            } else {
                await api.createPlant(form);
            }
            setModalOpen(false);
            fetchPlants();
        } catch (err) { console.error(err); }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deletePlant(id);
            setDeleteConfirm(null);
            fetchPlants();
        } catch (err) { console.error(err); }
    };

    const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

    const totalCapacity = plants.reduce((s, p) => s + p.capacity, 0);
    const totalOutput = plants.reduce((s, p) => s + p.currentOutput, 0);
    const activePlants = plants.filter(p => p.status === 'active').length;
    const totalEmployees = plants.reduce((s, p) => s + p.employeeCount, 0);

    return (
        <DashboardLayout>
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <div>
                        <h2 className="page-title" style={{ margin: 0 }}>QUẢN LÝ NHÀ MÁY</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>Quản lý thông tin các nhà máy nước và trạm bơm</p>
                    </div>
                    <button className={styles.addBtn} onClick={openCreate}>
                        <span>＋</span> Thêm nhà máy
                    </button>
                </div>

                {/* KPI Summary */}
                <div className={styles.kpiRow}>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>🏭</div>
                        <div><div className={styles.kpiValue}>{plants.length}</div><div className={styles.kpiLabel}>Tổng nhà máy</div></div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>✓</div>
                        <div><div className={styles.kpiValue}>{activePlants}</div><div className={styles.kpiLabel}>Đang hoạt động</div></div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>💧</div>
                        <div><div className={styles.kpiValue}>{(totalOutput / 1000).toFixed(0)}k</div><div className={styles.kpiLabel}>m³/ngày sản xuất</div></div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(250,204,21,0.15)', color: '#facc15' }}>📊</div>
                        <div><div className={styles.kpiValue}>{totalCapacity > 0 ? ((totalOutput / totalCapacity) * 100).toFixed(0) : 0}%</div><div className={styles.kpiLabel}>Hiệu suất TB</div></div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' }}>👥</div>
                        <div><div className={styles.kpiValue}>{totalEmployees}</div><div className={styles.kpiLabel}>Tổng nhân sự</div></div>
                    </div>
                </div>

                {/* Plant Cards */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Đang tải dữ liệu...</div>
                ) : (
                    <div className={styles.plantGrid}>
                        {plants.map(plant => (
                            <div key={plant.id} className={styles.plantCard}>
                                <div className={styles.cardTop}>
                                    <div className={styles.cardTitleRow}>
                                        <h3 className={styles.cardName}>{plant.name}</h3>
                                        <span className={styles.statusBadge} style={{ background: `${statusColorMap[plant.status]}22`, color: statusColorMap[plant.status], borderColor: `${statusColorMap[plant.status]}44` }}>
                                            {statusMap[plant.status]}
                                        </span>
                                    </div>
                                    <div className={styles.cardLocation}>📍 {plant.location}</div>
                                </div>

                                <div className={styles.cardStats}>
                                    <div className={styles.statItem}>
                                        <div className={styles.statLabel}>Công suất</div>
                                        <div className={styles.statValue}>{plant.capacity.toLocaleString('vi-VN')} m³/ngày</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statLabel}>Sản lượng</div>
                                        <div className={styles.statValue}>{plant.currentOutput.toLocaleString('vi-VN')} m³/ngày</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statLabel}>Chi phí VH</div>
                                        <div className={styles.statValue}>{formatVND(plant.operatingCost)} đ/tháng</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statLabel}>Doanh thu</div>
                                        <div className={styles.statValue} style={{ color: '#22c55e' }}>{formatVND(plant.revenue)} đ/tháng</div>
                                    </div>
                                </div>

                                {/* Capacity bar */}
                                <div className={styles.capacityBar}>
                                    <div className={styles.capacityLabel}>
                                        <span>Hiệu suất</span>
                                        <span style={{ fontWeight: 600 }}>{plant.capacity > 0 ? ((plant.currentOutput / plant.capacity) * 100).toFixed(0) : 0}%</span>
                                    </div>
                                    <div className={styles.barBg}>
                                        <div className={styles.barFill} style={{ width: `${plant.capacity > 0 ? (plant.currentOutput / plant.capacity) * 100 : 0}%`, background: plant.currentOutput / plant.capacity > 0.85 ? '#22c55e' : plant.currentOutput / plant.capacity > 0.5 ? '#facc15' : '#ef4444' }} />
                                    </div>
                                </div>

                                <div className={styles.cardMeta}>
                                    <span>👤 {plant.manager}</span>
                                    <span>👥 {plant.employeeCount} người</span>
                                    <span>⭐ CL: {plant.waterQualityScore}/100</span>
                                </div>

                                <div className={styles.cardActions}>
                                    <button className={styles.viewBtn} onClick={() => setViewPlant(plant)}>👁️ Xem</button>
                                    <button className={styles.editBtn} onClick={() => openEdit(plant)}>✏️ Sửa</button>
                                    <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(plant.id)}>🗑️ Xoá</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewPlant && (
                <div className={styles.overlay} onClick={() => setViewPlant(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
                        <div className={styles.modalHeader}>
                            <h3>Chi tiết nhà máy</h3>
                            <button className={styles.closeModal} onClick={() => setViewPlant(null)}>✕</button>
                        </div>
                        <div className={styles.viewContent}>
                            <h4 style={{ fontSize: 18, marginBottom: 4 }}>{viewPlant.name}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 16 }}>📍 {viewPlant.location}</p>
                            <div className={styles.viewGrid}>
                                <div className={styles.viewItem}><span>Trạng thái</span><span style={{ color: statusColorMap[viewPlant.status], fontWeight: 600 }}>{statusMap[viewPlant.status]}</span></div>
                                <div className={styles.viewItem}><span>Công suất</span><span>{viewPlant.capacity.toLocaleString('vi-VN')} m³/ngày</span></div>
                                <div className={styles.viewItem}><span>Sản lượng hiện tại</span><span>{viewPlant.currentOutput.toLocaleString('vi-VN')} m³/ngày</span></div>
                                <div className={styles.viewItem}><span>Hiệu suất</span><span>{viewPlant.capacity > 0 ? ((viewPlant.currentOutput / viewPlant.capacity) * 100).toFixed(1) : 0}%</span></div>
                                <div className={styles.viewItem}><span>Quản lý</span><span>{viewPlant.manager}</span></div>
                                <div className={styles.viewItem}><span>Điện thoại</span><span>{viewPlant.phone}</span></div>
                                <div className={styles.viewItem}><span>Chi phí VH</span><span>{viewPlant.operatingCost.toLocaleString('vi-VN')} VNĐ/tháng</span></div>
                                <div className={styles.viewItem}><span>Doanh thu</span><span style={{ color: '#22c55e' }}>{viewPlant.revenue.toLocaleString('vi-VN')} VNĐ/tháng</span></div>
                                <div className={styles.viewItem}><span>Lợi nhuận</span><span style={{ color: viewPlant.revenue - viewPlant.operatingCost >= 0 ? '#22c55e' : '#ef4444' }}>{(viewPlant.revenue - viewPlant.operatingCost).toLocaleString('vi-VN')} VNĐ/tháng</span></div>
                                <div className={styles.viewItem}><span>Nhân sự</span><span>{viewPlant.employeeCount} người</span></div>
                                <div className={styles.viewItem}><span>Chất lượng nước</span><span>{viewPlant.waterQualityScore}/100</span></div>
                                <div className={styles.viewItem}><span>Năm thành lập</span><span>{viewPlant.establishedYear}</span></div>
                                <div className={styles.viewItem}><span>Bảo trì gần nhất</span><span>{viewPlant.lastMaintenance}</span></div>
                            </div>
                            {viewPlant.description && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>{viewPlant.description}</p>}
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className={styles.overlay} onClick={() => setModalOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{editingPlant ? 'Chỉnh sửa nhà máy' : 'Thêm nhà máy mới'}</h3>
                            <button className={styles.closeModal} onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                                    <label>Tên nhà máy *</label>
                                    <input value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="VD: Nhà máy nước Cầu Đỏ" />
                                </div>
                                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                                    <label>Địa chỉ</label>
                                    <input value={form.location} onChange={e => updateField('location', e.target.value)} placeholder="Địa chỉ nhà máy" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Công suất (m³/ngày)</label>
                                    <input type="number" value={form.capacity} onChange={e => updateField('capacity', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Sản lượng hiện tại (m³/ngày)</label>
                                    <input type="number" value={form.currentOutput} onChange={e => updateField('currentOutput', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Trạng thái</label>
                                    <select value={form.status} onChange={e => updateField('status', e.target.value)}>
                                        <option value="active">Hoạt động</option>
                                        <option value="maintenance">Bảo trì</option>
                                        <option value="inactive">Ngừng hoạt động</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Quản lý</label>
                                    <input value={form.manager} onChange={e => updateField('manager', e.target.value)} placeholder="Họ tên quản lý" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Điện thoại</label>
                                    <input value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="0236 xxxx xxx" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Số nhân viên</label>
                                    <input type="number" value={form.employeeCount} onChange={e => updateField('employeeCount', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Chi phí VH (VNĐ/tháng)</label>
                                    <input type="number" value={form.operatingCost} onChange={e => updateField('operatingCost', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Doanh thu (VNĐ/tháng)</label>
                                    <input type="number" value={form.revenue} onChange={e => updateField('revenue', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Điểm chất lượng (0-100)</label>
                                    <input type="number" min={0} max={100} value={form.waterQualityScore} onChange={e => updateField('waterQualityScore', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Năm thành lập</label>
                                    <input type="number" value={form.establishedYear} onChange={e => updateField('establishedYear', +e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Bảo trì gần nhất</label>
                                    <input value={form.lastMaintenance} onChange={e => updateField('lastMaintenance', e.target.value)} placeholder="DD/MM/YYYY" />
                                </div>
                                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                                    <label>Mô tả</label>
                                    <textarea rows={3} value={form.description} onChange={e => updateField('description', e.target.value)} placeholder="Mô tả về nhà máy..." />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setModalOpen(false)}>Huỷ</button>
                            <button className={styles.saveBtn} onClick={handleSave} disabled={saving || !form.name}>
                                {saving ? 'Đang lưu...' : (editingPlant ? 'Cập nhật' : 'Thêm mới')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className={styles.overlay} onClick={() => setDeleteConfirm(null)}>
                    <div className={styles.confirmDialog} onClick={e => e.stopPropagation()}>
                        <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 12 }}>⚠️</div>
                        <h3 style={{ textAlign: 'center', marginBottom: 8 }}>Xác nhận xoá</h3>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>
                            Bạn có chắc muốn xoá nhà máy <strong>{plants.find(p => p.id === deleteConfirm)?.name}</strong>? Hành động này không thể hoàn tác.
                        </p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(null)}>Huỷ</button>
                            <button className={styles.deleteConfirmBtn} onClick={() => handleDelete(deleteConfirm)}>Xoá nhà máy</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
