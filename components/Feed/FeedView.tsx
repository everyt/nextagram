import {
  collection,
  limit,
  onSnapshot,
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
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchFirstFeed = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(firestore, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(5), // 첫 번째 페이지의 경우 startAfter 없이 limit만 사용
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setHasMore(false);
          } else {
            const newFeeds = querySnapshot.docs.map((doc) => doc.data());
            setFeeds(newFeeds);
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

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const lastFeed = feeds[feeds.length - 1];

      const q = query(
        collection(firestore, 'posts'),
        orderBy('timestamp', 'desc'),
        startAfter(lastFeed.timestamp),
        limit(5), // Adjust the limit as needed
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setHasMore(false);
          } else {
            const newFeeds = querySnapshot.docs.map((doc) => doc.data());
            setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
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
    fetchFirstFeed();
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
          rootMargin: '0px', // No additional margin
          threshold: 0.1, // Trigger when 10% of the target is visible
        },
      );

      if (observer.current) {
        observer.current.observe(document.querySelector('.load-more-trigger')!);
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  return (
    <div>
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
      {hasMore && <div className='load-more-trigger' />}
      {!hasMore && <CheckedEverything />}
    </div>
  );
}
