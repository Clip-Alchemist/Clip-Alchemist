import React, { useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = useCallback(
    (setStateAction: T | ((prevState: T) => T)) => {
      const newValue =
        setStateAction instanceof Function
          ? setStateAction(storedValue)
          : setStateAction;

      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(() => newValue);
    },
    [key, storedValue],
  );
  return [storedValue, setValue];
}
