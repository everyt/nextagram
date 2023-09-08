import { useState, useCallback } from 'react';

export function useBoolean() {
  const [boolean, setBoolean] = useState(false);

  const handleBoolean = useCallback(() => {
    setBoolean((prev) => !prev);
  }, []);

  return { boolean, handleBoolean };
}
