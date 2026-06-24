import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { customerService } from '../services';
import { showError } from '../errors/showError';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('CRIACAO');

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const buildFilters = useCallback(() => {
    const filters = {
      ordenacao: sortBy,
    };

    const query = search.trim();
    if (!query) {
      return filters;
    }

    const onlyNumbers = query.replace(/\D/g, '');
    const isPhoneSearch = onlyNumbers.length === query.replace(/[\s()-]/g, '').length;

    if (isPhoneSearch) {
      filters.telefone = onlyNumbers;
    } else {
      filters.nome = query;
    }

    return filters;
  }, [search, sortBy]);

  const fetchCustomers = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await customerService.getAll({
        params: buildFilters(),
      });

      const sortedData = [...data].sort((a, b) => {
        if (sortBy === 'NOME') {
          return a.nome.localeCompare(b.nome, 'pt-BR');
        }
        return (b.dataCriacao?.seconds || 0) - (a.dataCriacao?.seconds || 0);
      });

      setCustomers(sortedData);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [buildFilters, sortBy]);

  useFocusEffect(
    useCallback(() => {
      fetchCustomers(false);
    }, [fetchCustomers])
  );

  useEffect(() => {
    fetchCustomers(true);
  }, [search, sortBy]);

  const refresh = async () => {
    setRefreshing(true);
    await fetchCustomers(false);
  };

  return {
    customers,
    loading,
    refreshing,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    refresh,
    fetchCustomers,
  };
}