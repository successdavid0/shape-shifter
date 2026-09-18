import { collection } from "@/lib/content";

export default function Home() {
  return (
    <section id="top" className="mesh-bg flex min-h-screen items-center px-8 pt-[var(--header-h)]">
      <h1 className="font-display text-display font-extrabold uppercase">
        <span className="chroma">{collection.name}</span>
      </h1>
    </section>
  );
}
