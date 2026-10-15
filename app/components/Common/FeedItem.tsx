import Button from "./Button";
import type { Post } from "../../types";

interface FeedItemProps {
  post: Post;
  onVote: (id: number) => void;
}

export default function FeedItem({ post, onVote }: FeedItemProps) {
  return (
    <article className="feed-item">
      <div className="row">
        <span className="feed-avatar">{post.avatar}</span>
        <strong>{post.author}</strong>
      </div>
      <h3 style={{ marginTop: "0.5rem" }}>{post.question}</h3>
      {post.answer && <p>{post.answer}</p>}
      <div className="feed-actions">
        <Button variant="ghost" onClick={() => onVote(post.id)}>
          ▲ {post.votes}
        </Button>
        <Button variant="ghost">💬 Reply</Button>
      </div>
    </article>
  );
}
