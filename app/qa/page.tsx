// app/qa/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { FiMessageSquare, FiThumbsUp, FiSend } from "react-icons/fi";

interface Post {
  id: number;
  author: string;
  avatar: string;
  question: string;
  answer: string;
  votes: number;
}

const initialPosts: Post[] = [
  { id: 1, author: "Mary", avatar: "👩", question: "What does 'grace' mean in Ephesians 2:8?", answer: "God's unmerited favor — a gift, not earned by works.", votes: 12 },
  { id: 2, author: "David", avatar: "👨", question: "How do I start reading the Bible?", answer: "Start with John, then Romans, then Genesis.", votes: 8 },
];

export default function QAPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const submitQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setPosts([{ id: Date.now(), author: "You", avatar: "🙂", question: newQuestion, answer: "", votes: 0 }, ...posts]);
    setNewQuestion("");
  };

  const submitReply = (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setPosts(posts.map((p) => (p.id === id ? { ...p, answer: replyText } : p)));
    setReplyingTo(null);
    setReplyText("");
  };

  const vote = (id: number) =>
    setPosts(posts.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p)));

  return (
    <main className="container">
      <header className="page-header">
        <h1>Q&amp;A Community Feed</h1>
        <p>Ask questions and share insights with the community</p>
      </header>

      <form onSubmit={submitQuestion} className="form-row" style={{ marginBottom: "2rem" }}>
        <input
          className="input"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question or share a thought…"
        />
        <button className="btn" type="submit">
          <FiSend /> Post
        </button>
      </form>

      <div className="stack">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <div className="row" style={{ gap: "0.5rem" }}>
              <span style={{ fontSize: "1.25rem" }} aria-hidden="true">{p.avatar}</span>
              <strong style={{ fontSize: "0.95rem" }}>{p.author}</strong>
            </div>

            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>{p.question}</h3>

            {p.answer && <p className="answer-box">{p.answer}</p>}

            {replyingTo === p.id ? (
              <form onSubmit={(e) => submitReply(e, p.id)} className="form-row">
                <input
                  className="input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write an answer..."
                />
                <button className="btn" type="submit" style={{ fontSize: "0.85rem", padding: "0.5rem 0.9rem" }}>Reply</button>
                <button type="button" className="btn-ghost" onClick={() => setReplyingTo(null)}>Cancel</button>
              </form>
            ) : (
              <div className="row" style={{ gap: "1.25rem" }}>
                <button
                  className="btn-ghost"
                  onClick={() => vote(p.id)}
                  style={{ cursor: "pointer", display: "flex", gap: "5px", alignItems: "center", color: "var(--muted)" }}
                >
                  <FiThumbsUp /> {p.votes}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => { setReplyingTo(p.id); setReplyText(p.answer || ""); }}
                  style={{ cursor: "pointer", display: "flex", gap: "5px", alignItems: "center", color: "var(--muted)" }}
                >
                  <FiMessageSquare /> {p.answer ? "Edit Answer" : "Answer"}
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
