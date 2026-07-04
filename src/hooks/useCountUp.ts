// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";

// interface UseCountUpOptions {
//   end: number;
//   duration?: number; // in seconds
//   suffix?: string;
//   start?: number;
//   decimals?: number;
// }

// export function useCountUp({
//   end,
//   duration = 2,
//   suffix = "",
//   start = 0,
//   decimals = 0,
// }: UseCountUpOptions) {
//   const [count, setCount] = useState(start);
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef<HTMLSpanElement>(null);
//   const animationFrameRef = useRef<number | null>(null);
//   const startTimeRef = useRef<number | null>(null);

//   const animate = useCallback(
//     (timestamp: number) => {
//       if (!startTimeRef.current) {
//         startTimeRef.current = timestamp;
//       }

//       const elapsed = (timestamp - startTimeRef.current) / 1000;
//       const progress = Math.min(elapsed / duration, 1);

//       // Ease-out cubic
//       const eased = 1 - Math.pow(1 - progress, 3);
//       const currentValue = start + (end - start) * eased;

//       setCount(currentValue);

//       if (progress < 1) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         setCount(end);
//       }
//     },
//     [end, start, duration]
//   );

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting && !isVisible) {
//           setIsVisible(true);
//           startTimeRef.current = null;
//           animationFrameRef.current = requestAnimationFrame(animate);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(element);

//     return () => {
//       observer.disconnect();
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [animate, isVisible]);

//   const formatted =
//     count.toFixed(decimals) + suffix;

//   return { countRef: elementRef, formatted, isVisible };
// }

"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number; // in seconds
  suffix?: string;
  start?: number;
  decimals?: number;
}

export function useCountUp({
  end,
  duration = 2,
  suffix = "",
  start = 0,
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);

  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    function animate(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = start + (end - start) * eased;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setIsVisible(true);

          startTimeRef.current = null;
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, start, duration]);

  const formatted = `${count.toFixed(decimals)}${suffix}`;

  return {
    countRef: elementRef,
    formatted,
    isVisible,
  };
}