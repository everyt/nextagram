import { Icon } from '@iconify-icon/react';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { firestore } from '@/lib/firebase';

import ProfileFeed from './ProfileFeed';

export default function Profile({ id }: { id?: string }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [user, setUser] = useState<any | null>(null);
  const [Introduction, setIntroduction] = useState<string>('');

  const [feeds, setFeeds] = useState<any[]>([]);

  const fetchFeeds = async () => {
    try {
      const unsubscribe = onSnapshot(
        query(collection(firestore, 'feeds'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setFeeds(snapshot.docs);
        },
        (error) => {
          console.error(error);
        },
      );

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, [firestore]);

  useEffect(() => {
    if (session?.user?.id) {
      const unsubscribe = onSnapshot(doc(firestore, 'users', id || session.user.id), (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [firestore, Introduction, session?.user?.id]);

  const handleUploadIntroduction = async (e: any) => {
    e.preventDefault();

    if (Introduction) {
      setLoading(true);
      try {
        await updateDoc(doc(firestore, 'users', session?.user.id), {
          Introduction,
        });

        setLoading(false);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }

      setIntroduction('');
    } else {
      console.log('err');
    }
  };

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <div className='absolute flex h-[200px] w-screen justify-center border-b-2'>
        <div className='ml-[5em] mt-10 flex content-center'>
          <img
            className='h-[130px] w-[130px] rounded-full'
            src={user?.data()?.image || session?.user.image}
            alt=''
          />
          <div className='ml-20 mt-2'>
            <b>{user?.data()?.name || session?.user.name}</b>
            <p>{user?.data()?.email || session?.user.email}</p>
            {session?.user.id === user?.id ? (
              editMode ? (
                <>
                  <button className='absolute ml-[10.25rem] mt-16 text-sm'>
                    <Icon icon='ion:checkmark-outline' onClick={handleUploadIntroduction} />
                  </button>
                  <button className='absolute ml-[11.25rem] mt-16 text-sm'>
                    <Icon icon='ph:x-light' onClick={handleToggleEditMode} />
                  </button>
                  <textarea
                    className='mt-1 h-[80px] w-[200px] resize-none border-0 bg-stone-50 text-start text-sm outline-none'
                    onChange={(ev) => setIntroduction(ev.target.value)}
                    placeholder='자기소개를 입력해 보세요.'
                    onKeyDown={(ev) => {
                      ev.key === 'Enter' && handleUploadIntroduction(ev);
                      ev.key === 'Escape' && handleToggleEditMode();
                    }}
                  />
                </>
              ) : (
                <>
                  <div
                    className='mt-1 h-[80px] w-[200px] cursor-pointer text-sm'
                    onClick={handleToggleEditMode}
                  >
                    {user?.data()?.Introduction || '클릭해서 수정해보세요.'}
                  </div>
                </>
              )
            ) : (
              <div className='mt-1 h-[80px] w-[200px] text-sm'>
                {user?.data()?.Introduction || ''}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='absolute top-50 ml-16 flex h-[40px] w-screen justify-center'>
        <div className='flex content-center border-t-2 border-black pt-3'>
          <Icon className='mt-1 text-sm' icon='ion:grid-outline' />
          <div className='ml-2 text-sm'>
            <b>게시물</b>
          </div>
        </div>
      </div>
      <div className='absolute top-64 ml-16 flex w-screen justify-center'>
        <div className='flex w-[600px] flex-wrap'>
          {feeds &&
            feeds.map(
              (feed) =>
                feed.data().userId === user?.id && (
                  <ProfileFeed key={feed.id} feedImg={feed.data().feedImg} />
                ),
            )}
        </div>
      </div>
    </>
  );
}
