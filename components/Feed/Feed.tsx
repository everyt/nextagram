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

import { memo, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

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
};

function Feed({ userId, userEmail, userName, userImg, feedId, feedImg, feedCaption }: Props) {
  const memorizedEmail = useMemo(() => userEmail, [userEmail]);
  const memorizedName = useMemo(() => userName, [userName]);
  const memorizedImg = useMemo(() => userImg, [userImg]);

  const { data: session } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenComment = () => {
    setOpenComments(true);
  };

  const handleUploadComment = async (e: any) => {
    e.preventDefault();

    if (comment) {
      setLoading(true);
      try {
        await addDoc(collection(firestore, 'feeds', feedId, 'comments'), {
          comment,
          username: session?.user?.name,
          userImage: session?.user?.image,
          timestamp: serverTimestamp(),
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setComment('');
    } else {
      console.log('err');
    }
  };

  const handleDeleteComment = (id: string) => async () => {
    try {
      await deleteDoc(doc(firestore, 'feeds', feedId, 'comments', id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, 'posts', feedId, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => setComments(snapshot.docs),
      ),
    [firestore, feedId],
  );

  useEffect(
    () =>
      onSnapshot(collection(firestore, 'posts', feedId, 'likes'), (snapshot) =>
        setLikes(snapshot.docs),
      ),
    [firestore, feedId],
  );

  useEffect(
    () => setHasLikes(likes.findIndex((like) => like.id === session?.user?.id) !== -1),
    [likes],
  );

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user?.id));
      } else {
        await setDoc(doc(firestore, 'feeds', feedId, 'likes', session?.user?.id), {
          userName: session?.user?.name,
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
      className='mt-1 h-auto w-[450px] border-b-[1px] border-stone-300 pb-4 dark:border-stone-500'
    >
      <article>
        <Miniprofile email={memorizedEmail} name={memorizedName} img={memorizedImg} type='onFeed' />
      </article>

      <article>
        <Image
          className='mt-[0.8rem] w-[inherit]'
          src={feedImg}
          alt='feed'
          width={450}
          height={450}
        />
      </article>

      <article className='flex content-center pt-[0.8rem]'>
        <button className='cursor-pointer text-red-500' onClick={likePost}>
          {hasLikes ? (
            <Icon icon='ion:heart-fill' style={{ fontSize: '26px' }} />
          ) : (
            <Icon icon='ion:heart-outline' style={{ fontSize: '26px' }} />
          )}
        </button>
        <button className='cursor-pointer'>
          <Icon className='ml-4' icon='ion:paper-plane-outline' style={{ fontSize: '26px' }} />
        </button>
        <button className='cursor-pointer'>
          <Icon className='ml-5' icon='iconoir:message' style={{ fontSize: '26px' }} />
        </button>
      </article>

      <article>
        <p className='text-[0.88rem]'>{`좋아요 ${likes.length}개`}</p>
        <div className='my-2 flex content-center text-[0.88rem]'>
          <b className='mr-2 text-[0.9rem]'>{userName}</b>
          <p>{feedCaption}</p>
        </div>
        <div className='flex content-center text-[0.88rem]' onClick={handleOpenComment}>
          {`댓글 ${comments.length}개`} 모두 보기
        </div>
        {openComments && (
          <div className=''>
            {comments &&
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className='mb-3 flex
                items-center space-x-2'
                >
                  <img className='h-7 rounded-full' src={comment.data().userImage} alt={userName} />
                  <p className='flex-1 text-sm'>
                    <b>{comment.data().username} </b>
                    {comment.data().comment}
                  </p>
                  <p className='pr-5 text-xs'>
                    {moment(new Date(comment.data().timestamp?.seconds * 1000)).fromNow()}
                  </p>
                  <Icon
                    icon='line-md:remove'
                    style={{ fontSize: '20px' }}
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
              ))}
          </div>
        )}
      </article>
    </motion.section>
  );
}
export default memo(Feed);
