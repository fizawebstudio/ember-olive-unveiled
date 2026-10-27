import { useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import market from "@/assets/market.jpg";
import hands from "@/assets/story-hands.jpg";
import grill from "@/assets/grill-fire.jpg";
import toast from "@/assets/guests-toast.jpg";

const slides = [
  { image: market, caption: "Morning market" },
  { image: hands, caption: "Made by hand" },
  { image: grill, caption: "The living hearth" },
  { image: toast, caption: "Around the table" },
];

export function StoryCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; scroll: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ first: true, last: false });

  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const slide = el.firstElementChild;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * ((slide?.getBoundingClientRect().width ?? el.clientWidth) + 20), behavior: reduced ? "instant" : "smooth" });
  };

  const begin = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const el = track.current;
    if (!el) return;
    start.current = { x: event.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const end = (event: PointerEvent<HTMLDivElement>) => {
    start.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-5">
        <div><p className="text-xs uppercase tracking-[.25em] text-primary">Our rhythm</p><h2 className="mt-4 text-4xl md:text-6xl">From market to table.</h2></div>
        <div className="flex shrink-0 gap-2">
          <Button variant="emberOutline" size="icon" aria-label="Previous story image" title="Previous image" disabled={position.first} onClick={() => move(-1)}><ArrowLeft /></Button>
          <Button variant="emberOutline" size="icon" aria-label="Next story image" title="Next image" disabled={position.last} onClick={() => move(1)}><ArrowRight /></Button>
        </div>
      </div>
      <div ref={track} role="region" aria-label="From market to table image carousel" tabIndex={0}
        onPointerDown={begin} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { start.current = null; setDragging(false); }}
        onPointerMove={(event) => { if (track.current && start.current) track.current.scrollLeft = start.current.scroll - (event.clientX - start.current.x); }}
        onScroll={(event) => { const el = event.currentTarget; setPosition({ first: el.scrollLeft < 2, last: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 }); }}
        onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}
        className={`no-scrollbar mt-8 flex touch-pan-x gap-5 overflow-x-auto select-none focus-visible:outline focus-visible:outline-ring ${dragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {slides.map((slide, index) => <figure key={slide.caption} className="w-[82%] shrink-0 md:w-[46%]">
          <img src={slide.image} draggable={false} loading="lazy" alt={slide.caption} className="pointer-events-none aspect-[16/10] w-full object-cover" />
          <figcaption className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[.18em] text-muted-foreground"><span className="text-primary">0{index + 1}</span>{slide.caption}</figcaption>
        </figure>)}
      </div>
    </div>
  );
}