import { useEffect, useState } from "react";

export function useResize() {
  const [heightWidth, setHeightWidth] = useState([0, 0]);
  useEffect(() => {
    function handleResize() {
      setHeightWidth([window.innerHeight - 10, window.innerWidth]);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return heightWidth;
}
