"use client";
import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 40) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete]   = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      setIsComplete(false);
      return;
    }

    setDisplayText("");
    setIsComplete(false);
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayText, isComplete };
}
