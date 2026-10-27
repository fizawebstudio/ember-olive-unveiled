import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Owner Dashboard | Ember & Olive" },
      { name: "description", content: "Manage notification email and view form submissions." },
      { property: "og:title", content: "Owner Dashboard | Ember & Olive" },
      { property: "og:description", content: "Private owner dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Sub = { id: string; form_type: string; name: string | null; email: string; phone: string | null; subject: string | null; message: string | null; reservation_date: string | null; guests: number | null; email_status: string; created_at: string };

function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data: admin } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      setIsAdmin(!!admin);
      if (!admin) return;
      const [{ data: s }, { data: rows }] = await Promise.all([
        supabase.from("site_settings").select("owner_email").eq("id", true).maybeSingle(),
        supabase.from("form_submissions").select("*").order("created_at", { ascending: false }).limit(200),
      ]);
      setOwnerEmail(s?.owner_email ?? "");
      setSubs((rows ?? []) as Sub[]);
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const v = ownerEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.length > 255) return setMsg({ ok: false, text: "Please enter a valid email address." });
    setSaving(true); setMsg(null);
    const { error } = await supabase.from("site_settings").update({ owner_email: v, updated_at: new Date().toISOString() }).eq("id", true);
    setSaving(false);
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Saved. New submissions will be emailed to this address." });
  }

  async function signOut() { await supabase.auth.signOut(); navigate({ to: "/auth" }); }

  if (isAdmin === null) return <section className="min-h-screen px-5 pt-40 text-center text-muted-foreground">Loading…</section>;
  if (!isAdmin) return (
    <section className="min-h-screen px-5 pt-40 text-center">
      <h1 className="text-4xl">No access</h1>
      <p className="mt-4 text-muted-foreground">This account is not the site owner.</p>
      <Button variant="ember" className="mt-8" onClick={signOut}>Sign out</Button>
    </section>
  );

  const shown = filter === "all" ? subs : subs.filter((s) => s.form_type === filter);
  return (
    <section className="min-h-screen px-5 pt-36 pb-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[.25em] text-primary">Owner dashboard</p><h1 className="mt-3 text-5xl">Submissions & settings</h1></div>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>

        <form onSubmit={save} className="mt-12 border border-border bg-muted/40 p-8">
          <h2 className="text-3xl">Notification email</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every contact, reservation and newsletter submission is emailed here (Gmail or any address).</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Input type="email" required value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="owner@gmail.com" className="h-12 rounded-none bg-transparent" />
            <Button type="submit" disabled={saving} variant="ember" size="lg">{saving ? "Saving…" : "Save email"}</Button>
          </div>
          {msg && <p role="alert" className={`mt-4 text-sm ${msg.ok ? "text-foreground" : "text-destructive"}`}>{msg.text}</p>}
        </form>

        <div className="mt-12 flex flex-wrap gap-2">
          {["all", "contact", "reservation", "newsletter"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`border px-4 py-2 text-xs uppercase tracking-[.18em] ${filter === f ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{f}</button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {shown.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
          {shown.map((s) => (
            <article key={s.id} className="border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[.18em]">
                <span className="text-primary">{s.form_type}</span>
                <span className="text-muted-foreground">{new Date(s.created_at).toLocaleString()} · email {s.email_status}</span>
              </div>
              <p className="mt-3 text-lg">{s.name ?? s.email} {s.name && <span className="text-sm text-muted-foreground">— {s.email}</span>}</p>
              {s.phone && <p className="text-sm text-muted-foreground">{s.phone}</p>}
              {s.subject && <p className="mt-2 text-sm">{s.subject}</p>}
              {s.message && <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{s.message}</p>}
              {s.reservation_date && <p className="mt-2 text-sm">{s.reservation_date} · {s.guests} guests</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
