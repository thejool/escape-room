import { useEffect, useRef } from 'react';

function useInterval(callback, delay, disabled) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    
    if (delay !== null && !disabled) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, disabled]);
}

export default useInterval