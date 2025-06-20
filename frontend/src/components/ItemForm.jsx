import React, { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem }) {
  // Add states for year and price
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
    if (!name) return; // basic validation

    // convert year and price to numbers before sending
    const itemData = {
      name,
      note,
      tag,
      year: year ? Number(year) : null,
      price: price ? Number(price) : null,
    };

    onSubmit(itemData);

    // reset form fields after submit
    setName("");
    setNote("");
    setTag("");
    setYear("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year (e.g., 2013)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price (R)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tag (e.g., Medicine)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        type="text"
        placeholder="Short note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">{editingItem ? "Update" : "Add"} Item</button>
    </form>
  );
}

export default ItemForm;
