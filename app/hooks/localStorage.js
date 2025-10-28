// hooks/useLocalStorage.js
'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage — JavaScript version
 * Works exactly like useState, but saves to localStorage
 * Survives refresh + syncs across tabs
 */
function useLocalStorage(key, initialValue) {
  // Initialize state — only read localStorage on client
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`[useLocalStorage] Read error for key "${key}":`, error);
      return initialValue;
    }
  });

  // Memoized setter
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') return;

      try {
        // Support updater function: setValue(prev => prev + 1)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`[useLocalStorage] Write error for key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Sync across tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Ignore corrupted data
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;