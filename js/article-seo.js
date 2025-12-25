/**
 * Article SEO & Enhancement Script
 * 
 * Features:
 * 1. Generates JSON-LD Schema for 'Article' type.
 * 2. Calculates and displays estimated reading time.
 * 3. Adds a 'Related Articles' section based on categories/tags.
 * 4. Ensures all images have 'alt' tags (defaults to title).
 * 
 * Usage: Include this script in your article pages (e.g., <script src="../../js/article-seo.js"></script>)
 */

// Database of articles (Extracted from articles.html)
// Used to populate the "Related Articles" section
const ARTICLE_DB = [
  { url: 'encyclopedia/posts/history-of-arabic.html', title: 'تاريخ اللغة العربية', category: 'موسوعة' },
  { url: 'encyclopedia/posts/arabic-alphabet-overview.html', title: 'الأبجدية العربية: نظرة عامة', category: 'موسوعة' },
  { url: 'encyclopedia/posts/varieties-of-arabic.html', title: 'أنواع اللغة العربية: الفصحى والعامية', category: 'موسوعة' },
  { url: 'articles/roadmap-for-beginners.html', title: 'خارطة الطريق للمبتدئين', category: 'مدونة' },
  { url: 'articles/genius-of-derivational-system.html', title: 'عبقرية النظام الاشتقاقي', category: 'مدونة' },
  { url: 'articles/muallaqat-pre-islamic-arabic.html', title: 'عصر المعلقات وما قبل الإسلام', category: 'مدونة' },
  { url: 'blog/posts/importance-of-learning-arabic.html', title: 'أهمية تعلم اللغة العربية في العصر الحديث', category: 'مدونة' },
  { url: 'blog/posts/arabic-diacritics-guide.html', title: 'دليل المبتدئين لفهم الحركات', category: 'مدونة' },
  { url: 'blog/posts/tips-for-teaching-arabic.html', title: 'نصائح لتعليم اللغة العربية للأطفال', category: 'مدونة' },
  { url: 'blog/posts/common-challenges-in-learning-arabic.html', title: 'تحديات شائعة عند تعلم اللغة العربية', category: 'مدونة' },
  { url: 'blog/posts/gamification-in-language-learning.html', title: 'دور الألعاب في تعلم اللغات', category: 'مدونة' },
  { url: 'blog/posts/arabic-numbers-1-100.html', title: 'الأرقام العربية من 1 إلى 100', category: 'مدونة' },
  { url: 'blog/posts/how-to-introduce-yourself-in-arabic.html', title: 'كيف تقدم نفسك باللغة العربية', category: 'مدونة' },
  { url: 'blog/posts/arabic-words-you-already-know.html', title: 'كلمات عربية تعرفها بالفعل', category: 'مدونة' },
  { url: 'blog/posts/word-meaning-vowels.html', title: 'كيف تغير كلمة عربية واحدة معناها بالحركات', category: 'مدونة' },
  { url: 'blog/posts/arabic-phrases-sound-rude.html', title: 'عبارات عربية تبدو وقحة لكنها ليست كذلك', category: 'مدونة' },
  { url: 'blog/posts/beautiful-arabic-words.html', title: 'كلمات عربية جميلة ذات معانٍ عميقة', category: 'مدونة' },
  { url: 'blog/posts/pre-islamic-poetry.html', title: 'تقاليد الشعر الجاهلي: المعلقات', category: 'مدونة' },
  { url: 'blog/posts/arabic-typography-evolution.html', title: 'تطور الخط العربي والخطوط الرقمية', category: 'مدونة' },
  { url: 'blog/posts/levantine-arabic-dialect.html', title: 'جولة في اللهجات العربية: اللهجة الشامية', category: 'مدونة' }
];

document.addEventListener('DOMContentLoaded', () => {
  // Only run on article pages (pages with a <main> tag but not the index list)
  // We assume index pages have .article-entry class for the list items
  if (document.querySelector('.article-entry')) return;

  const mainContent = document.querySelector('main') || document.body;

  // 1. Fix Image Alt Tags
  fixImageAlts(mainContent);

  // 2. Add Reading Time
  addReadingTime(mainContent);

  // 3. Generate JSON-LD Schema
  generateSchema(mainContent);

  // 4. Add Related Articles
  addRelatedArticles(mainContent);
});

/**
 * Ensures all images have an alt tag.
 * Defaults to the document title if missing.
 */
function fixImageAlts(container) {
  const images = container.querySelectorAll('img');
  const pageTitle = document.title.split('|')[0].trim();

  images.forEach((img, index) => {
    if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
      img.setAttribute('alt', `${pageTitle} - صورة ${index + 1}`);
    }
  });
}

/**
 * Calculates reading time and injects it after the H1 title.
 */
function addReadingTime(container) {
  const text = container.innerText || container.textContent;
  const wordCount = text.trim().split(/\s+/).length;
  const readingSpeed = 180; // Words per minute (Arabic average)
  const minutes = Math.ceil(wordCount / readingSpeed);

  const h1 = container.querySelector('h1');
  if (h1) {
    const timeElement = document.createElement('div');
    timeElement.className = 'text-muted mb-4';
    timeElement.style.fontSize = '0.9rem';
    timeElement.innerHTML = `
      <span style="margin-left: 10px;">⏱️ وقت القراءة المتوقع: ${minutes} دقائق</span>
      <span>📝 عدد الكلمات: ${wordCount}</span>
    `;
    h1.parentNode.insertBefore(timeElement, h1.nextSibling);
  }
}

/**
 * Generates JSON-LD Schema for Article
 */
function generateSchema(container) {
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const author = document.querySelector('meta[name="author"]')?.content || 'Arabeez';
  const image = container.querySelector('img')?.src || 'https://arabeez.space/images/preview.jpg';
  const datePublished = new Date().toISOString(); // Fallback as we don't have explicit date meta in static HTML

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [image],
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Arabeez",
      "logo": {
        "@type": "ImageObject",
        "url": "https://arabeez.space/favicon.ico"
      }
    },
    "description": description,
    "datePublished": datePublished
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Adds Related Articles section at the bottom of the main content.
 */
function addRelatedArticles(container) {
  // Determine current page category based on URL or Title match in DB
  const currentPath = window.location.pathname;
  const currentFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Find current article in DB to get its category
  // We match loosely on filename because of potential path differences
  const currentArticle = ARTICLE_DB.find(a => a.url.includes(currentFilename));
  
  if (!currentArticle) return; // Can't determine category

  const category = currentArticle.category;

  // Filter related articles: same category, not current page
  const related = ARTICLE_DB.filter(a => 
    a.category === category && !a.url.includes(currentFilename)
  );

  if (related.length === 0) return;

  // Shuffle and pick 3
  const selected = related.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Determine root prefix for links (e.g., ../../)
  const rootPrefix = getRootPrefix();

  // Create HTML Section
  const section = document.createElement('section');
  section.className = 'related-articles mt-5 pt-4 border-top';
  section.innerHTML = `
    <h3 class="mb-4" style="color: #0066cc;">مقالات ذات صلة (${category})</h3>
    <div class="row">
      ${selected.map(article => `
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title fs-6">
                <a href="${rootPrefix}${article.url}" class="text-decoration-none text-dark stretched-link">
                  ${article.title}
                </a>
              </h5>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(section);
}

/**
 * Helper to determine the relative path to the root based on the script tag location.
 * This allows the script to work from /blog/posts/ or /articles/ without hardcoding depth.
 */
function getRootPrefix() {
  // Look for this script tag
  const script = document.querySelector('script[src$="article-seo.js"]');
  if (script) {
    const src = script.getAttribute('src');
    // If src is "../../js/article-seo.js", the prefix to root is "../../"
    return src.replace('js/article-seo.js', '');
  }
  return '../'; // Default fallback
}