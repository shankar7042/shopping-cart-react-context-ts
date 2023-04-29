import { useState, useEffect } from "react";
import { useLocalstorage } from "./useLocalstorage";

type ReturnTypeData = {
  data: Record<any, any>;
  isError: string;
  isLoading: boolean;
};

export const useFetch = () => {
  const [data, setData] = useLocalstorage("products", []);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("https://dummyjson.com/products");

  console.log(data);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError("");

        const res = await fetch(url);
        const data = await res.json();

        setData(data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setIsError(error.message);
      }
    }
    if (data.length === 0) fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl] as [
    ReturnTypeData,
    typeof setUrl
  ];
};
