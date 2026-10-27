import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const links = [["Our Story","/our-story"],["Menu","/menu"],["Team","/team"],["Gallery","/gallery"],["Journal","/journal"],["Contact","/contact"]] as const;

export function SiteHeader() {
  const [open,setOpen]=useState(false); const [compact,setCompact]=useState(false);
  const path=useRouterState({select:s=>s.location.pathname});
  useEffect(()=>{const f=()=>setCompact(scrollY>40); addEventListener("scroll",f,{passive:true}); f(); return()=>removeEventListener("scroll",f)},[]);
  useEffect(()=>setOpen(false),[path]);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${compact?"border-border bg-background/90 py-3 backdrop-blur-xl":"border-transparent bg-background/55 py-5 backdrop-blur-sm"}`}>
    <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 lg:px-10">
      <Link to="/" className="font-display text-xl uppercase tracking-[0.2em] text-foreground">Ember <span className="text-primary">&</span> Olive</Link>
      <nav className="hidden items-center gap-7 lg:flex">{links.map(([n,to])=><Link key={to} to={to} className="relative text-[11px] uppercase tracking-[0.16em] text-foreground/70 transition hover:text-foreground" activeProps={{className:"text-primary"}}>{n}</Link>)}</nav>
       <div className="hidden items-center gap-2 lg:flex"><Button asChild variant="ember" size="lg"><Link to="/reservations">Reserve</Link></Button></div>
       <div className="flex items-center gap-2 lg:hidden"><Button type="button" variant="ghost" size="icon" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>
    </div>
     {open&&<div className="border-t border-border bg-background px-5 py-8 lg:hidden"><nav className="flex flex-col gap-5">{links.map(([n,to])=><Link key={to} to={to} className="font-display text-3xl">{n}</Link>)}<Link to="/reservations" className="mt-3 text-xs uppercase tracking-[.18em] text-primary">Reserve a table</Link></nav></div>}
  </header>
}

export function SiteFooter(){return <footer className="border-t border-border bg-background px-5 py-16 lg:px-10"><div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3"><div><p className="font-display text-3xl uppercase tracking-[.16em]">Ember <span className="text-primary">&</span> Olive</p><p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">Mediterranean soul, shaped by fire. An intimate dining room in the heart of the city.</p></div><div className="grid grid-cols-2 gap-8 text-sm"><div><p className="mb-4 text-xs uppercase tracking-[.2em] text-primary">Visit</p><p className="leading-7 text-muted-foreground">42 Mercer Street<br/>New York, NY 10013</p></div><div><p className="mb-4 text-xs uppercase tracking-[.2em] text-primary">Hours</p><p className="leading-7 text-muted-foreground">Tue–Thu 5–11pm<br/>Fri–Sat 5pm–12am<br/>Sun 5–10pm</p></div></div><div className="md:text-right"><Link to="/reservations" className="group inline-flex items-center gap-3 font-display text-3xl">Join us <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link><p className="mt-8 text-xs uppercase tracking-[.18em] text-muted-foreground">© 2026 Ember & Olive</p></div></div></footer>}