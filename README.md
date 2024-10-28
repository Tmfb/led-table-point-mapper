
# Canvas Point Generator

A simple web application that allows users to generate points within a specified rectangular canvas based on customizable parameters such as density, total points, and spacing. The generated points can be saved in a DXF format for further use. Inspired for a CNC made, custom furniture prototype design, of a coffee table backlit with movement-activated fiber optic conduced ligths.

## Features

- **Customizable Canvas Size**: Define the canvas dimensions in millimeters.
- **Dynamic Point Generation**: Adjust the number of points and their density dynamically.
- **Validation of Points**: Ensure generated points respect the defined padding and interspacing.
- **Export to DXF**: Download the current canvas data as a DXF file for use in CAD applications.

## Proposed Features

- **Starry Sky Canvas**: Introduce a feature that allows users to create a canvas inspired by a starry sky image, enabling the generation of points that reflect the positions of stars or celestial bodies for an automatic end-user customization of each piece.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/canvas-point-generator.git
   ```
   
2. Open the `index.html` file in a web browser to view and interact with the application.

3. Adjust the parameters using the input fields to generate points and download the DXF file.

## Usage

- **Canvas Parameters**:
  - Length: Set the width of the canvas in millimeters.
  - Height: Set the height of the canvas in millimeters.
  - Columns: Number of vertical divisions in the canvas.
  - Rows: Number of horizontal divisions in the canvas.
  - Total Points: Total number of points to be generated.
  - Point Density: Density of points per cell.
  - Interspacing: Minimum distance  between points.
  - Padding: Space in millimeters around the canvas edges.

- **Buttons**:
  - **Regenerate Canvas**: Recalculate and draw the points on the canvas based on the current parameters.
  - **Generate DXF File**: Create and download a DXF file with the current canvas data.

## Author

**Tmfb**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Gabriel P. for presenting a compelling project that showcases an interesting real-world design.
