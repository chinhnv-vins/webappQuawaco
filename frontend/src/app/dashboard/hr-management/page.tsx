'use client';
import React, { useState, useEffect } from 'react';
import styles from './hr-management.module.css';
import { api } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';

export default function HrManagementPage() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add' | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const statusMap: Record<string, string> = { active: 'Đang làm việc', onleave: 'Nghỉ phép', resigned: 'Đã nghỉ việc' };
    const statusColorMap: Record<string, string> = { active: '#22c55e', onleave: '#facc15', resigned: '#ef4444' };

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await api.getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const formatVND = (n: number) => n.toLocaleString('vi-VN');

    const handleOpenModal = (mode: 'view' | 'edit' | 'add', emp: any = null) => {
        setModalMode(mode);
        if (mode === 'add') {
            setFormData({ gender: 'male', status: 'active', salary: 10000000 });
            setSelectedEmployee(null);
        } else {
            setFormData({ ...emp });
            setSelectedEmployee(emp);
        }
    };

    const handleCloseModal = () => {
        setModalMode(null);
        setSelectedEmployee(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await api.createEmployee(formData);
            } else if (modalMode === 'edit' && selectedEmployee) {
                await api.updateEmployee(selectedEmployee.id, formData);
            }
            await fetchEmployees();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save employee', error);
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await api.deleteEmployee(deletingId);
            await fetchEmployees();
            setDeletingId(null);
        } catch (error) {
            console.error('Failed to delete employee', error);
        }
    };

    if (loading && employees.length === 0) {
        return <DashboardLayout><div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-muted)' }}>Đang tải dữ liệu...</div></DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px', letterSpacing: 1 }}>QUẢN LÝ NHÂN SỰ</h1>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Quản lý thông tin hồ sơ nhân viên toàn công ty</div>
                    </div>
                    <button className={styles.addBtn} onClick={() => handleOpenModal('add')}>
                        <span>＋</span> Thêm nhân viên
                    </button>
                </div>

                <div className={styles.kpiRow}>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>👥</div>
                        <div>
                            <div className={styles.kpiValue}>{employees.length}</div>
                            <div className={styles.kpiLabel}>Tổng nhân sự</div>
                        </div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>✅</div>
                        <div>
                            <div className={styles.kpiValue}>{employees.filter(e => e.status === 'active').length}</div>
                            <div className={styles.kpiLabel}>Đang làm việc</div>
                        </div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>🚪</div>
                        <div>
                            <div className={styles.kpiValue}>{employees.filter(e => e.status === 'resigned').length}</div>
                            <div className={styles.kpiLabel}>Đã nghỉ việc</div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Phòng ban</th>
                                <th>Chức vụ</th>
                                <th>Trạng thái</th>
                                <th style={{ textAlign: 'right' }}>Lương (VNĐ)</th>
                                <th style={{ textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{emp.email} • {emp.phone}</div>
                                    </td>
                                    <td>{emp.department}</td>
                                    <td>{emp.position}</td>
                                    <td>
                                        <span className={styles.statusBadge} style={{ color: statusColorMap[emp.status], borderColor: statusColorMap[emp.status], background: `${statusColorMap[emp.status]}15` }}>
                                            {statusMap[emp.status]}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatVND(emp.salary)}</td>
                                    <td>
                                        <div className={styles.tableActions}>
                                            <button className={styles.iconBtn} onClick={() => handleOpenModal('view', emp)} title="Xem chi tiết">👁️</button>
                                            <button className={styles.iconBtn} onClick={() => handleOpenModal('edit', emp)} title="Sửa">✏️</button>
                                            <button className={styles.iconBtnDelete} onClick={() => setDeletingId(emp.id)} title="Xoá">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Setup */}
                {(modalMode || deletingId) && (
                    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); setDeletingId(null); }}>
                        {deletingId ? (
                            <div className={styles.confirmDialog}>
                                <h3 style={{ margin: '0 0 16px', color: 'var(--text-primary)' }}>Xác nhận xoá hồ sơ</h3>
                                <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: 13 }}>Bạn có chắc chắn muốn xoá nhân viên này? Hành động này không thể hoàn tác.</p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                    <button className={styles.cancelBtn} onClick={() => setDeletingId(null)}>Huỷ</button>
                                    <button className={styles.deleteConfirmBtn} onClick={handleDelete}>Xoá nhân viên</button>
                                </div>
                            </div>
                        ) : modalMode === 'view' ? (
                            <div className={styles.modal}>
                                <div className={styles.modalHeader}>
                                    <h3>Hồ sơ nhân viên: {selectedEmployee?.name}</h3>
                                    <button className={styles.closeModal} onClick={handleCloseModal}>✕</button>
                                </div>
                                <div className={styles.viewContent}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff' }}>
                                            {selectedEmployee?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <h2 style={{ margin: 0, fontSize: 20, color: 'var(--text-primary)' }}>{selectedEmployee?.name}</h2>
                                            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{selectedEmployee?.position} • {selectedEmployee?.department}</div>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <span className={styles.statusBadge} style={{ color: statusColorMap[selectedEmployee?.status || 'active'], borderColor: statusColorMap[selectedEmployee?.status || 'active'], background: `${statusColorMap[selectedEmployee?.status || 'active']}15` }}>
                                                {statusMap[selectedEmployee?.status || 'active']}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.viewGrid}>
                                        <div className={styles.viewItem}><span>Mã NV:</span> <span>{selectedEmployee?.id.substring(0, 8)}</span></div>
                                        <div className={styles.viewItem}><span>Giới tính:</span> <span>{selectedEmployee?.gender === 'male' ? 'Nam' : 'Nữ'}</span></div>
                                        <div className={styles.viewItem}><span>Điện thoại:</span> <span>{selectedEmployee?.phone}</span></div>
                                        <div className={styles.viewItem}><span>Email:</span> <span>{selectedEmployee?.email}</span></div>
                                        <div className={styles.viewItem}><span>Ngày sinh:</span> <span>{selectedEmployee?.birthDate}</span></div>
                                        <div className={styles.viewItem}><span>Ngày vào làm:</span> <span>{selectedEmployee?.joinDate}</span></div>
                                        <div className={styles.viewItem} style={{ gridColumn: 'span 2' }}><span>Địa chỉ:</span> <span>{selectedEmployee?.address}</span></div>
                                        <div className={styles.viewItem} style={{ gridColumn: 'span 2' }}><span>Đơn vị trực thuộc:</span> <span>{selectedEmployee?.plant}</span></div>
                                        <div className={styles.viewItem}><span>Lương cơ bản:</span> <span>{formatVND(selectedEmployee?.salary || 0)} VNĐ/tháng</span></div>
                                        <div className={styles.viewItem}><span>Điểm đánh giá:</span> <span>{selectedEmployee?.qualityScore}/100</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.modal}>
                                <form onSubmit={handleSave}>
                                    <div className={styles.modalHeader}>
                                        <h3>{modalMode === 'add' ? 'Thêm nhân viên mới' : 'Sửa hồ sơ nhân viên'}</h3>
                                        <button type="button" className={styles.closeModal} onClick={handleCloseModal}>✕</button>
                                    </div>
                                    <div className={styles.modalBody}>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                                                <label>Họ và tên</label>
                                                <input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="VD: Nguyễn Văn A" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Email</label>
                                                <input type="email" required value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@gmail.com" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Số điện thoại</label>
                                                <input required value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="090..." />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Chức vụ</label>
                                                <input required value={formData.position || ''} onChange={e => setFormData({ ...formData, position: e.target.value })} placeholder="VD: Chuyên viên" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Phòng ban</label>
                                                <input required value={formData.department || ''} onChange={e => setFormData({ ...formData, department: e.target.value })} placeholder="VD: Phòng Hành chính" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Giới tính</label>
                                                <select value={formData.gender || 'male'} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                                    <option value="male">Nam</option>
                                                    <option value="female">Nữ</option>
                                                </select>
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Trạng thái</label>
                                                <select value={formData.status || 'active'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                                    <option value="active">Đang làm việc</option>
                                                    <option value="onleave">Nghỉ phép</option>
                                                    <option value="resigned">Đã nghỉ việc</option>
                                                </select>
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Đơn vị (Nhà máy/Trạm)</label>
                                                <input required value={formData.plant || ''} onChange={e => setFormData({ ...formData, plant: e.target.value })} placeholder="VD: Nhà máy Cầu Đỏ" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Mức lương (VNĐ/tháng)</label>
                                                <input type="number" required min="0" value={formData.salary || ''} onChange={e => setFormData({ ...formData, salary: Number(e.target.value) })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.modalFooter}>
                                        <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>Huỷ</button>
                                        <button type="submit" className={styles.saveBtn}>Lưu thông tin</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
