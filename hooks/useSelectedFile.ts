import { useCallback, useState } from 'react';
/**
 * `useSelectedFile`은 선택하거나, 드래그해서 업로드 한 파일을 selectedFile로 받아옵니다.
 * @param extensions 받아온 파일의 확장자를 검사합니다. 배열의 형태입니다.
 * @returns 다양한 형태로 파일이 주어지기 때문에, 핸들링 함수를 전부 제공합니다.
 * @setSelectedFile 초기화를 위해 제공됩니다.
 */
export const useSelectedFile = (extensions: Array<string>) => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const onInputSelectedFile = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    handleSelectedFile(ev.target.files?.[0]!);
  }, []);

  const onDropSelectedFile = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    handleSelectedFile(ev.dataTransfer.files?.[0]!);
  }, []);

  const onDragOver = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }, []);

  const handleSelectedFile = (file: File) => {
    const reader = new FileReader();

    const fileExtension = file.name.split('.').pop()?.toUpperCase();
    if (!fileExtension || extensions.indexOf(fileExtension) === -1) {
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    onInputSelectedFile,
    onDropSelectedFile,
    onDragOver,
  };
};
