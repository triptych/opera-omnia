// Constants
const REPO_URL = 'https://raw.githubusercontent.com/triptych/opera-omnia/main';
const MANIFEST_URL = `${REPO_URL}/manifest.json`;

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const fileSelect = document.getElementById('fileSelect');
const currentFile = document.getElementById('currentFile');
const description = document.getElementById('description');
const itemList = document.getElementById('itemList');

// State
let manifest = null;

// Fetch the manifest file
async function fetchManifest() {
    try {
        const response = await fetch(MANIFEST_URL);
        manifest = await response.json();
        populateCategories();
    } catch (error) {
        console.error('Error fetching manifest:', error);
        description.textContent = 'Error loading manifest. Please try again later.';
    }
}

// Populate category dropdown
function populateCategories() {
    const categories = Object.keys(manifest.directories.src);
    categorySelect.innerHTML = '<option value="">Select a category...</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Populate file dropdown based on selected category
function populateFiles(category) {
    fileSelect.innerHTML = '<option value="">Select a file...</option>';
    
    const files = getFilesForCategory(category);
    files.forEach(file => {
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file.replace('.json', '');
        fileSelect.appendChild(option);
    });
}

// Get files for a category (handles nested directories)
function getFilesForCategory(category) {
    const categoryData = manifest.directories.src[category];
    if (Array.isArray(categoryData)) {
        return categoryData;
    }
    
    // Handle nested directories
    return Object.values(categoryData).flat();
}

// Fetch and display file content
async function fetchFileContent(category, file) {
    try {
        const path = `src/${category}/${file}`;
        const response = await fetch(`${REPO_URL}/${path}`);
        const data = await response.json();
        
        displayContent(data, file);
    } catch (error) {
        console.error('Error fetching file:', error);
        description.textContent = 'Error loading file. Please try again later.';
        itemList.innerHTML = '';
    }
}

// Display content in the viewer
function displayContent(data, filename) {
    currentFile.textContent = filename.replace('.json', '');
    description.textContent = data.description || 'No description available';
    
    itemList.innerHTML = '';
    if (Array.isArray(data.items)) {
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itemList.appendChild(li);
        });
    }
}

// Event Listeners
categorySelect.addEventListener('change', (e) => {
    const category = e.target.value;
    if (category) {
        populateFiles(category);
    } else {
        fileSelect.innerHTML = '<option value="">Select a file...</option>';
    }
    currentFile.textContent = 'No file selected';
    description.textContent = '';
    itemList.innerHTML = '';
});

fileSelect.addEventListener('change', (e) => {
    const file = e.target.value;
    const category = categorySelect.value;
    if (file && category) {
        fetchFileContent(category, file);
    }
});

// Initialize the app
fetchManifest();
