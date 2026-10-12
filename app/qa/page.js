"use client";

import { useState } from "react";

const initialPosts = [
  { id: 1, author: "Mary", avatar: "👩", question: "What does 'grace' mean in Ephesians 2:8?", answer: "God's unmerited favor — a gift, not earned by works.", votes: 12 },
  { id: 2, author: "David", avatar: "👨", question: "How do I start reading the Bible?", answer: "Start with John, then Romans, then Genesis.", votes: 8 },
];

export default function QAPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newQuestion, setNewQuestion] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setPosts([{ id: Date.now(), author: "You", avatar: "🙂", question: newQuestion, answer: "", votes: 0 }, ...posts]);
    setNewQuestion("");
  };

  const vote = (id) =>
    setPosts(posts.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p)));

  return (
    <>
      <header className="page-header">
        <h1>Q&amp;A Feed</h1>
        <p>Ask and answer questions</p>
      </header>

      <form onSubmit={submit} className="row" style={{ marginBottom: "1.5rem" }}>
        <input
          className="input"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question…"
        />
        <button className="btn" type="submit">Post</button>
      </form>

      <div className="stack">
        {posts.map((p) => (
          <article key={p.id} className="feed-item">
            <div className="row">
              <span className="feed-avatar">{p.avatar}</span>
              <strong>{p.author}</strong>
            </div>
            <h3 style={{ marginTop: "0.5rem" }}>{p.question}</h3>
            {p.answer && <p>{p.answer}</p>}
            <div className="feed-actions">
              <button className="btn-ghost" onClick={() => vote(p.id)}>▲ {p.votes}</button>
              <button className="btn-ghost">💬 Reply</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}