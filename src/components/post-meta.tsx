import { Link } from "@tanstack/react-router";
import { getDesk } from "@/lib/content/desks";
import type { Post } from "@/lib/content/posts";
import { formatDate } from "@/lib/format";

export function PostMeta({ post }: { post: Post }) {
  const desk = getDesk(post.desk);
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      {desk ? (
        <Link to="/desk/$desk" params={{ desk: desk.id }} className="kicker">
          {desk.label}
        </Link>
      ) : null}
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.minutes} min read</span>
    </p>
  );
}
