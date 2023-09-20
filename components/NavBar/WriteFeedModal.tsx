import { Icon } from '@iconify-icon/react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { useCallback, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import Modal from '@/components/Common/Modal';
import Upload from '@/components/Common/Upload';
import { useSelectedFile } from '@/hooks/useSelectedFile';
import { firebaseStorage, firestore } from '@/lib/firebase';
import { allowScroll, preventScroll } from '@/lib/utils/modal';

type WFModalProps = {
  boolean: boolean;
  handleCloseModal: () => void;
};

const syncStatusDescript: { [key: number]: string } = {
  0: '작성해주신 피드를 열심히 업로드 중이에요!',
  1: '업로드에 실패했어요.',
  2: '이미지가 업로드되지 않았어요.',
  3: '피드를 작성했어요.',
};

export default function WriteFeedModal({ boolean, handleCloseModal }: WFModalProps) {
  const { data: session } = useSession();

  const [syncStatus, setSyncStatus] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isShowSyncStatus, setIsShowSyncStatus] = useState<boolean>(false);

  const [feedCaption, setFeedCaption] = useState<string>('');

  const ALLOWED_IMAGEEXTENSION = ['PNG', 'JPG', 'JPEG', 'WEBP', 'AVIF', 'GIF'];
  const {
    selectedFile,
    handleInputSelectedFile,
    handleDropSelectedFile,
    handleDragOver,
    handleResetSelectedFile,
  } = useSelectedFile(ALLOWED_IMAGEEXTENSION);

  const [prevScrollY, setPrevScrollY] = useState<number | null>(null);

  useEffect(() => {
    if (boolean) {
      setPrevScrollY(preventScroll());
    } else if (prevScrollY !== null) {
      allowScroll(prevScrollY);
      setPrevScrollY(null);
    }
  }, [boolean, prevScrollY]);

  const handleUploadFeed = useCallback(async () => {
    setIsSyncing(true);

    try {
      console.table(session);
      const feedRef = await addDoc(collection(firestore, 'feeds'), {
        userId: session?.user.id,
        userEmail: session?.user.email,
        userName: session?.user.name,
        userImg: session?.user.image,
        feedCaption,
        timestamp: serverTimestamp(),
      });
      if (selectedFile) {
        const imageRef = ref(firebaseStorage, `feeds/${feedRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const imageDownloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(firestore, 'feeds', feedRef.id), {
          feedImg: imageDownloadUrl,
        });
        setSyncStatus(3);
      } else {
        console.log('No Image');
        setSyncStatus(2);
      }
    } catch (error) {
      console.log(error);
      setSyncStatus(1);
    }

    handleResetSelectedFile();
    setFeedCaption('');
    setIsSyncing(false);
    if (syncStatus !== 0) setIsShowSyncStatus(true);
    if (!isShowSyncStatus) handleCloseModal();
  }, [session, feedCaption, selectedFile]);

  const handleCloseModalCallback = () => {
    handleCloseModal();
    setIsShowSyncStatus(false);
    handleResetSelectedFile();
    setFeedCaption('');
  };

  const syncStatusMessage = syncStatusDescript[syncStatus];

  return (
    <Modal
      className='h-[530px] w-[700px] rounded-2xl bg-white'
      boolean={boolean}
      handleClose={handleCloseModalCallback}
    >
      <Upload.div
        className='h-[530px] w-[700px]'
        handleDropFile={handleDropSelectedFile}
        handleDragOver={handleDragOver}
      >
        <header className='flex h-[45px] items-center justify-center border-b-2'>
          <b className='font-NSN200 mt-1'>새 게시물 만들기</b>
        </header>
        <section className='flex h-[485px] flex-col items-center justify-center'>
          {isSyncing || isShowSyncStatus ? (
            <article className='text-blue-400'>{syncStatusMessage}</article>
          ) : (
            <>
              {selectedFile && (
                <div className='absolute h-[485px] w-[700px]'>
                  <img
                    className='z-0 h-full w-full overflow-hidden object-cover'
                    src={selectedFile}
                    alt='selectedFile'
                  />
                </div>
              )}
              <div className='z-10 flex flex-col items-center justify-center'>
                <Icon icon='iconoir:post' style={{ fontSize: '150px' }} className='mb-16 mt-8' />
                <article className='flex flex-row'>
                  <textarea
                    className='h-[150px] w-[300px] cursor-pointer resize-none rounded-2xl border-2 p-4 text-center outline-none'
                    onChange={(ev) => setFeedCaption(ev.target.value)}
                    placeholder='감정을 공유하세요'
                  />
                  <div className='ml-16 mt-8 flex flex-col'>
                    <p className={`mb-4 ${selectedFile && 'text-transparent'}`}>
                      사진을 여기에 끌어다 놓으세요
                    </p>
                    {selectedFile ? (
                      <button
                        onClick={handleUploadFeed}
                        className='rounded-lg bg-blue-500 p-2 px-4 text-start text-sm text-white'
                      >
                        공유하기
                      </button>
                    ) : (
                      <Upload.input
                        className='flex cursor-pointer content-center rounded-lg bg-blue-500 p-2 px-4 text-sm text-white'
                        handleInputFile={handleInputSelectedFile}
                      >
                        <Icon icon='system-uicons:file-upload' style={{ fontSize: '24px' }} />
                        <p className='ml-3'>컴퓨터에서 선택</p>
                      </Upload.input>
                    )}
                  </div>
                </article>
              </div>
            </>
          )}
        </section>
      </Upload.div>
    </Modal>
  );
}
