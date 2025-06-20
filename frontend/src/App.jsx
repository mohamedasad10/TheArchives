import React, { useEffect, useState } from "react";
import axios from "axios";


import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import TagFilterBar from "./components/TagFilterBar";

function App() {
  // Main app state
  const [items, setItems] = useState([]); // All items in the archive
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [tagFilter, setTagFilter] = useState(""); // Tag filter input or clicked tag

  // When a tag is clicked (in TagFilterBar or item), set it as the filter
  const handleTagClick = (tag) => {
    setTagFilter(tag);
  };

  // Fetch all items from backend (on first component mount)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Create or Update an item
  const handleAddOrEdit = (item) => {
    if (editingIndex !== null) {
      // 🔁 Update existing item
      const id = items[editingIndex]._id;
      axios
        .put(`http://localhost:5000/api/items/${id}`, item)
        .then((res) => {
          const updatedItems = [...items];
          updatedItems[editingIndex] = res.data;
          setItems(updatedItems);
          setEditingIndex(null); // exit editing mode
        })
        .catch((err) => console.error("Error updating item:", err));
    } else {
      // Add a new item
      axios
        .post("http://localhost:5000/api/items", item)
        .then((res) => setItems([res.data, ...items])) // insert new item at top
        .catch((err) => console.error("Error adding item:", err));
    }
  };

  // Delete an item by index
  const handleDelete = (index) => {
    const id = items[index]._id;
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        // remove item from state
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // Trigger edit mode for a selected item
  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  // Filter items by search term (name or note) and selected tag
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

      {/* Text input for search */}
      <input
        type="text"
        placeholder="Search by name or note"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "1rem" }}
      />

      {/* Text input for tag filter */}
      <input
        type="text"
        placeholder="Filter by tag"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      />

      {/* Clear tag filter button (only if active) */}
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

      {/* Form to add/edit an item */}
      <ItemForm
        onSubmit={handleAddOrEdit}
        editingItem={editingIndex !== null ? items[editingIndex] : null}
      />

      {/* Dynamic clickable tags (YouTube style) */}
      <TagFilterBar
        tags={[...new Set(items.map(item => item.tag))]} // get unique tags
        onTagClick={handleTagClick}
        currentTag={tagFilter}
      />

      {/* Item display list */}
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
