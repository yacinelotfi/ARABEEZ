# Pexels API Integration Explanation

## Overview

This document explains the recent modification to the Pexels API integration in our application. We've implemented a client-based approach using the `createClient` function instead of direct fetch calls to the Pexels API.

## How the Modification Works

### 1. The `createClient` Function

The `createClient` function is a custom implementation that mimics the official Pexels JavaScript client library. Here's how it works:

```javascript
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
```

This function:
- Takes an API key as a parameter
- Returns an object with a nested structure that includes a `photos.search` method
- The `search` method accepts options including `query` and `per_page`
- It constructs the API URL and makes a fetch request with the API key in the Authorization header
- It handles basic error checking and returns the JSON response

### 2. Creating a Client Instance

After defining the function, we create a client instance by calling `createClient` with our API key:

```javascript
const client = createClient(API_KEY);
```

This creates a reusable client object that can be used throughout the application.

### 3. Using the Client in `fetchPexelsImages`

The `fetchPexelsImages` function has been updated to use the client instead of making direct fetch calls:

```javascript
function fetchPexelsImages(query = 'nature') {
    // Check if API key is the default one
    if (API_KEY === 'your-api-key-here') {
        console.log('Using fallback images because no API key is provided');
        return Promise.resolve(getFallbackImages(query));
    }

    // Show loading indicator if needed
    console.log('Fetching images from Pexels using client...');

    // Use the Pexels client to search for images
    return client.photos.search({ query, per_page: 3 })
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                console.log(`Found ${data.photos.length} images`);
                return data.photos;
            } else {
                console.log('No images found, using fallback images');
                return getFallbackImages(query);
            }
        })
        .catch(error => {
            console.error('Error fetching images from Pexels:', error);
            console.log('Using fallback images due to API error');
            return getFallbackImages(query);
        });
}
```

Instead of constructing the URL and making a fetch call directly, we now use:
```javascript
client.photos.search({ query, per_page: 3 })
```

This makes the code cleaner and more maintainable.

### 4. Using the Client in `testPexelsImage`

The `testPexelsImage` function has also been updated to use the `fetchPexelsImages` function which now uses the client:

```javascript
function testPexelsImage(query = 'nature', containerId = 'wordImageContainer') {
    // ...

    // Fetch images using the fetchPexelsImages function which now uses the client
    fetchPexelsImages(query)
        .then(images => {
            // ...
        })
        .catch(error => {
            // ...
        });
}
```

## Benefits of This Approach

1. **Cleaner Code**: The client-based approach makes the code more organized and easier to read.

2. **Better Abstraction**: The API interaction details are encapsulated within the client, making the main functions cleaner.

3. **Consistency with Official SDK**: This approach is similar to how the official Pexels JavaScript SDK works, making it easier to switch to the official SDK in the future if needed.

4. **Reusability**: The client can be reused across different parts of the application without duplicating the API call logic.

5. **Easier Maintenance**: If the Pexels API changes, we only need to update the client implementation in one place.

## How to Use

The application continues to use the `fetchPexelsImages` function as before, but now it's powered by the client-based implementation. No changes are needed in other parts of the code that call this function.

## Fallback Mechanism

The fallback mechanism remains unchanged. If the API key is not provided or if the API request fails, the application will use fallback images from the predefined categories.
