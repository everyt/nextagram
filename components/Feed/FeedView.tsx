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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const lastFeed = feeds[feeds.length - 1];

      const q = query(
        collection(firestore, 'posts'),
        orderBy('timestamp', 'desc'),
        startAfter(lastFeed),
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
    fetchPosts();
  }, []);

  useEffect(() => {
    if (hasMore && !loading) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchPosts();
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
            email={feed.data().userEmail}
            name={feed.data().userName}
            img={feed.data().userImg}
            feedId={feed.id}
            feedImg={feed.data().feedImg}
            feedCaption={feed.data().feedCaption}
            likes={feed.data().feedLikes}
            comments={feed.data().feedComments}
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
