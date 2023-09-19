import { useEffect, useState } from 'react';

/**
 * `useWindowSize()는 클라이언트상에서
 * {width: number, height: number}로 값을 return합니다.
 */
export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 1280,
    height: 720,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWindowResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 10);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
