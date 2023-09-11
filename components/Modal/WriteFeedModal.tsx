import { upload } from 'Components/Common/Upload';
import { useSelectedFile } from 'Hooks/useSelectedFile';
import { allowScroll, preventScroll } from 'Lib/utils/modal';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
// import { firebaseStorage, firestore } from '@/lib/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { useCallback, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

type ModalType = {
  handleClose: () => void;
};

export default function WriteFeedModal({ handleClose }: ModalType) {
  const ALLOWED_IMAGEEXTENSION = ['PNG', 'JPG', 'JPEG', 'WEBP', 'AVIF', 'GIF'];
  const {
    selectedFile,
    handleInputSelectedFile,
    handleDropSelectedFile,
    handleDragOver,
    handleResetSelectedFile,
  } = useSelectedFile(ALLOWED_IMAGEEXTENSION);

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <upload.div
      className='w-[400px] h-[600px]'
      handleDropFile={handleDropSelectedFile}
      handleDragOver={handleDragOver}
      handleClose={handleClose}
    >
      <upload.input
        className='rounded-3xl'
        handleInputFile={handleInputSelectedFile}
      >
        공유하기
      </upload.input>
    </upload.div>
  );
}
