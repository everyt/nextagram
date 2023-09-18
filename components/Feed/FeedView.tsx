import { collection, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';

import { useEffect, useRef, useState } from 'react';

import { firestore } from '@/lib/firebase';

import CheckedEverything from './CheckedEverything';
import Feed from './Feed';
import FeedSkeleton from './FeedSkeleton';

export default function FeedView() {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [lastTimestamp, setLastTimestamp] = useState<any>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchFeeds = async (initialFetch = false) => {
    try {
      setLoading(true);
      setHasMore(false);

      let q;

      if (initialFetch) {
        q = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'), limit(3));
      } else {
        q = query(
          collection(firestore, 'posts'),
          orderBy('timestamp', 'desc'),
          startAfter(lastTimestamp),
          limit(3),
        );
      }

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setHasMore(false);
          } else {
            setHasMore(true);
            const newFeeds = querySnapshot.docs.map((doc) => doc.data());
            const lastFeed = newFeeds.length > 0 ? newFeeds[newFeeds.length - 1] : newFeeds[0];
            setLastTimestamp(lastFeed.timestamp);
            setFeeds((prev) => (initialFetch ? newFeeds : [...prev, ...newFeeds]));
          }
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds(true); // 페이지가 처음 로드될 때 호출
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

  return (
    <div className='pb-10'>
      {feeds ? (
        feeds.map((feed, key) => (
          <Feed
            key={key}
            email={feed.userEmail}
            name={feed.userName}
            img={feed.userImg}
            feedId={feed.id}
            feedImg={feed.image}
            feedCaption={feed.caption}
            likes={feed.feedLikes}
            comments={feed.feedComments}
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
      {!hasMore && <CheckedEverything />}
      {hasMore && <div className='load-more-trigger' style={{ height: 40 }} />}
    </div>
  );
}
