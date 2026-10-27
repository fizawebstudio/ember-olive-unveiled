import { useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * A non-autoplay horizontal strip users can grab and drag with mouse or touch.
 */
export function HoverScroller({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const start = useRef({ x: 0, scroll: 0 });

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    start.current = { x: event.clientX, scroll: el.scrollLeft };
    draggingRef.current = true;
    setDragging(true);
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !draggingRef.current) return;
    el.scrollLeft = start.current.scroll - (event.clientX - start.current.x) * 1.25;
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    draggingRef.current = false;
    setDragging(false);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`no-scrollbar select-none overflow-x-auto touch-pan-y ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
    >
      {children}
    </div>
  );
}
