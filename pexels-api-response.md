# Pexels API Response Format

This document explains the Pexels API response format and how to call the API in our application.

## How to Call the Pexels API

There are two main ways to call the Pexels API in our application:

### 1. Using the `fetchPexelsImages` Function

The simplest way is to use the `fetchPexelsImages` function that's already implemented in `pexels.js`:

```javascript
// Import the function (already available in the global scope)
// Call the function with a search term
fetchPexelsImages('nature')
  .then(images => {
    console.log('Images returned:', images);
    // Process the images array here
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
```

### 2. Using the Pexels Client Directly

For more advanced usage, you can use the Pexels client directly:

```javascript
// The client is already created in pexels.js
client.photos.search({ query: 'nature', per_page: 5 })
  .then(response => {
    console.log('Full API response:', response);
    // Process the full response object
    const photos = response.photos;
    // Do something with the photos
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## API Response Structure

### Full API Response (from client.photos.search)

When using the Pexels client directly, the API returns a response object with this structure:

```json
{
  "total_results": 8000,
  "page": 1,
  "per_page": 3,
  "photos": [
    {
      "id": 3408744,
      "width": 3546,
      "height": 2255,
      "url": "https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/",
      "photographer": "stein egil liland",
      "photographer_url": "https://www.pexels.com/@therato",
      "photographer_id": 144244,
      "avg_color": "#557088",
      "src": {
        "original": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
        "large2x": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false,
      "alt": "Scenic View of Snow Capped Mountains During Night"
    }
  ],
  "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=3&query=nature"
}
```

### Simplified Response (from fetchPexelsImages)

The `fetchPexelsImages` function simplifies this response and returns just the `photos` array with each photo having this structure:

```json
[
  {
    "id": 3408744,
    "width": 3546,
    "height": 2255,
    "url": "https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/",
    "photographer": "stein egil liland",
    "photographer_url": "https://www.pexels.com/@therato",
    "src": {
      "original": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      "large": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "medium": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=350",
      "small": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=130"
    },
    "alt": "Scenic View of Snow Capped Mountains During Night"
  }
]
```

## Using the API Response

### Accessing Image URLs

The most common use case is to access the image URLs from the response:

```javascript
fetchPexelsImages('nature')
  .then(images => {
    if (images && images.length > 0) {
      // Get different size options
      const originalUrl = images[0].src.original;
      const largeUrl = images[0].src.large;
      const mediumUrl = images[0].src.medium;
      const smallUrl = images[0].src.small;

      // Use the URL in an img element
      const img = document.createElement('img');
      img.src = mediumUrl;
      img.alt = images[0].alt || 'Nature image';
      document.body.appendChild(img);
    }
  });
```

### Displaying Photographer Attribution

Pexels requires attribution when possible:

```javascript
fetchPexelsImages('nature')
  .then(images => {
    if (images && images.length > 0 && images[0].photographer) {
      const attribution = document.createElement('p');
      attribution.innerHTML = `Photo by <a href="${images[0].photographer_url}">${images[0].photographer}</a> on <a href="https://www.pexels.com">Pexels</a>`;
      document.body.appendChild(attribution);
    }
  });
```

## Testing the API Response

You can test the API response using the `pexels-demo.html` page included in the project. This page allows you to:

1. Search for images using different terms
2. See the full API response in JSON format
3. View the returned images in a gallery

## Fallback Mechanism

If the API call fails or no API key is provided, the application will use fallback images. The fallback response has the same structure as the API response, but with limited fields:

```json
[
  {
    "src": {
      "medium": "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg"
    },
    "alt": "Fallback image for nature"
  }
]
```
