function ItemList({ items, onDelete, onEdit }) {
  // Show a message if no items are passed in
  if (!items.length) return <p>No items saved yet.</p>;

  return (
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
  );
}

export default ItemList;
