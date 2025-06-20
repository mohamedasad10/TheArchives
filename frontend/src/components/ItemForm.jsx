import React, { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setNote(editingItem.note || "");
      setTag(editingItem.tag || "");
      setYear(editingItem.year || "");
      setPrice(editingItem.price || "");
      setShowForm(true);
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSubmit({ name, note, tag, year, price });
    setName("");
    setNote("");
    setTag("");
    setYear("");
    setPrice("");
    setShowForm(false);
  };

  const formContainerStyle = {
    marginBottom: "2rem",
    background: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#3182ce",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2f855a",
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      {!showForm && !editingItem && (
        <button onClick={() => setShowForm(true)} style={addButtonStyle}>
          ➕ Add Item
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={formContainerStyle}>
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            placeholder="Year (e.g., 2013)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            style={inputStyle}
          />
          <input
            placeholder="Price (R)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            style={inputStyle}
          />
          <input
            placeholder="Tag (e.g., Medicine)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Short note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {editingItem ? "Update" : "Add"} Item
          </button>
        </form>
      )}
    </div>
  );
}

export default ItemForm;
