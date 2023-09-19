import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import { useEffect, useRef, useState } from 'react';

import { firestore } from '@/lib/firebase';

import CheckedEverything from './CheckedEverything';
import Feed from './Feed';
import FeedSkeleton from './FeedSkeleton';

export default function FeedView() {
  const PAGE_SIZE = 10;
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<any | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchFeeds = async () => {
    try {
      setLoading(true);

      let q: any;

      if (lastDoc) {
        q = query(
          collection(firestore, 'feeds'),
          orderBy('timestamp', 'desc'),
          startAfter(lastDoc),
          limit(PAGE_SIZE),
        );
      } else {
        q = query(collection(firestore, 'feeds'), orderBy('timestamp', 'desc'), limit(PAGE_SIZE));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setHasMore(false);
      } else {
        const newFeeds = querySnapshot.docs;
        setLastDoc(newFeeds[newFeeds.length > 0 ? newFeeds.length - 1 : 0]);
        setFeeds((prev) => [...prev, ...newFeeds]);
        setHasMore(newFeeds.length === PAGE_SIZE);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds(); // 페이지가 처음 로드될 때 호출
  }, []);

  useEffect(() => {
    if (hasMore && !loading) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchFeeds();
          }
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: '20px', // No additional margin
          threshold: 0.1, // Trigger when 10% of the target is visible
        },
      );

      // 초기 데이터를 가져온 후에 옵저버 활성화
      if (hasMore) {
        if (observer.current) {
          observer.current.observe(document.querySelector('.load-more-trigger')!);
        }
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [hasMore, loading]);

  const handleDeleteFeed = async (feedId: string) => {
    const feedRef = doc(firestore, 'feeds', feedId!);
    await deleteDoc(feedRef);
    setFeeds((prev) => prev.filter((feed) => feed.feedId !== feedId));
  };

  return (
    <div className='pb-10'>
      {feeds ? (
        feeds.map((feed, key) => (
          <Feed
            key={key}
            userId={feed.data().userId}
            userEmail={feed.data().userEmail}
            userName={feed.data().userName}
            userImg={feed.data().userImg}
            feedId={feed.id}
            feedImg={feed.data().feedImg}
            feedCaption={feed.data().feedCaption}
            handleDeleteFeed={handleDeleteFeed}
          />
        ))
      ) : (
        <>
          {[...Array(5)].map((_, key) => (
            <FeedSkeleton key={key} />
          ))}
        </>
      )}
      {loading && <FeedSkeleton />}
      {feeds && !loading && !hasMore && <CheckedEverything />}
      {hasMore && <div className='load-more-trigger' style={{ height: 40 }} />}
    </div>
  );
}
