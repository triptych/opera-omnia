# Opera Omnia Viewer

A simple web-based viewer for exploring the Opera Omnia dataset collection.

## Features

- Browse all categories and files in the Opera Omnia repository
- View file descriptions and contents
- Modern, responsive interface
- No build process required - pure HTML, CSS, and JavaScript

## Usage

1. Simply open `index.html` in a web browser
2. Select a category from the dropdown menu
3. Select a file from the second dropdown menu
4. View the file's description and contents

## Development

The viewer is built with vanilla JavaScript and uses the GitHub raw content URLs to fetch data directly from the repository. The main components are:

- `index.html`: Main structure and layout
- `style.css`: Modern, responsive styling
- `app.js`: Handles data fetching and display logic

## Structure

- Uses the repository's manifest.json to dynamically populate categories and files
- Fetches JSON content directly from GitHub
- Displays both file metadata and content items
- Handles nested directory structures

## Contributing

Feel free to enhance the viewer with new features or improvements. Some ideas:
- Search functionality
- Filtering options
- Data visualization
- Export capabilities

## License

This viewer is part of the Opera Omnia project and is available under the same license.
