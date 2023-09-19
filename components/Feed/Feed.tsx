'use client';

import { Icon } from '@iconify-icon/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/ko';

import { memo, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { useSession } from 'next-auth/react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import { firestore } from '@/lib/firebase';
import { generateUUID } from '@/lib/utils/uuid';

type Props = {
  userId: string;
  userEmail: string;
  userName: string;
  userImg: string;
  feedId: string;
  feedImg: string;
  feedCaption: string;
  handleDeleteFeed: (feedId: string) => void;
};

function Feed({
  userId,
  userEmail,
  userName,
  userImg,
  feedId,
  feedImg,
  feedCaption,
  handleDeleteFeed,
}: Props) {
  // userEmail, userName, userImg를 useMemo를 사용하여 메모이제이션

  // 사용자 세션 정보 가져오기
  const { data: session } = useSession();

  // 댓글 및 좋아요 관련 상태
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  // 댓글 및 좋아요 데이터 가져오기
  useEffect(() => {
    const fetchSubCols = async () => {
      try {
        const [likesQuerySnapshot, commentsQuerySnapshot] = await Promise.all([
          getDocs(query(collection(firestore, 'feeds', feedId, 'likes'))),
          getDocs(query(collection(firestore, 'feeds', feedId, 'comments'))),
        ]);

        setLikes(likesQuerySnapshot.docs);
        setLikesCount(likes.length);
        setComments(commentsQuerySnapshot.docs);
        setCommentsCount(comments.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubCols();
  }, [feedId]);

  // 댓글 업로드 처리
  const handleUploadComment = async (e: any) => {
    e.preventDefault();

    if (comment) {
      setLoading(true);
      try {
        const commentId = generateUUID();
        await addDoc(collection(firestore, 'feeds', feedId, 'comments', commentId), {
          comment,
          userId: session?.user?.id,
          userName: session?.user?.name,
          userImg: session?.user?.image,
          timestamp: serverTimestamp(),
        });

        setComments((prev) => [
          ...prev,
          {
            id: commentId,
            data: () => ({
              comment,
              userId: session?.user?.id,
              userName: session?.user?.name,
              userImg: session?.user?.image,
              timestamp: serverTimestamp(),
            }),
          },
        ]);
        setCommentsCount((count) => count + 1);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setComment('');
      setOpenComments(true);
    } else {
      console.log('댓글이 비어 있습니다.');
    }
  };

  // 댓글 창 열기/닫기 처리
  const handleOpenComment = () => {
    setOpenComments((prev) => !prev);
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'feeds', feedId, 'comments', id));
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setCommentsCount((count) => count - 1);
      comments.length === 0 && setOpenComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 처리
  const handleClickLike = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user?.id));
        setLikes((prev) => prev.filter((comment) => comment.data().userId !== userId));
        setLikesCount((count) => count - 1);
      } else {
        const userName = session?.user?.name;
        await setDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user?.id), {
          userName,
        });
        setLikes((prev) => [...prev, { id: session?.user?.id, data: () => ({ userName }) }]);
        setLikesCount((count) => count + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 상태 업데이트
  useEffect(() => setHasLikes(likes.some((like) => like.id === session?.user?.id)), [likes]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='mt-1
                 h-auto w-[450px]
                 border-b-[1px] border-stone-300 pb-4 dark:border-stone-500'
    >
      {/* 사용자 프로필 및 정보 */}
      <article>
        <Miniprofile
          email={userEmail}
          name={userName}
          img={userImg}
          type='onFeed'
          userId={userId}
          feedId={feedId}
          handleDeleteFeed={handleDeleteFeed}
        />
      </article>

      {/* 피드 이미지 */}
      <article>
        <Image
          className='mt-[0.8rem] w-[inherit]'
          src={feedImg}
          alt='feed'
          width={450}
          height={450}
        />
      </article>

      {/* 좋아요, 공유, 댓글 액션 */}
      <article className='flex content-center pt-[0.8rem]'>
        <div className='cursor-pointer text-red-500' onClick={handleClickLike}>
          {hasLikes ? (
            <Icon icon='ion:heart' style={{ fontSize: '26px' }} />
          ) : (
            <Icon icon='ion:heart-outline' style={{ fontSize: '26px' }} />
          )}
        </div>
        <Icon
          className='ml-4 cursor-pointer'
          icon='ion:paper-plane-outline'
          style={{ fontSize: '26px' }}
        />
        <Icon className='ml-5 cursor-pointer' icon='iconoir:message' style={{ fontSize: '26px' }} />
      </article>

      {/* 좋아요 및 댓글 개수 */}
      <article className='text-[0.88rem]'>
        <b>좋아요 {likesCount}개</b>
        <div className='my-2 flex content-center'>
          <b className='mr-2 text-[0.9rem]'>{userName}</b>
          <p>{feedCaption}</p>
        </div>
        <div className='flex content-center text-stone-500'>
          <p>댓글 {commentsCount}개 </p>
          <div className='cursor-pointer' onClick={handleOpenComment}>
            &nbsp;{commentsCount > 0 ? (openComments ? '닫기' : '모두 보기') : null}
          </div>
        </div>
        {/* 댓글 */}
        {comments &&
          !openComments &&
          comments.map((comment) => (
            <div key={comment.id} className='mb-2 mt-2 flex items-center'>
              <div className='flex-1 content-center'>
                <b>{comment.data().userName} </b>
                &nbsp;{comment.data().comment}
              </div>
              <p className='pr-1 text-xs'>
                {moment(new Date(comment.data().timestamp?.seconds * 1000)).fromNow()}
              </p>
            </div>
          ))}
        {/* 열린 댓글 */}
        {openComments && (
          <div className='mt-3 w-[450px] bg-stone-50 pb-[1px]'>
            {comments &&
              comments.map((comment) => (
                <div key={comment.id} className='mb-3 flex items-center space-x-2'>
                  <img className='h-7 rounded-full' src={comment.data().userImg} alt={userName} />
                  <p className='flex-1 text-sm'>
                    <b>{comment.data().userName} </b>
                    {comment.data().comment}
                  </p>
                  <p className='pr-1 text-xs'>
                    {moment(new Date(comment.data().timestamp?.seconds * 1000)).fromNow()}
                  </p>
                  {session?.user.id === comment.data().userId && (
                    <Icon
                      className='cursor-pointer'
                      icon='line-md:remove'
                      style={{ fontSize: '16px' }}
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  )}
                </div>
              ))}
          </div>
        )}
        {/* 댓글 입력 폼 */}
        <button className='absolute ml-[27rem] mt-[0.35rem]'>
          {loading ? (
            <Icon icon='line-md:uploading-loop' style={{ fontSize: '16px' }} />
          ) : (
            <Icon
              onClick={handleUploadComment}
              className='cursor-pointer'
              icon='icon-park-outline:write'
              style={{ fontSize: '16px' }}
            />
          )}
        </button>
        <input
          value={comment}
          className='mt-2 h-4 w-[450px] outline-none'
          onChange={(ev) => setComment(ev.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUploadComment(e)}
          placeholder='댓글 달기...'
        />
      </article>
    </motion.section>
  );
}
export default memo(Feed);
