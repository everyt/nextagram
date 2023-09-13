import { useCallback, useState } from 'react';

export function useModal(): [modalStyle: string, toggleModal: () => void] {
  const [modalStyle, setModalStyle] = useState<string>('hidden');
  const [boolean, setBoolean] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setModalStyle((prevStyle) => (prevStyle === 'hidden' ? 'block' : 'hidden'));
    setBoolean((prev) => !prev);
  }, []);

  return [modalStyle, toggleModal];
}
