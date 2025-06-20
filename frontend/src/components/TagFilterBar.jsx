import React from "react";

function TagFilterBar({ tags, onTagClick, currentTag }) {
  if (!tags.length) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        margin: "1.5rem 0",
        justifyContent: "center",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagClick(tag)}
          style={{
            backgroundColor: tag === currentTag ? "#2c7a7b" : "#e2e8f0",
            color: tag === currentTag ? "#fff" : "#2d3748",
            border: "none",
            padding: "0.4rem 0.9rem",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem",
            userSelect: "none",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            if (tag !== currentTag)
              e.currentTarget.style.backgroundColor = "#cbd5e1";
          }}
          onMouseOut={(e) => {
            if (tag !== currentTag)
              e.currentTarget.style.backgroundColor = "#e2e8f0";
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilterBar;
