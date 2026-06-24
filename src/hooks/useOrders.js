import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services';
import { showError } from '../errors/showError';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('TITULO');

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const buildFilters = useCallback(() => {
    const filters = {
      ordenacao: sortBy,
    };

    if (statusFilter) {
      filters.statusPedido = statusFilter;
    }

    if (search.trim()) {
      filters.titulo = search.trim();
    }

    return filters;
  }, [search, statusFilter, sortBy]);

  const fetchOrders = useCallback(async (showFeedback = false) => {
    try {
      const data = await orderService.getAll({
        params: buildFilters(),
      });

      setOrders(data || []);
    } catch (error) {
      if (showFeedback) {
        showError(error);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [buildFilters]);

  const refresh = async () => {
    setRefreshing(true);
    await fetchOrders(true);
  };

  useEffect(() => {
    fetchOrders(true);
  }, [fetchOrders]);

  useEffect(() => {
    if (loading) return;
    fetchOrders(false);
  }, [search, statusFilter, sortBy]);

  return {
    orders,
    loading,
    refreshing,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    refresh,
    fetchOrders,
  };
}