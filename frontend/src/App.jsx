import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import TagFilterBar from "./components/TagFilterBar";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
}, []);


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

  const handleTagClick = (tag) => {
    setTagFilter(tag);
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

  // New "hti style" style object
  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      padding: "2rem 1rem",
      fontFamily:
        "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#f8fafc",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "0.5rem",
      textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#94a3b8",
      fontWeight: "300",
    },
    navigation: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "3rem",
      flexWrap: "wrap",
    },
    navButton: {
      padding: "0.75rem 1.5rem",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    activeNavButton: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      color: "white",
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
      transform: "translateY(-2px)",
    },
    inactiveNavButton: {
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      color: "#cbd5e1",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.3)",
    },
    main: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    welcomeSection: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(30, 41, 59, 0.4)",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(71, 85, 105, 0.2)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    },
    welcomeTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    welcomeDescription: {
      fontSize: "1.2rem",
      maxWidth: "700px",
      margin: "0 auto 3rem",
      color: "#cbd5e1",
      lineHeight: "1.7",
    },
    getStartedButton: {
      padding: "1rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#fff",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "3rem",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    featureCard: {
      background: "rgba(17, 24, 39, 0.6)",
      padding: "2rem",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(55, 65, 81, 0.3)",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
    },
    featureTitle: {
      fontWeight: "bold",
      fontSize: "1.3rem",
      marginBottom: "1rem",
      color: "#f8fafc",
    },
    featureDescription: {
      fontSize: "1rem",
      color: "#94a3b8",
      lineHeight: "1.6",
    },
    inputGroup: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      marginBottom: "2rem",
      padding: "1.5rem",
      background: "rgba(30, 41, 59, 0.4)",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.2)",
    },
    input: {
      flex: "1 1 250px",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      border: "1px solid rgba(75, 85, 99, 0.3)",
      fontSize: "1rem",
      backgroundColor: "rgba(17, 24, 39, 0.6)",
      color: "#f8fafc",
      backdropFilter: "blur(5px)",
      transition: "all 0.3s ease",
    },
    clearButton: {
      padding: "0.75rem 1.5rem",
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "bold",
      color: "white",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    },
    footer: {
      marginTop: "6rem",
      background: "rgba(17, 24, 39, 0.8)",
      color: "#e2e8f0",
      padding: "3rem 2rem 2rem",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(55, 65, 81, 0.2)",
    },
    footerContent: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "2rem",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    footerSection: {
      flex: "1 1 250px",
    },
    footerTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#f8fafc",
    },
    footerText: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
      color: "#cbd5e1",
    },
    footerBottom: {
      textAlign: "center",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "1px solid rgba(71, 85, 105, 0.3)",
      fontSize: "0.9rem",
      color: "#94a3b8",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 The Archives</h1>
        <p style={styles.subtitle}>
          Your personal Archives system
        </p>
      </header>

      <nav style={styles.navigation}>
        <button
          onClick={() => setCurrentView("home")}
          style={{
            ...styles.navButton,
            ...(currentView === "home"
              ? styles.activeNavButton
              : styles.inactiveNavButton),
          }}
        >
          🏠 Home
        </button>
        <button
          onClick={() => setCurrentView("items")}
          style={{
            ...styles.navButton,
            ...(currentView === "items"
              ? styles.activeNavButton
              : styles.inactiveNavButton),
          }}
        >
          📝 Items
        </button>
        <button
          onClick={() => setCurrentView("analytics")}
          style={{
            ...styles.navButton,
            ...(currentView === "analytics"
              ? styles.activeNavButton
              : styles.inactiveNavButton),
          }}
        >
          📊 Analytics
        </button>
      </nav>

      <main style={styles.main}>
        {/* Home View */}
        {currentView === "home" && (
          <div style={styles.welcomeSection}>
            <h1 style={styles.welcomeTitle}>
              🧠 Welcome to The Archives
            </h1>
            <p style={styles.welcomeDescription}>
              You can store your important notes, documents, ideas, and memories
              in one organized place. The Archives helps you categorize, search,
              and analyze your personal knowledge base with powerful tagging and
              filtering capabilities.
            </p>
            <button
              style={styles.getStartedButton}
              onClick={() => setCurrentView("items")}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#2563eb";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Get Started
            </button>
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📝</div>
                <div style={styles.featureTitle}>Organize</div>
                <div style={styles.featureDescription}>
                  Add and categorize your items with custom tags
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔍</div>
                <div style={styles.featureTitle}>Search</div>
                <div style={styles.featureDescription}>
                  Find anything instantly with powerful search filters
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <div style={styles.featureTitle}>Analyze</div>
                <div style={styles.featureDescription}>
                  Gain insights from your archived information
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔒</div>
                <div style={styles.featureTitle}>Secure</div>
                <div style={styles.featureDescription}>
                  Your data is safely stored and always accessible
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items View */}
        {currentView === "items" && (
          <>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Search by name or note"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Filter by tag"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                style={styles.input}
              />
              {tagFilter && (
                <button
                  onClick={() => setTagFilter("")}
                  style={styles.clearButton}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#cbd5e1")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#e2e8f0")
                  }
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

            <ItemList
              items={filteredItems}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onTagClick={handleTagClick}
            />
          </>
        )}

        {/* Analytics View */}
        {currentView === "analytics" && <AnalyticsDashboard items={items} />}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>The Archives</h3>
            <p style={styles.footerText}>
              Your personal knowledge management system. Store, organize, and
              discover insights from your important information.
            </p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Features</h3>
            <p style={styles.footerText}>
              • Smart categorization with tags<br />
              • Powerful search and filtering<br />
              • Analytics and insights<br />
              • Secure data storage
            </p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Support</h3>
            <p style={styles.footerText}>
              Need help getting started? Check out our documentation or contact
              support for assistance with your archives.
            </p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>
            © 2025 The Archives. Built for organizing minds and preserving
            knowledge.
            By Mohamed Asad Bandarkar
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
