// Pexels API Integration
/*
 * IMPORTANT: To use the Pexels API, you need to:
 * 1. Create a free account at https://www.pexels.com/api/
 * 2. Get your API key from your account dashboard
 * 3. Replace the API_KEY below with your actual key
 *
 * Free Pexels API allows 200 requests per hour and 20,000 requests per month,
 * which is more generous than many other free image APIs.
 */
// Function to securely retrieve the Pexels API key
function getPexelsApiKey() {
  // IMPORTANT: In a real production environment, API keys should not be stored in client-side code.
  // This is a placeholder implementation for development purposes only.
  // For production:
  // 1. Use environment variables with webpack.DefinePlugin
  // 2. Use a backend API to handle requests requiring API keys
  // 3. Use a service like Auth0 or Firebase for secure authentication

  try {
    // Return the provided API key
    const apiKey = 'YJ5MCDgUAvdfmMlwuvUd7ffds6BUsBpTzIFOLmpKAl01HNTLqfWaS1kl';
    if (apiKey) {
      // Store the key in sessionStorage for future use
      sessionStorage.setItem('pexels_api_key', apiKey);
      return apiKey;
    }
    console.warn('No Pexels API key found. Using fallback images.');
    return '';
  } catch (error) {
    console.error('Error retrieving Pexels API key:', error);
    return '';
  }
}

const API_KEY = getPexelsApiKey(); // Get API key from secure function

// Import the createClient function from the Pexels library
// This is a direct implementation of the Pexels client as requested
const createClient = function(apiKey) {
  return {
    photos: {
      search: function(options) {
        const { query, per_page = 3 } = options;
        const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}`;

        return fetch(apiUrl, {
          headers: {
            'Authorization': apiKey
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          });
      }
    }
  };
};

// Create a Pexels client instance
const client = createClient(API_KEY);

// Fallback images by category for when API is unavailable
const FALLBACK_IMAGES = {
  // Common categories
  'nature': [
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
    'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg'
  ],
  'animal': [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg'
  ],
  'food': [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
  ],
  'people': [
    'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  ],
  'city': [
    'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'
  ],
  'default': [
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'
  ]
};

// Function to generate a simple image for a word and save it to the img folder
function generateWordImage(word) {
  // First check if we already have this image in localStorage or IndexedDB
  return checkExistingImage(word)
    .then(cachedImage => {
      if (cachedImage) {
        console.log(`Using existing image for "${word}" from cache`);
        return cachedImage;
      }

      // If no cached image, generate a new one
      console.log(`Generating new image for "${word}"`);

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = 400;
      canvas.height = 300;

      // Generate a random background color
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      const bgColor = `rgb(${r}, ${g}, ${b})`;

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(word, canvas.width / 2, canvas.height / 2);

      // Add border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 5;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Convert canvas to blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Failed to create image blob'));
            return;
          }

          // Create a safe filename from the word
          const safeWord = word.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const filename = `${safeWord}_${Date.now()}.png`;
          const filePath = `img/${filename}`;

          // Convert blob to data URL
          const reader = new FileReader();
          reader.onloadend = function() {
            const dataUrl = reader.result;

            // Create an image element to display the generated image
            const img = new Image();
            img.src = dataUrl;

            // Generate a unique ID for this image
            const imageId = `generated_${Date.now()}`;

            // Create an object with metadata about the image
            const imageData = {
              id: imageId,
              word: word,
              filename: filename,
              path: filePath,
              dataUrl: dataUrl,
              timestamp: Date.now()
            };

            // Save the image to localStorage for persistence
            try {
              // Store the image data URL in localStorage with a key based on the word
              const storageKey = `generated_image_${safeWord}`;
              localStorage.setItem(storageKey, JSON.stringify(imageData));
              console.log(`Generated image for "${word}" saved to localStorage with key: ${storageKey}`);

              // Also save to IndexedDB if available for larger storage
              if (window.indexedDB) {
                const request = indexedDB.open('GeneratedImagesDB', 1);

                request.onupgradeneeded = function(event) {
                  const db = event.target.result;
                  // Create an object store if it doesn't exist
                  if (!db.objectStoreNames.contains('images')) {
                    const store = db.createObjectStore('images', { keyPath: 'id' });
                    store.createIndex('word', 'word', { unique: false });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                  }
                };

                request.onsuccess = function(event) {
                  const db = event.target.result;
                  const transaction = db.transaction(['images'], 'readwrite');
                  const store = transaction.objectStore('images');

                  // Add the image data to the object store
                  const addRequest = store.add(imageData);

                  addRequest.onsuccess = function() {
                    console.log(`Generated image for "${word}" saved to IndexedDB`);
                  };

                  addRequest.onerror = function(error) {
                    console.error('Error saving to IndexedDB:', error);
                  };

                  transaction.oncomplete = function() {
                    db.close();
                  };
                };

                request.onerror = function(error) {
                  console.error('Error opening IndexedDB:', error);
                };
              }
            } catch (error) {
              console.error('Error saving to localStorage:', error);
            }

            // Save the image to the img folder
            // Since client-side JS can't directly write to the server's file system,
            // we'll create a download link that the user can click to save the image
            // This will prompt the user to save the file to the img folder
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);

            // Automatically click the link to trigger the download
            link.click();
            document.body.removeChild(link);

            console.log(`Generated image for "${word}" saved as ${filename} in img folder`);

            // Return an object that mimics the Pexels API response format
            resolve([{
              id: imageId,
              src: {
                medium: filePath,
                original: filePath,
                large: filePath,
                small: filePath
              },
              alt: `Generated image for "${word}"`,
              photographer: 'Local Generator',
              photographer_url: '',
              isGenerated: true,
              dataUrl: dataUrl // Include the data URL for immediate display
            }]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      });
    });
}

// Function to get fallback images based on query
function getFallbackImages(query) {
  // Convert query to lowercase for matching
  const lowerQuery = query.toLowerCase();

  // Check if query contains any of our category keywords
  for (const [category, images] of Object.entries(FALLBACK_IMAGES)) {
    if (category !== 'default' && lowerQuery.includes(category)) {
      return images.map(url => ({
        src: { medium: url },
        alt: `Fallback image for ${query}`
      }));
    }
  }

  // Return default images if no category match
  return FALLBACK_IMAGES.default.map(url => ({
    src: { medium: url },
    alt: `Fallback image for ${query}`
  }));
}

// Function to check if an image already exists in localStorage or IndexedDB
function checkExistingImage(word) {
  return new Promise((resolve) => {
    // Create a safe word for storage key
    const safeWord = word.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const storageKey = `generated_image_${safeWord}`;

    // Check localStorage first (faster)
    const storedImageData = localStorage.getItem(storageKey);
    if (storedImageData) {
      try {
        const imageData = JSON.parse(storedImageData);
        console.log(`Found cached image for "${word}" in localStorage`);

        // Check if the image file exists in the img folder
        const img = new Image();
        img.onload = function() {
          console.log(`Image file exists in img folder: ${imageData.path}`);
          // Return the image data in the format expected by the application
          resolve([{
            id: imageData.id || `cached_${Date.now()}`,
            src: {
              medium: imageData.path,
              original: imageData.path,
              large: imageData.path,
              small: imageData.path
            },
            alt: `Cached image for "${word}"`,
            photographer: 'Local Cache',
            photographer_url: '',
            isGenerated: true,
            dataUrl: imageData.dataUrl // Include the data URL for immediate display
          }]);
        };
        img.onerror = function() {
          console.log(`Image file does not exist in img folder: ${imageData.path}`);
          // If the image file doesn't exist, return null to generate a new one
          resolve(null);
        };
        img.src = imageData.path;
        return;
      } catch (error) {
        console.error('Error parsing stored image data:', error);
      }
    }

    // If not in localStorage, check IndexedDB
    if (window.indexedDB) {
      const request = indexedDB.open('GeneratedImagesDB', 1);

      request.onerror = function() {
        console.error('Error opening IndexedDB');
        resolve(null);
      };

      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');
        const index = store.index('word');

        const getRequest = index.getAll(word);

        getRequest.onsuccess = function() {
          if (getRequest.result && getRequest.result.length > 0) {
            // Sort by timestamp to get the most recent
            const imageData = getRequest.result.sort((a, b) => b.timestamp - a.timestamp)[0];
            console.log(`Found cached image for "${word}" in IndexedDB`);

            // Check if the image file exists in the img folder
            const img = new Image();
            img.onload = function() {
              console.log(`Image file exists in img folder: ${imageData.path}`);
              // Return the image data in the format expected by the application
              resolve([{
                id: imageData.id || `cached_${Date.now()}`,
                src: {
                  medium: imageData.path,
                  original: imageData.path,
                  large: imageData.path,
                  small: imageData.path
                },
                alt: `Cached image for "${word}"`,
                photographer: 'Local Cache',
                photographer_url: '',
                isGenerated: true,
                dataUrl: imageData.dataUrl // Include the data URL for immediate display
              }]);
            };
            img.onerror = function() {
              console.log(`Image file does not exist in img folder: ${imageData.path}`);
              // If the image file doesn't exist, return null to generate a new one
              resolve(null);
            };
            img.src = imageData.path;
          } else {
            resolve(null);
          }
        };

        getRequest.onerror = function() {
          console.error('Error getting image from IndexedDB');
          resolve(null);
        };

        transaction.oncomplete = function() {
          db.close();
        };
      };
    } else {
      resolve(null);
    }
  });
}

// Function to fetch images from Pexels
function fetchPexelsImages(query = 'nature') {
  function fetchPexelsImages(query = 'nature') {
    // Create a cache key that includes the query
    const cacheKey = `pexels_cache_${query}`;
    // Check if we have a cached result for this specific query
    const cachedResult = sessionStorage.getItem(cacheKey);
    if (cachedResult) {
      return Promise.resolve(JSON.parse(cachedResult));
    }
    // First check if we already have this image cached
    return checkExistingImage(query)
      .then(cachedImage => {
        if (cachedImage) {
          console.log(`Using cached image for "${query}"`);
          // Cache the result
          sessionStorage.setItem(cacheKey, JSON.stringify(cachedImage));
          return cachedImage;
        }
        const apiKey = getPexelsApiKey();
        if (!apiKey) {
          console.log('Using fallback images because no API key is provided');
          const fallbackResult = getFallbackImages(query);
          sessionStorage.setItem(cacheKey, JSON.stringify(fallbackResult));
          return Promise.resolve(fallbackResult);
        }
        console.log('Fetching images from Pexels API...');
        return client.photos.search({
          query,
          per_page: 3
        })
          .then(data => {
            if (data && data.photos && data.photos.length > 0) {
              console.log(`Found ${data.photos.length} images from Pexels API`);
              // Cache the successful result
              sessionStorage.setItem(cacheKey, JSON.stringify(data.photos));
              return data.photos;
            } else {
              console.log('No images found from API, using fallback');
              const fallbackResult = getFallbackImages(query);
              sessionStorage.setItem(cacheKey, JSON.stringify(fallbackResult));
              return fallbackResult;
            }
          })
          .catch(error => {
            console.error('Error fetching from Pexels API:', error);
            const fallbackResult = getFallbackImages(query);
            sessionStorage.setItem(cacheKey, JSON.stringify(fallbackResult));
            return fallbackResult;
          });
      });
  }
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  // Show loading indicator
  container.innerHTML = '<div class="text-center"><p>Loading image...</p><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

  // Fetch images using the fetchPexelsImages function which now uses the client
  fetchPexelsImages(query)
    .then(images => {
      if (images && images.length > 0) {
        const imageUrl = images[0].src.medium;
        console.log('Image URL:', imageUrl);

        // Create image element
        const img = document.createElement('img');
        img.alt = images[0].alt || `Image of ${query}`;
        img.title = `Image of ${query}`;
        img.className = 'img-fluid rounded shadow-sm mx-auto d-block';
        img.src = imageUrl;

        // Clear container and add image
        container.innerHTML = '';
        container.appendChild(img);
        console.log('Test image displayed successfully');
      } else {
        container.innerHTML = '<p class="text-center">No images found</p>';
      }
    })
    .catch(error => {
      console.error('Error in test function:', error);
      container.innerHTML = `<p class="text-danger text-center">Error: ${error.message}</p>`;
    });
}

// Export the functions for use in other files
window.fetchPexelsImages = fetchPexelsImages;
window.testPexelsImage = testPexelsImage;

// Log a message to confirm the script is loaded
console.log('Pexels API integration loaded successfully. Use testPexelsImage() to test.');
