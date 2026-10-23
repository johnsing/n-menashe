// app/qa/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiMessageSquare, FiThumbsUp, FiSend } from "react-icons/fi";

interface Post {
  id: number;
  author: string;
  avatar: string;
  question: string;
  answer: string;
  votes: number;
}

// Seed content matches the app's Tanakh/Torah focus.
const initialPosts: Post[] = [
  {
    id: 1,
    author: "Miriam",
    avatar: "👩",
    question: "What does 'chesed' mean in Genesis 24:12?",
    answer: "Loving-kindness — faithful covenant loyalty, beyond mere kindness.",
    votes: 12,
  },
  {
    id: 2,
    author: "David",
    avatar: "👨",
    question: "How do I start reading the Torah regularly?",
    answer: "Begin with the weekly parasha — one portion a week with a commentary like Rashi or Sforno.",
    votes: 8,
  },
];

export default function QAPage() {
  const t = useTranslations("qa");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const submitQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: "You",
        avatar: "🙂",
        question: newQuestion,
        answer: "",
        votes: 0,
      },
      ...posts,
    ]);
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
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </header>

      <form onSubmit={submitQuestion} className="form-row" style={{ marginBottom: "2rem" }}>
        <input
          className="input"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder={t("placeholder")}
        />
        <button className="btn" type="submit">
          <FiSend /> {t("post")}
        </button>
      </form>

      <div className="stack">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <div className="row" style={{ gap: "0.5rem" }}>
              <span style={{ fontSize: "1.25rem" }} aria-hidden="true">
                {p.avatar}
              </span>
              <strong style={{ fontSize: "0.95rem" }}>{p.author}</strong>
            </div>

            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>
              {p.question}
            </h3>

            {p.answer && <p className="answer-box">{p.answer}</p>}

            {replyingTo === p.id ? (
              <form onSubmit={(e) => submitReply(e, p.id)} className="form-row">
                <input
                  className="input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t("writeAnswer")}
                />
                <button
                  className="btn"
                  type="submit"
                  style={{ fontSize: "0.85rem", padding: "0.5rem 0.9rem" }}
                >
                  {t("reply")}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setReplyingTo(null)}>
                  {t("cancel")}
                </button>
              </form>
            ) : (
              <div className="row" style={{ gap: "1.25rem" }}>
                <button
                  className="btn-ghost"
                  onClick={() => vote(p.id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    color: "var(--muted)",
                  }}
                >
                  <FiThumbsUp /> {p.votes}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setReplyingTo(p.id);
                    setReplyText(p.answer || "");
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    color: "var(--muted)",
                  }}
                >
                  <FiMessageSquare /> {p.answer ? t("editAnswer") : t("answer")}
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
