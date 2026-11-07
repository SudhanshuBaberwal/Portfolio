import React, { useState, useEffect, useRef } from "react";
import "./TextType.css";

export default function TextType({
  text = "",
  typingSpeed = 20,
  pauseDuration = 1500,
  deletingSpeed = 15,
  loop = false,
  showCursor = true,
  cursorCharacter = "_",
  cursorBlinkDuration = 0.5,
  cursorColor = "currentColor",
  startOnVisible = true,
  onComplete,
}) {
  const texts = Array.isArray(text) ? text : [text];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isFinished, setIsFinished] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(showCursor);

  const containerRef = useRef(null);

  // Check reduced motion
  const isReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // IntersectionObserver for startOnVisible
  useEffect(() => {
    if (!startOnVisible) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Typing effect logic
  useEffect(() => {
    if (!isVisible) return;

    if (isReducedMotion()) {
      setDisplayedText(texts[0] || "");
      setIsFinished(true);
      setCursorVisible(false);
      onComplete?.();
      return;
    }

    if (isFinished) return;

    const fullText = texts[currentTextIndex] || "";
    let timeoutId;

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Full text reached
        if (!loop && currentTextIndex === texts.length - 1) {
          setIsFinished(true);
          onComplete?.();
          // Hide cursor 2 seconds after finishing
          const hideCursorId = setTimeout(() => {
            setCursorVisible(false);
          }, 2000);
          return () => clearTimeout(hideCursorId);
        } else {
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    displayedText,
    isDeleting,
    isVisible,
    isFinished,
    currentTextIndex,
    texts,
    typingSpeed,
    pauseDuration,
    deletingSpeed,
    loop,
    onComplete,
  ]);

  return (
    <span ref={containerRef} className="text-type" aria-hidden="true">
      {displayedText}
      {showCursor && cursorVisible && (
        <span
          className="text-type__cursor"
          style={{
            "--blink-duration": `${cursorBlinkDuration}s`,
            "--cursor-color": cursorColor,
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
