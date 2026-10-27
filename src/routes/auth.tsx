import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner Sign In | Ember & Olive" },
      { name: "description", content: "Private sign-in for the Ember & Olive owner dashboard." },
      { property: "og:title", content: "Owner Sign In | Ember & Olive" },
      { property: "og:description", content: "Private owner dashboard access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email")).trim(), password = String(d.get("password"));
    setLoading(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setMsg({ ok: false, text: error.message });
      navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setLoading(false);
      if (error) return setMsg({ ok: false, text: error.message });
      if (data.session) return navigate({ to: "/admin" });
      setMsg({ ok: true, text: "Check your inbox to confirm your email, then sign in." });
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-5 pt-28 pb-20">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-border bg-muted/40 p-8 backdrop-blur-sm lg:p-10">
        <p className="text-xs uppercase tracking-[.25em] text-primary">Owner dashboard</p>
        <h1 className="mt-4 text-4xl md:text-5xl">{mode === "in" ? "Sign in." : "Create owner account."}</h1>
        <div className="mt-8 space-y-5">
          <Input name="email" type="email" required placeholder="Email" className="h-12 rounded-none bg-transparent" />
          <Input name="password" type="password" required minLength={8} placeholder="Password (min 8 characters)" className="h-12 rounded-none bg-transparent" />
        </div>
        <Button type="submit" disabled={loading} variant="ember" size="lg" className="mt-8 w-full">{loading ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</Button>
        {msg && <p role="alert" className={`mt-4 text-center text-sm ${msg.ok ? "text-foreground" : "text-destructive"}`}>{msg.text}</p>}
        <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="mt-6 w-full text-center text-xs uppercase tracking-[.18em] text-muted-foreground hover:text-primary">
          {mode === "in" ? "First time? Create the owner account" : "Already have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
