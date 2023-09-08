import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSelectedFile } from '@/hooks/useSelectedFile';
import { Upload } from '@/components/Common/Upload';

import { firebaseStorage, firestore } from '@/lib/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function WriteFeedModal() {
  const {
    selectedFile,
    setSelectedFile,
    onInputSelectedFile,
    onDropSelectedFile,
    onDragOver,
  } = useSelectedFile(['PNG', 'JPG']);

  return (
    <Upload.div
      className=''
      handleDropFile={onDropSelectedFile}
      handleDragOver={onDragOver}
      handleClose={}
    >
      <div></div>
    </Upload.div>
  );
}
