import React from "react";

function TagFilterBar({ tags, onTagClick, currentTag }) {
  if (!tags.length) return null;

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0" }}>
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagClick(tag)}
          style={{
            background: tag === currentTag ? "#333" : "#eee",
            color: tag === currentTag ? "#fff" : "#000",
            border: "none",
            padding: "0.4rem 0.8rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilterBar;
