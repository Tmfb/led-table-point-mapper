document.addEventListener("DOMContentLoaded", () => {
  
  // Default parameters for canvas and point generation
  const defaultLength = 800; // Default canvas width
  const defaultHeight = 600; // Default canvas height
  const defaultColumns = 8; // Default number of columns
  const defaultRows = 6; // Default number of rows
  const defaultDensity = 25; // Default points per cell
  const defaultTotalPoints = 1200; // Default total points
  const defaultPadding = 10; // Padding from canvas edges
  const defaultInterspace = 5; // Minimum space between points

  // Retrieve references to HTML elements
  const canvas = document.getElementById("myCanvas"); // Canvas for drawing points
  const ctx = canvas.getContext("2d"); // 2D drawing context
  const pointsDrawnDisplay = document.createElement("div"); // Element to display drawn points count
  document.body.insertBefore(pointsDrawnDisplay, canvas.nextSibling); // Insert display after canvas

  // Input elements for user customization
  const lengthInput = document.getElementById("lengthInput");
  const heightInput = document.getElementById("heightInput");
  const columnsInput = document.getElementById("columnsInput");
  const rowsInput = document.getElementById("rowsInput");
  const densityInput = document.getElementById("densityInput");
  const totalPointsInput = document.getElementById("totalPointsInput");
  const paddingInput = document.getElementById("paddingInput");
  const interspaceInput = document.getElementById("interspaceInput");

  // Set default values in input fields
  lengthInput.value = defaultLength;
  heightInput.value = defaultHeight;
  columnsInput.value = defaultColumns;
  rowsInput.value = defaultRows;
  densityInput.value = defaultDensity;
  totalPointsInput.value = defaultTotalPoints;
  paddingInput.value = defaultPadding;
  interspaceInput.value = defaultInterspace;

  // Initialize canvas size
  setCanvasSize();

  // Function to set the canvas dimensions based on input values
  function setCanvasSize() {
    canvas.width = parseInt(lengthInput.value);
    canvas.height = parseInt(heightInput.value);
  }

  // Attach input event listeners to input elements
  const inputs = [columnsInput, rowsInput, densityInput, totalPointsInput, paddingInput, interspaceInput];
  inputs.forEach(input => input.addEventListener("input", recalculateParameters));

  let currentPoints = []; // Array to store generated points

  // Function to recalculate parameters when input values change
  function recalculateParameters() {
    const columns = parseInt(columnsInput.value);
    const rows = parseInt(rowsInput.value);
    const density = parseInt(densityInput.value);
    const totalPoints = columns * rows * density;

    densityInput.value = density;
    totalPointsInput.value = totalPoints;
  }

  // Function to regenerate points on the canvas based on specified parameters
  function regeneratePoints(columns, rows, totalPoints) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    let pointsDrawn = 0; // Counter for drawn points
    currentPoints = []; // Reset points array

    const cellWidth = canvas.width / columns; // Calculate cell width
    const cellHeight = canvas.height / rows; // Calculate cell height
    const padding = parseInt(paddingInput.value); // Get padding
    const interspace = parseInt(interspaceInput.value); // Get interspace

    // Generate points within each cell
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        for (let i = 0; i < densityInput.value; i++) {
          let point; // Point to store the generated coordinates
          let attempts = 0; // Attempt counter for valid point generation

          // Attempt to generate a valid point
          do {
            attempts++;
            const x = col * cellWidth + Math.random() * cellWidth;
            const y = row * cellHeight + Math.random() * cellHeight;

            // Check if the generated point is within the valid area
            if (
              x > padding &&
              x < canvas.width - padding &&
              y > padding &&
              y < canvas.height - padding
            ) {
              point = { x, y }; // Store valid point
            }
          } while (
            (!point || !isPointValid(point, currentPoints, interspace)) &&
            attempts < 100 // Limit attempts to avoid infinite loops
          );

          // If a valid point is generated, draw it on the canvas
          if (point && attempts < 100) {
            currentPoints.push(point); // Add point to array
            pointsDrawn++;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); // Draw the point
            ctx.fill();
          }
        }
      }
    }

    // Update the display with the number of points drawn
    pointsDrawnDisplay.textContent = `Points Drawn: ${pointsDrawn}`;
  }

  // Function to validate if a generated point is valid
  function isPointValid(point, points, interspace) {
    return points.every(existingPoint => {
      const distance = Math.sqrt(
        (point.x - existingPoint.x) ** 2 + (point.y - existingPoint.y) ** 2
      );
      return distance >= interspace; // Check distance between points
    });
  }

  // Function to generate a DXF file from the current points
  function generateDxfFile() {
    let dxfData = `0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nENDSEC\n0\nSECTION\n2\nBLOCKS\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n`;

    // Draw the outer rectangle representing the canvas boundaries
    const width = parseInt(lengthInput.value);
    const height = parseInt(heightInput.value);
    dxfData += `0\nLINE\n8\n0\n10\n0\n20\n0\n11\n${width}\n21\n0\n`;
    dxfData += `0\nLINE\n8\n0\n10\n${width}\n20\n0\n11\n${width}\n21\n${height}\n`;
    dxfData += `0\nLINE\n8\n0\n10\n${width}\n20\n${height}\n11\n0\n21\n${height}\n`;
    dxfData += `0\nLINE\n8\n0\n10\n0\n20\n${height}\n11\n0\n21\n0\n`;

    // Draw points from currentPoints, inverting Y-coordinates for DXF format
    currentPoints.forEach(point => {
        const invertedY = height - point.y; // Invert Y-coordinate for DXF
        dxfData += `0\nPOINT\n8\n0\n10\n${point.x}\n20\n${invertedY}\n`;
    });

    dxfData += `0\nENDSEC\n0\nSECTION\n2\nEOF\n`; // End of DXF data

    // Create a downloadable DXF file
    const blob = new Blob([dxfData], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvasData.dxf"; // File name for download
    a.click(); // Trigger download
    URL.revokeObjectURL(url); // Clean up URL
    a.remove();
  }

  // Event listener for the regenerate button
  document.getElementById("regenerateButton").addEventListener("click", () => {
    recalculateParameters(); // Recalculate parameters based on input
    regeneratePoints(columnsInput.value, rowsInput.value, totalPointsInput.value); // Regenerate points
  });

  // Event listener for the generate DXF button
  document.getElementById("generateDxfButton").addEventListener("click", () => {
    generateDxfFile(); // Generate DXF file
  });

  // Initial point generation based on default parameters
  regeneratePoints(defaultColumns, defaultRows, defaultTotalPoints);
});
