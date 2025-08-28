import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
};

export const useStaggerAnimation = (items: any[], delay = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setVisibleItems([]);
      return;
    }

    // Simplificar para evitar problemas de timing
    const timer = setTimeout(() => {
      const newVisibleItems = [];
      for (let i = 0; i < items.length; i++) {
        newVisibleItems.push(i);
      }
      setVisibleItems(newVisibleItems);
    }, 200);

    return () => clearTimeout(timer);
  }, [items, delay]);

  return visibleItems;
};
