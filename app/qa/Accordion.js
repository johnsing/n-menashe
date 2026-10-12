"use client";

import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: "0.75rem",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "1rem",
              background: "#f9f9f9",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {item.question}
          </button>
          {openIndex === i && (
            <p style={{ padding: "1rem", margin: 0 }}>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}