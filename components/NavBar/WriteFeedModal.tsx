import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { useEffect, useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import Modal from '@/components/Common/Modal';
import Textarea from '@/components/Common/Textarea';
import Upload from '@/components/Common/Upload';
import { useSelectedFile } from '@/hooks/useSelectedFile';
import { firebaseStorage, firestore } from '@/lib/firebase';
import { allowScroll, preventScroll } from '@/lib/utils/modal';

type WFModalProps = {
  boolean: boolean;
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WriteFeedModal({ boolean, setBoolean }: WFModalProps) {
  const [prevScrollY, setPrevScrollY] = useState<number | null>(null);

  const { data: session } = useSession();

  const [syncStatus, setSyncStatus] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isShowSyncStatus, setIsShowSyncStatus] = useState<boolean>(false);

  const syncStatusDescript: { [key: number]: string } = useMemo(
    () => ({
      0: '작성해주신 피드를 열심히 업로드 중이에요!',
      1: '업로드에 실패했어요.',
      2: '이미지가 업로드되지 않았어요.',
      3: '피드를 작성했어요.',
    }),
    [],
  );

  const ALLOWED_IMAGEEXTENSION = useMemo(() => ['PNG', 'JPG', 'JPEG', 'WEBP', 'AVIF', 'GIF'], []);

  const [feedCaption, setFeedCaption] = useState<string>('');
  const {
    selectedFile,
    handleInputSelectedFile,
    handleDropSelectedFile,
    handleDragOver,
    handleResetSelectedFile,
  } = useSelectedFile(ALLOWED_IMAGEEXTENSION);

  useEffect(() => {
    if (boolean) {
      // 모달이 열릴 때 스크롤을 방지하고 현재 위치를 저장
      setPrevScrollY(preventScroll());
    } else if (prevScrollY !== null) {
      // 모달이 닫힐 때 스크롤을 복원
      allowScroll(prevScrollY);
      setPrevScrollY(null);
    }
  }, [boolean, prevScrollY]);

  const setCloseModal = () => {
    setBoolean(false);
  };

  const handleClose = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    setCloseModal();
  };

  const uploadFeed = async () => {
    setIsSyncing(true);

    try {
      const collectionRef = collection(firestore, 'feeds');
      const feedData = {
        userUid: session?.user.uid,
        userEmail: session?.user.email,
        userName: session?.user.name,
        userImg: session?.user.image,
        feedCaption,
        timestamp: serverTimestamp(),
      };
      const feedRef = await addDoc(collectionRef, feedData);

      if (selectedFile) {
        const imageRef = ref(firebaseStorage, `posts/${feedRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
          const imageDownloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(firestore, 'feeds', feedRef.id!), {
            feedImg: imageDownloadUrl,
          });
        });
        setSyncStatus(3);
      } else {
        setSyncStatus(2);
      }
    } catch (error) {
      setSyncStatus(1);
    }

    handleResetSelectedFile();
    setFeedCaption('');
    setIsSyncing(false);
    if (syncStatus !== 0) setIsShowSyncStatus(true); // 모달창을 끌 때 초기화해줘야 함
    if (!isShowSyncStatus) setCloseModal();
  };

  const handleChange = ({ value }: { value: string }) => {
    setFeedCaption(value);
  };

  const syncStatusMessage = syncStatusDescript[syncStatus];

  return (
    <Modal
      className='h-[530px] w-[700px] rounded-2xl bg-white'
      boolean={boolean}
      handleClose={handleClose}
    >
      <Upload.div
        className='h-[530px] w-[700px]'
        handleDropFile={handleDropSelectedFile}
        handleDragOver={handleDragOver}
      >
        <header className='flex h-[45px] items-center justify-center border-b-2'>
          <b className='font-NSN200 mt-1'>새 게시물 만들기</b>
        </header>
        <section className='flex h-[600px] flex-col items-center justify-center'>
          {isSyncing || isShowSyncStatus ? (
            <article className='text-blue-400'>{syncStatusMessage}</article>
          ) : (
            <article className='flex flex-row'>
              <Textarea
                className='mb-6 h-[150px] w-[300px] cursor-pointer resize-none rounded-2xl border-2 p-4 text-center'
                onChange={handleChange}
                placeholder='감정을 공유하세요'
              />
              <div className='ml-8 flex flex-col'>
                <p className='mb-4'>사진을 여기에 끌어다 놓으세요</p>
                {selectedFile ? (
                  <button
                    onClick={uploadFeed}
                    className='rounded-lg bg-blue-500 p-2 px-4 text-sm text-white'
                  >
                    공유하기
                  </button>
                ) : (
                  <Upload.input
                    className='cursor-pointer rounded-lg bg-blue-500 p-2 px-4 text-sm text-white'
                    handleInputFile={handleInputSelectedFile}
                  >
                    컴퓨터에서 선택
                  </Upload.input>
                )}
              </div>
            </article>
          )}
        </section>
      </Upload.div>
    </Modal>
  );
}
