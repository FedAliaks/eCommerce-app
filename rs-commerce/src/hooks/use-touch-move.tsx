import { useRef, useState } from 'react';

type UseTouchMoveProps = {
  getPrevSlide: () => void;
  getNextSlide: () => void;
  activeSlide: number;
  arrLength: number;
};

const useTouchMove = ({
  getPrevSlide,
  getNextSlide,
  activeSlide,
  arrLength,
}: UseTouchMoveProps) => {
  const startPosition = useRef({ x: 0 });
  const currentPosition = useRef({ x: 0 });

  const [isTouchMoveProcessed, setIsTouchMoveProcessed] = useState(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    startPosition.current = { x: event.touches[0]?.clientX || 0 };
    setIsTouchMoveProcessed(false);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
    if (isTouchMoveProcessed) {
      return;
    }
    currentPosition.current = { x: event.touches[0]?.clientX || 0 };

    const deltaX = currentPosition.current.x - startPosition.current.x;

    if (deltaX > 100 && activeSlide > 0) {
      getPrevSlide();
      setIsTouchMoveProcessed(true);
    } else if (deltaX < -100 && activeSlide < arrLength - 1) {
      getNextSlide();
      setIsTouchMoveProcessed(true);
    }
  };

  return { handleTouchStart, handleTouchMove };
};

export default useTouchMove;
