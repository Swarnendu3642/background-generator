import React, { useState } from "react";
import { SketchPicker } from "react-color";

const GradientGenerator = () => {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]); // Initial two colors
  const [gradientType, setGradientType] = useState("linear"); // Gradient type: linear or radial
  const [direction, setDirection] = useState("to right"); // Direction for linear gradient

  // Handle color changes for each stop
  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color.hex;
    setColors(newColors);
  };

  // Add a new color stop
  const addColorStop = () => {
    setColors([...colors, "#ffffff"]); // Adds a new color stop with default white color
  };

  // Remove the last color stop
  const removeColorStop = () => {
    if (colors.length > 2) {
      setColors(colors.slice(0, -1)); // Remove the last color stop
    }
  };

  const handleGradientTypeChange = (e) => {
    setGradientType(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const gradientStyle = {
    background: gradientType === "linear"
      ? `linear-gradient(${direction}, ${colors.join(", ")})`
      : `radial-gradient(circle, ${colors.join(", ")})`,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff"
  };

  const gradientCSS = gradientType === "linear"
    ? `background: linear-gradient(${direction}, ${colors.join(", ")});`
    : `background: radial-gradient(circle, ${colors.join(", ")});`;

  // Copy the CSS to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
    alert("CSS copied to clipboard!");
  };

  return (
    <div style={gradientStyle}>
      <h2>Gradient Background Generator</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {colors.map((color, index) => (
          <div key={index}>
            <h4>Pick Color {index + 1}</h4>
            <SketchPicker color={color} onChange={(newColor) => handleColorChange(index, newColor)} />
          </div>
        ))}
      </div>

      <div>
        <button onClick={addColorStop} style={{ marginRight: "10px" }}>Add another Color</button>
        <button onClick={removeColorStop} disabled={colors.length <= 2}>Remove Last Added Color </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Gradient Type:</label>
        <select value={gradientType} onChange={handleGradientTypeChange}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>

      {gradientType === "linear" && (
        <div style={{ marginTop: "20px" }}>
          <label>Direction:</label>
          <select value={direction} onChange={handleDirectionChange}>
            <option value="to right">Left to Right</option>
            <option value="to left">Right to Left</option>
            <option value="to top">Bottom to Top</option>
            <option value="to bottom">Top to Bottom</option>
            <option value="to top right">Bottom Left to Top Right</option>
            <option value="to bottom right">Top Left to Bottom Right</option>
          </select>
        </div>
      )}

      <div style={{ marginTop: "20px", background: "#333", padding: "10px", borderRadius: "5px" }}>
        <p>CSS Background:</p>
        <p style={{ fontFamily: "monospace" }}>{gradientCSS}</p>
        <button onClick={copyToClipboard} style={{ marginTop: "10px" }}>Copy CSS to Clipboard</button>
      </div>
    </div>
  );
};

export default GradientGenerator;
