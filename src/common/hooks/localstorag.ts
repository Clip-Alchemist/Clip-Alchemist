"use client";

import React, { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  });
  const setLocalStorage = (newValue: any) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [value, setLocalStorage];
}
