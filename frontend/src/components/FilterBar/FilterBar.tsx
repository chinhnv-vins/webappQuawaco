'use client';
import React from 'react';

interface FilterBarProps {
    filters?: Record<string, string[]>;
    values?: Record<string, string>;
    onChange?: (key: string, value: string) => void;
}

const filterLabels: Record<string, string> = {
    nhaMay: 'Nhà máy',
    khuVuc: 'Khu vực',
    soLieu: 'Số liệu thời gian thực',
    khau: 'Khâu',
    boPhan: 'Bộ phận',
    nhanVienSo: 'Nhân viên số (AI Agent)',
};

export default function FilterBar({ filters, values = {}, onChange }: FilterBarProps) {
    if (!filters) return null;
    return (
        <div className="filter-bar">
            {Object.entries(filters).map(([key, options]) => (
                <div className="filter-group" key={key}>
                    <span className="filter-label">{filterLabels[key] || key.toUpperCase()}</span>
                    <select
                        value={values[key] || options[0]}
                        onChange={e => onChange?.(key, e.target.value)}
                    >
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            ))}
            <div className="filter-group">
                <span className="filter-label">Tìm kiếm</span>
                <input className="search-input" placeholder="Tìm kiếm ..." />
            </div>
        </div>
    );
}
