import React, { useEffect, useState } from "react"; // Import React hooks
import ItemForm from "./components/ItemForm"; // Form component to add/edit items
import ItemList from "./components/ItemList"; // Component to display the list of items

function App() {
  // Load items from localStorage (if available) when the app starts
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("archiveItems"); // Get saved data from localStorage
    return saved ? JSON.parse(saved) : []; // If data exists, parse it; else start with empty array
  });

  const [editingIndex, setEditingIndex] = useState(null); // Keeps track of which item is being edited
  const [searchTerm, setSearchTerm] = useState(""); // Stores current text in search input
  const [tagFilter, setTagFilter] = useState("");   // Stores current text in tag filter input

  // Save the current `items` list to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("archiveItems", JSON.stringify(items));
  }, [items]);

  // Add a new item or update an existing one
  const handleAddOrEdit = (item) => {
    if (editingIndex !== null) {
      // If editing, update the item at the specific index
      const updated = [...items];
      updated[editingIndex] = item;
      setItems(updated);
      setEditingIndex(null); // Reset editing mode
    } else {
      // Otherwise, add a new item
      setItems([...items, item]);
    }
  };

  // Delete item at the given index
  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index); // Remove item by filtering
    setItems(filtered); // Update state
  };

  // Set the item index to edit
  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  // Filter the items based on search term and tag
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match name
      item.note.toLowerCase().includes(searchTerm.toLowerCase());   // Match note

    const matchesTag = tagFilter
      ? item.tag.toLowerCase() === tagFilter.toLowerCase() // Match exact tag if filter is set
      : true; // If no tag filter, accept all

    return matchesSearch && matchesTag; // Include item only if both match
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 The Archives</h1>

      {/* Input for searching by name or note */}
      <input
        type="text"
        placeholder="Search by name or note"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
        style={{ marginRight: "1rem" }}
      />

      {/* Input for filtering by tag */}
      <input
        type="text"
        placeholder="Filter by tag"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)} // Update tagFilter state
      />

      {/* Form to add or edit an item */}
      <ItemForm
        onSubmit={handleAddOrEdit}
        editingItem={editingIndex !== null ? items[editingIndex] : null} // Pass item to edit
      />

      {/* Display list of filtered items */}
      <ItemList
        items={filteredItems}  // Show only items matching search and tag
        onDelete={handleDelete} // Pass delete handler
        onEdit={handleEdit}     // Pass edit handler
      />
    </div>
  );
}

export default App;
