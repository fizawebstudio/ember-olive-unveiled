import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { StoryCarousel } from "@/components/story-carousel";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Ember & Olive" },
      { name: "description", content: "The story, people, and philosophy behind Ember & Olive." },
      { property: "og:title", content: "Our Story | Ember & Olive" },
      { property: "og:description", content: "Fire, season, and Mediterranean generosity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Elemental by nature." intro="A restaurant shaped by flame, the rhythm of the seasons, and the generous tables of the Mediterranean." />

      <section className="px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <StoryCarousel />
        </div>
      </section>

      <section className="border-y border-border bg-muted px-5 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
          {[["2017", "A six-seat supper club begins in Brooklyn."], ["2021", "Ember & Olive opens around a custom-built hearth."], ["Today", "A nightly expression of the Mediterranean, always evolving."]].map(([y, t]) => (
            <Reveal key={y}>
              <p className="font-display text-5xl text-primary">{y}</p>
              <p className="mt-4 leading-7 text-muted-foreground">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
