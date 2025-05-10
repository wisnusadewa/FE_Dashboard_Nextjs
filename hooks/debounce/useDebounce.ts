import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouceValue;
};

export default useDebounce;
