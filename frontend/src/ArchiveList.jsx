import { useEffect, useState } from "react";
import axios from "axios";

function ArchiveList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h2>📦 Archive Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <strong>{item.name}</strong> ({item.year})<br />
              💰 R{item.price}<br />
              🏷️ {item.tag}<br />
              📝 {item.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchiveList;
