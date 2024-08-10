import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValue';

  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with the initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(initialValue);
  });

  test('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem(key, JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe('storedValue');
  });

  test('should update localStorage when state is updated', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]('newValue');
    });

    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });

  test('should reflect updated state after localStorage change', () => {
    localStorage.setItem(key, JSON.stringify('updatedValue'));

    const { result: updatedResult } = renderHook(() => useLocalStorage(key, initialValue));

    expect(updatedResult.current[0]).toBe('updatedValue');
  });
});
