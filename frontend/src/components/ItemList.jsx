import React from "react";

// ItemList component displays a grid of items with edit/delete functionality
// Props: items (array), onDelete (function), onEdit (function), onTagClick (function)
function ItemList({ items, onDelete, onEdit, onTagClick }) {
  // Comprehensive styles object for all component elements
  const styles = {
    // Main container - responsive grid layout
    container: {
      display: "grid",
      gap: "1.5rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", // Responsive columns
    },
    // Individual item card styling with glassmorphism effect
    item: {
      background: "rgba(30, 41, 59, 0.4)", // Semi-transparent background
      borderRadius: "16px",
      padding: "1.5rem",
      backdropFilter: "blur(10px)", // Glassmorphism blur effect
      border: "1px solid rgba(71, 85, 105, 0.2)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease", // Smooth hover animations
      position: "relative",
    },
    // Flexbox layout for item content (image + details)
    itemContent: {
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start",
    },
    // Container for item image with fixed dimensions
    imageContainer: {
      flexShrink: 0, // Prevent image from shrinking
      width: "80px",
      height: "80px",
      borderRadius: "8px",
      overflow: "hidden",
      border: "2px solid rgba(59, 130, 246, 0.3)",
    },
    // Image styling to fill container while maintaining aspect ratio
    itemImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // Cover container while maintaining aspect ratio
    },
    // Placeholder shown when no image is available
    placeholderImage: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(71, 85, 105, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      color: "#94a3b8",
    },
    // Container for item text content (everything except image)
    itemDetails: {
      flex: 1, // Take remaining space
      minWidth: 0, // Allow text to wrap properly
    },
    // Header section with name and action buttons
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    },
    // Styling for item name/title
    itemName: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#f8fafc",
      margin: 0,
      wordBreak: "break-word", // Handle long names gracefully
    },
    // Container for edit/delete action buttons
    itemActions: {
      display: "flex",
      gap: "0.5rem",
      flexShrink: 0, // Prevent buttons from shrinking
    },
    // Base styling for action buttons (edit/delete)
    actionButton: {
      padding: "0.4rem 0.8rem",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.8rem",
      fontWeight: "600",
      transition: "all 0.3s ease", // Smooth hover effects
    },
    // Blue gradient styling for edit button
    editButton: {
      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "white",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    },
    // Red gradient styling for delete button
    deleteButton: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "white",
      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
    },
    // Container for metadata (year, price) with flexible wrapping
    itemMeta: {
      display: "flex",
      flexWrap: "wrap", // Allow wrapping on small screens
      gap: "0.5rem",
      marginBottom: "0.5rem",
    },
    // Individual metadata item styling (year, price badges)
    metaItem: {
      fontSize: "0.9rem",
      color: "#cbd5e1",
      background: "rgba(71, 85, 105, 0.3)",
      padding: "0.2rem 0.5rem",
      borderRadius: "4px",
    },
    // Tag styling with clickable appearance
    itemTag: {
      fontSize: "0.8rem",
      fontWeight: "600",
      color: "#3b82f6",
      background: "rgba(59, 130, 246, 0.1)",
      padding: "0.3rem 0.8rem",
      borderRadius: "20px", // Pill-shaped appearance
      cursor: "pointer",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      transition: "all 0.3s ease",
    },
    // Note/description text styling
    itemNote: {
      fontSize: "0.95rem",
      color: "#94a3b8",
      lineHeight: "1.5",
      marginTop: "0.5rem",
      wordBreak: "break-word", // Handle long text gracefully
    },
    // Empty state container when no items exist
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(30, 41, 59, 0.4)",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.2)",
    },
    // Large icon for empty state
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "1rem",
      opacity: "0.6",
    },
    // Title text for empty state
    emptyTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#f8fafc",
      marginBottom: "0.5rem",
    },
    // Description text for empty state
    emptyText: {
      fontSize: "1rem",
      color: "#94a3b8",
      maxWidth: "400px",
      margin: "0 auto",
    },
  };

  // Show empty state when no items are available
  if (items.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📦</div>
        <h3 style={styles.emptyTitle}>No items found</h3>
        <p style={styles.emptyText}>
          Start by adding your first item to build your personal archives. Click the "Add Item" button to get started!
        </p>
      </div>
    );
  }

  // Render grid of items
  return (
    <div style={styles.container}>
      {items.map((item, index) => (
        <div
          key={item._id || index} // Use database ID or fallback to index
          style={styles.item}
          // Hover effect for entire item card
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)"; // Subtle lift effect
            e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.3)"; // Enhanced shadow
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)"; // Reset position
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)"; // Reset shadow
          }}
        >
          <div style={styles.itemContent}>
            {/* Image Section - shows item image or placeholder */}
            <div style={styles.imageContainer}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.itemImage}
                />
              ) : (
                // Placeholder camera icon when no image exists
                <div style={styles.placeholderImage}>
                  📷
                </div>
              )}
            </div>

            {/* Details Section - contains all text content and actions */}
            <div style={styles.itemDetails}>
              {/* Header with name and action buttons */}
              <div style={styles.itemHeader}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <div style={styles.itemActions}>
                  {/* Edit button - calls onEdit with item index */}
                  <button
                    onClick={() => onEdit(index)}
                    style={styles.actionButton}
                    className="edit-btn"
                    // Scale animation on hover
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    ✏️
                  </button>
                  {/* Delete button - calls onDelete with item index */}
                  <button
                    onClick={() => onDelete(index)}
                    style={styles.actionButton}
                    className="delete-btn"
                    // Scale animation on hover
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Metadata section - year and price badges */}
              <div style={styles.itemMeta}>
                {/* Show year if available */}
                {item.year && (
                  <span style={styles.metaItem}>📅 {item.year}</span>
                )}
                {/* Show price if available */}
                {item.price && (
                  <span style={styles.metaItem}>💰 R{item.price}</span>
                )}
              </div>

              {/* Tag section - clickable tag for filtering */}
              {item.tag && (
                <span
                  style={styles.itemTag}
                  onClick={() => onTagClick(item.tag)} // Call parent function to filter by tag
                  // Hover effects for tag interaction
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  #{item.tag}
                </span>
              )}

              {/* Note/description section - only shown if note exists */}
              {item.note && (
                <p style={styles.itemNote}>{item.note}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;