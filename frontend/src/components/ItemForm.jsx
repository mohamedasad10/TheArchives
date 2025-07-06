import React, { useState, useEffect } from "react";
import axios from "axios";

// ItemForm handles both adding new items and editing existing ones
function ItemForm({ onSubmit, editingItem }) {
  // State for form inputs - stores all the item data
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false); // Controls form visibility for new items

  // State for Unsplash API image search functionality
  const [showImageSelector, setShowImageSelector] = useState(false); // Controls image selector modal visibility
  const [unsplashImages, setUnsplashImages] = useState([]); // Stores fetched images from Unsplash
  const [imageSearchTerm, setImageSearchTerm] = useState(""); // User's search query for images
  const [loading, setLoading] = useState(false); // Loading state for image search

  // Get Unsplash API key from environment variables
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Effect to handle editing mode - populates form when an item is being edited
  useEffect(() => {
    console.log("ItemForm useEffect triggered");
    console.log("editingItem:", editingItem);
    
    if (editingItem) {
      // If an item is being edited, populate the form fields with its data
      console.log("Setting form data from editingItem");
      console.log("editingItem.image:", editingItem.image);
      
      setName(editingItem.name || "");
      setNote(editingItem.note || "");
      setTag(editingItem.tag || "");
      setYear(editingItem.year || "");
      setPrice(editingItem.price || "");
      setImage(editingItem.image || "");
      setShowForm(true); // Show form automatically when editing
      
      console.log("Form state set, image state:", editingItem.image || "");
    } else {
      // Reset form when not editing (switching to add mode)
      console.log("No editingItem, resetting form");
      setName("");
      setNote("");
      setTag("");
      setYear("");
      setPrice("");
      setImage("");
    }
  }, [editingItem]); // Re-run when editingItem changes

  // Debug effect to track image state changes
  useEffect(() => {
    console.log("Image state changed to:", image);
  }, [image]);

  // Function to search for images using Unsplash API
  const searchUnsplashImages = async (query) => {
    if (!query.trim()) return; // Don't search if query is empty
    
    setLoading(true);
    try {
      // Make API call to Unsplash with search query
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setUnsplashImages(response.data.results); // Store the fetched images
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
      alert("Error fetching images. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image search form submission
  const handleImageSearch = (e) => {
    e.preventDefault();
    searchUnsplashImages(imageSearchTerm);
  };

  // Function to select an image from the search results
  const selectImage = (imageUrl) => {
    console.log("Selecting image:", imageUrl);
    setImage(imageUrl); // Set the selected image URL
    setShowImageSelector(false); // Close the image selector modal
    setUnsplashImages([]); // Clear search results
    setImageSearchTerm(""); // Clear search term
  };

  // Handle form submission for adding/updating items
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return; // Don't submit if name is empty
    
    // Create item data object with all form values
    const itemData = { 
      name, 
      note, 
      tag, 
      year, 
      price, 
      image 
    };
    
    console.log("ItemForm handleSubmit called");
    console.log("Submitting item data:", itemData);
    console.log("Image in submitted data:", image);
    
    // Call the parent component's onSubmit function
    onSubmit(itemData);
    
    // Reset form only if adding a new item (not editing)
    if (!editingItem) {
      setName("");
      setNote("");
      setTag("");
      setYear("");
      setPrice("");
      setImage("");
      setShowForm(false);
    }
  };

  // Styling objects for consistent UI appearance
  const formContainerStyle = {
    marginBottom: "2rem",
    background: "rgba(30, 41, 59, 0.4)", // Semi-transparent dark background
    padding: "2rem",
    borderRadius: "16px",
    backdropFilter: "blur(10px)", // Glassmorphism effect
    border: "1px solid rgba(71, 85, 105, 0.2)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    borderRadius: "10px",
    border: "1px solid rgba(75, 85, 99, 0.3)",
    fontSize: "1rem",
    backgroundColor: "rgba(17, 24, 39, 0.6)", // Dark input background
    color: "#f8fafc", // Light text color
    backdropFilter: "blur(5px)",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", // Blue to purple gradient
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
  };

  const addButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #10b981, #059669)", // Green gradient for add button
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
  };

  const imageButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #f59e0b, #d97706)", // Orange gradient for image button
    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
    marginBottom: "1rem",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #ef4444, #dc2626)", // Red gradient for cancel button
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    marginLeft: "1rem",
  };

  const imagePreviewStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover", // Maintain aspect ratio while filling container
    borderRadius: "8px",
    marginBottom: "1rem",
    border: "2px solid rgba(59, 130, 246, 0.3)",
  };

  // Modal overlay styles for image selector
  const imageSelectorStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000", // Ensure modal appears above other content
    padding: "2rem",
  };

  const modalStyle = {
    background: "rgba(30, 41, 59, 0.95)",
    borderRadius: "20px",
    padding: "2rem",
    maxWidth: "800px",
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto", // Allow scrolling if content exceeds height
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(71, 85, 105, 0.3)",
  };

  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // Responsive grid
    gap: "1rem",
    marginTop: "1rem",
  };

  const imageItemStyle = {
    cursor: "pointer",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.3s ease", // Smooth hover animation
    border: "2px solid transparent",
  };

  const imageItemImgStyle = {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  };

  // Debug log for tracking image state
  console.log("ItemForm rendering, current image state:", image);

  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* Show "Add Item" button only when form is hidden and not editing */}
      {!showForm && !editingItem && (
        <button onClick={() => setShowForm(true)} style={addButtonStyle}>
          ➕ Add Item
        </button>
      )}

      {/* Show form when adding new item or editing existing item */}
      {(showForm || editingItem) && (
        <form onSubmit={handleSubmit} style={formContainerStyle}>
          {/* Item name input - required field */}
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
          
          {/* Button to open image selector modal */}
          <button
            type="button"
            onClick={() => setShowImageSelector(true)}
            style={imageButtonStyle}
          >
            🖼️ Select Image from Unsplash
          </button>

          {/* Debug display of current image URL */}
          <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#94a3b8" }}>
            Current image URL: {image || "No image selected"}
          </div>

          {/* Image preview and remove button - only shown when image is selected */}
          {image && (
            <div style={{ marginBottom: "1rem" }}>
              <img 
                src={image} 
                alt="Selected" 
                style={imagePreviewStyle}
                onLoad={() => console.log("Image loaded successfully:", image)}
                onError={(e) => console.error("Image failed to load:", image, e)}
              />
              <button
                type="button"
                onClick={() => {
                  console.log("Removing image");
                  setImage("");
                }}
                style={{
                  ...cancelButtonStyle,
                  marginLeft: "0.5rem",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                }}
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Year input - numeric type for better mobile experience */}
          <input
            placeholder="Year (e.g., 2013)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            style={inputStyle}
          />
          
          {/* Price input - numeric type */}
          <input
            placeholder="Price (R)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            style={inputStyle}
          />
          
          {/* Tag input for categorizing items */}
          <input
            placeholder="Tag (e.g., Medicine)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={inputStyle}
          />
          
          {/* Textarea for longer notes */}
          <textarea
            placeholder="Short note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: "100px",
              resize: "vertical", // Allow vertical resizing
            }}
          />

          {/* Submit button - text changes based on edit mode */}
          <button type="submit" style={buttonStyle}>
            {editingItem ? "Update" : "Add"} Item
          </button>
          
          {/* Cancel button - only shown when adding new item */}
          {!editingItem && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* Image Selector Modal - shown when user wants to select an image */}
      {showImageSelector && (
        <div style={imageSelectorStyle}>
          <div style={modalStyle}>
            <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>
              Select an Image from Unsplash
            </h3>
            
            {/* Search form for finding images */}
            <form onSubmit={handleImageSearch} style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Search for images (e.g., microwave, electronics)"
                value={imageSearchTerm}
                onChange={(e) => setImageSearchTerm(e.target.value)}
                style={inputStyle}
              />
              <button
                type="submit"
                style={buttonStyle}
                disabled={loading} // Disable while searching
              >
                {loading ? "Searching..." : "🔍 Search Images"}
              </button>
              <button
                type="button"
                onClick={() => setShowImageSelector(false)}
                style={cancelButtonStyle}
              >
                Close
              </button>
            </form>

            {/* Loading indicator */}
            {loading && (
              <div style={{ textAlign: "center", color: "#cbd5e1" }}>
                Loading images...
              </div>
            )}

            {/* Grid of search results */}
            {unsplashImages.length > 0 && (
              <div style={imageGridStyle}>
                {unsplashImages.map((img) => (
                  <div
                    key={img.id}
                    style={imageItemStyle}
                    onClick={() => selectImage(img.urls.small)}
                    // Hover effects for better user experience
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.border = "2px solid #3b82f6";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.border = "2px solid transparent";
                    }}
                  >
                    <img
                      src={img.urls.small}
                      alt={img.alt_description || "Unsplash image"}
                      style={imageItemImgStyle}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemForm;