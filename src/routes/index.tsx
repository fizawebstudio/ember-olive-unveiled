import { createFileRoute, Link } from "@tanstack/react-router";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { HoverScroller } from "@/components/hover-scroller";
import { journalPosts } from "@/data/journal";
import hero from "@/assets/ember-hero.jpg";
import chef from "@/assets/chef-mara.jpg";
import room from "@/assets/dining-room.jpg";
import cocktail from "@/assets/cocktail-pour.jpg";
import plating from "@/assets/plating-fire.jpg";
import octopus from "@/assets/dish-octopus.jpg";
import lamb from "@/assets/dish-lamb.jpg";
import seabass from "@/assets/dish-seabass.jpg";
import privateDining from "@/assets/private-dining.jpg";
import hearth from "@/assets/hearth-embers.jpg";
import grill from "@/assets/grill-fire.jpg";
import toast from "@/assets/guests-toast.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember & Olive | Mediterranean Dining Over Flame" },
      { name: "description", content: "Contemporary Mediterranean dining, crafted over flame in New York." },
      { property: "og:title", content: "Ember & Olive | Fire & Soul" },
      { property: "og:description", content: "Contemporary Mediterranean dining, crafted over flame." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const reviews = [
  "Every plate feels inevitable—deeply considered, but never overworked.",
  "The warmth of the room is matched only by the generosity of the cooking.",
  "Ember & Olive turns dinner into something elemental and unforgettable.",
];

const signatures: [string, string, string, string][] = [
  [octopus, "Ember Octopus", "preserved lemon · smoked potato", "24"],
  [lamb, "Aged Lamb Saddle", "black garlic · mint jus", "48"],
  [seabass, "Wild Sea Bass", "fennel · saffron · citrus", "42"],
];

function Home() {
  const [review, setReview] = useState(0);
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <img src={hero} width={1920} height={1280} alt="Ember & Olive open-fire hearth" className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-transparent" />
        <div className="smoke absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-foreground/20" />
        {Array.from({ length: 12 }).map((_, i) => (
          <i key={i} className="ember absolute bottom-0 h-1 w-1 rounded-full bg-primary" style={{ left: `${8 + i * 8}%`, "--duration": `${6 + (i % 5)}s`, animationDelay: `-${i * 0.7}s` } as React.CSSProperties} />
        ))}
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] items-end px-5 pb-20 pt-32 lg:px-10 lg:pb-24">
          <div className="max-w-5xl">
            <p className="animate-reveal-up text-xs uppercase tracking-[.35em] text-primary">New York · Mediterranean hearth</p>
            <h1 className="mt-6 animate-reveal-up text-balance text-7xl leading-[.78] sm:text-8xl md:text-[9rem] lg:text-[11rem]" style={{ animationDelay: ".1s" }}>
              Fire <span className="italic text-primary">&</span> Soul.
            </h1>
            <p className="mt-8 animate-reveal-up text-lg text-foreground/80 md:text-xl" style={{ animationDelay: ".24s" }}>Contemporary Mediterranean dining, crafted over flame.</p>
            <div className="mt-9 flex animate-reveal-up flex-wrap gap-4" style={{ animationDelay: ".36s" }}>
              <Button asChild variant="ember" size="lg"><Link to="/menu">Explore menu <ArrowRight /></Link></Button>
              <Button asChild variant="emberOutline" size="lg"><Link to="/reservations">Reserve a table</Link></Button>
            </div>
          </div>
          <ArrowDown className="absolute bottom-8 right-8 hidden animate-bounce text-primary md:block" />
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-2">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[.25em] text-primary">Our philosophy</p>
            <h2 className="mt-4 text-5xl leading-[.95] md:text-7xl">Fire at the centre.<br /><span className="italic text-primary">Everyone around it.</span></h2>
            <p className="mt-5 max-w-md leading-8 text-muted-foreground">We cook with fire to reveal—not conceal. Each plate begins with exceptional produce and ends with smoke, olive oil, sea salt, and intuition.</p>
            <div className="mt-8 grid max-w-md grid-cols-3 border border-border transition-colors duration-500 hover:border-primary/60">
              {[["8", "Seasons"], ["14", "Local farms"], ["1", "Open hearth"]].map(([value, label]) => <div key={label} className="group border-r border-border p-4 text-center transition-all duration-500 last:border-r-0 hover:bg-primary/10 hover:ring-1 hover:ring-inset hover:ring-primary/50"><p className="font-display text-3xl text-primary transition-transform duration-500 group-hover:-translate-y-0.5 md:text-4xl">{value}</p><p className="mt-1 text-[10px] uppercase tracking-[.15em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">{label}</p></div>)}
            </div>
          </Reveal>
          <div className="relative border-l border-border pl-8">
            {([[hearth, "2016", "A market habit", "Mara begins each morning sourcing from growers she still cooks with today."], [grill, "2019", "The hearth is built", "A single olive-wood fire becomes the centre of the kitchen."], [plating, "2022", "First season menu", "Menus start following the harvest week by week."], [toast, "2026", "Your table tonight", "An evening shaped by fire, and the people around it."]] as const).map(([img, year, title, copy]) => (
              <Reveal key={year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-2 size-2 rounded-full bg-primary" />
                <p className="font-display text-2xl text-primary">{year}</p>
                <h3 className="mt-1 text-2xl">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{copy}</p>
                <div className="mt-4 overflow-hidden">
                  <img src={img} loading="lazy" alt={title} className="aspect-[16/9] w-full object-cover transition duration-700 hover:scale-105" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-28">
        <div className="px-5 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="text-xs uppercase tracking-[.25em] text-primary">Signatures</p>
              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-5xl md:text-7xl">From the hearth.</h2>
                <Link to="/menu" className="hidden text-xs uppercase tracking-[.18em] md:block">View full menu →</Link>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {signatures.map(([img, n, d, p]) => (
                <Reveal key={n}>
                  <article className="group">
                     <div className="overflow-hidden bg-background">
                       <img src={img} loading="lazy" width={1024} height={1280} alt={n} className="aspect-[4/3] max-h-80 w-full object-cover transition duration-[900ms] group-hover:scale-105" />
                    </div>
                    <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
                      <h3 className="text-3xl transition group-hover:text-primary">{n}</h3>
                      <span className="font-display text-2xl text-primary">${p}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-28 lg:px-10 lg:py-44">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <HoverScroller>
              <div className="flex gap-4">
                {([[chef, "Mara Vella", "Chef & Owner"], [team1, "Léa Rossi", "Head Chef"], [team2, "Tomás Herrera", "Sous Chef"], [team3, "Ines Duarte", "Bar Lead"], [team4, "Noah Klein", "Restaurant Manager"]] as const).map(([img, name, role]) => (
                  <figure key={name} className="min-w-[70%] overflow-hidden sm:min-w-[46%]">
                    <img src={img} loading="lazy" alt={name} className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105" />
                    <figcaption className="mt-3"><p className="font-display text-xl">{name}</p><p className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">{role}</p></figcaption>
                  </figure>
                ))}
              </div>
            </HoverScroller>
            <p className="mt-4 text-xs uppercase tracking-[.2em] text-muted-foreground">Grab and drag to meet the kitchen</p>
          </Reveal>
          <Reveal>
            <p className="text-xs uppercase tracking-[.25em] text-primary">Chef Mara Vella</p>
            <h2 className="mt-6 text-6xl leading-[.9] md:text-8xl">Instinct, restraint, flame.</h2>
            <p className="mt-8 max-w-xl leading-8 text-muted-foreground">Raised between Valletta and Marseille, Mara cooks from memory: citrus groves after rain, fish pulled from morning water, vegetables blistered at the edge of a family hearth.</p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-5">
              <img src={grill} loading="lazy" width={1280} height={1024} alt="Vegetables charring over open fire" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.04]" />
              <img src={plating} loading="lazy" width={1024} height={1280} alt="Plating at the pass" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.04]" />
            </div>
            <Link to="/our-story" className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[.18em] text-primary">Discover our story <ArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-24 lg:px-10">
        <img src={room} loading="lazy" width={1920} height={1280} alt="Atmospheric dining room" className="absolute inset-0 h-full w-full object-cover transition duration-[3000ms] hover:scale-105" />
        <div className="absolute inset-0 bg-background/55" />
        <Reveal className="relative mx-auto w-full max-w-[1400px] text-center">
          <p className="text-xs uppercase tracking-[.3em] text-primary">The evening</p>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance text-5xl leading-[.95] md:text-8xl">Come for the fire. Stay for the feeling.</h2>
          <Button asChild variant="emberOutline" size="lg" className="mt-10"><Link to="/gallery">Step inside</Link></Button>
        </Reveal>
      </section>

      <section className="py-28">
        <div className="px-5 lg:px-10">
          <Reveal>
            <div className="mx-auto flex max-w-[1500px] items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.25em] text-primary">A night at Ember & Olive</p>
                <h2 className="mt-4 text-5xl md:text-7xl">Scenes from the table.</h2>
                 <p className="mt-4 text-xs uppercase tracking-[.2em] text-muted-foreground">Grab and drag to explore</p>
              </div>
              <Link to="/gallery" className="hidden text-xs uppercase tracking-[.18em] md:block">View gallery →</Link>
            </div>
          </Reveal>
        </div>
        <HoverScroller className="mt-12 px-5 pb-5 lg:px-[max(2.5rem,calc((100vw-1500px)/2))]">
          <div className="flex gap-5">
            {[[cocktail, "Botanical pours"], [plating, "At the pass"], [grill, "Over the coals"], [toast, "Reasons to gather"], [room, "After dark"]].map(([img, t]) => (
              <figure key={t} className="group min-w-[70vw] overflow-hidden md:min-w-[34vw] lg:min-w-[24vw]">
                <img src={img} loading="lazy" alt={t} className="h-[42vh] w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="mt-4 font-display text-2xl">{t}</figcaption>
              </figure>
            ))}
          </div>
        </HoverScroller>
      </section>

       <section className="border-y border-border bg-primary px-5 py-24 text-primary-foreground lg:px-10">
         <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.65fr_1.35fr] md:items-center">
           <div className="border-b border-primary-foreground/30 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-12">
             <p className="text-xs uppercase tracking-[.25em] text-primary-foreground/75">Guest reflections</p>
             <p className="mt-5 font-display text-6xl">4.9</p>
             <p className="mt-2 tracking-[.3em]">★★★★★</p>
             <p className="mt-4 text-sm text-primary-foreground/70">Based on recent dining experiences</p>
           </div>
           <div>
             <span className="font-display text-7xl leading-none text-primary-foreground/35">“</span>
             <p key={review} className="-mt-5 animate-reveal-up font-display text-4xl leading-tight md:text-5xl">{reviews[review]}</p>
             <div className="mt-8 flex items-center justify-between gap-4">
               <div><p className="text-sm font-medium">Verified guest</p><p className="text-xs uppercase tracking-[.18em] text-primary-foreground/65">New York · Dinner</p></div>
               <div className="flex gap-2"><Button variant="ghost" size="icon" aria-label="Previous testimonial" onClick={() => setReview((review + reviews.length - 1) % reviews.length)} className="border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><ChevronLeft /></Button><Button variant="ghost" size="icon" aria-label="Next testimonial" onClick={() => setReview((review + 1) % reviews.length)} className="border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><ChevronRight /></Button></div>
             </div>
           </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[.25em] text-primary">Private dining</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Made private. Made memorable.</h2>
            <p className="mt-6 max-w-lg leading-8 text-muted-foreground">Gather around a table that feels entirely your own. The Olive Room welcomes up to 28 guests with a dedicated host, bespoke hearth menus, and thoughtful wine pairings.</p>
            <div className="mt-8 max-w-lg overflow-hidden">
              <img src={privateDining} loading="lazy" width={1536} height={1024} alt="The Olive Room private dining table" className="aspect-[16/9] w-full object-cover transition duration-1000 hover:scale-105" />
            </div>
            <Button asChild variant="ember" size="lg" className="mt-8"><Link to="/contact">Plan your event</Link></Button>
          </Reveal>
          <Reveal className="border border-border">
            <div className="border-b border-border p-6 md:p-8">
              <p className="text-xs uppercase tracking-[.22em] text-primary">Private dining rates</p>
              <p className="mt-2 text-sm text-muted-foreground">Per guest, excluding tax and service. Minimum spend applies on Fridays and Saturdays.</p>
            </div>
            {([["The Chef's Table", "Six seats at the hearth, cooked and served by Mara.", "$165"], ["The Olive Room", "Up to 28 guests, five-course hearth menu, dedicated host.", "$130"], ["Full Buyout", "The entire dining room, 70 guests, bespoke menu and bar.", "$210"]] as const).map(([name, copy, price]) => (
              <div key={name} className="flex items-start justify-between gap-6 border-b border-border p-6 md:p-8">
                <div>
                  <h3 className="text-2xl">{name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{copy}</p>
                </div>
                <p className="font-display text-3xl text-primary">{price}</p>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 p-6 md:p-8">
              <p className="text-sm text-muted-foreground">Wine pairing from $75 per guest</p>
              <Link to="/contact" className="text-xs uppercase tracking-[.18em] text-primary">Enquire →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.25em] text-primary">The journal</p>
                <h2 className="mt-3 text-4xl md:text-6xl">Stories worth savoring.</h2>
              </div>
              <Link to="/journal" className="text-xs uppercase tracking-[.18em] text-primary">All stories →</Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journalPosts.map((post) => (
              <Reveal key={post.slug}>
                <Link to="/journal/$slug" params={{ slug: post.slug }} className="group flex h-full flex-col border border-border transition hover:border-primary">
                  <div className="overflow-hidden">
                    <img src={post.image} loading="lazy" alt={post.title} className="aspect-[16/10] w-full object-cover transition duration-[900ms] group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[.18em]"><span className="text-primary">{post.tag}</span><span className="text-muted-foreground">{post.readTime}</span></div>
                    <h3 className="mt-4 text-2xl leading-tight transition group-hover:text-primary">{post.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[.18em] text-primary">Read story <ArrowRight className="size-4 transition group-hover:translate-x-1" /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

       <section className="relative overflow-hidden px-5 py-24 text-foreground lg:px-10">
         <img src={toast} loading="lazy" alt="Friends sharing dinner at Ember and Olive" className="absolute inset-0 h-full w-full object-cover" />
         <div className="absolute inset-0 bg-background/55" />
         <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/40 to-background/90" />
         <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 12%, color-mix(in oklab, var(--background) 90%, transparent) 75%)" }} />
         <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 60%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)" }} />
         <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[.25em] text-primary">Letters from the hearth</p>
          <h2 className="mt-4 text-5xl md:text-7xl">A seat at our table.</h2>
          <p className="mt-4 max-w-xl text-sm text-foreground/85">Seasonal menus, intimate events, and stories from our kitchen—sent occasionally.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

function NewsletterForm() {
  const { submit, status, error, loading } = useFormSubmit();
  return (
    <>
      <form
        className="mt-9 flex w-full max-w-xl border-b border-foreground/55"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = e.currentTarget; const d = new FormData(f);
          if (await submit({ formType: "newsletter", email: String(d.get("email")), website: String(d.get("website") ?? "") })) f.reset();
        }}
      >
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <input name="email" required maxLength={255} aria-label="Email address" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-4 outline-none placeholder:text-foreground/70" />
        <button disabled={loading} className="text-xs uppercase tracking-[.18em] text-primary disabled:opacity-60">{loading ? "Sending…" : "Subscribe"}</button>
      </form>
      {status === "success" && <p role="status" className="mt-4 text-sm text-foreground/85">Thank you — you're on the list.</p>}
      {status === "error" && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    </>
  );
}
