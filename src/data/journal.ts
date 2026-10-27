import plating from "@/assets/plating-fire.jpg";
import dishes from "@/assets/signature-dishes.jpg";
import cocktail from "@/assets/cocktail-pour.jpg";

export type JournalPost = {
  slug: string;
  image: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "art-of-the-open-flame",
    image: plating,
    tag: "Craft",
    title: "The Art of the Open Flame",
    excerpt: "Why restraint is the first lesson of cooking with fire.",
    date: "August 18, 2026",
    readTime: "5 min read",
    intro: "Fire is not simply a source of heat. It is an ingredient—alive, unpredictable, and capable of revealing the clearest expression of produce when handled with patience.",
    sections: [
      { heading: "Learning to listen", body: "A hearth changes by the minute. The cook reads the glow of the coals, the movement of smoke, and the sound of fat meeting iron. That attention matters more than force." },
      { heading: "Smoke with purpose", body: "We choose olive wood for warmth and fruit wood for sweetness, using smoke as seasoning rather than spectacle. The best result carries a memory of the flame without losing the ingredient beneath it." },
    ],
  },
  {
    slug: "olive-oil-three-ways",
    image: dishes,
    tag: "Ingredients",
    title: "Olive Oil, Three Ways",
    excerpt: "A journey from grassy Ligurian oils to peppery harvest blends.",
    date: "July 30, 2026",
    readTime: "4 min read",
    intro: "Olive oil is our first seasoning and often our last. Its character shifts with place, harvest, and how it meets heat.",
    sections: [
      { heading: "For finishing", body: "Young, peppery oils lend structure to raw fish, warm beans, and bitter leaves. We pour them at the last moment so their fragrance remains vivid." },
      { heading: "For the hearth", body: "Rounder, softer oils carry garlic and herbs over heat. They become the foundation of marinades and the gloss on vegetables straight from the coals." },
    ],
  },
  {
    slug: "smoke-and-citrus",
    image: cocktail,
    tag: "The Bar",
    title: "A Study in Smoke & Citrus",
    excerpt: "Building cocktails that echo the language of the kitchen.",
    date: "July 12, 2026",
    readTime: "6 min read",
    intro: "At the bar, smoke brings depth while citrus keeps every drink lifted. The balance mirrors the kitchen: elemental, generous, and never overworked.",
    sections: [
      { heading: "Brightness first", body: "Blood orange, preserved lemon, and bergamot give our drinks their architecture. Acidity opens the palate before smoke adds its long finish." },
      { heading: "A quiet trace of fire", body: "We char rosemary, toast spice, and rinse glassware with aromatic smoke. Each technique is brief and deliberate, leaving a trace rather than a curtain." },
    ],
  },
];