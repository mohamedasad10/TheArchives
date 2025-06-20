import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  
  const handleTagClick = (tag) => {
    setTagFilter(tag);
  };

  // Fetch items from the backend on first load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleAddOrEdit = (item) => {
    if (editingIndex !== null) {
      const id = items[editingIndex]._id;
      axios
        .put(`http://localhost:5000/api/items/${id}`, item)
        .then((res) => {
          const updatedItems = [...items];
          updatedItems[editingIndex] = res.data;
          setItems(updatedItems);
          setEditingIndex(null);
        })
        .catch((err) => console.error("Error updating item:", err));
    } else {
      axios
        .post("http://localhost:5000/api/items", item)
        .then((res) => setItems([res.data, ...items]))
        .catch((err) => console.error("Error adding item:", err));
    }
  };

  const handleDelete = (index) => {
    const id = items[index]._id;
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = tagFilter
      ? item.tag.toLowerCase() === tagFilter.toLowerCase()
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 The Archives</h1>

      <input
        type="text"
        placeholder="Search by name or note"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

      <input
        type="text"
        placeholder="Filter by tag"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      />

      {/* ✅ Clear Tag Filter Button */}
      {tagFilter && (
        <button
          onClick={() => setTagFilter("")}
          style={{
            marginLeft: "1rem",
            background: "#eee",
            border: "none",
            padding: "0.25rem 0.5rem",
            cursor: "pointer",
          }}
        >
          ❌ Clear Tag Filter
        </button>
      )}

      <ItemForm
        onSubmit={handleAddOrEdit}
        editingItem={editingIndex !== null ? items[editingIndex] : null}
      />

      {/*  Pass handleTagClick to ItemList */}
      <ItemList
        items={filteredItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onTagClick={handleTagClick}
      />
    </div>
  );
}

export default App;
