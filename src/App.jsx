import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("archiveItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("archiveItems", JSON.stringify(items));
  }, [items]);

  const handleAddOrEdit = (item) => {
    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = item;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, item]);
    }
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 ArchiveVault</h1>
      <ItemForm
        onSubmit={handleAddOrEdit}
        editingItem={editingIndex !== null ? items[editingIndex] : null}
      />
      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
