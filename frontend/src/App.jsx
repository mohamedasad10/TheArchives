import React, { useEffect, useState } from "react";
import axios from "axios";

// Import custom components
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import TagFilterBar from "./components/TagFilterBar";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  // State management for the application
  const [items, setItems] = useState([]); // Array to store all items
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited (null when adding new)
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [tagFilter, setTagFilter] = useState(""); // Tag filter value
  const [currentView, setCurrentView] = useState("home"); // Current active view/tab

  // Effect to remove default browser margins and padding
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  // Effect to fetch items from API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Handler for adding new items or editing existing ones
  const handleAddOrEdit = (item) => {
    console.log("handleAddOrEdit called with:", item);
    console.log("editingIndex:", editingIndex);
    
    // Check if we're editing an existing item
    if (editingIndex !== null) {
      // Update existing item
      const id = items[editingIndex]._id;
      console.log("Updating item with ID:", id);
      console.log("Update data:", item);
      
      axios
        .put(`http://localhost:5000/api/items/${id}`, item)
        .then((res) => {
          console.log("Update response:", res.data);
          // Update the item in the local state
          const updatedItems = [...items];
          updatedItems[editingIndex] = res.data;
          setItems(updatedItems);
          setEditingIndex(null); // Reset editing state
          console.log("Items after update:", updatedItems);
        })
        .catch((err) => {
          console.error("Error updating item:", err);
          console.error("Error response:", err.response);
        });
    } else {
      // Add new item
      console.log("Adding new item:", item);
      axios
        .post("http://localhost:5000/api/items", item)
        .then((res) => {
          console.log("Add response:", res.data);
          // Add new item to the beginning of the array
          setItems([res.data, ...items]);
        })
        .catch((err) => {
          console.error("Error adding item:", err);
          console.error("Error response:", err.response);
        });
    }
  };

  // Handler for deleting items
  const handleDelete = (index) => {
    const id = items[index]._id;
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        // Remove item from local state
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // Handler for initiating item editing
  const handleEdit = (index) => {
    console.log("handleEdit called with index:", index);
    console.log("Item to edit:", items[index]);
    setEditingIndex(index); // Set the index of item being edited
  };

  // Handler for tag click events (sets tag filter)
  const handleTagClick = (tag) => {
    setTagFilter(tag);
  };

  // Filter items based on search term and tag filter
  const filteredItems = items.filter((item) => {
    // Check if item matches search term (case-insensitive)
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.note.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if item matches tag filter (case-insensitive)
    const matchesTag = tagFilter
      ? item.tag.toLowerCase() === tagFilter.toLowerCase()
      : true;
    
    return matchesSearch && matchesTag;
  });

  // Comprehensive styling object for the entire application
  const styles = {
    // Main container styling with gradient background
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      padding: "2rem 1rem",
      fontFamily:
        "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#f8fafc",
    },
    // Header section styling
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    // Main title with gradient text effect
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
    // Subtitle styling
    subtitle: {
      fontSize: "1.2rem",
      color: "#94a3b8",
      fontWeight: "300",
    },
    // Navigation bar styling
    navigation: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "3rem",
      flexWrap: "wrap",
    },
    // Base navigation button styling
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
    // Active navigation button styling
    activeNavButton: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      color: "white",
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
      transform: "translateY(-2px)",
    },
    // Inactive navigation button styling
    inactiveNavButton: {
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      color: "#cbd5e1",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.3)",
    },
    // Main content area styling
    main: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    // Welcome section styling for home page
    welcomeSection: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(30, 41, 59, 0.4)",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(71, 85, 105, 0.2)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    },
    // Welcome title styling
    welcomeTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    // Welcome description text styling
    welcomeDescription: {
      fontSize: "1.2rem",
      maxWidth: "700px",
      margin: "0 auto 3rem",
      color: "#cbd5e1",
      lineHeight: "1.7",
    },
    // Get started button styling
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
    // Feature grid layout for feature cards
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    // Individual feature card styling
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
    // Feature card icon styling
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
    },
    // Feature card title styling
    featureTitle: {
      fontWeight: "bold",
      fontSize: "1.3rem",
      marginBottom: "1rem",
      color: "#f8fafc",
    },
    // Feature card description styling
    featureDescription: {
      fontSize: "1rem",
      color: "#94a3b8",
      lineHeight: "1.6",
    },
    // Input group container styling
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
    // Input field styling
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
    // Clear button styling
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
    // Footer section styling
    footer: {
      marginTop: "6rem",
      background: "rgba(17, 24, 39, 0.8)",
      color: "#e2e8f0",
      padding: "3rem 2rem 2rem",
      borderRadius: "20px",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(55, 65, 81, 0.2)",
    },
    // Footer content layout
    footerContent: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "2rem",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    // Footer section styling
    footerSection: {
      flex: "1 1 250px",
    },
    // Footer title styling
    footerTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#f8fafc",
    },
    // Footer text styling
    footerText: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
      color: "#cbd5e1",
    },
    // Footer bottom section styling
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
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 The Archives</h1>
        <p style={styles.subtitle}>
          Your personal Archives system
        </p>
      </header>

      {/* Navigation Bar */}
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

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* Home View - Welcome page with features */}
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
            {/* Feature Cards Grid */}
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

        {/* Items View - Main functionality page */}
        {currentView === "items" && (
          <>
            {/* Search and Filter Controls */}
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
              {/* Clear filter button - only shown when tag filter is active */}
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

            {/* Item Form Component - for adding/editing items */}
            <ItemForm
              onSubmit={handleAddOrEdit}
              editingItem={editingIndex !== null ? items[editingIndex] : null}
            />

            {/* Tag Filter Bar Component - shows available tags */}
            <TagFilterBar
              tags={[...new Set(items.map((item) => item.tag))]} // Get unique tags
              onTagClick={handleTagClick}
              currentTag={tagFilter}
            />

            {/* Item List Component - displays filtered items */}
            <ItemList
              items={filteredItems}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onTagClick={handleTagClick}
            />
          </>
        )}

        {/* Analytics View - Dashboard with data insights */}
        {currentView === "analytics" && <AnalyticsDashboard items={items} />}
      </main>

      {/* Footer Section */}
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