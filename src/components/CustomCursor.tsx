"use client";

import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (!window.matchMedia("(pointer: fine)").matches) {
      cursor.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let targetScale = 1;
    let curScale = 1;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      curScale += (targetScale - curScale) * 0.18;
      cursor.style.transform = `translate(${curX - 16}px, ${curY - 16}px) scale(${curScale})`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => cursor.classList.add("cursor-active");
    const onLeave = () => cursor.classList.remove("cursor-active");
    const onMouseDown = () => { targetScale = 0.65; };
    const onMouseUp = () => { targetScale = 1; };

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const bladePath = "M13.2 11.5 L9.2 4.5 A10 10 0 0 1 22.8 4.5 L18.8 11.5 A3.5 3.5 0 0 0 13.2 11.5 Z";

  return (
    <div
      ref={cursorRef}
      className="xray-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
      aria-hidden
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#333333" d={bladePath} />
        <path fill="#333333" d={bladePath} transform="rotate(120 16 16)" />
        <path fill="#333333" d={bladePath} transform="rotate(240 16 16)" />
        <circle fill="#333333" cx="16" cy="16" r="2.8" />
      </svg>
    </div>
  );
};
