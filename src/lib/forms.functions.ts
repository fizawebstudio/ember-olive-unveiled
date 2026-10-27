import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const base = { submissionKey: z.string().uuid(), website: z.string().max(0).optional() };

const schema = z.discriminatedUnion("formType", [
  z.object({
    ...base,
    formType: z.literal("contact"),
    name: z.string().trim().min(2, "Please enter your name").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: z.string().trim().max(30).regex(/^[+\d\s().-]*$/, "Invalid phone number").optional().or(z.literal("")),
    subject: z.enum(["General enquiry", "Private dining", "Press", "Careers"]),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  }),
  z.object({
    ...base,
    formType: z.literal("reservation"),
    name: z.string().trim().min(2, "Please enter your name").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date"),
    guests: z.coerce.number().int().min(1).max(8, "For 9+ guests, contact our events team"),
  }),
  z.object({
    ...base,
    formType: z.literal("newsletter"),
    email: z.string().trim().email("Please enter a valid email").max(255),
  }),
]);

export type FormInput = z.input<typeof schema>;

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const r = schema.safeParse(d);
    if (!r.success) throw new Error(r.error.issues[0]?.message ?? "Invalid submission");
    return r.data;
  })
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const, duplicate: false }; // honeypot: silently drop bots
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    // Duplicate protection: same key = same submission; same email+form within 60s = blocked.
    const { data: existing } = await supabaseAdmin
      .from("form_submissions").select("id").eq("submission_key", data.submissionKey).maybeSingle();
    if (existing) return { ok: true as const, duplicate: true };
    const since = new Date(Date.now() - 60_000).toISOString();
    const { count } = await supabaseAdmin.from("form_submissions").select("id", { count: "exact", head: true })
      .eq("email", email).eq("form_type", data.formType).gte("created_at", since);
    if ((count ?? 0) > 0) throw new Error("You just submitted this form. Please wait a minute before trying again.");
    if (data.formType === "newsletter") {
      const { count: subs } = await supabaseAdmin.from("form_submissions").select("id", { count: "exact", head: true })
        .eq("email", email).eq("form_type", "newsletter");
      if ((subs ?? 0) > 0) return { ok: true as const, duplicate: true };
    }

    const row = {
      form_type: data.formType,
      submission_key: data.submissionKey,
      email,
      name: "name" in data ? data.name : null,
      phone: data.formType === "contact" ? data.phone || null : null,
      subject: data.formType === "contact" ? data.subject : null,
      message: data.formType === "contact" ? data.message : null,
      reservation_date: data.formType === "reservation" ? data.date : null,
      guests: data.formType === "reservation" ? data.guests : null,
    };
    const { data: inserted, error } = await supabaseAdmin.from("form_submissions").insert(row).select("id").single();
    if (error) {
      if (error.code === "23505") return { ok: true as const, duplicate: true };
      console.error("Insert failed", error);
      throw new Error("We couldn't save your submission. Please try again.");
    }

    // Owner notification (submission is already saved even if email fails).
    let emailStatus = "sent", emailError: string | null = null;
    try {
      const LOVABLE_API_KEY = process.env["LOVABLE_API_KEY"];
      const RESEND_API_KEY = process.env["RESEND_API_KEY"];
      const { data: settings } = await supabaseAdmin.from("site_settings").select("owner_email").eq("id", true).maybeSingle();
      const OWNER = settings?.owner_email || process.env["OWNER_NOTIFICATION_EMAIL"];
      if (!LOVABLE_API_KEY || !RESEND_API_KEY || !OWNER) throw new Error("Owner notification email not set — add it in the owner dashboard");
      const labels: Record<string, string> = { contact: "Contact message", reservation: "Reservation request", newsletter: "Newsletter signup" };
      const rows = Object.entries(row).filter(([k, v]) => v != null && !["submission_key"].includes(k))
        .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;text-transform:capitalize">${esc(k.replace(/_/g, " "))}</td><td style="padding:6px 12px">${esc(v)}</td></tr>`).join("");
      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}`, "X-Connection-Api-Key": RESEND_API_KEY },
        body: JSON.stringify({
          from: process.env["RESEND_FROM"] || "Ember & Olive <onboarding@resend.dev>",
          to: [OWNER],
          reply_to: email,
          subject: `New ${labels[data.formType]} — Ember & Olive`,
          html: `<div style="font-family:Arial,sans-serif;background:#fff"><h2>New ${labels[data.formType]}</h2><table>${rows}</table></div>`,
        }),
      });
      if (!res.ok) throw new Error(`Resend [${res.status}]: ${await res.text()}`);
    } catch (e) {
      emailStatus = "failed"; emailError = e instanceof Error ? e.message.slice(0, 500) : "unknown";
      console.error("Owner notification failed", emailError);
    }
    await supabaseAdmin.from("form_submissions").update({ email_status: emailStatus, email_error: emailError }).eq("id", inserted.id);
    return { ok: true as const, duplicate: false };
  });
