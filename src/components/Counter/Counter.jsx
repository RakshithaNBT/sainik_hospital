import React, { useState, useEffect, useRef } from 'react';
import './Counter.css';

const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    // Calculate step interval
    const totalMiliseconds = duration;
    const incrementStep = Math.max(1, Math.floor(end / (totalMiliseconds / 16))); // 16ms per frame ~ 60fps
    
    let timer = setInterval(() => {
      start += incrementStep;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="animated-counter-number">
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
