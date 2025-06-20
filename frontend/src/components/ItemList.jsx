import React from "react";

function ItemList({ items, onDelete, onEdit, onTagClick }) {
  if (!items.length) return <p>No items saved yet.</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li
          key={item._id || i}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <strong>{item.name}</strong> — {item.note}<br />

          {/*  Tag as clickable button */}
          <button
            onClick={() => onTagClick(item.tag)}
            style={{
              background: "#eee",
              border: "none",
              borderRadius: "5px",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginTop: "0.25rem",
            }}
          >
            🏷️ {item.tag}
          </button>

          <br />
          <small>
            Year: {item.year ?? "N/A"} | Price: {item.price ? `R${item.price}` : "N/A"}
          </small>
          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={() => onEdit(i)} style={{ marginRight: "0.5rem" }}>
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete "${items[i].name}"? This action cannot be undone.`)) {
                  onDelete(i);
                }
              }}
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
