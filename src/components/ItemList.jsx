function ItemList({ items, onDelete, onEdit, searchTerm, setSearchTerm, tagFilter, setTagFilter }) {
  // Show a message if no items are passed in
  if (!items.length) return <p>No items saved yet.</p>;

  return (
    <div>
      {/* 🔍 Search Input */}
      <input
        placeholder="Search name or note"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", display: "block" }}
      />

      {/* 🏷️ Tag Filter Input */}
      <input
        placeholder="Filter by tag (e.g., medicine)"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        style={{ marginBottom: "1rem", display: "block" }}
      />

      {/* 📋 List of Items */}
      <ul>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> — {item.note} [{item.tag}]
            <div>
              <button onClick={() => onEdit(i)}>Edit</button>
              <button onClick={() => onDelete(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
