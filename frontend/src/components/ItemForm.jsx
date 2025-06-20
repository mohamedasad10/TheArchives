import React, { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setNote(editingItem.note || "");
      setTag(editingItem.tag || "");
      setYear(editingItem.year ? String(editingItem.year) : "");
      setPrice(editingItem.price ? String(editingItem.price) : "");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const itemData = {
      name: name.trim(),
      note: note.trim(),
      tag: tag.trim(),
      year: year ? Number(year) : null,
      price: price ? Number(price) : null,
    };

    onSubmit(itemData);

    setName("");
    setNote("");
    setTag("");
    setYear("");
    setPrice("");
  };

  const inputStyle = {
    padding: "0.5rem",
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#2c7a7b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        style={inputStyle}
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Year (e.g., 2013)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="0"
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Price (R)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        step="0.01"
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Tag (e.g., Medicine)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Short note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#285e61")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2c7a7b")}
      >
        {editingItem ? "Update" : "Add"} Item
      </button>
    </form>
  );
}

export default ItemForm;
