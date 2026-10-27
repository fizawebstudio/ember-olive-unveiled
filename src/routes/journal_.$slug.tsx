import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { journalPosts } from "@/data/journal";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/journal_/$slug")({
  loader: ({ params }) => {
    const post = journalPosts.find((entry) => entry.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Journal"} | Ember & Olive` },
    { name: "description", content: loaderData?.excerpt ?? "Stories from Ember & Olive." },
    { property: "og:title", content: `${loaderData?.title ?? "Journal"} | Ember & Olive` },
    { property: "og:description", content: loaderData?.excerpt ?? "Stories from Ember & Olive." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: JournalArticle,
});

function JournalArticle() {
  const post = Route.useLoaderData();
  return <article>
    <header className="px-5 pb-14 pt-36 lg:px-10 lg:pt-44"><div className="mx-auto max-w-5xl"><Link to="/journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-muted-foreground"><ArrowLeft className="size-4"/> Journal</Link><p className="mt-12 text-xs uppercase tracking-[.22em] text-primary">{post.tag} · {post.readTime}</p><h1 className="mt-5 text-balance text-6xl leading-[.9] md:text-8xl">{post.title}</h1><p className="mt-7 text-sm text-muted-foreground">{post.date}</p></div></header>
    <div className="px-5 lg:px-10"><div className="mx-auto max-w-3xl overflow-hidden"><img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover"/></div></div>
    <div className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-3xl"><Reveal><p className="font-display text-3xl leading-relaxed md:text-4xl">{post.intro}</p></Reveal>{post.sections.map((section)=><Reveal key={section.heading} className="mt-14 border-t border-border pt-10"><h2 className="text-4xl">{section.heading}</h2><p className="mt-5 text-base leading-8 text-muted-foreground">{section.body}</p></Reveal>)}</div></div>
  </article>;
}