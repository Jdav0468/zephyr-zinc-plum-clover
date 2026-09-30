import type { Block } from "@/lib/content/posts";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-brief text-base leading-relaxed text-ink-soft">
      {blocks.map((block, i) => {
        if (block.type === "p") return <p key={i}>{block.text}</p>;
        if (block.type === "h") {
          return (
            <h2 key={i} className="text-ink">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <aside key={i} className="border border-navy bg-wash px-4 py-4 text-ink sm:px-5">
            <p className="kicker">{block.title}</p>
            <p className="mt-2 text-base leading-relaxed">{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}
