import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import hero from "@/assets/ember-hero.jpg";
import dishes from "@/assets/signature-dishes.jpg";
import chef from "@/assets/chef-mara.jpg";
import room from "@/assets/dining-room.jpg";
import cocktail from "@/assets/cocktail-pour.jpg";
import plating from "@/assets/plating-fire.jpg";
import octopus from "@/assets/dish-octopus.jpg";
import lamb from "@/assets/dish-lamb.jpg";
import seabass from "@/assets/dish-seabass.jpg";
import beet from "@/assets/dish-beet.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import flatbread from "@/assets/dish-flatbread.jpg";
import privateDining from "@/assets/private-dining.jpg";
import grill from "@/assets/grill-fire.jpg";
import market from "@/assets/market.jpg";
import toast from "@/assets/guests-toast.jpg";
import oliveOil from "@/assets/olive-oil.jpg";
import hands from "@/assets/story-hands.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Ember & Olive" },
      { name: "description", content: "Scenes from the hearth, dining room, and table at Ember & Olive." },
      { property: "og:title", content: "Gallery | Ember & Olive" },
      { property: "og:description", content: "A visual journal of fire, food, and gathering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const images: [string, string][] = [
  [hero, "The open hearth"],
  [chef, "Chef Mara Vella"],
  [dishes, "Signature plates"],
  [cocktail, "The bar ritual"],
  [room, "The dining room"],
  [plating, "At the pass"],
  [octopus, "Ember octopus"],
  [grill, "Over the coals"],
  [lamb, "Aged lamb saddle"],
  [market, "Morning market"],
  [seabass, "Wild sea bass"],
  [toast, "Reasons to gather"],
  [beet, "Coal-roasted beet"],
  [privateDining, "The Olive Room"],
  [flatbread, "Hearth flatbread"],
  [oliveOil, "First press"],
  [dessert, "Olive oil cake"],
  [hands, "Dough, by hand"],
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) + images.length - 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = open === null ? null : images[open];

  return (
    <>
      <PageHero eyebrow="Gallery" title="In the glow of the hearth." intro="A visual journal of quiet preparation, elemental cooking, and evenings shared around the table." />
      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map(([src, alt], i) => (
            <Reveal key={alt}>
              <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden text-left" aria-label={`Open ${alt}`}>
                <img src={src} loading="lazy" alt={alt} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-muted-foreground">{alt}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {current && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button type="button" aria-label="Close" className="absolute right-5 top-5 text-foreground" onClick={() => setOpen(null)}><X /></button>
          <button type="button" aria-label="Previous image" className="absolute left-4 text-foreground md:left-10" onClick={(e) => { e.stopPropagation(); setOpen(((open ?? 0) + images.length - 1) % images.length); }}><ChevronLeft className="size-8" /></button>
          <button type="button" aria-label="Next image" className="absolute right-4 text-foreground md:right-10" onClick={(e) => { e.stopPropagation(); setOpen(((open ?? 0) + 1) % images.length); }}><ChevronRight className="size-8" /></button>
          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={current[0]} alt={current[1]} className="max-h-[78vh] w-full object-contain" />
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[.2em] text-muted-foreground">{current[1]}</figcaption>
          </figure>
        </div>
      )}

      <section className="relative overflow-hidden border-t border-border px-5 py-24 text-center lg:px-10">
        <img src={room} loading="lazy" alt="The Ember and Olive dining room after dark" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/65" />
        <Reveal className="relative">
          <p className="text-xs uppercase tracking-[.25em] text-primary">Your evening awaits</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-5xl md:text-7xl">See it from your own seat.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/75">Join us for a night shaped by the hearth, the season, and the people around your table.</p>
          <Button asChild variant="ember" size="lg" className="mt-8"><Link to="/reservations">Reserve a table</Link></Button>
        </Reveal>
      </section>
    </>
  );
}
