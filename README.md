# Arabic Letters Game - Image API Update

## Changes Made

The project has been updated to use the Pexels API for fetching images. This change was made to provide a more reliable and generous alternative to both Pixabay and Unsplash.

### Key Changes:

1. Added a new `pexels.js` file that implements the Pexels API
2. Updated `index.html` to include the new script
3. Modified the image fetching function in `app.js` to work with Pexels' API response format
4. Added a fallback mechanism that uses static images when the API is unavailable or no API key is provided
5. Created a demo page (`pexels-demo.html`) for testing the Pexels API integration

## Why Pexels?

Pexels offers several advantages over other image APIs:

- Higher rate limits (200 requests per hour, 20,000 per month)
- High-quality, curated images
- Simple API with good documentation
- Free to use with attribution (though attribution is not required for most uses)

## How to Use the Pexels API

To use the Pexels API, you need to:

1. Create a free account at [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Get your API key from your account dashboard
3. Open `js/pexels.js` and replace the `API_KEY` with your actual key
4. The free Pexels API allows 200 requests per hour and 20,000 requests per month, which is more generous than many other free image APIs

## Fallback Mechanism

If you don't provide an API key or if the API request fails, the application will use fallback images from Pexels.com. The fallback images are categorized by common search terms (nature, animal, food, people, city) to provide relevant results even without API access.

## Testing the Integration

You can test the Pexels API integration by opening the `pexels-demo.html` file in your browser. This page allows you to:

1. Search for images using different terms
2. See the API response for debugging
3. View the returned images in a gallery format
4. See photographer attribution when available

## Troubleshooting

If you encounter issues with the image display:

1. Check the browser console for error messages
2. Verify that your API key is correctly set in `js/pexels.js`
3. Make sure you haven't exceeded the API rate limit (200 requests per hour)
4. If you experience "Image load timed out" errors:
   - Check your internet connection speed
   - The application now uses smaller images when available and has increased timeouts to help with slow connections
   - Try refreshing the page or trying again later
5. If all else fails, the application will use the fallback images automatically

## Recent Improvements

The image loading system has been enhanced to address timeout issues:

1. Increased image loading timeout from 10 to 20 seconds
2. Added API request timeout of 15 seconds
3. Now uses smaller image sizes when available for faster loading
4. Improved error handling and fallback mechanisms
