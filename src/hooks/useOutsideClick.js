import { useEffect, useRef } from "react";

export function useOutsideClick({ capturePhase = true, close: handler }) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log(ref, e.target);
        handler();
      }
    };
    document.addEventListener("click", handleClick, capturePhase);

    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  }, [capturePhase, handler]);

  return { ref };
}
