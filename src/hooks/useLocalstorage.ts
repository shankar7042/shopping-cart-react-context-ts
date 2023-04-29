import { useState, useEffect } from "react";

export const useLocalstorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [data, setData] = useState<T>(() => {
    let jsonData = localStorage.getItem(key);
    if (jsonData !== null) return JSON.parse(jsonData);
    if (typeof initialValue == "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as [T, typeof setData];
};
