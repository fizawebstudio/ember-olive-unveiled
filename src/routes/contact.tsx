import { createFileRoute } from "@tanstack/react-router";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Ember & Olive" },
      { name: "description", content: "Visit or contact Ember & Olive in New York." },
      { property: "og:title", content: "Contact | Ember & Olive" },
      { property: "og:description", content: "Find Ember & Olive and plan your visit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const items = [
  { Icon: MapPin, title: "Visit", copy: "42 Mercer Street\nNew York, NY 10013" },
  { Icon: Phone, title: "Call", copy: "+1 212 555 0142" },
  { Icon: Mail, title: "Write", copy: "hello@emberandolive.com" },
];

const field = "w-full border-b border-border bg-transparent py-3 outline-none transition focus:border-primary placeholder:text-muted-foreground";

function Contact() {
  const { submit, status, error, loading } = useFormSubmit();
  return (
    <>
      <PageHero eyebrow="Contact" title="Meet us by the fire." intro="Questions, celebrations, or simply planning your evening—we would be delighted to hear from you." />
      <section className="px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[.25em] text-primary">Find us</p>
            <h2 className="mt-5 text-5xl md:text-6xl">Ember & Olive</h2>
            <div className="mt-10 space-y-8">
               {items.map(({ Icon, title, copy }) => (
                 <article key={title} className="grid grid-cols-[3rem_1fr] gap-5 border-t border-border pt-6">
                   <div className="flex size-12 items-center justify-center border border-primary/40 text-primary"><Icon className="size-5" /></div>
                   <div><h3 className="text-3xl">{title}</h3>
                   <p className="mt-1 whitespace-pre-line text-sm leading-7 text-muted-foreground">{copy}</p></div>
                </article>
              ))}
            </div>
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="text-3xl">Opening hours</h3>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p className="flex justify-between"><span>Tuesday – Thursday</span><span>5–11pm</span></p>
                <p className="flex justify-between"><span>Friday – Saturday</span><span>5pm–12am</span></p>
                <p className="flex justify-between"><span>Sunday</span><span>5–10pm</span></p>
                <p className="flex justify-between"><span>Monday</span><span>Closed</span></p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const f = e.currentTarget; const d = new FormData(f);
                const ok = await submit({ formType: "contact", name: String(d.get("name")), email: String(d.get("email")), phone: String(d.get("phone") ?? ""), subject: String(d.get("subject")) as "General enquiry", message: String(d.get("message")), website: String(d.get("website") ?? "") });
                if (ok) f.reset();
              }}
              className="border border-border bg-muted/40 p-8 backdrop-blur-sm lg:p-10"
            >
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <p className="text-xs uppercase tracking-[.25em] text-primary">Send a message</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Write to us.</h2>
              <div className="mt-9 space-y-7">
                <div>
                  <label htmlFor="name" className="text-xs uppercase tracking-[.18em] text-muted-foreground">Name</label>
                  <input id="name" name="name" required minLength={2} maxLength={100} placeholder="Your full name" className={field} />
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-xs uppercase tracking-[.18em] text-muted-foreground">Email</label>
                    <input id="email" name="email" type="email" required maxLength={255} placeholder="you@email.com" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs uppercase tracking-[.18em] text-muted-foreground">Phone</label>
                    <input id="phone" name="phone" type="tel" maxLength={30} placeholder="Optional" className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-xs uppercase tracking-[.18em] text-muted-foreground">Subject</label>
                  <select id="subject" name="subject" className={field}>
                    <option className="bg-background">General enquiry</option>
                    <option className="bg-background">Private dining</option>
                    <option className="bg-background">Press</option>
                    <option className="bg-background">Careers</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-xs uppercase tracking-[.18em] text-muted-foreground">Message</label>
                  <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Tell us how we can help" className={`${field} resize-none`} />
                </div>
              </div>
              <Button type="submit" disabled={loading} variant="ember" size="lg" className="mt-9 w-full">{loading ? "Sending…" : status === "success" ? "Thank you — we'll be in touch" : "Send message"}</Button>
              {status === "success" && <p role="status" className="mt-4 text-center text-sm text-muted-foreground">Your message has been received. We reply within one business day.</p>}
              {status === "error" && <p role="alert" className="mt-4 text-center text-sm text-destructive">{error}</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
