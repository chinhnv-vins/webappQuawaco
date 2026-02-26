'use client';
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useDashboardData(page: string) {
  const [data, setData] = useState<any>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (f: Record<string, string>) => {
    setLoading(true);
    try {
      const result = await api.getDashboard(page, f);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  const onFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return { data, loading, filters, onFilterChange };
}
