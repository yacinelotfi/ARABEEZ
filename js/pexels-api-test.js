/**
 * Pexels API Test Script
 *
 * This script demonstrates how to call the Pexels API and handle the response.
 * It provides examples of both using the fetchPexelsImages function and
 * using the Pexels client directly.
 */

// Test function to demonstrate how to call the API and handle the response
function testPexelsAPI() {
    console.log('Testing Pexels API...');

    // Example 1: Using fetchPexelsImages function
    console.log('Example 1: Using fetchPexelsImages function');
    fetchPexelsImages('nature')
        .then(images => {
            console.log('Images returned:', images);
            console.log('Number of images:', images.length);

            if (images && images.length > 0) {
                // Access the first image
                const firstImage = images[0];
                console.log('First image ID:', firstImage.id);
                console.log('First image URL (medium):', firstImage.src.medium);
                console.log('First image photographer:', firstImage.photographer);

                // Display the image (example)
                displayImage(firstImage.src.medium, 'example1Container');
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });

    // Example 2: Using the Pexels client directly
    console.log('Example 2: Using the Pexels client directly');
    // Note: The client is already created in pexels.js
    if (typeof client !== 'undefined') {
        client.photos.search({ query: 'animals', per_page: 5 })
            .then(response => {
                console.log('Full API response:', response);

                // Access the photos array
                const photos = response.photos;
                console.log('Number of photos:', photos.length);
                console.log('Total results:', response.total_results);
                console.log('Page:', response.page);

                if (photos && photos.length > 0) {
                    // Display the first photo (example)
                    displayImage(photos[0].src.medium, 'example2Container');
                }
            })
            .catch(error => {
                console.error('Error using Pexels client:', error);
            });
    } else {
        console.error('Pexels client is not defined. Make sure pexels.js is loaded before this script.');
    }
}

// Helper function to display an image in a container
function displayImage(imageUrl, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container #${containerId} not found.`);
        return;
    }

    // Create image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Pexels API test image';
    img.className = 'img-fluid rounded shadow-sm';

    // Clear container and add image
    container.innerHTML = '';
    container.appendChild(img);
    console.log(`Image displayed in #${containerId}`);
}

// Function to display the API response structure
function displayAPIResponseStructure(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container #${containerId} not found.`);
        return;
    }

    // Example API response structure
    const responseStructure = {
        "total_results": 8000,
        "page": 1,
        "per_page": 3,
        "photos": [
            {
                "id": 3408744,
                "width": 3546,
                "height": 2255,
                "url": "https://www.pexels.com/photo/...",
                "photographer": "Photographer Name",
                "photographer_url": "https://www.pexels.com/@photographer",
                "src": {
                    "original": "https://images.pexels.com/photos/3408744/...",
                    "large": "https://images.pexels.com/photos/3408744/...",
                    "medium": "https://images.pexels.com/photos/3408744/...",
                    "small": "https://images.pexels.com/photos/3408744/..."
                },
                "alt": "Image description"
            }
        ],
        "next_page": "https://api.pexels.com/v1/search/?page=2&..."
    };

    // Display the structure
    container.innerHTML = `<pre class="bg-light p-3 rounded">${JSON.stringify(responseStructure, null, 2)}</pre>`;
}

// Export functions for use in HTML
window.testPexelsAPI = testPexelsAPI;
window.displayAPIResponseStructure = displayAPIResponseStructure;

// Log a message to confirm the script is loaded
console.log('Pexels API test script loaded successfully. Use testPexelsAPI() to test.');
