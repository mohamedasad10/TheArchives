import { useState, useEffect } from "react";

function ItemForm({ onSubmit, editingItem }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setNote(editingItem.note);
      setTag(editingItem.tag);
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSubmit({ name, note, tag });
    setName("");
    setNote("");
    setTag("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Short note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        placeholder="Tag (e.g., Medicine)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button type="submit">{editingItem ? "Update" : "Add"} Item</button>
    </form>
  );
}

export default ItemForm;
