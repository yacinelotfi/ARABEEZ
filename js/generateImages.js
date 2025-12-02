// generateImages.js
// Script to generate images for Arabic letters and words using Pexels API

// Import required modules for Node.js environment
const fs = require('fs');
const path = require('path');
const https = require('https');

// API key from pexels.js
const API_KEY = 'YJ5MCDgUAvdfmMlwuvUd7ffds6BUsBpTzIFOLmpKAl01HNTLqfWaS1kl';

// Arabic letters array from app.js
const arabicLetters = ['د', 'م', 'ر', 'ب', 'س', 'ف', 'ل', 'ص', 'ذ', 'ز', 'ط', 'ض', 'ن', 'ع', 'ت', 'ظ', 'ح', 'ه', 'ء', 'ج', 'خ', 'غ', 'ك', 'ث', 'ق', 'ش', 'و', 'ي'];

// Example words for each letter from app.js
const letterWords = {
  'د': ['دَرْسٌ', 'دُبٌّ', 'دِيكٌ', 'دَمٌ', 'دَرَجَةٌ'],
  'م': ['مَدْرَسَةٌ', 'مِفْتَاحٌ', 'مِصْبَاحٌ', 'مَاءٌ', 'مُسْلِمٌ'],
  'ر': ['رَسُولٌ', 'رِجَالٌ', 'رَمَضَانٌ', 'رُزٌّ', 'رِيشَةٌ'],
  'ب': ['بَابٌ', 'بِسْمِ', 'بُرْتُقَالٌ', 'بَطِّيخَةٌ', 'بَحْرٌ'],
  'س': ['سَمَاءٌ', 'سُكَّرٌ', 'سِكِّينٌ', 'سَبَبٌ', 'سُرُورٌ'],
  'ف': ['فَمٌ', 'فِيلٌ', 'فُسْتُقٌ', 'فَرَسٌ', 'فَأْرٌ'],
  'ل': ['لَبِسَ', 'لِبَاسٌ', 'لَبِيبٌ', 'لَمَسَ', 'مَلْمَسٌ'],
  'ص': ['صَدْرٌ', 'صُدورٌ', 'يَصِلُ', 'لِصٌّ', 'لُصوصٌ'],
  'ذ': ['بُذورٌ', 'لَذيذٌ', 'ذِئابٌ', 'ذابِلٌ', 'رَذاذٌ'],
  'ز': ['زِفافٌ', 'زَيدٌ', 'زَميلٌ', 'مُبارَزةٌ', 'رِزٌّ'],
  'ط': ['طَبِيبٌ', 'طِفْلٌ', 'بَطَلٌ', 'طَالِبٌ', 'طِبٌّ'],
  'ض': ['ضَعِيفٌ', 'ضُيُوفٌ', 'مَعْرِضٌ', 'ضَابِطٌ', 'ضِبَابٌ'],
  'ن': ['سِنْبَالٌ', 'لَبَنٌ', 'رُمَانٌ', 'نَسْرٌ', 'نَمْلٌ'],
  'ع': ['عَالِمٌ', 'مُعَلِّمٌ', 'لَاعِبٌ', 'عَامِلٌ', 'ذِرَاعٌ'],
  'ت': ['بِنْتٌ', 'بَنَاتٌ', 'فَتَاةٌ', 'فُسْتَانٌ'],
  'ظ': ['ظَرْفٌ', 'نَظِيفٌ', 'عَظِيمٌ', 'ظُلْمٌ', 'ظُفْرٌ'],
  'ح': ['تُفَّاحٌ', 'حَلِيبٌ', 'حُبٌّ', 'حِصَانٌ', 'حَديقَةٌ'],
  'ه': ['هِلَالٌ', 'هُدْهُدٌ', 'مَهْدٌ', 'هَاتِفٌ', 'سَهْمٌ'],
  'ء': ['أُمٌّ', 'أَبٌ', 'أُمِّيٌ', 'أَبِيٌ', 'إِنْسَانٌ'],
  'ج': ['جِبْنٌ', 'جَزَرٌ', 'جِسْرٌ', 'جَرَسٌ', 'جِسْمٌ'],
  'خ': ['نَخِيلٌ', 'خُبْزٌ', 'خَاتَمٌ', 'خَطٌّ'],
  'غ': ['غَزَالٌ', 'غَنَمٌ', 'غُرَابٌ', 'غَيْمٌ'],
  'ك': ['كِتَابٌ', 'مَكْتَبٌ', 'كُرْسِيٌّ', 'كَأْسٌ', 'كَبيرٌ'],
  'ث': ['ثَوْرٌ', 'ثَعْلَبٌ', 'ثَمَرٌ', 'ثُعْبانٌ', 'ثَوْبٌ'],
  'ق': ['قَمَرٌ', 'قِطَّةٌ', 'قَفَصٌ', 'قُرْآنٌ', 'قَصْرٌ'],
  'ش': ['شَمْسٌ', 'شَجَرٌ', 'شَرابٌ', 'شَعْرٌ', 'شَبَكَةٌ'],
  'و': ['وَجْهٌ', 'وَرَقٌ', 'وَطَنٌ', 'وَزيرٌ', 'وَعْدٌ'],
  'ي': ['يَدٌ', 'يَمامَةٌ', 'يَقينٌ', 'يَوْمٌ', 'ياسِرٌ']
};

// Translation dictionary from app.js (abbreviated version)
const translations = {
  // Letter د words
  'دَرْسٌ': 'lesson',
  'دُبٌّ': 'bear',
  'دِيكٌ': 'rooster',
  'دَمٌ': 'blood',
  'دَرَجَةٌ': 'degree',
  'دَجَاجَةٌ': 'chicken',

  // Letter م words
  'مَدْرَسَةٌ': 'school',
  'مِفْتَاحٌ': 'key',
  'مِصْبَاحٌ': 'lamp',
  'مَاءٌ': 'water',
  'مُسْلِمٌ': 'muslim',
  'مِكْنَسَةٌ': 'broom',

  // Letter ر words
  'رَسُولٌ': 'messenger',
  'رِجَالٌ': 'men',
  'رَمَضَانٌ': 'ramadan',
  'رُزٌّ': 'rice',
  'رِيشَةٌ': 'feather',
  'رَجُلٌ': 'man',

  // Letter ب words
  'بَابٌ': 'door',
  'بِسْمِ': 'in the name of',
  'بُرْتُقَالٌ': 'orange',
  'بَطِّيخَةٌ': 'watermelon',
  'بَحْرٌ': 'sea',
  'بَطَّةٌ': 'duck',

  // Add more translations as needed...
};

// Function to translate Arabic to English (simplified version of the app.js function)
function translateArabicToEnglish(arabicWord) {
  return translations[arabicWord] || arabicWord;
}

// Function to create a sanitized filename
function createSanitizedFilename(letter, word, translatedWord) {
  // Replace spaces with underscores and remove special characters
  const sanitized = translatedWord.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
  return `word_${letter}_${sanitized}.jpg`;
}

// Function to download an image and save it to the img folder
function downloadImage(imageUrl, fileName) {
  return new Promise((resolve, reject) => {
    const imgDir = path.join(__dirname, '..', 'img');

    // Create img directory if it doesn't exist
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    const filePath = path.join(imgDir, fileName);
    const file = fs.createWriteStream(filePath);

    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded image saved as: ${filePath}`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Function to fetch images from Pexels API
function fetchPexelsImages(query) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;

    const options = {
      headers: {
        'Authorization': API_KEY
      }
    };

    https.get(apiUrl, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.photos && result.photos.length > 0) {
            resolve(result.photos);
          } else {
            console.log(`No images found for query: ${query}`);
            resolve([]);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate images for Arabic letters
async function generateLetterImages() {
  console.log("Generating images for Arabic letters...");

  for (const letter of arabicLetters) {
    // Use the letter itself as the search term
    const searchTerm = `arabic letter ${letter}`;

    try {
      const images = await fetchPexelsImages(searchTerm);
      if (images && images.length > 0) {
        const imageUrl = images[0].src.medium;
        await downloadImage(imageUrl, `letter_${letter}.jpg`);
        console.log(`Downloaded image for letter ${letter}`);
      } else {
        console.log(`No images found for letter ${letter}`);
      }

      // Add a delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error generating image for letter ${letter}:`, error);
    }
  }
}

// Function to generate images for words associated with each letter
async function generateWordImages() {
  console.log("Generating images for words...");

  for (const [letter, words] of Object.entries(letterWords)) {
    for (const word of words) {
      const translatedWord = translateArabicToEnglish(word);
      if (!translatedWord) {
        console.log(`No translation found for word: ${word}`);
        continue;
      }

      try {
        const images = await fetchPexelsImages(translatedWord);
        if (images && images.length > 0) {
          const imageUrl = images[0].src.medium;
          const fileName = createSanitizedFilename(letter, word, translatedWord);
          await downloadImage(imageUrl, fileName);
          console.log(`Downloaded image for word ${word} (${translatedWord})`);
        } else {
          console.log(`No images found for word ${word} (${translatedWord})`);
        }

        // Add a delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error generating image for word ${word}:`, error);
      }
    }
  }
}

// Main function to generate all images
async function generateAllImages() {
  console.log("Starting image generation process...");

  // Create img directory if it doesn't exist
  const imgDir = path.join(__dirname, '..', 'img');
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
    console.log(`Created directory: ${imgDir}`);
  }

  // Generate images for letters first
  await generateLetterImages();

  // Then generate images for words
  await generateWordImages();

  console.log("Image generation complete!");
}

// Execute the image generation
generateAllImages().catch(error => {
  console.error("Error in image generation process:", error);
});

// Browser version (for reference)
/*
// This is a simplified version that could be used in a browser environment
// It would trigger downloads rather than saving files directly

// Function to download an image in browser
function downloadImageInBrowser(imageUrl, fileName) {
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return Promise.resolve(`Downloaded ${fileName}`);
}

// Browser-based implementation would use fetch instead of https
function fetchPexelsImagesInBrowser(query) {
  return fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
    headers: {
      'Authorization': API_KEY
    }
  })
  .then(response => response.json())
  .then(data => data.photos || []);
}
*/
