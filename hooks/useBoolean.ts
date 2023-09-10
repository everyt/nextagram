import { useCallback, useState } from 'react';

export default function useBoolean() {
  const [boolean, setBoolean] = useState(false);

  const handleBoolean = useCallback(() => {
    setBoolean((prev) => !prev);
  }, []);

  return { boolean, handleBoolean };
}
