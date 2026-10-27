import hands from "@/assets/story-hands.jpg";
import dishes from "@/assets/signature-dishes.jpg";
import plating from "@/assets/plating-fire.jpg";
import toast from "@/assets/guests-toast.jpg";
import market from "@/assets/market.jpg";
import room from "@/assets/dining-room.jpg";
import privateDining from "@/assets/private-dining.jpg";

const pageImages: Record<string, { src: string; alt: string }> = {
  "Our story": { src: hands, alt: "Making fresh dough by hand at Ember & Olive" },
  "The menu": { src: dishes, alt: "Mediterranean signature plates ready for the table" },
  "Our team": { src: plating, alt: "Our kitchen brigade finishing plates at the pass" },
  Gallery: { src: toast, alt: "Guests sharing an evening around the table" },
  Journal: { src: market, alt: "Seasonal produce at the morning market" },
  Reservations: { src: privateDining, alt: "An intimate table prepared for dinner" },
  Contact: { src: room, alt: "The welcoming Ember & Olive dining room" },
};

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const image = pageImages[eyebrow] ?? { src: room, alt: "Ember & Olive dining room" };
  return (
    <section className="page-hero relative flex min-h-[72vh] items-end overflow-hidden px-5 pb-16 pt-32 lg:px-10 lg:pb-24">
      <img src={image.src} alt={image.alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="page-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1500px]">
        <p className="animate-reveal-up text-xs uppercase tracking-[.3em] text-foreground">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl animate-reveal-up text-balance text-6xl leading-[.9] md:text-8xl lg:text-9xl" style={{ animationDelay: ".12s" }}>{title}</h1>
        <p className="mt-7 max-w-2xl animate-reveal-up text-base leading-8 text-foreground md:text-lg" style={{ animationDelay: ".25s" }}>{intro}</p>
      </div>
    </section>
  );
}