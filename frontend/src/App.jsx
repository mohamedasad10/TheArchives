import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import TagFilterBar from "./components/TagFilterBar";
import SpendingSummary from "./SpendingSummary";
import AnalyticsDashboard from "./components/AnalyticsDashboard"; 

function App() {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentView, setCurrentView] = useState("items"); // New state for view switching

  const handleTagClick = (tag) => {
    setTagFilter(tag);
  };

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

  const containerStyle = {
    padding: "2rem 1rem",
    maxWidth: "1200px", // Increased max width for analytics
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
  };

  const inputGroupStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const inputStyle = {
    flex: "1 1 200px",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    minWidth: "150px",
  };

  const clearButtonStyle = {
    padding: "0.4rem 0.8rem",
    background: "#e2e8f0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#2d3748",
    height: "fit-content",
  };

  // Navigation button styles
  const navButtonStyle = {
    padding: "0.6rem 1.2rem",
    margin: "0.25rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  };

  const activeNavButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "#3182ce",
    color: "white",
  };

  const inactiveNavButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "#e2e8f0",
    color: "#2d3748",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>🧠 The Archives</h1>

      {/* Navigation */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => setCurrentView("items")}
          style={currentView === "items" ? activeNavButtonStyle : inactiveNavButtonStyle}
        >
          📝 Items & Management
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          style={currentView === "analytics" ? activeNavButtonStyle : inactiveNavButtonStyle}
        >
          📊 Analytics & Insights
        </button>
      </div>

      {/* Items View */}
      {currentView === "items" && (
        <>
          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Search by name or note"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Filter by tag"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              style={inputStyle}
            />
            {tagFilter && (
              <button
                onClick={() => setTagFilter("")}
                style={clearButtonStyle}
                onMouseOver={(e) => (e.currentTarget.style.background = "#cbd5e1")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#e2e8f0")}
              >
                ❌ Clear
              </button>
            )}
          </div>

          <ItemForm
            onSubmit={handleAddOrEdit}
            editingItem={editingIndex !== null ? items[editingIndex] : null}
          />

          <TagFilterBar
            tags={[...new Set(items.map((item) => item.tag))]}
            onTagClick={handleTagClick}
            currentTag={tagFilter}
          />

          <SpendingSummary items={items} />

          <ItemList
            items={filteredItems}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onTagClick={handleTagClick}
          />
        </>
      )}

      {/* Analytics View */}
      {currentView === "analytics" && (
        <AnalyticsDashboard items={items} />
      )}
    </div>
  );
}

export default App;