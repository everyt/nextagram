'use client';

import { Icon } from '@iconify-icon/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/ko';

import { memo, useEffect, useState } from 'react';

import Image from 'next/image';

import { useSession } from 'next-auth/react';

import Miniprofile from '@/components/Miniprofile/Miniprofile';
import { firestore } from '@/lib/firebase';

type Props = {
  userId: string;
  userEmail: string;
  userName: string;
  userImg: string;
  feedId: string;
  feedImg: string;
  feedCaption: string;
  timestamp: any;
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
  timestamp,
  handleDeleteFeed,
}: Props) {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadComment = async (e: any) => {
    e.preventDefault();

    if (comment) {
      setLoading(true);
      try {
        await addDoc(collection(firestore, 'feeds', feedId, 'comments'), {
          comment,
          userId: session?.user.id,
          userName: session?.user.name,
          userImg: session?.user.image,
          timestamp: serverTimestamp(),
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setComment('');
      setOpenComments(true);
    } else {
      console.log('err');
    }
  };

  const handleOpenComment = () => {
    setOpenComments((prev) => !prev);
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'feeds', feedId, 'comments', id));
      comments.length === 0 && setOpenComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'feeds', feedId, 'comments'), orderBy('timestamp', 'desc')),
      (snapshot) => setComments(snapshot.docs),
    );
    return () => {
      unsubscribe();
    };
  }, [firestore, feedId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'feeds', feedId, 'likes'), (snapshot) =>
      setLikes(snapshot.docs),
    );
    return () => {
      unsubscribe();
    };
  }, [firestore, feedId]);

  useEffect(
    () => setHasLikes(likes.findIndex((like) => like.id === session?.user.id) !== -1),
    [likes],
  );

  const handleClickLike = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user.id));
      } else {
        await setDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user.id), {
          userName: session?.user.name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='mt-1
                 h-auto w-[450px]
                 border-b-[1px] border-stone-300 pb-4 dark:border-stone-500'
    >
      <article>
        <Miniprofile
          email={userEmail}
          name={userName}
          img={userImg}
          type='onFeed'
          userId={userId}
          feedId={feedId}
          timestamp={timestamp}
          handleDeleteFeed={handleDeleteFeed}
        />
      </article>

      <article>
        <Image
          className='mt-[0.8rem] w-[450px]'
          src={feedImg}
          alt='feed'
          width={450}
          height={450}
        />
      </article>

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

      <article className='text-[0.88rem]'>
        <b>좋아요 {likes.length}개</b>
      </article>

      <article className='my-2 flex content-center text-[0.88rem]'>
        <b className='mr-2 text-[0.9rem]'>{userName}</b>
        <p>{feedCaption}</p>
      </article>

      <article className='text-[0.88rem]'>
        <div className='flex content-center text-stone-500'>
          <p>댓글 {comments.length}개 </p>
          <div className='cursor-pointer' onClick={handleOpenComment}>
            &nbsp;{comments.length > 0 ? (openComments ? '닫기' : '모두 보기') : null}
          </div>
        </div>

        {comments &&
          !openComments &&
          comments.map(
            (comment, index) =>
              index === 0 && (
                <div className='mb-2 mt-2 flex items-center' key={index}>
                  <div className='flex-1 content-center'>
                    <b>{comment.data().userName} </b>
                    &nbsp;{comment.data().comment}
                  </div>
                  <p className='pr-1 text-xs'>
                    {moment(new Date(comment.data().timestamp?.seconds * 1000)).fromNow()}
                  </p>
                </div>
              ),
          )}

        {openComments && (
          <div className='mt-3 w-[450px] bg-stone-50 pb-[1px] dark:bg-stone-700'>
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
