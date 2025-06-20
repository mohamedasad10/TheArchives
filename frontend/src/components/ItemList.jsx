import React from "react";

function ItemList({ items, onDelete, onEdit, onTagClick }) {
  if (!items.length)
    return (
      <p style={{ fontStyle: "italic", color: "#555", marginTop: "2rem" }}>
        No items saved yet.
      </p>
    );

  return (
    <ul
      style={{
        padding: 0,
        listStyle: "none",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {items.map((item, i) => (
        <li
          key={item._id || i}
          style={{
            marginBottom: "1.25rem",
            padding: "1rem 1.25rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#fafafa",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <strong style={{ fontSize: "1.1rem" }}>{item.name}</strong> —{" "}
          <span style={{ color: "#666" }}>{item.note || <em>No note</em>}</span>
          <br />

          {/* Tag as clickable pill */}
          <button
            onClick={() => onTagClick(item.tag)}
            style={{
              backgroundColor: "#e2e8f0",
              border: "none",
              borderRadius: "9999px",
              padding: "0.3rem 0.7rem",
              cursor: "pointer",
              fontSize: "0.85rem",
              marginTop: "0.4rem",
              color: "#2d3748",
              fontWeight: "600",
              userSelect: "none",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#cbd5e1")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#e2e8f0")
            }
          >
            🏷️ {item.tag}
          </button>

          <br />

          <small style={{ color: "#555", marginTop: "0.25rem", display: "block" }}>
            Year: {item.year ?? "N/A"} | Price:{" "}
            {item.price !== null && item.price !== undefined
              ? `R${item.price}`
              : "N/A"}
          </small>

          <div style={{ marginTop: "0.75rem" }}>
            <button
              onClick={() => onEdit(i)}
              style={{
                marginRight: "0.5rem",
                padding: "0.35rem 0.7rem",
                borderRadius: "5px",
                border: "1px solid #2c7a7b",
                backgroundColor: "#2c7a7b",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#285e61")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2c7a7b")}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${items[i].name}"? This action cannot be undone.`
                  )
                ) {
                  onDelete(i);
                }
              }}
              style={{
                padding: "0.35rem 0.7rem",
                borderRadius: "5px",
                border: "1px solid #e53e3e",
                backgroundColor: "#e53e3e",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#9b2c2c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e53e3e")}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
