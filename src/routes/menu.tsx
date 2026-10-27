import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import octopus from "@/assets/dish-octopus.jpg";
import lamb from "@/assets/dish-lamb.jpg";
import seabass from "@/assets/dish-seabass.jpg";
import beet from "@/assets/dish-beet.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import flatbread from "@/assets/dish-flatbread.jpg";
import cocktail from "@/assets/cocktail-pour.jpg";
import grill from "@/assets/grill-fire.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Ember & Olive" },
      { name: "description", content: "Explore our seasonal Mediterranean menu cooked over flame." },
      { property: "og:title", content: "Menu | Ember & Olive" },
      { property: "og:description", content: "Seasonal Mediterranean plates from the hearth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

type Item = { img: string; name: string; desc: string; price: string };

const menu = {
  "Small Plates": {
    hero: flatbread,
    items: [
      { img: beet, name: "Coal-Roasted Beet", desc: "whipped sheep's milk, sour cherry, pistachio", price: "18" },
      { img: octopus, name: "Ember Octopus", desc: "preserved lemon, smoked potato, oregano", price: "24" },
      { img: flatbread, name: "Hearth Flatbread", desc: "green olive, za'atar, cultured butter", price: "12" },
      { img: grill, name: "Blistered Padrón Peppers", desc: "sea salt, lemon oil, aged sherry vinegar", price: "11" },
      { img: octopus, name: "Grilled Prawns", desc: "chilli butter, fennel pollen, charred lime", price: "22" },
      { img: beet, name: "Burrata & Charred Peach", desc: "basil oil, black pepper, toasted sourdough", price: "19" },
    ],
  },
  "Hearth & Sea": {
    hero: grill,
    items: [
      { img: seabass, name: "Wild Sea Bass", desc: "fennel, saffron broth, charred citrus", price: "42" },
      { img: lamb, name: "Aged Lamb Saddle", desc: "black garlic, artichoke, mint jus", price: "48" },
      { img: grill, name: "Smoked Celeriac", desc: "barley, wild mushroom, truffle", price: "32" },
      { img: lamb, name: "Dry-Aged Ribeye", desc: "bone marrow butter, hearth leeks, charcoal salt", price: "58" },
      { img: seabass, name: "Whole Turbot for Two", desc: "brown butter, capers, roasted lemon", price: "86" },
      { img: grill, name: "Fire-Roasted Chicken", desc: "olive tapenade, confit garlic, herb salad", price: "34" },
    ],
  },
  "Dessert & Nightcap": {
    hero: dessert,
    items: [
      { img: dessert, name: "Olive Oil Cake", desc: "meyer lemon, bay leaf cream", price: "14" },
      { img: dessert, name: "Burnt Honey Semifreddo", desc: "sesame brittle, sea salt", price: "15" },
      { img: beet, name: "Medjool Date", desc: "dark chocolate, cardamom, tahini", price: "13" },
      { img: dessert, name: "Fig Leaf Panna Cotta", desc: "roasted figs, pistachio praline", price: "14" },
      { img: cocktail, name: "Amaro Flight", desc: "three Mediterranean digestifs, chef's choice", price: "21" },
      { img: cocktail, name: "Smoke & Citrus", desc: "mezcal, blood orange, rosemary ember", price: "18" },
    ],
  },
} satisfies Record<string, { hero: string; items: Item[] }>;

function MenuPage() {
  const [cat, setCat] = useState<keyof typeof menu>(Object.keys(menu)[0] as keyof typeof menu);
  const active = menu[cat];
  return (
    <>
      <PageHero eyebrow="The menu" title="Season, smoke, simplicity." intro="A changing menu of generous plates, built for sharing and guided by what arrives at its best." />
      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1300px]">
           <div className="flex flex-wrap gap-2 border-b border-border pb-8">
            {Object.keys(menu).map((c) => (
               <Button key={c} type="button" variant={cat === c ? "ember" : "ghost"} onClick={() => setCat(c as keyof typeof menu)} className="rounded-none px-5 text-xs uppercase tracking-[.15em]">{c}</Button>
            ))}
          </div>

          <div key={cat} className="animate-reveal-up">
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {active.items.map((it) => (
                <Reveal key={it.name}>
                  <article className="group">
                    <div className="overflow-hidden">
                      <img src={it.img} loading="lazy" alt={it.name} className="aspect-[4/3] w-full object-cover transition duration-[900ms] group-hover:scale-105" />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                      <h2 className="text-2xl transition group-hover:text-primary">{it.name}</h2>
                      <p className="font-display text-2xl text-primary">${it.price}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-10 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">A seven-course hearth tasting menu is served nightly at $115 per guest, with an optional Mediterranean wine pairing at $75. Please let us know of any allergies when booking.</p>
            <Button asChild variant="ember" size="lg" className="mt-8"><Link to="/reservations">Reserve your table</Link></Button>
          </div>
           <div className="relative mt-20 overflow-hidden"><img src={grill} loading="lazy" alt="Vegetables charring over the hearth" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-background/60" /><div className="relative grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-14"><div><p className="text-xs uppercase tracking-[.22em] text-primary">Meet the brigade</p><h2 className="mt-3 text-4xl md:text-5xl">The hands behind every plate.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/75">Meet the chefs, makers, and hosts who bring the hearth to life each evening.</p></div><Button asChild variant="ember" size="lg"><Link to="/team">Meet our team</Link></Button></div></div>
        </div>
      </section>
    </>
  );
}
