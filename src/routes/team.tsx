import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import chef from "@/assets/chef-mara.jpg";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";
import kitchen from "@/assets/grill-fire.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Ember & Olive" },
      { name: "description", content: "Meet the chefs, bartenders, and hosts behind Ember & Olive." },
      { property: "og:title", content: "Our Team | Ember & Olive" },
      { property: "og:description", content: "The people who keep the hearth burning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Team,
});

const team: [string, string, string, string][] = [
  [chef, "Mara Vella", "Founder & Executive Chef", "Raised between Valletta and Marseille, Mara built Ember & Olive around a single hearth and a Mediterranean table."],
  [t1, "Luca Ferretti", "Head Chef", "Fifteen years across Florence and Lisbon. Luca runs the fire station and writes the nightly specials."],
  [t2, "Sofia Marchetti", "Sous Chef", "A pastry-trained perfectionist who now leads the vegetable and hearth-bread sections."],
  [t3, "Andre Kovač", "Head Bartender", "Builds cocktails with smoke, citrus, and Mediterranean botanicals grown on our own roof."],
  [t4, "Elena Rossi", "Restaurant Manager", "The first face you meet. Elena shapes the rhythm of every evening in the dining room."],
];

function Team() {
  return (
    <>
      <PageHero eyebrow="Our team" title="The people behind the fire." intro="A small brigade of chefs, bartenders, and hosts who cook, pour, and welcome with the same intent." />

      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(([img, name, role, bio]) => (
            <Reveal key={name}>
              <article className="group">
                <div className="overflow-hidden">
                  <img src={img} loading="lazy" width={1024} height={1280} alt={`${name}, ${role}`} className="aspect-[4/5] w-full object-cover transition duration-[900ms] group-hover:scale-105" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[.22em] text-primary">{role}</p>
                <h2 className="mt-3 text-4xl transition group-hover:text-primary">{name}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border">
        <img src={kitchen} loading="lazy" width={1280} height={1024} alt="The Ember & Olive kitchen at service" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center lg:px-10">
          <p className="text-xs uppercase tracking-[.25em] text-primary">Join the brigade</p>
          <h2 className="mt-5 text-5xl md:text-7xl">We are always looking for good people.</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground">Chefs, servers, and bartenders who care about craft and hospitality in equal measure—write to us.</p>
          <Button asChild variant="ember" size="lg" className="mt-9"><Link to="/contact">Get in touch</Link></Button>
        </div>
      </section>
    </>
  );
}
