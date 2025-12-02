// C:/Users/DLH/IdeaProjects/untitled/js/app.js
// --- VERSION WITH CORRECTIONS AND REFINEMENTS APPLIED ---
// @ts-check // Enable basic type checking in VS Code

const arabicLetters = ['د', 'م', 'ر', 'ب', 'س', 'ف', 'ل', 'ص', 'ذ', 'ز', 'ط', 'ض', 'ن', 'ع', 'ت', 'ظ', 'ح', 'ه', 'ء', 'ج', 'خ', 'غ', 'ك', 'ث', 'ق', 'ش', 'و', 'ي'];

// Defines the visual representation of letters with basic harakat (vowels)
// Includes connecting dash '-' for letters that connect initially
const initialShapes = {
  'د': { 'َ': 'دَ', 'ُ': 'دُ', 'ِ': 'دِ' },
  'م': { 'َ': 'مَـ', 'ُ': 'مُـ', 'ِ': 'مِـ' },
  'ر': { 'َ': 'رَ', 'ُ': 'رُ', 'ِ': 'رِ' },
  'ب': { 'َ': 'بَـ', 'ُ': 'بُـ', 'ِ': 'بِـ' },
  'س': { 'َ': 'سَـ', 'ُ': 'سُـ', 'ِ': 'سِـ' },
  'ف': { 'َ': 'فَـ', 'ُ': 'فُـ', 'ِ': 'فِـ' },
  'ل': { 'َ': 'لَـ', 'ُ': 'لُـ', 'ِ': 'لِـ' },
  'ص': { 'َ': 'صَـ', 'ُ': 'صُـ', 'ِ': 'صِـ' },
  'ذ': { 'َ': 'ذَ', 'ُ': 'ذُ', 'ِ': 'ذِ' },
  'ز': { 'َ': 'زَ', 'ُ': 'زُ', 'ِ': 'زِ' },
  'ط': { 'َ': 'طَـ', 'ُ': 'طُـ', 'ِ': 'طِـ' },
  'ض': { 'َ': 'ضَـ', 'ُ': 'ضُـ', 'ِ': 'ضِـ' },
  'ن': { 'َ': 'نَـ', 'ُ': 'نُـ', 'ِ': 'نِـ' },
  'ع': { 'َ': 'عَـ', 'ُ': 'عُـ', 'ِ': 'عِـ' },
  'ت': { 'َ': 'تَـ', 'ُ': 'تُـ', 'ِ': 'تِـ' },
  'ظ': { 'َ': 'ظَـ', 'ُ': 'ظُـ', 'ِ': 'ظِـ' },
  'ح': { 'َ': 'حَـ', 'ُ': 'حُـ', 'ِ': 'حِـ' },
  'ه': { 'َ': 'هَـ', 'ُ': 'هُـ', 'ِ': 'هِـ' },
  'ء': { 'َ': 'ءَ', 'ُ': 'ءُ', 'ِ': 'ءِ' }, // Standalone Hamza
  'ج': { 'َ': 'جَـ', 'ُ': 'جُـ', 'ِ': 'جِـ' },
  'خ': { 'َ': 'خَـ', 'ُ': 'خُـ', 'ِ': 'خِـ' },
  'غ': { 'َ': 'غَـ', 'ُ': 'غُـ', 'ِ': 'غِـ' },
  'ك': { 'َ': 'كَـ', 'ُ': 'كُـ', 'ِ': 'كِـ' },
  'ث': { 'َ': 'ثَـ', 'ُ': 'ثُـ', 'ِ': 'ثِـ' },
  'ق': { 'َ': 'قَـ', 'ُ': 'قُـ', 'ِ': 'قِـ' },
  'ش': { 'َ': 'شَـ', 'ُ': 'شُـ', 'ِ': 'شِـ' },
  'و': { 'َ': 'وَ', 'ُ': 'وُ', 'ِ': 'وِ' },
  'ي': { 'َ': 'يَـ', 'ُ': 'يُـ', 'ِ': 'يِـ' }
};

// Example words for each letter
const letterWords = {
  'د': ['دَرْسٌ', 'دُبٌّ', 'دِيكٌ', 'دَمٌ', 'دَرَجَةٌ'],
  'م': ['مَدْرَسَةٌ', 'مِفْتَاحٌ', 'مِصْبَاحٌ', 'مَاءٌ', 'مُسْلِمٌ'],
  'ر': ['رَسُولٌ', 'رِجَالٌ', 'رَمَضَانٌ', 'رُزٌّ', 'رِيشَةٌ'],
  'ب': ['بَابٌ', 'بِسْمِ', 'بُرْتُقَالٌ', 'بَطِّيخَةٌ', 'بَحْرٌ'],
  'س': ['سَمَاءٌ', 'سُكَّرٌ', 'سِكِّينٌ', 'سَبَبٌ', 'سُرُورٌ'],
  'ف': ['فَمٌ', 'فِيلٌ', 'فُسْتُقٌ', 'فَرَسٌ', 'فَأْرٌ'],
  'ل': ['لَبِسَ', 'لِبَاسٌ', 'لَبِيبٌ', 'لَمَسَ', 'مَلْمَسٌ'],
  'ص': ['صَدْرٌ', 'صُدورٌ', 'يَصِلُ', 'لِصٌّ', 'لُصوصٌ'],
  'ذ': ['بُذورٌ', 'لَذيذٌ', 'ذِئابٌ', 'ذابِلٌ', 'رَذاذٌ'],
  'ز': ['زِفافٌ', 'زَيدٌ', 'زَميلٌ', 'مُبارَزةٌ', 'رِزٌّ'], // Note: رِزٌّ might be a typo for رُزٌّ (rice)?
  'ط': ['طَبِيبٌ', 'طِفْلٌ', 'بَطَلٌ', 'طَالِبٌ', 'طِبٌّ'],
  'ض': ['ضَعِيفٌ', 'ضُيُوفٌ', 'مَعْرِضٌ', 'ضَابِطٌ', 'ضِبَابٌ'],
  'ن': ['سِنْبَالٌ', 'لَبَنٌ', 'رُمَانٌ', 'نَسْرٌ', 'نَمْلٌ'], // Replaced غُرَابٌ with نَمْلٌ (ant)
  'ع': ['عَالِمٌ', 'مُعَلِّمٌ', 'لَاعِبٌ', 'عَامِلٌ', 'ذِرَاعٌ'],
  'ت': ['بِنْتٌ', 'بَنَاتٌ', 'فَتَاةٌ', 'فُسْتَانٌ'],
  'ظ': ['ظَرْفٌ', 'نَظِيفٌ', 'عَظِيمٌ', 'ظُلْمٌ', 'ظُفْرٌ'],
  'ح': ['تُفَّاحٌ', 'حَلِيبٌ', 'حُبٌّ', 'حِصَانٌ', 'حَديقَةٌ'],
  'ه': ['هِلَالٌ', 'هُدْهُدٌ', 'مَهْدٌ', 'هَاتِفٌ', 'سَهْمٌ'],
  'ء': ['أُمٌّ', 'أَبٌ', 'أُمِّيٌ', 'أَبِيٌ', 'إِنْسَانٌ'], // Words starting with Hamza on Alif
  'ج': ['جِبْنٌ', 'جَزَرٌ', 'جِسْرٌ', 'جَرَسٌ', 'جِسْمٌ'],
  'خ': ['نَخِيلٌ', 'جَزِيرَةٌ', 'خُبْزٌ', 'خَاتَمٌ', 'خَطٌّ'], // Note: جَزِيرَةٌ (island) doesn't start with خ
  'غ': ['غَزَالٌ', 'غَنَمٌ', 'غُرَابٌ', 'غَيْمٌ'],
  'ك': ['كِتَابٌ', 'مَكْتَبٌ', 'كُرْسِيٌّ', 'كَأْسٌ', 'كَبيرٌ'],
  'ث': ['ثَوْرٌ', 'ثَعْلَبٌ', 'ثَمَرٌ', 'ثُعْبانٌ', 'ثَوْبٌ'],
  'ق': ['قَمَرٌ', 'قِطَّةٌ', 'قَفَصٌ', 'قُرْآنٌ', 'قَصْرٌ'],
  'ش': ['شَمْسٌ', 'شَجَرٌ', 'شَرابٌ', 'شَعْرٌ', 'شَبَكَةٌ'],
  'و': ['وَجْهٌ', 'وَرَقٌ', 'وَطَنٌ', 'وَزيرٌ', 'وَعْدٌ'],
  'ي': ['يَدٌ', 'يَمامَةٌ', 'يَقينٌ', 'يَوْمٌ', 'ياسِرٌ']
};

// Example phrases for each letter
const letterPhrases = {
  'د': ['دَجَاجَةٌ تَرْكُضُ', 'دُبٌّ يَأْكُلُ', 'دِيكٌ يُغَنِّي', 'دَرْسٌ مُمْتِعٌ'],
  'م': ['مِكْنَسَةٌ تَنْظُفُ', 'مَاءٌ بَارِدٌ', 'مِصْبَاحٌ يُضِيءُ', 'مَدْرَسَةٌ جَمِيلَةٌ'],
  'ر': ['رَجُلٌ يَضْحَكُ', 'رُزٌّ فِي الصَّحْنِ', 'رِيشَةٌ تَطِيرُ', 'رَمَضَانٌ قَرِيبٌ'],
  'ب': ['بَابٌ يُفْتَحُ', 'بُرْتُقَالٌ حُلْوٌ', 'بَطَّةٌ تَسْبَحُ', 'بَحْرٌ أَزْرَقُ'],
  'س': ['سَمَكَةٌ تَسْبَحُ', 'سَمَاءٌ زَرْقَاءُ', 'سِكِّينٌ يَقْطَعُ', 'سُكَّرٌ حُلْوٌ'],
  'ف': ['فِيلٌ يَمْشِي', 'فَرَاشَةٌ تَطِيرُ', 'فُسْتُقٌ لَذِيذٌ', 'فَمٌ يَضْحَكُ'],
  'ل': ['لَعْبَةٌ مُمْتِعَةٌ', 'لِبَاسٌ جَدِيدٌ', 'لَبَنٌ بَارِدٌ', 'لَوْحَةٌ رَائِعَةٌ'],
  'ص': ['صَبَاحٌ مُشْرِقٌ', 'صَوْتٌ عَالٍ', 'صَيَّادٌ يَعْمَلُ', 'صُورَةٌ جَمِيلَةٌ'],
  'ذ': ['ذِئْبٌ يَرْكُضُ', 'ذُرَةٌ صَفْرَاءُ', 'ذَهَبٌ يَلْمَعُ', 'ذِكْرَى سَعِيدَةٌ'],
  'ز': ['زَهْرَةٌ حَمْرَاءُ', 'زَيْدٌ يَلْعَبُ', 'زُجَاجٌ نَظِيفٌ', 'زِيَارَةٌ مُمْتِعَةٌ'],
  'ط': ['طَائِرٌ يُغَنِّي', 'طَعَامٌ لَذِيذٌ', 'طِفْلٌ يَضْحَكُ', 'طَرِيقٌ طَوِيلٌ'],
  'ض': ['ضِفْدَعٌ يَقْفِزُ', 'ضَوْءٌ سَاطِعٌ', 'ضَحْكَةٌ عَالِيَةٌ', 'ضَيْفٌ قَرِيبٌ'],
  'ن': ['نَجْمَةٌ تَلْمَعُ', 'نَمْلَةٌ تَعْمَلُ', 'نَهْرٌ يَجْرِي', 'نَسْرٌ يَطِيرُ'],
  'ع': ['عَصْفُورٌ يُغَرِّدُ', 'عَيْنٌ تَرَى', 'عِيدٌ سَعِيدٌ', 'عَمَلٌ مُمْتِعٌ'],
  'ت': ['تُفَّاحَةٌ حَمْرَاءُ', 'تَمْرٌ حُلْوٌ', 'تَابِعٌ يَلْعَبُ', 'تَصْوِيرٌ جَمِيلٌ'], // Note: تَابِعٌ (follower) might be less common than other examples
  'ظ': ['ظَبْيٌ يَرْكُضُ', 'ظِلٌّ بَارِدٌ', 'ظُهْرٌ حَارٌّ', 'ظَرْفٌ أَبْيَضُ'],
  'ح': ['حَقِيبَةٌ كَبِيرَةٌ', 'حِصَانٌ يَجْرِي', 'حَلِيبٌ بَارِدٌ', 'حَدِيقَةٌ خَضْرَاءُ'],
  'ه': ['هَوَاءٌ عَلِيلٌ', 'هَدِيَّةٌ جَمِيلَةٌ', 'هِلَالٌ فِي السَّمَاءِ', 'هَرَمٌ كَبِيرٌ'],
  'ء': ['أُمٌّ تَضْحَكُ', 'أَبٌ يَعْمَلُ', 'أَمِيرٌ طَيِّبٌ', 'أُمْنِيَةٌ سَعِيدَةٌ'],
  'ج': ['جَمَلٌ يَمْشِي', 'جَزَرٌ أَحْمَرُ', 'جِبْنٌ لَذِيذٌ', 'جِسْرٌ طَوِيلٌ'],
  'خ': ['خَرُوفٌ يَأْكُلُ', 'خُبْزٌ سَاخِنٌ', 'خَيْمَةٌ كَبِيرَةٌ', 'خَطٌّ مُسْتَقِيمٌ'],
  'غ': ['غَزَالٌ يَقْفِزُ', 'غَنَمٌ تَرْعَى', 'غُرَابٌ يَطِيرُ', 'غَيْمٌ أَبْيَضُ'],
  'ك': ['كُرَةٌ تَتَدَحْرَجُ', 'كِتَابٌ مُمْتِعٌ', 'كَعْكَةٌ حُلْوَةٌ', 'كُرْسِيٌّ جَدِيدٌ'],
  'ث': ['ثَعْلَبٌ يَرْكُضُ', 'ثَوْبٌ نَظِيفٌ', 'ثَمَرٌ حُلْوٌ', 'ثَلْجٌ أَبْيَضُ'],
  'ق': ['قِطَّةٌ تَلْعَبُ', 'قَمَرٌ يَلْمَعُ', 'قَارِبٌ يَسِيرُ', 'قَفَصٌ كَبِيرٌ'],
  'ش': ['شَمْسٌ مُشْرِقَةٌ', 'شَجَرَةٌ خَضْرَاءُ', 'شَرَابٌ بَارِدٌ', 'شَبَكَةٌ قَوِيَّةٌ'],
  'و': ['وَرْدَةٌ حَمْرَاءُ', 'وَجْهٌ يَضْحَكُ', 'وَطَنٌ جَمِيلٌ', 'وَرَقٌ أَبْيَضُ'],
  'ي': ['يَدٌ تَرْسُمُ', 'يَمَامَةٌ تَطِيرُ', 'يَوْمٌ سَعِيدٌ', 'يَاسَمِينٌ عَطِرٌ']
};

// --- State Variables ---
let currentLetter = ''; // The currently selected letter for activities
let progressMap = new Map(); // Tracks completed actions (letter-action)
// Ensure totalActions accurately reflects the number of actions tracked by trackProgress()
const totalActions = arabicLetters.length * 9; // 3 harakat + 3 tanween + 3 long vowels per letter

// Audio player element and speech setting
const audio = document.getElementById('audioPlayer'); // Assume exists in HTML: <audio id="audioPlayer"></audio>
let isSpeechEnabled = localStorage.getItem('speechEnabled') !== 'false'; // Default to true
let isWordImageEnabled = localStorage.getItem('wordImageEnabled') !== 'false'; // Default to true

// State for Word/Phrase Modals
let currentWords = [];
let currentWordIndex = 0;
let currentPhrases = [];
let currentPhraseIndex = 0;

// State for Writing Game (Arrangement)
let gameWords = [];
let gameWordIndex = 0;
let currentScrambled = []; // Array of letter+haraka strings, scrambled
let selectedOrder = []; // Array of indices from currentScrambled
let originalWord = ''; // The correct word for the current game challenge

// State for Guess Letter Game
let guessChallenges = [];
let guessIndex = 0;
let correctLetterWithHaraka = ''; // Correct answer for the current guess challenge

// State for Writing Practice Game
let writingChallenges = [];
let writingIndex = 0;
let currentTargetLetter = ''; // The letter+haraka the user needs to type

// State for Moving Letter Game
const harakatSequence = [ // Sequence of harakat/vowels for the moving letter game
  { symbol: 'َ', sound: 'fatha' },
  { symbol: 'ُ', sound: 'damma' },
  { symbol: 'ِ', sound: 'kasra' },
  { symbol: 'ً', sound: 'tanween-fath' },
  { symbol: 'ٌ', sound: 'tanween-damm' },
  { symbol: 'ٍ', sound: 'tanween-kasr' },
  { symbol: 'ا', sound: 'alif' }, // Long vowel Alif
  { symbol: 'و', sound: 'waw' },  // Long vowel Waw
  { symbol: 'ي', sound: 'ya' }   // Long vowel Ya
];
let selectedLetter = ''; // Letter selected for the moving letter game
let movingInterval = null; // Interval ID for the moving letter animation
let currentHarakatIndex = 0; // Current index in harakatSequence

// State for Word Hunter Game
let hunterScore = 0;
let hunterTimerInterval = null; // Interval ID for the hunter game timer
let hunterTimeLeft = 30; // Seconds

// State for Missing Syllable Game
let syllableChallenges = [];
let syllableIndex = 0;
let correctSyllable = ''; // Correct answer for the current syllable challenge

// State for Global Quiz
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let correctQuizAnswer = ''; // Correct answer for the current quiz question

// --- DOM Element References ---
// Use const for elements expected to always exist
const lettersContainer = document.getElementById('lettersContainer');
const selectedLetterElement = document.getElementById('selectedLetter');
const progressBar = document.getElementById('progress');
const toggleSpeechBtn = document.getElementById('toggleSpeechBtn');
// Add other frequently used elements if needed

// --- Translations ---
const translations = {
  ar: {
    appTitle: 'تعلم الأحرف العربية مع الحركات',
    appDescription: 'ابدأ الآن بتعلم الأحرف العربية بطريقة ممتعة وتفاعلية!',
    resetProgress: 'إعادة التقدم',
    speakIntro: 'استمع للمقدمة',
    toggleSpeech: 'تعطيل الصوت',
    toggleSpeechOn: 'تفعيل الصوت',
    shareSite: 'شارك التطبيق مع أصدقائك',
    startQuiz: 'اختبار عام',
    errorAudio: 'خطأ: تعذر تشغيل الصوت. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.',
    errorAudioFallback: 'خطأ في تشغيل الصوت. تم استخدام صوت بديل.',
    errorAudioPermission: 'يرجى السماح بتشغيل الصوت في إعدادات المتصفح.',
    errorContainer: 'خطأ: لا يمكن العثور على حاوية الأحرف. يرجى تحديث الصفحة.',
    noLetters: 'لا توجد أحرف متاحة للعرض.',
    errorLoad: 'خطأ: فشل تحميل الأحرف. يرجى تحديث الصفحة.',
    letterLabel: 'الحرف {letter}',
    noWords: 'لا توجد كلمات متاحة لهذا الحرف.',
    noPhrases: 'لا توجد جمل متاحة لهذا الحرف.',
    noQuestions: 'لا توجد أسئلة متاحة.',
    score: 'الدرجة: {score}',
    noChallenges: 'لا توجد تحديات متاحة.',
    quizQuestionLetter: 'ما هو نطق هذا الحرف؟',
    quizQuestionWord: 'ما هو نطق هذه الكلمة؟',
    quizQuestionPhrase: 'ما هو نطق هذه الجملة؟',
    correctAnswer: '✓ إجابة صحيحة!',
    incorrectAnswer: '✗ إجابة خاطئة، حاول مرة أخرى',
    quizComplete: 'انتهى الاختبار! درجتك النهائية: {score}',
    linkCopied: 'تم نسخ الرابط!',
    hunterTimeLeft: 'الوقت المتبقي: {seconds} ثانية',
    hunterGameOver: 'انتهى الوقت! درجتك النهائية: {score}',
    loadingLetters: 'جارٍ تحميل الأحرف...',
    selectLetterPrompt: 'اختر حرفًا',
    noImage: 'لا توجد صورة متاحة',
    imageAlt: 'صورة لـ {searchTerm} للكلمة {word}',
    loading: 'جار التحميل...',
    done: 'تم',
    next: 'التالي',
    prev: 'السابق',
    confirmTitle: 'تأكيد الإجراء',
    confirmResetProgress: 'هل أنت متأكد أنك تريد إعادة تعيين كل التقدم؟ لا يمكن التراجع عن هذا الإجراء.',
    cancel: 'إلغاء',
    progressReset: 'تمت إعادة تعيين التقدم.',
    errorSaveProgress: 'فشل حفظ التقدم.',
    manualShare: 'يرجى نسخ هذا الرابط: {url}',
    shareError: 'تعذر مشاركة الرابط أو نسخه.',
    errorTutorial: 'ميزة الدليل التعليمي غير متاحة.',
    correctWas: 'الصحيح كان:',
    startTutorial: 'دليل الاستخدام',
    errorNoWordsForGame: 'خطأ: لا توجد كلمات متاحة لهذه اللعبة.',
    resetQuiz: 'إعادة الاختبار',
    hideImage: 'إخفاء الصورة',
    showImage: 'إظهار الصورة',
    imagesDisabled: 'الصور معطلة حاليًا',
    arrangementHint: 'تلميح: تبدأ بـ "{first}" وتنتهي بـ "{last}"', // Added hint translation
    tutorial: {
      introTitle: 'مرحباً!',
      languageTitle: 'اللغة',
      lettersTitle: 'الأحرف',
      activitiesTitle: 'الأنشطة',
      quizTitle: 'الاختبار',
      intro: 'مرحبًا! هذا دليل تفاعلي لتعليمك كيفية استخدام التطبيق.',
      language: 'اختر اللغة التي تفضلها (العربية أو الإنجليزية) للتطبيق.',
      letters: 'اضغط على أي حرف لاستكشاف الحركات والألعاب المتعلقة به.',
      harakat: 'اختر حركة لتطبيقها على الحرف المحدد.',
      games: 'جرب الألعاب التعليمية المختلفة لتعلم الحروف والكلمات!',
      quiz: 'اختبر معرفتك بالأحرف والكلمات والجمل مع الاختبار العام.'
    }
  },
  en: {
    appTitle: 'Learn Arabic Letters with Harakat',
    appDescription: 'Start learning Arabic letters in a fun and interactive way!',
    resetProgress: 'Reset Progress',
    speakIntro: 'Listen to Introduction',
    toggleSpeech: 'Disable Sound',
    toggleSpeechOn: 'Enable Sound',
    shareSite: 'Share the App with Friends',
    startQuiz: 'Global Quiz',
    errorAudio: 'Error: Unable to play audio. Please check your internet connection and try again.',
    errorAudioFallback: 'Audio playback error. Using fallback sound.',
    errorAudioPermission: 'Please allow audio playback in your browser settings.',
    errorContainer: 'Error: Cannot find letters container. Please refresh the page.',
    noLetters: 'No letters available to display.',
    errorLoad: 'Error: Failed to load letters. Please refresh the page.',
    letterLabel: 'Letter {letter}',
    noWords: 'No words available for this letter.',
    noPhrases: 'No phrases available for this letter.',
    noQuestions: 'No questions available.',
    score: 'Score: {score}',
    noChallenges: 'No challenges available.',
    quizQuestionLetter: 'What is the pronunciation of this letter?',
    quizQuestionWord: 'What is the pronunciation of this word?',
    quizQuestionPhrase: 'What is the pronunciation of this phrase?',
    correctAnswer: '✓ Correct answer!',
    incorrectAnswer: '✗ Incorrect, try again',
    quizComplete: 'Quiz completed! Your final score: {score}',
    linkCopied: 'Link copied to clipboard!',
    hunterTimeLeft: 'Time left: {seconds} seconds',
    hunterGameOver: 'Time\'s up! Your final score: {score}',
    loadingLetters: 'Loading letters...',
    selectLetterPrompt: 'Select a letter',
    noImage: 'No image available',
    imageAlt: 'Image of {searchTerm} for the word {word}',
    loading: 'Loading...',
    done: 'Done',
    next: 'Next &rarr;',
    prev: '&larr; Previous',
    confirmTitle: 'Confirm Action',
    confirmResetProgress: 'Are you sure you want to reset all progress? This cannot be undone.',
    cancel: 'Cancel',
    progressReset: 'Progress has been reset.',
    errorSaveProgress: 'Failed to save progress.',
    manualShare: 'Please copy this link: {url}',
    shareError: 'Could not share or copy link.',
    hideImage: 'Hide Image',
    showImage: 'Show Image',
    imagesDisabled: 'Images are currently disabled',
    errorTutorial: 'Tutorial feature is unavailable.',
    correctWas: 'Correct was:',
    startTutorial: 'Start Tutorial',
    errorNoWordsForGame: 'Error: No words available for this game.',
    resetQuiz: 'Restart Quiz',
    arrangementHint: 'Hint: Starts with "{first}", ends with "{last}"', // Added hint translation
    tutorial: {
      introTitle: 'Welcome!',
      languageTitle: 'Language',
      lettersTitle: 'Letters',
      activitiesTitle: 'Activities',
      quizTitle: 'Quiz',
      intro: 'Welcome! This is an interactive guide to teach you how to use the app.',
      language: 'Choose your preferred language (Arabic or English) for the app.',
      letters: 'Click on any letter to explore its harakat and related games.',
      harakat: 'Select a haraka to apply to the chosen letter.',
      games: 'Try out various educational games to learn letters and words!',
      quiz: 'Test your knowledge of letters, words, and phrases with the global quiz.'
    }
  }
};

// Maps harakat symbols to sound file names (without .mp3 extension)
const soundMap = {
  'َ': 'fatha',
  'ُ': 'damma',
  'ِ': 'kasra',
  'ً': 'tanween-fath',
  'ٌ': 'tanween-damm',
  'ٍ': 'tanween-kasr',
  'ا': 'alif',
  'و': 'waw',
  'ي': 'ya'
};

// --- Utility Functions ---

/**
 * Securely retrieves the ElevenLabs API key.
 * In a production environment, this should be handled server-side or through environment variables.
 * @returns {string} The API key or an empty string if not available
 */
function getElevenLabsApiKey() {
  // IMPORTANT: In a real production environment, API keys should not be stored in client-side code.
  // This is a placeholder implementation for development purposes only.
  // For production:
  // 1. Use environment variables with webpack.DefinePlugin
  // 2. Use a backend API to handle requests requiring API keys
  // 3. Use a service like Auth0 or Firebase for secure authentication

  // For development, you could load from a config file not committed to version control
  try {
    // Check if we have a key in sessionStorage (temporary, cleared when browser is closed)
    const storedKey = sessionStorage.getItem('elevenlabs_api_key');
    if (storedKey) {
      return storedKey;
    }

    // If no key is found, you could prompt the user to enter their own key
    // or return a placeholder that will trigger the fallback mechanisms
    console.warn('No ElevenLabs API key found. Using fallback TTS methods.');
    return '';
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return '';
  }
}

/**
 * Gets the current language from localStorage or defaults to 'ar'.
 * @returns {string} 'ar' or 'en'
 */
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'ar';
}

/**
 * Gets a translated string for the given key.
 * @param {string} key - The key for the translation string.
 * @param {object} [replacements={}] - Optional replacements for placeholders like {key}.
 * @param {string} [defaultValue=''] - Optional default value if key not found.
 * @returns {string} The translated string.
 */
function t(key, replacements = {}, defaultValue = '') {
  const lang = getCurrentLanguage();
  let text = defaultValue; // Start with default value

  // Function to safely access nested properties
  const getNestedValue = (obj, path) => {
    if (!path || !obj) return undefined;
    const keys = path.split('.');
    let current = obj;
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return undefined; // Path doesn't exist
      }
    }
    return typeof current === 'string' ? current : undefined; // Return only if it's a string
  };

  // Try current language
  let foundText = getNestedValue(translations[lang], key);

  // Fallback to English if not found in current language
  if (foundText === undefined && lang !== 'en') {
    foundText = getNestedValue(translations['en'], key);
  }

  // Use found text or fallback to the key itself if still not found and no default was provided
  text = foundText !== undefined ? foundText : (defaultValue === '' ? key : defaultValue);

  // Apply replacements
  for (const placeholder in replacements) {
    // Use a global regex to replace all occurrences
    const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
    text = text.replace(regex, String(replacements[placeholder])); // Ensure replacement is string
  }
  return text;
}


/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args); // Use apply to preserve 'this' context
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Plays audio safely, handling potential errors including playback permissions.
 * @param {string} src - The source URL of the audio file.
 */
async function playAudio(src) {
  if (!audio) {
    console.error("Audio player element not found.");
    return;
  }
  if (!src) {
    console.warn("playAudio called with empty src.");
    return;
  }

  try {
    // Resolve the absolute URL to handle blob URLs correctly
    const absoluteSrc = new URL(src, window.location.href).href;

    // Only change src if different or if audio is paused/ended
    if (audio.currentSrc !== absoluteSrc || audio.paused) {
      console.log(`Setting audio source to: ${src}`);
      audio.src = src;
      // Play returns a promise which can be awaited or handled
      await audio.play().catch(e => {
        // Handle specific playback errors
        if (e.name === 'NotAllowedError') {
          console.warn('Audio playback prevented by browser policy (NotAllowedError). User interaction might be required.');
          showTemporaryMessage(t('errorAudioPermission', {}, 'Please interact with the page or allow audio playback in your browser settings.'), 'warning');
        } else if (e.name !== 'AbortError') { // Ignore AbortError (often happens on quick navigation/src change)
          // Re-throw other errors to be caught by the outer catch
          throw e;
        }
      });
      console.log(`Audio played: ${src}`);
    } else {
      // Replay same audio
      console.log(`Replaying audio: ${src}`);
      audio.currentTime = 0; // Rewind to start
      await audio.play().catch(e => { // Catch potential errors here too
        if (e.name === 'NotAllowedError') {
          console.warn('Audio replay prevented by browser policy (NotAllowedError).');
          showTemporaryMessage(t('errorAudioPermission'), 'warning');
        } else if (e.name !== 'AbortError') {
          throw e;
        }
      });
    }
  } catch (err) {
    // Catch errors from setting src or re-thrown errors from play()
    console.error(`Audio playback error for ${src}:`, err);
    // Avoid showing message for AbortError
    if (err.name !== 'AbortError') {
      showTemporaryMessage(t('errorAudio'), 'danger');
    }
  }
}


/**
 * Attempts to speak the given text using TTS, with debouncing.
 * Tries ElevenLabs API directly first, then Web Speech API, then a fallback sound.
 * IMPORTANT: Uses ElevenLabs API with the provided API key
 */
const speakTextDebounced = debounce(async function speakText(text, retries = 2) {
  if (!isSpeechEnabled) {
    console.log('Speech disabled, skipping audio playback for:', text);
    return;
  }
  if (!text || typeof text !== 'string' || !text.trim()) {
    console.warn('speakText called with invalid or empty text.');
    return;
  }

  const sanitizedText = sanitizeInput(text); // Sanitize before sending to TTS
  console.log(`Attempting to speak: "${sanitizedText}" (Retries left: ${retries})`);

  // --- Direct ElevenLabs API Call ---
  // Using ElevenLabs API directly with the API key from configuration
  try {
    console.log('Sending request directly to ElevenLabs API');
    const elevenlabsApiKey = getElevenLabsApiKey(); // Get API key from secure function
    const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Keep using the intended voice
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
        'xi-api-key': elevenlabsApiKey
      },
      body: JSON.stringify({
        text: sanitizedText, // Send sanitized text
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.5 }
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`ElevenLabs API Error: ${response.status} ${response.statusText}. Body: ${errorBody}`);
    }

    const audioBlob = await response.blob();
    if (audioBlob.size === 0) {
      throw new Error('ElevenLabs API Error: Received empty audio blob.');
    }
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('Audio blob received from ElevenLabs API, playing audio.');
    await playAudio(audioUrl); // Use improved playAudio
    // Consider revoking the URL after playback finishes or after a delay
    // audio.onended = () => URL.revokeObjectURL(audioUrl); // Example
    return; // Success

  } catch (error) {
    console.error(`ElevenLabs API TTS failed: ${error.message}`);
    if (retries > 0) {
      console.log(`Retrying TTS... (${retries - 1} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait before retry
      return speakTextDebounced(text, retries - 1); // Retry with original text
    }
    console.warn('ElevenLabs API failed after retries. Trying Web Speech API fallback.');
  }

  // --- Web Speech API Fallback ---
  try {
    if ('speechSynthesis' in window) {
      console.log('Using Web Speech API for fallback');
      window.speechSynthesis.cancel(); // Cancel any previous utterances
      const utterance = new SpeechSynthesisUtterance(sanitizedText); // Use sanitized text
      utterance.lang = 'ar-SA'; // Specify Arabic language/region
      utterance.volume = 1.0; // Max volume
      utterance.rate = 0.9; // Slightly slower rate
      utterance.pitch = 1.0; // Default pitch

      utterance.onerror = (event) => {
        console.error('Web Speech API error:', event.error);
        console.warn('Web Speech API failed. Trying fallback sound.');
        playAudio('sounds/fallback.mp3'); // Use improved playAudio
      };

      window.speechSynthesis.speak(utterance);
      console.log('Web Speech API utterance queued.');
      return; // Success (queued)
    } else {
      console.warn('Web Speech API not supported in this browser.');
    }
  } catch (speechError) {
    console.error(`Web Speech API error: ${speechError.message}`);
  }

  // --- Final Fallback Sound ---
  try {
    console.warn('All TTS methods failed. Playing generic fallback sound.');
    await playAudio('sounds/fallback.mp3'); // Use improved playAudio
    showTemporaryMessage(t('errorAudioFallback', {}, 'Audio Error'), 'warning');
  } catch (fallbackError) {
    console.error(`Fallback audio error: ${fallbackError.message}`);
    showTemporaryMessage(t('errorAudio', {}, 'Audio Error'), 'danger');
  }
}, 300); // 300ms debounce interval

/**
 * Displays a temporary message (like a toast) at the top of the page.
 * @param {string} message - The message text.
 * @param {'success' | 'danger' | 'warning' | 'info'} type - The alert type.
 * @param {number} duration - How long to display the message in ms.
 */
function showTemporaryMessage(message, type = 'info', duration = 3000) {
  const container = document.body;
  if (!container) return; // Guard clause

  // Remove existing message if present
  const existingMessage = container.querySelector('.app-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  // Use CSS variables for colors if defined, otherwise fallback to Bootstrap classes
  const alertClass = `alert-${type}`;
  messageDiv.className = `alert ${alertClass} alert-dismissible fade show app-message m-3`;
  messageDiv.setAttribute('role', 'alert');
  // Styles moved to CSS for better separation
  // messageDiv.style.position = 'fixed'; ... etc.

  messageDiv.innerHTML = `
        ${sanitizeInput(message)}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
  container.prepend(messageDiv); // Prepend to show at the top

  // Auto-dismiss
  setTimeout(() => {
    // Check if the element still exists before trying to close
    const currentMessage = document.getElementById(messageDiv.id); // Need an ID or re-query
    if (messageDiv && messageDiv.parentNode) { // Check if still in DOM
      if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
        const alertInstance = bootstrap.Alert.getOrCreateInstance(messageDiv);
        if (alertInstance) {
          alertInstance.close(); // Use Bootstrap's close method
        } else {
          messageDiv.remove(); // Fallback removal
        }
      } else {
        messageDiv.remove(); // Fallback removal if Bootstrap JS not loaded
      }
    }
  }, duration);
}

/**
 * Input sanitization using DOMPurify.
 * @param {string} input - The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Use DOMPurify which is already included in the project
  if (typeof DOMPurify !== 'undefined') {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }); // Strip all HTML tags
  }
  // Fallback to basic sanitization if DOMPurify is not available
  return input.replace(/<[^>]*>?/gm, '');
}


// --- Core Application Logic ---

/**
 * Toggles speech synthesis on/off and updates the button.
 */
function toggleSpeech() {
  isSpeechEnabled = !isSpeechEnabled;
  localStorage.setItem('speechEnabled', String(isSpeechEnabled));
  updateToggleSpeechButton();
  if (!isSpeechEnabled) {
    // Stop any ongoing speech synthesis or audio playback
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audio) {
      audio.pause();
      audio.src = ''; // Clear source to prevent accidental playback
    }
    console.log("Speech and sound disabled.");
  } else {
    console.log("Speech and sound enabled.");
  }
}

/** Updates the text and style of the toggle speech button */
function updateToggleSpeechButton() {
  if (toggleSpeechBtn) {
    toggleSpeechBtn.textContent = isSpeechEnabled ? t('toggleSpeech') : t('toggleSpeechOn');
    // Use Bootstrap classes directly as CSS variables might not be universally applied to JS logic easily
    toggleSpeechBtn.classList.remove('btn-success', 'btn-danger');
    toggleSpeechBtn.classList.add(isSpeechEnabled ? 'btn-success' : 'btn-danger');
    toggleSpeechBtn.setAttribute('aria-pressed', String(isSpeechEnabled));
  }
}

/**
 * Toggles word image display on/off and updates the button.
 */
function toggleWordImage() {
  isWordImageEnabled = !isWordImageEnabled;
  localStorage.setItem('wordImageEnabled', String(isWordImageEnabled));
  updateToggleImageButton();

  // If we're currently in the words modal, update the current word display
  // to show or hide the image based on the new setting
  if (currentWords.length > 0) {
    updateWordDisplay();
  }
}

/** Updates the text and style of the toggle image button */
function updateToggleImageButton() {
  const toggleImageBtn = document.getElementById('toggleImageBtn');
  if (toggleImageBtn) {
    toggleImageBtn.textContent = isWordImageEnabled ? t('hideImage', {}, 'إخفاء الصورة') : t('showImage', {}, 'إظهار الصورة');
    toggleImageBtn.classList.remove('btn-success', 'btn-danger');
    toggleImageBtn.classList.add(isWordImageEnabled ? 'btn-success' : 'btn-danger');
    toggleImageBtn.setAttribute('aria-pressed', String(isWordImageEnabled));
  }
}


/**
 * Speaks the introductory text.
 */
function speakIntro() {
  const introText = t('appDescription');
  speakTextDebounced(introText);
}

/**
 * Switches the application language and updates the UI.
 * @param {'ar' | 'en'} lang - The language code to switch to.
 */
function switchLanguage(lang) {
  if (lang !== 'ar' && lang !== 'en') {
    console.warn(`Invalid language code: ${lang}. Defaulting to 'ar'.`);
    lang = 'ar';
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('language', lang);

  // Update static text elements using t()
  try {
    document.title = t('appTitle'); // Update page title as well
    const titleEl = document.getElementById('app-title');
    if (titleEl) titleEl.textContent = t('appTitle');
    const descEl = document.getElementById('app-description');
    if (descEl) descEl.textContent = t('appDescription');

    const resetBtn = document.querySelector('button[onclick="resetProgress()"]');
    if (resetBtn) resetBtn.textContent = t('resetProgress');
    const introBtn = document.querySelector('button[onclick="speakIntro()"]');
    if (introBtn) introBtn.textContent = t('speakIntro');
    const quizBtn = document.querySelector('button[onclick="showGlobalQuiz()"]');
    if (quizBtn) quizBtn.textContent = t('startQuiz');
    const shareBtn = document.querySelector('button[onclick="shareSite()"]');
    if (shareBtn) shareBtn.textContent = t('shareSite');
    const tutorialBtn = document.querySelector('button[onclick="startTutorial()"]');
    if (tutorialBtn) tutorialBtn.textContent = t('startTutorial', {}, 'Start Tutorial');

    // Update language switcher buttons state if they exist
    const langBtnAr = document.querySelector('.lang-btn[onclick*="\'ar\'"]');
    const langBtnEn = document.querySelector('.lang-btn[onclick*="\'en\'"]');
    if (langBtnAr) langBtnAr.classList.toggle('active', lang === 'ar');
    if (langBtnEn) langBtnEn.classList.toggle('active', lang === 'en');

  } catch (error) {
    console.error("Error updating static text elements during language switch:", error);
  }

  updateToggleSpeechButton();
  createLetters(); // Re-create letter cards with new labels

  // Close any open modals to avoid translation issues within them
  const openModals = document.querySelectorAll('.modal.show');
  openModals.forEach(modalEl => {
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  });
  console.log(`Language switched to ${lang}.`);
}

/**
 * Speaks the currently selected letter displayed in the modal header.
 */
function speakSelectedLetter() {
  const textToSpeak = selectedLetterElement?.textContent || currentLetter;
  if (textToSpeak) {
    speakTextDebounced(textToSpeak);
  } else {
    console.warn("speakSelectedLetter called but no letter text found.");
  }
}

/**
 * Creates and displays the letter selection cards.
 * @param {number} retryCount - Internal counter for retries.
 */
function createLetters(retryCount = 0) {
  if (!lettersContainer) {
    console.error('Letters container not found in DOM.');
    showTemporaryMessage(t('errorContainer', {}, 'Error: UI element missing.'), 'danger');
    return;
  }
  if (!arabicLetters || arabicLetters.length === 0) {
    console.error('No Arabic letters available.');
    lettersContainer.innerHTML = `<div class="alert alert-warning" role="alert">${t('noLetters', {}, 'No letters found.')}</div>`;
    return;
  }

  lettersContainer.setAttribute('aria-busy', 'true');
  lettersContainer.innerHTML = `<div class="text-center p-4"><p>${t('loadingLetters', {}, 'Loading letters...')}</p><div class="spinner-border text-primary" role="status"><span class="visually-hidden">${t('loading', {}, 'Loading...')}</span></div></div>`;

  // Use requestAnimationFrame for smoother rendering start
  requestAnimationFrame(() => {
    setTimeout(() => { // Keep small delay for visual feedback
      try {
        const fragment = document.createDocumentFragment();
        arabicLetters.forEach((letter) => {
          const div = document.createElement('div');
          div.className = 'col';
          const letterLabel = t('letterLabel', { letter: letter });
          // Ensure the letter-card class is present on the clickable element
          div.innerHTML = `
                        <div id="letter-${letter}" class="card letter-card shadow-sm h-100 text-center py-3" tabindex="0" onclick="showModal('${letter}')" onkeydown="handleLetterKeydown(event, '${letter}')" role="button" aria-label="${letterLabel}">
                            <div class="card-body d-flex justify-content-center align-items-center">
                                <h2 class="card-title mb-0 display-4" lang="ar">${letter}</h2>
                            </div>
                        </div>
                    `;
          fragment.appendChild(div);
        });

        lettersContainer.innerHTML = ''; // Clear loading indicator
        lettersContainer.appendChild(fragment);

        // Staggered animation
        const letterCards = lettersContainer.querySelectorAll('.letter-card');
        letterCards.forEach((card, index) => {
          card.style.opacity = '0';
          card.classList.add('animate__animated');
          setTimeout(() => {
            card.style.opacity = '1';
            card.classList.add('animate__bounceIn');
          }, index * 40); // Slightly faster stagger
        });

        lettersContainer.setAttribute('aria-busy', 'false');

        // Retry logic if rendering failed
        if (letterCards.length === 0 && retryCount < 2) {
          console.warn(`Retry ${retryCount + 1}: No letter cards rendered, retrying...`);
          setTimeout(() => createLetters(retryCount + 1), 500);
        } else if (letterCards.length === 0) {
          console.error('Failed to render letters after retries.');
          lettersContainer.innerHTML = `<div class="alert alert-danger" role="alert">${t('errorLoad', {}, 'Failed to load letters.')}</div>`;
        }
      } catch (error) {
        console.error('Error during createLetters execution:', error);
        lettersContainer.innerHTML = `<div class="alert alert-danger" role="alert">${t('errorLoad', {}, 'Failed to load letters.')}</div>`;
        lettersContainer.setAttribute('aria-busy', 'false');
      }
    }, 50); // Small delay before rendering
  });
}


/**
 * Handles keydown events on letter cards for accessibility.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {string} letter - The letter associated with the card.
 */
function handleLetterKeydown(event, letter) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // Prevent default spacebar scroll
    showModal(letter);
  }
}

/**
 * Shows the main modal for a selected letter, displaying interaction options.
 * @param {string} letter - The selected Arabic letter.
 */
function showModal(letter) {
  currentLetter = letter;
  if (selectedLetterElement) {
    selectedLetterElement.textContent = letter;
    selectedLetterElement.lang = 'ar';
    selectedLetterElement.setAttribute('aria-live', 'polite');
  } else {
    console.warn("selectedLetterElement not found in showModal");
  }

  const modalTitle = document.getElementById('harakatModalLabel');
  if (modalTitle) {
    modalTitle.textContent = t('letterLabel', { letter: letter });
  } else {
    console.warn("harakatModalLabel not found in showModal");
  }

  // Reset game states specific to this modal if needed (e.g., clear haraka display)
  // resetLetters(); // This resets the arrangement game, maybe not needed here?

  const modalElement = document.getElementById('harakatModal');
  if (modalElement) {
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
      // Use 'shown.bs.modal' event for actions after modal is fully visible
      modalElement.addEventListener('shown.bs.modal', () => {
        // Focus the first interactive element (button) not being the close button
        const firstButton = modalElement.querySelector('.haraka-btn, .modal-footer .btn:not([data-bs-dismiss="modal"])');
        if (firstButton instanceof HTMLElement) { // Type guard
          firstButton.focus();
        }
        speakSelectedLetter(); // Speak letter when modal opens
      }, { once: true });
    } else {
      console.error("Bootstrap Modal component not found. Cannot show modal.");
      showTemporaryMessage("Error: UI component missing.", "danger");
    }
  } else {
    console.error("Harakat modal element (#harakatModal) not found.");
    showTemporaryMessage("Error: Main activity modal not found.", "danger");
  }
}


/**
 * Navigates back from a game/activity modal to the main harakat modal.
 */
function backToHarakatModal() {
  const currentModalElement = document.querySelector('.modal.show:not(#harakatModal)');
  if (currentModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const currentModalInstance = bootstrap.Modal.getInstance(currentModalElement);
    if (currentModalInstance) {
      // Ensure the main modal is shown *after* the current one is hidden
      currentModalElement.addEventListener('hidden.bs.modal', () => {
        showModal(currentLetter);
      }, { once: true });
      currentModalInstance.hide();
    } else {
      // Fallback if instance not found (shouldn't happen often)
      currentModalElement.classList.remove('show'); // Manually hide if needed
      showModal(currentLetter);
    }
  } else {
    // If no other modal is open, just ensure the main one is shown (or re-shown)
    showModal(currentLetter);
  }
}


/**
 * Applies a basic haraka (fatha, damma, kasra) to the selected letter.
 * @param {'َ' | 'ُ' | 'ِ'} haraka - The haraka symbol.
 */
function applyHaraka(haraka) {
  if (!currentLetter || !haraka) return;
  trackProgress(`haraka-${haraka}`);

  let displayText = currentLetter + haraka;
  // Use initialShapes if defined for the specific letter and haraka
  if (initialShapes[currentLetter]?.[haraka]) {
    displayText = initialShapes[currentLetter][haraka];
  }

  if (selectedLetterElement) {
    selectedLetterElement.innerHTML = sanitizeInput(displayText); // Sanitize display text
    selectedLetterElement.lang = 'ar';
  }
  animateLetter('animate__tada');
  playSoundForSymbol(haraka);
  speakTextDebounced(displayText); // Speak the combined form
}

/**
 * Applies a tanween (ً, ٌ, ٍ) to the selected letter.
 * @param {'ً' | 'ٌ' | 'ٍ'} tanween - The tanween symbol.
 */
function applyTanween(tanween) {
  if (!currentLetter || !tanween) return;
  trackProgress(`tanween-${tanween}`);

  let output = currentLetter + tanween;
  // Add Alif for Tanween Fath, except for specific letters like Taa Marbuta or Hamza
  if (tanween === 'ً' && !['ة', 'ء'].includes(currentLetter)) {
    output += 'ا';
  }

  if (selectedLetterElement) {
    selectedLetterElement.innerHTML = sanitizeInput(output); // Sanitize display text
    selectedLetterElement.lang = 'ar';
  }
  animateLetter('animate__swing');
  playSoundForSymbol(tanween);
  speakTextDebounced(output);
}

/**
 * Applies a long vowel (ا, و, ي) after the selected letter.
 * @param {'ا' | 'و' | 'ي'} longLetter - The long vowel letter.
 */
function applyLongHaraka(longLetter) {
  if (!currentLetter || !longLetter) return;
  trackProgress(`long-${longLetter}`);

  // Basic combination, might need adjustments based on actual Arabic rules if shapes change
  const output = currentLetter + longLetter;
  if (selectedLetterElement) {
    selectedLetterElement.innerHTML = sanitizeInput(output); // Sanitize display text
    selectedLetterElement.lang = 'ar';
  }
  animateLetter('animate__rubberBand');
  playSoundForSymbol(longLetter);
  speakTextDebounced(output);
}

/**
 * Plays the sound associated with a given haraka or long vowel symbol.
 * Uses the mapped sound file.
 * @param {string} symbol - The haraka or long vowel symbol (e.g., 'َ', 'ا').
 */
function playSoundForSymbol(symbol) {
  const soundName = soundMap[symbol];
  if (soundName && isSpeechEnabled) {
    playAudio(`sounds/${soundName}.mp3`);
  } else if (soundName && !isSpeechEnabled) {
    console.log(`Sound playback skipped for ${symbol} (speech disabled)`);
  } else {
    console.warn(`No sound mapping found for symbol: ${symbol}`);
  }
}


/**
 * Tracks progress for a specific action and updates the progress bar.
 * @param {string} action - A unique identifier for the action (e.g., 'haraka-َ', 'game-write-correct').
 */
function trackProgress(action) {
  if (!currentLetter || !action) return;
  const key = `${currentLetter}-${action}`;
  if (!progressMap.has(key)) {
    progressMap.set(key, true);
    updateProgress();
    try {
      // Use JSON.stringify with Map conversion for reliable storage
      localStorage.setItem('progress', JSON.stringify(Array.from(progressMap.entries())));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
      // Avoid showing message for storage quota errors, log instead
      if (e.name !== 'QuotaExceededError') {
        showTemporaryMessage(t('errorSaveProgress', {}, "Failed to save progress."), "warning");
      }
    }
  }
}

/**
 * Updates the visual progress bar based on the progressMap size.
 */
function updateProgress() {
  if (!progressBar) return;
  const completedActions = progressMap.size;
  // Ensure totalActions is positive to avoid division by zero
  const progressPercentage = totalActions > 0 ? Math.min(100, (completedActions / totalActions) * 100) : 0;

  progressBar.style.width = `${progressPercentage}%`;
  progressBar.textContent = `${Math.round(progressPercentage)}%`;
  progressBar.setAttribute('aria-valuenow', String(Math.round(progressPercentage)));
  progressBar.setAttribute('aria-valuetext', `${Math.round(progressPercentage)}% Complete`);

  // Add/remove class for styling 100% completion if needed
  progressBar.classList.toggle('bg-success', progressPercentage >= 100);

  if (progressPercentage >= 100 && completedActions === totalActions) { // Trigger only once
    showConfetti();
  }
}

/** Triggers a confetti animation */
function showConfetti() {
  // Check if confetti is available
  if (typeof confetti === 'function') {
    const isMobile = window.innerWidth < 768;
    const defaults = {
      particleCount: isMobile ? 80 : 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'], // Colorful confetti
      disableForReducedMotion: true // Accessibility feature
    };

    try {
      // Fire confetti from multiple angles for a more festive effect
      confetti({ ...defaults, angle: 90, origin: { x: 0.5, y: 0.6 } });
      setTimeout(() => confetti({ ...defaults, angle: 60, origin: { x: 0.3, y: 0.6 } }), 100);
      setTimeout(() => confetti({ ...defaults, angle: 120, origin: { x: 0.7, y: 0.6 } }), 200);

      // Add a final burst after a short delay
      setTimeout(() => {
        confetti({
          particleCount: isMobile ? 100 : 200,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FFD700', '#FF8C00', '#FF1493', '#00CED1', '#32CD32'], // Different colors for the final burst
          disableForReducedMotion: true
        });
      }, 300);

      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(100); // Vibrate briefly
      }
    } catch (e) {
      console.error("Confetti or vibration failed:", e);
    }
  } else {
    console.warn("Confetti function not found. Skipping animation.");
    // Try to load confetti dynamically if it's not available
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    script.onload = () => {
      console.log("Confetti loaded dynamically");
      // Try again after loading
      if (typeof confetti === 'function') {
        setTimeout(showConfetti, 100);
      }
    };
    document.head.appendChild(script);
  }
}


/**
 * Applies a temporary CSS animation to the selected letter element.
 * @param {string} animationClass - The Animate.css class name (e.g., 'animate__tada').
 */
function animateLetter(animationClass) {
  if (selectedLetterElement) {
    const baseClass = 'animate__animated';
    // Remove previous animation classes cleanly
    selectedLetterElement.className = selectedLetterElement.className.replace(/animate__\S+/g, '').trim();
    // Force reflow to restart animation if the same class is added again
    void selectedLetterElement.offsetWidth;
    // Add classes and listener
    selectedLetterElement.classList.add(baseClass, animationClass);
    selectedLetterElement.addEventListener('animationend', () => {
      selectedLetterElement.classList.remove(baseClass, animationClass);
    }, { once: true }); // Use { once: true }
  }
}

/**
 * Applies a temporary CSS animation to an element.
 * @param {HTMLElement | null} element - The DOM element to animate.
 * @param {string} animationClass - The Animate.css class name (e.g., 'animate__tada').
 * @param {string} [baseClass='animate__animated'] - The base Animate.css class.
 */
function animateElement(element, animationClass, baseClass = 'animate__animated') {
  if (element instanceof HTMLElement && animationClass) {
    // Function to handle animation end
    const handleAnimationEnd = () => {
      element.classList.remove(baseClass, animationClass);
      element.removeEventListener('animationend', handleAnimationEnd);
    };
    // Remove previous animation classes cleanly
    element.classList.remove(baseClass, animationClass);
    // Force reflow to restart animation if the same class is added again
    void element.offsetWidth;
    // Add classes and listener
    element.classList.add(baseClass, animationClass);
    element.addEventListener('animationend', handleAnimationEnd, { once: true }); // Use { once: true }
  }
}


/**
 * Resets all learning progress after confirmation.
 */
function resetProgress() {
  try {
    // Use Bootstrap modal for confirmation if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      let confirmationModal = document.getElementById('confirmationModal');

      // Create modal dynamically if it doesn't exist
      if (!confirmationModal) {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'confirmationModalContainer';
        modalDiv.innerHTML = `
          <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="confirmationModalLabel">${t('confirmTitle', {}, 'Confirm Action')}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${t('cancel', {}, 'Cancel')}"></button>
                </div>
                <div class="modal-body">
                  ${t('confirmResetProgress', {}, 'Are you sure you want to reset all progress? This cannot be undone.')}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${t('cancel', {}, 'Cancel')}</button>
                  <button type="button" class="btn btn-danger" id="confirmResetBtn">${t('resetProgress')}</button>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modalDiv);
        confirmationModal = document.getElementById('confirmationModal');
      }

      // Get the modal instance
      const modalInstance = new bootstrap.Modal(confirmationModal);

      // Set up the confirm button click handler
      const confirmBtn = confirmationModal.querySelector('#confirmResetBtn');
      if (confirmBtn) {
        // Remove any existing event listeners by using the event delegation pattern
        confirmationModal.querySelector('.modal-footer').addEventListener('click', function(e) {
          if (e.target && e.target.id === 'confirmResetBtn') {
            // Perform the reset actions
            try {
              progressMap.clear();
              localStorage.removeItem('progress');
              updateProgress(); // Update UI immediately
              showTemporaryMessage(t('progressReset', {}, 'Progress has been reset.'), 'info');
              modalInstance.hide();
            } catch (error) {
              console.error('Error during progress reset:', error);
              showTemporaryMessage(t('errorResetProgress', {}, 'Error resetting progress.'), 'danger');
            }
          }
        }, { once: false }); // Use event delegation instead of once:true
      }

      // Show the modal
      modalInstance.show();
    } else {
      // Fallback to basic confirm dialog if Bootstrap modal isn't available
      if (confirm(t('confirmResetProgress', {}, 'Are you sure you want to reset all progress? This cannot be undone.'))) {
        progressMap.clear();
        localStorage.removeItem('progress');
        updateProgress();
        showTemporaryMessage(t('progressReset', {}, 'Progress has been reset.'), 'info');
      }
    }
  } catch (error) {
    console.error('Error in resetProgress function:', error);
    // Fallback to basic confirm dialog in case of error
    if (confirm(t('confirmResetProgress', {}, 'Are you sure you want to reset all progress? This cannot be undone.'))) {
      try {
        progressMap.clear();
        localStorage.removeItem('progress');
        updateProgress();
        showTemporaryMessage(t('progressReset', {}, 'Progress has been reset.'), 'info');
      } catch (innerError) {
        console.error('Error during fallback progress reset:', innerError);
        showTemporaryMessage(t('errorResetProgress', {}, 'Error resetting progress.'), 'danger');
      }
    }
  }
}


/**
 * Shares the application link using the Web Share API or copies to clipboard.
 */
async function shareSite() {
  const shareData = {
    title: t('appTitle'),
    text: t('appDescription'),
    url: window.location.href // Use current URL
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      console.log('Successful share via Web Share API');
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      showTemporaryMessage(t('linkCopied', {}, 'Link copied to clipboard!'), 'success');
    } else {
      // Fallback for browsers without Share API or Clipboard API access
      showTemporaryMessage(t('manualShare', { url: shareData.url }, `Please copy this link: ${shareData.url}`), 'info', 10000); // Show longer
    }
  } catch (error) {
    console.error('Error sharing or copying:', error);
    // Don't show error if user cancelled the share action
    if (error.name !== 'AbortError') {
      showTemporaryMessage(t('shareError', {}, 'Could not share or copy link.'), 'warning');
    }
  }
}

// --- Word/Phrase Display Functions ---

/**
 * Translates Arabic words to English for API compatibility
 * @param {string} arabicWord - The Arabic word to translate
 * @returns {string} The English translation
 */
function translateArabicToEnglish(arabicWord) {
  // Common Arabic words translations
  const translations = {
    // Test word for "show" functionality
    'عَرْضٌ': 'show',
    'عَرَضَ': 'show',
    'يَعْرِضُ': 'show',

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

    // Letter س words
    'سَمَاءٌ': 'sky',
    'سُكَّرٌ': 'sugar',
    'سِكِّينٌ': 'knife',
    'سَبَبٌ': 'reason',
    'سُرُورٌ': 'happiness',
    'سَمَكَةٌ': 'fish',

    // Letter ف words
    'فَمٌ': 'mouth',
    'فِيلٌ': 'elephant',
    'فُسْتُقٌ': 'pistachio',
    'فَرَسٌ': 'horse',
    'فَأْرٌ': 'mouse',
    'فَرَاشَةٌ': 'butterfly',

    // Letter ل words
    'لَبِسَ': 'wore',
    'لِبَاسٌ': 'clothing',
    'لَبِيبٌ': 'intelligent',
    'لَمَسَ': 'touched',
    'مَلْمَسٌ': 'texture',
    'لَعْبَةٌ': 'game',
    'لَبَنٌ': 'milk',
    'لَوْحَةٌ': 'painting',

    // Letter ص words
    'صَدْرٌ': 'chest',
    'صُدورٌ': 'chests',
    'يَصِلُ': 'arrives',
    'لِصٌّ': 'thief',
    'لُصوصٌ': 'thieves',
    'صَبَاحٌ': 'morning',
    'صَوْتٌ': 'voice',
    'صَيَّادٌ': 'hunter',
    'صُورَةٌ': 'picture',

    // Letter ذ words
    'بُذورٌ': 'seeds',
    'لَذيذٌ': 'delicious',
    'ذِئابٌ': 'wolves',
    'ذابِلٌ': 'withered',
    'رَذاذٌ': 'spray',
    'ذِئْبٌ': 'wolf',
    'ذُرَةٌ': 'corn',
    'ذَهَبٌ': 'gold',
    'ذِكْرَى': 'memory',

    // Letter ز words
    'زِفافٌ': 'wedding',
    'زَيدٌ': 'Zaid',
    'زَميلٌ': 'colleague',
    'مُبارَزةٌ': 'duel',
    'رِزٌّ': 'rice',
    'زَهْرَةٌ': 'flower',
    'زُجَاجٌ': 'glass',
    'زِيَارَةٌ': 'visit',

    // Letter ط words
    'طَبِيبٌ': 'doctor',
    'طِفْلٌ': 'child',
    'بَطَلٌ': 'hero',
    'طَالِبٌ': 'student',
    'طِبٌّ': 'medicine',
    'طَائِرٌ': 'bird',
    'طَعَامٌ': 'food',
    'طَرِيقٌ': 'road',

    // Letter ض words
    'ضَعِيفٌ': 'weak',
    'ضُيُوفٌ': 'guests',
    'مَعْرِضٌ': 'exhibition',
    'ضَابِطٌ': 'officer',
    'ضِبَابٌ': 'fog',
    'ضِفْدَعٌ': 'frog',
    'ضَوْءٌ': 'light',
    'ضَحْكَةٌ': 'laugh',
    'ضَيْفٌ': 'guest',

    // Letter ن words
    'سِنْبَالٌ': 'ear of grain',
    'لَبَنٌ': 'milk',
    'رُمَانٌ': 'pomegranate',
    'نَسْرٌ': 'eagle',
    'غُرَابٌ': 'crow',
    'نَجْمَةٌ': 'star',
    'نَمْلَةٌ': 'ant',
    'نَهْرٌ': 'river',

    // Letter ع words
    'عَالِمٌ': 'scientist',
    'مُعَلِّمٌ': 'teacher',
    'لَاعِبٌ': 'player',
    'عَامِلٌ': 'worker',
    'ذِرَاعٌ': 'arm',
    'عَصْفُورٌ': 'sparrow',
    'عَيْنٌ': 'eye',
    'عِيدٌ': 'show', // Changed from 'holiday' to 'show' for testing
    'عَمَلٌ': 'work',

    // Letter ت words
    'بِنْتٌ': 'girl',
    'بَنَاتٌ': 'girls',
    'فَتَاةٌ': 'young woman',
    'فُسْتَانٌ': 'dress',
    'تُفَّاحَةٌ': 'apple',
    'تَمْرٌ': 'dates',
    'تَابِعٌ': 'follower',
    'تَصْوِيرٌ': 'photography',

    // Letter ظ words
    'ظَرْفٌ': 'envelope',
    'نَظِيفٌ': 'clean',
    'عَظِيمٌ': 'great',
    'ظُلْمٌ': 'injustice',
    'ظُفْرٌ': 'nail',
    'ظَبْيٌ': 'deer',
    'ظِلٌّ': 'shadow',
    'ظُهْرٌ': 'noon',

    // Letter ح words
    'تُفَّاحٌ': 'apple',
    'حَلِيبٌ': 'milk',
    'حُبٌّ': 'love',
    'حِصَانٌ': 'horse',
    'حَديقَةٌ': 'garden',
    'حَقِيبَةٌ': 'bag',

    // Letter ه words
    'هِلَالٌ': 'crescent',
    'هُدْهُدٌ': 'hoopoe',
    'مَهْدٌ': 'cradle',
    'هَاتِفٌ': 'phone',
    'سَهْمٌ': 'arrow',
    'هَوَاءٌ': 'air',
    'هَدِيَّةٌ': 'gift',
    'هَرَمٌ': 'pyramid',

    // Letter ء words
    'أُمٌّ': 'mother',
    'أَبٌ': 'father',
    'أُمِّيٌ': 'my mother',
    'أَبِيٌ': 'my father',
    'إِنْسَانٌ': 'human',
    'أَمِيرٌ': 'prince',
    'أُمْنِيَةٌ': 'wish',

    // Letter ج words
    'جِبْنٌ': 'cheese',
    'جَزَرٌ': 'carrot',
    'جِسْرٌ': 'bridge',
    'جَرَسٌ': 'bell',
    'جِسْمٌ': 'body',
    'جَمَلٌ': 'camel',

    // Letter خ words
    'نَخِيلٌ': 'palm trees',
    'جَزِيرَةٌ': 'island',
    'خُبْزٌ': 'bread',
    'خَاتَمٌ': 'ring',
    'خَطٌّ': 'line',
    'خَرُوفٌ': 'sheep',
    'خَيْمَةٌ': 'tent',

    // Letter غ words
    'غَزَالٌ': 'gazelle',
    'غَنَمٌ': 'sheep',
    'غُرَابٌ': 'crow',
    'غَيْمٌ': 'cloud',

    // Letter ك words
    'كِتَابٌ': 'book',
    'مَكْتَبٌ': 'desk',
    'كُرْسِيٌّ': 'chair',
    'كَأْسٌ': 'cup',
    'كَبيرٌ': 'big',
    'كُرَةٌ': 'ball',
    'كَعْكَةٌ': 'cake',

    // Letter ث words
    'ثَوْرٌ': 'bull',
    'ثَعْلَبٌ': 'fox',
    'ثَمَرٌ': 'fruit',
    'ثُعْبانٌ': 'snake',
    'ثَوْبٌ': 'dress',
    'ثَلْجٌ': 'snow',

    // Letter ق words
    'قَمَرٌ': 'moon',
    'قِطَّةٌ': 'cat',
    'قَفَصٌ': 'cage',
    'قُرْآنٌ': 'quran',
    'قَصْرٌ': 'palace',
    'قَارِبٌ': 'boat',

    // Letter ش words
    'شَمْسٌ': 'sun',
    'شَجَرٌ': 'tree',
    'شَرابٌ': 'drink',
    'شَعْرٌ': 'hair',
    'شَبَكَةٌ': 'net',
    'شَجَرَةٌ': 'tree',

    // Letter و words
    'وَجْهٌ': 'face',
    'وَرَقٌ': 'paper',
    'وَطَنٌ': 'homeland',
    'وَزيرٌ': 'minister',
    'وَعْدٌ': 'promise',
    'وَرْدَةٌ': 'rose',

    // Letter ي words
    'يَدٌ': 'hand',
    'يَمامَةٌ': 'dove',
    'يَقينٌ': 'certainty',
    'يَوْمٌ': 'day',
    'ياسِرٌ': 'Yasser',
    'يَمَامَةٌ': 'dove',
    'يَاسَمِينٌ': 'jasmine'
  };

  // Check if we have a direct translation
  if (translations[arabicWord]) {
    return translations[arabicWord];
  }

  // If no direct translation, use a default approach
  // For example, return a generic term based on the first letter
  const firstLetter = arabicWord.charAt(0);
  const genericTerms = {
    'د': 'arabic letter dal',
    'م': 'arabic letter meem',
    'ر': 'arabic letter ra',
    'ب': 'arabic letter ba',
    'س': 'arabic letter seen',
    'ف': 'arabic letter fa',
    'ل': 'arabic letter lam',
    'ص': 'arabic letter sad',
    'ذ': 'arabic letter thal',
    'ز': 'arabic letter zay',
    'ط': 'arabic letter tah',
    'ض': 'arabic letter dad',
    'ن': 'arabic letter noon',
    'ع': 'arabic letter ain',
    'ت': 'arabic letter ta',
    'ظ': 'arabic letter zah',
    'ح': 'arabic letter ha',
    'ه': 'arabic letter ha',
    'ء': 'arabic letter hamza',
    'ج': 'arabic letter jeem',
    'خ': 'arabic letter kha',
    'غ': 'arabic letter ghain',
    'ك': 'arabic letter kaf',
    'ث': 'arabic letter tha',
    'ق': 'arabic letter qaf',
    'ش': 'arabic letter sheen',
    'و': 'arabic letter waw',
    'ي': 'arabic letter ya'
  };

  return genericTerms[firstLetter] || 'arabic word';
}

/**
 * Fetches an image from Pexels API.
 * Uses Pexels API with the provided API key
 */
async function fetchImageForWord(word) {
  const imageContainer = document.getElementById('wordImageContainer');
  if (!imageContainer) {
    console.error("Image container #wordImageContainer not found.");
    return;
  }

  // Show loading indicator
  imageContainer.innerHTML = `<div class="d-flex justify-content-center align-items-center h-100">
        <div class="spinner-border spinner-border-sm text-secondary" role="status">
            <span class="visually-hidden">${t('loading', {}, 'Loading...')}</span>
        </div>
    </div>`;

  try {
    // Translate Arabic word to English for Pexels API
    const translatedWord = translateArabicToEnglish(word);
    console.log(`Translating "${word}" to "${translatedWord}" for Pexels API`);

    // Send all translations to test-image-generation.html and display the image in a box
    // This is for content words where we don't want to get images from the API
    sendToImageGenerator(translatedWord);
    return;

    // The code below is no longer used as we're generating all images locally
    // Use our new fetchPexelsImages function from pexels.js
    const images = await fetchPexelsImages(translatedWord);

    // Log the API response for debugging
    console.log('Pexels API response:', images);

    // Check if we have results
    if (images && images.length > 0) {
      // Get the first image
      const imageUrl = images[0].src.medium;
      console.log('Image URL:', imageUrl);

      try {
        // Create image element with proper attributes
        const img = document.createElement('img');
        // Set attributes before setting src to avoid race conditions
        const altText = t('imageAlt', { searchTerm: word, word: word });
        img.alt = altText;
        img.title = altText; // Add title attribute for tooltip
        img.className = 'word-image img-fluid rounded shadow-sm mx-auto d-block'; // Center image
        img.crossOrigin = 'anonymous'; // Try to handle CORS issues
        img.loading = 'lazy'; // Add lazy loading

        console.log('Setting up image with URL:', imageUrl);

        // Use a promise to handle load/error/timeout with increased timeout
        await new Promise((resolve, reject) => {
          // Increase timeout from 10s to 20s
          const timer = setTimeout(() => {
            console.error('Image load timed out after 20 seconds');
            reject(new Error('Image load timed out'));
          }, 20000); // 20s timeout

          img.onload = () => {
            console.log('Image loaded successfully');
            clearTimeout(timer);
            resolve();
          };

          img.onerror = (e) => {
            console.error('Image load failed:', e.type, e);
            clearTimeout(timer);
            reject(new Error(`Image load failed: ${e.type}`));
          };

          // Try to use a smaller image size if available
          if (images[0].src.small) {
            console.log('Using smaller image size for faster loading');
            img.src = images[0].src.small;
          } else {
            // Set src after setting up event handlers
            img.src = imageUrl;
          }
        });

        // Clear container and add the image
        imageContainer.innerHTML = ''; // Clear spinner
        imageContainer.appendChild(img);
        console.log('Image appended to container');
      } catch (imgError) {
        console.error('Error during image element creation/loading:', imgError);
        throw imgError; // Re-throw to be caught by the outer try/catch
      }

    } else {
      // Handle case where no images found
      console.log(`No image found on Pexels for: ${word}`);
      showNoImageMessage();
    }
  } catch (error) {
    // Catch network errors or errors thrown from response check/timeout
    console.error('Image fetch/load error:', error);
    console.error('Error details:', error.message, error.stack);

    // Show a more detailed error message to help with debugging
    const imageContainer = document.getElementById('wordImageContainer');
    if (imageContainer) {
      imageContainer.innerHTML = `
        <p class="text-danger small text-center mt-2">
          ${t('imageError', {}, 'Error loading image')}:<br>
          ${error.message || 'Unknown error'}
        </p>`;
    } else {
      showNoImageMessage(); // Fallback to generic message if container not found
    }
  }
}

// Function to send a word to test-image-generation.html and display the image in a box
function sendToImageGenerator(word) {
  console.log(`Sending word "${word}" to test-image-generation.html`);

  // Create a box to display the image
  const imageContainer = document.getElementById('wordImageContainer');
  if (!imageContainer) {
    console.error("Image container #wordImageContainer not found.");
    return;
  }

  // Show loading message
  imageContainer.innerHTML = `
    <div class="text-center">
      <p>Generating image for "${word}" in test-image-generation.html...</p>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  // Create a safe key for localStorage
  const safeWord = word.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const storageKey = `generated_image_${safeWord}`;

  // Check if we already have this image in localStorage
  try {
    const existingImageData = JSON.parse(localStorage.getItem(storageKey));
    if (existingImageData && existingImageData.dataUrl) {
      console.log(`Found existing image for "${word}" in localStorage`);
      displayGeneratedImage(word, existingImageData.dataUrl);
      return;
    }
  } catch (error) {
    console.error('Error checking localStorage:', error);
  }

  // Create an iframe to load test-image-generation.html
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none'; // Hide the iframe
  // Use absolute path to ensure the iframe loads correctly
  const baseUrl = window.location.href.split('/').slice(0, -1).join('/') || window.location.origin;
  iframe.src = `${baseUrl}/test-image-generation.html?word=${encodeURIComponent(word)}`;
  document.body.appendChild(iframe);

  // Set up a listener for messages from the iframe
  const messageListener = function(event) {
    // Make sure the message is from our iframe
    if (event.source === iframe.contentWindow) {
      console.log('Received message from iframe:', event.data);

      if (event.data.type === 'image_generated' && event.data.word === word) {
        // Remove the message listener
        window.removeEventListener('message', messageListener);

        // Display the generated image
        displayGeneratedImage(word, event.data.dataUrl);

        // Remove the iframe
        document.body.removeChild(iframe);
      }
    }
  };

  window.addEventListener('message', messageListener);

  // Set a timeout to check localStorage directly as a fallback
  setTimeout(() => {
    try {
      const imageData = JSON.parse(localStorage.getItem(storageKey));
      if (imageData && imageData.dataUrl) {
        console.log(`Fallback: Found image for "${word}" in localStorage after timeout`);
        displayGeneratedImage(word, imageData.dataUrl);

        // Remove the message listener
        window.removeEventListener('message', messageListener);

        // Remove the iframe
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }
    } catch (error) {
      console.error('Error in fallback localStorage check:', error);
    }
  }, 3000); // Wait 3 seconds as a fallback
}

// Helper function to display the generated image
function displayGeneratedImage(word, dataUrl) {
  const imageContainer = document.getElementById('wordImageContainer');
  if (!imageContainer) return;

  // Check if images are enabled
  if (!isWordImageEnabled) {
    imageContainer.innerHTML = `<p class="text-muted small text-center mt-2">${t('imagesDisabled', {}, 'Images are currently disabled')}</p>`;
    return;
  }

  imageContainer.innerHTML = `
    <div class="text-center">
      <p>Image for "${word}"</p>
      <div class="border p-2 rounded">
        <img src="${dataUrl}" id="generatedImage" class="img-fluid" alt="Generated image for ${word}" style="max-height: 200px;">
      </div>
      <p class="small text-muted mt-2">Image generated using test-image-generation.html</p>
    </div>
  `;
}

/** Helper function to show "no image available" message */
function showNoImageMessage() {
  const imageContainer = document.getElementById('wordImageContainer');
  if (imageContainer) {
    imageContainer.innerHTML = `<p class="text-muted small text-center mt-2">${t('noImage', {}, 'No image available')}</p>`;
  }
}


/** Shows the modal for displaying words related to the current letter */
function showWords() {
  currentWords = letterWords[currentLetter] || [];
  currentWordIndex = 0;
  const letterDisplay = document.getElementById('currentWordLetter');
  if(letterDisplay) {
    letterDisplay.textContent = currentLetter;
    letterDisplay.lang = 'ar';
  }

  updateWordDisplay(); // Initial display

  const modalElement = document.getElementById('wordsModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the word display or the first button
      const wordElem = document.getElementById('currentWord');
      if (wordElem) wordElem.focus();
      else document.querySelector('#wordsModal .modal-footer button:not(:disabled)')?.focus();

      // Update the toggle image button state
      updateToggleImageButton();
    }, { once: true });
  } else {
    console.error("Words modal element (#wordsModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open words display.", "danger");
  }
}

/** Updates the word display area in the words modal */
function updateWordDisplay() {
  const wordElement = document.getElementById('currentWord');
  const wordCounterElement = document.getElementById('wordCounter');
  const imageContainer = document.getElementById('wordImageContainer');

  if (!wordElement || !wordCounterElement || !imageContainer) {
    console.error("One or more elements missing in word modal (#currentWord, #wordCounter, #wordImageContainer).");
    return;
  }

  if (currentWords.length === 0) {
    wordElement.textContent = t('noWords');
    wordElement.lang = getCurrentLanguage();
    wordCounterElement.textContent = `0/0`;
    imageContainer.innerHTML = `<p class="text-muted small text-center mt-2">${t('noWords')}</p>`;
  } else {
    // Ensure index is within bounds
    currentWordIndex = Math.max(0, Math.min(currentWordIndex, currentWords.length - 1));
    const currentWord = currentWords[currentWordIndex];
    wordElement.textContent = currentWord;
    wordElement.lang = 'ar';
    animateElement(wordElement, 'animate__fadeIn');
    wordCounterElement.textContent = `${currentWordIndex + 1}/${currentWords.length}`;
    fetchImageForWord(currentWord); // Fetch image for the current word
  }
  // Update navigation buttons state
  updateNavigationButtons('word', currentWordIndex, currentWords.length);
}


/** Plays the sound of the currently displayed word */
function playCurrentWord() {
  if (currentWords.length > 0 && currentWords[currentWordIndex]) {
    speakTextDebounced(currentWords[currentWordIndex]);
  } else {
    console.warn("playCurrentWord called but no current word is available.");
  }
}

/** Navigates to the previous word */
function previousWord() {
  if (currentWordIndex > 0) {
    currentWordIndex--;
    updateWordDisplay();
    playCurrentWord(); // Optionally play sound on navigation
  }
}

/** Navigates to the next word */
function nextWord() {
  if (currentWordIndex < currentWords.length - 1) {
    currentWordIndex++;
    updateWordDisplay();
    playCurrentWord(); // Optionally play sound on navigation
  }
}

/** Shows the modal for displaying phrases related to the current letter */
function showPhrases() {
  currentPhrases = letterPhrases[currentLetter] || [];
  currentPhraseIndex = 0;
  const letterDisplay = document.getElementById('currentPhraseLetter');
  if(letterDisplay) {
    letterDisplay.textContent = currentLetter;
    letterDisplay.lang = 'ar';
  }

  updatePhraseDisplay(); // Initial display

  const modalElement = document.getElementById('phrasesModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the phrase display or the first button
      const phraseElem = document.getElementById('currentPhrase');
      if (phraseElem) phraseElem.focus();
      else document.querySelector('#phrasesModal .modal-footer button:not(:disabled)')?.focus();
    }, { once: true });
  } else {
    console.error("Phrases modal element (#phrasesModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open phrases display.", "danger");
  }
}

/** Updates the phrase display area in the phrases modal */
function updatePhraseDisplay() {
  const phraseElement = document.getElementById('currentPhrase');
  const phraseCounterElement = document.getElementById('phraseCounter');

  if (!phraseElement || !phraseCounterElement) {
    console.error("One or more elements missing in phrase modal (#currentPhrase, #phraseCounter).");
    return;
  }

  if (currentPhrases.length === 0) {
    phraseElement.textContent = t('noPhrases');
    phraseElement.lang = getCurrentLanguage();
    phraseCounterElement.textContent = `0/0`;
  } else {
    // Ensure index is within bounds
    currentPhraseIndex = Math.max(0, Math.min(currentPhraseIndex, currentPhrases.length - 1));
    phraseElement.textContent = currentPhrases[currentPhraseIndex];
    phraseElement.lang = 'ar';
    animateElement(phraseElement, 'animate__fadeIn');
    phraseCounterElement.textContent = `${currentPhraseIndex + 1}/${currentPhrases.length}`;
  }
  // Update navigation buttons state
  updateNavigationButtons('phrase', currentPhraseIndex, currentPhrases.length);
}

/** Plays the sound of the currently displayed phrase */
function playCurrentPhrase() {
  if (currentPhrases.length > 0 && currentPhrases[currentPhraseIndex]) {
    speakTextDebounced(currentPhrases[currentPhraseIndex]);
  } else {
    console.warn("playCurrentPhrase called but no current phrase is available.");
  }
}

/** Navigates to the previous phrase */
function previousPhrase() {
  if (currentPhraseIndex > 0) {
    currentPhraseIndex--;
    updatePhraseDisplay();
    playCurrentPhrase(); // Optionally play sound on navigation
  }
}

/** Navigates to the next phrase */
function nextPhrase() {
  if (currentPhraseIndex < currentPhrases.length - 1) {
    currentPhraseIndex++;
    updatePhraseDisplay();
    playCurrentPhrase(); // Optionally play sound on navigation
  }
}

/**
 * Updates the enabled/disabled state of Previous/Next navigation buttons.
 * @param {string} context - Identifier for the set of buttons (e.g., 'word', 'phrase', 'game', 'guess', 'writing', 'syllable', 'quiz').
 * @param {number} currentIndex - The current index in the list.
 * @param {number} totalItems - The total number of items in the list.
 */
function updateNavigationButtons(context, currentIndex, totalItems) {
  let prevBtnId, nextBtnId;

  // Map context to the actual IDs used in the HTML
  switch (context) {
    case 'word': prevBtnId = 'prevBtn'; nextBtnId = 'nextBtn'; break;
    case 'phrase': prevBtnId = 'phrasePrevBtn'; nextBtnId = 'phraseNextBtn'; break;
    case 'game': prevBtnId = 'gamePrevBtn'; nextBtnId = 'gameNextBtn'; break;
    case 'guess': prevBtnId = 'guessPrevBtn'; nextBtnId = 'guessNextBtn'; break;
    case 'writing': prevBtnId = 'writingPrevBtn'; nextBtnId = 'writingNextBtn'; break;
    case 'syllable': prevBtnId = 'syllablePrevBtn'; nextBtnId = 'syllableNextBtn'; break;
    case 'quiz': prevBtnId = 'quizPrevBtn'; nextBtnId = 'quizNextBtn'; break;
    default: console.warn(`Unknown context for updateNavigationButtons: ${context}`); return;
  }

  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (prevBtn instanceof HTMLButtonElement) { // Type guard
    const isPrevDisabled = currentIndex <= 0;
    prevBtn.disabled = isPrevDisabled;
    prevBtn.setAttribute('aria-disabled', String(isPrevDisabled));
  } else if (prevBtnId) {
    // console.warn(`Previous button with ID "${prevBtnId}" not found or not a button.`);
  }

  if (nextBtn instanceof HTMLButtonElement) { // Type guard
    const isNextDisabled = totalItems === 0 || currentIndex >= totalItems - 1;
    nextBtn.disabled = isNextDisabled;
    nextBtn.setAttribute('aria-disabled', String(isNextDisabled));
  } else if (nextBtnId) {
    // console.warn(`Next button with ID "${nextBtnId}" not found or not a button.`);
  }
}


// --- Writing Game (Arrangement) Functions ---

/** Shows the writing game modal (Arrange Letters) */
function showWritingGame() {
  // Filter words for the current letter that have more than one character
  gameWords = (letterWords[currentLetter] || []).filter(word => (word.match(/[\u0621-\u064A]/g) || []).length > 1);

  if (gameWords.length === 0) {
    console.warn(`No suitable words found for arrangement game for letter: ${currentLetter}`);
    showTemporaryMessage(t('errorNoWordsForGame'), 'warning');
    return; // Don't open modal if no words
  }

  gameWordIndex = 0;
  const letterDisplay = document.getElementById('gameWordLetter');
  if(letterDisplay) {
    letterDisplay.textContent = currentLetter;
    letterDisplay.lang = 'ar';
  }

  updateGameWordDisplay(); // Initial display

  const modalElement = document.getElementById('writingModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the first available letter tile
      document.querySelector('#scrambledLetters .letter-tile:not(:disabled)')?.focus();
    }, { once: true });
  } else {
    console.error("Writing game modal (#writingModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open arrangement game.", "danger");
  }
}

/**
 * Scrambles the letters (with harakat) of a word using Fisher-Yates shuffle.
 * Ensures shuffle actually changes order if possible.
 * @param {string} word - The word to scramble.
 * @returns {string[]} An array of scrambled letter+haraka strings.
 */
function scrambleWord(word) {
  // Match letters possibly followed by harakat
  const letters = word.match(/[\u0621-\u064A][\u064B-\u065F]*/g) || [];
  if (letters.length <= 1) return letters; // Cannot scramble single letter

  let shuffledLetters;
  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loops for short words

  do {
    shuffledLetters = [...letters]; // Create a copy
    // Fisher-Yates (Knuth) Shuffle
    for (let i = shuffledLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]]; // Swap
    }
    attempts++;
  } while (shuffledLetters.join('') === word && attempts < maxAttempts); // Retry if same as original

  if (attempts === maxAttempts && shuffledLetters.join('') === word) {
    console.warn(`Could not produce a different scramble for "${word}" after ${maxAttempts} attempts.`);
    // Optional: Implement a simpler swap if Fisher-Yates fails to change order
    if (shuffledLetters.length > 1) {
      [shuffledLetters[0], shuffledLetters[1]] = [shuffledLetters[1], shuffledLetters[0]];
    }
  }

  return shuffledLetters;
}

/** Creates the clickable/selectable letter tiles for the scrambled word */
function createLetterTiles() {
  const container = document.getElementById('scrambledLetters');
  if (!container) {
    console.error("Scrambled letters container (#scrambledLetters) not found.");
    return;
  }

  container.innerHTML = ''; // Clear previous tiles
  if (currentScrambled.length === 0) {
    container.innerHTML = `<p class="text-muted small">${t('errorLoad', {}, 'Error loading tiles.')}</p>`;
    return;
  }

  currentScrambled.forEach((letterWithHaraka, index) => {
    const tile = document.createElement('button');
    const isDisabled = selectedOrder.includes(index);
    // Use btn-outline-primary for available, btn-secondary for disabled
    tile.className = `letter-tile btn m-1 fs-4 ${isDisabled ? 'btn-secondary disabled' : 'btn-outline-primary'} animate__animated`;
    tile.setAttribute('data-index', String(index));
    tile.setAttribute('aria-label', t('letterLabel', { letter: letterWithHaraka }));
    tile.disabled = isDisabled;
    tile.lang = 'ar';

    // Display letter and haraka (if present)
    const baseChar = letterWithHaraka[0];
    const haraka = letterWithHaraka.slice(1);
    tile.innerHTML = `
            ${baseChar === 'ء' ? '<span class="hamza">ء</span>' : baseChar}
            ${haraka ? `<span class="haraka d-block small text-muted">${haraka}</span>` : ''}
        `;

    tile.onclick = () => selectLetterTile(index);
    container.appendChild(tile);
    // Apply animation only if not disabled initially (or handle differently)
    if (!isDisabled) {
      animateElement(tile, 'animate__bounceIn');
    }
  });
}


/** Handles selection of a letter tile in the arrangement game */
function selectLetterTile(index) {
  if (!selectedOrder.includes(index)) {
    selectedOrder.push(index);
    updateSelectedLetters(); // Update the display of selected letters
    createLetterTiles(); // Redraw tiles to update disabled states

    // Focus management: focus next available tile or the check button
    const nextAvailableTile = document.querySelector('#scrambledLetters .letter-tile:not(:disabled)');
    const checkButton = document.querySelector('#writingModal button[onclick="checkArrangement()"]');

    if (nextAvailableTile instanceof HTMLElement) {
      nextAvailableTile.focus();
    } else if (checkButton instanceof HTMLElement) {
      checkButton.focus();
    }
  }
}

/** Updates the display area showing the letters selected by the user so far */
function updateSelectedLetters() {
  const selectedContainer = document.getElementById('selectedLetters');
  if (!selectedContainer) {
    console.error("Selected letters container (#selectedLetters) not found.");
    return;
  }

  selectedContainer.innerHTML = ''; // Clear previous selection
  if (selectedOrder.length === 0) {
    // Optional: Add a placeholder text if needed
    // selectedContainer.innerHTML = `<span class="text-muted small">${t('selectLettersPrompt', {}, 'Click letters above...')}</span>`;
  } else {
    selectedOrder.forEach(index => {
      if (index >= 0 && index < currentScrambled.length) { // Bounds check
        const letterWithHaraka = currentScrambled[index];
        const tile = document.createElement('div');
        // Use consistent styling with game tiles
        tile.className = 'letter-tile selected-tile d-inline-block border rounded p-2 m-1 bg-light shadow-sm fs-4';
        tile.lang = 'ar';

        const baseChar = letterWithHaraka[0];
        const haraka = letterWithHaraka.slice(1);
        tile.innerHTML = `
                    ${baseChar === 'ء' ? '<span class="hamza">ء</span>' : baseChar}
                    ${haraka ? `<span class="haraka d-block small text-muted">${haraka}</span>` : ''}
                `;
        selectedContainer.appendChild(tile);
      } else {
        console.warn(`Invalid index ${index} encountered in selectedOrder.`);
      }
    });
  }
}

/** Checks if the user's arrangement matches the original word */
function checkArrangement() {
  const feedback = document.querySelector('#writingModal .feedback-message'); // Use the correct ID if changed in HTML
  const checkButton = document.querySelector('#writingModal button[onclick="checkArrangement()"]');
  const resetButton = document.querySelector('#writingModal button[onclick="resetLetters()"]');
  const hintButton = document.querySelector('#writingModal button[onclick="showHint()"]');

  if (!feedback || !checkButton || !resetButton) {
    console.error("Feedback or control buttons not found in arrangement game modal.");
    return;
  }

  const userWord = selectedOrder.map(i => currentScrambled[i]).join('');
  const isCorrect = userWord === originalWord;

  feedback.className = 'feedback-message mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text

  if (isCorrect) {
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    showConfetti();
    trackProgress('game-arrange-correct'); // Track correct arrangement

    // Disable interaction buttons
    checkButton.disabled = true;
    resetButton.disabled = true;
    if (hintButton) hintButton.disabled = true;
    document.querySelectorAll('#scrambledLetters .letter-tile').forEach(tile => tile.disabled = true);

  } else {
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span>`;
    feedback.classList.add('incorrect');
    const selectedContainer = document.getElementById('selectedLetters');
    if (selectedContainer) {
      animateElement(selectedContainer, 'animate__headShake'); // Shake effect on error
    }
  }
  feedback.style.display = 'block'; // Make feedback visible
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback change
}

/** Resets the current arrangement attempt */
function resetLetters() {
  selectedOrder = [];
  updateSelectedLetters(); // Clear selected display
  createLetterTiles(); // Re-enable and redraw scrambled tiles

  // Clear feedback
  const feedback = document.querySelector('#writingModal .feedback-message'); // Use the correct ID if changed in HTML
  if (feedback) {
    feedback.style.display = 'none';
    feedback.textContent = '';
    feedback.classList.remove('correct', 'incorrect');
  }

  // Re-enable buttons
  const checkButton = document.querySelector('#writingModal button[onclick="checkArrangement()"]');
  const resetButton = document.querySelector('#writingModal button[onclick="resetLetters()"]');
  const hintButton = document.querySelector('#writingModal button[onclick="showHint()"]');

  if (checkButton) checkButton.disabled = false;
  if (resetButton) resetButton.disabled = false;
  if (hintButton) hintButton.disabled = false;

  // Focus the first available tile
  document.querySelector('#scrambledLetters .letter-tile:not(:disabled)')?.focus();
}

/** Shows a hint for the arrangement game (first and last letter) */
function showHint() {
  if (!originalWord) return;
  // Regex to find the first and last Arabic letters in the word
  const firstLetterMatch = originalWord.match(/[\u0621-\u064A]/);
  const lastLetterMatch = originalWord.match(/[\u0621-\u064A](?![\s\S]*[\u0621-\u064A])/);
  const firstLetter = firstLetterMatch ? firstLetterMatch[0] : '?';
  const lastLetter = lastLetterMatch ? lastLetterMatch[0] : '?';
  const message = t('arrangementHint', { first: firstLetter, last: lastLetter });
  showTemporaryMessage(message, 'info', 5000); // Show hint for 5 seconds
}

/** Updates the display for the writing (arrangement) game */
function updateGameWordDisplay() {
  const container = document.getElementById('scrambledLetters');
  const counterElem = document.getElementById('gameWordCounter');
  const feedback = document.querySelector('#writingModal .feedback-message'); // Use the correct ID if changed in HTML
  const selectedContainer = document.getElementById('selectedLetters');
  const checkButton = document.querySelector('#writingModal button[onclick="checkArrangement()"]');
  const resetButton = document.querySelector('#writingModal button[onclick="resetLetters()"]');
  const hintButton = document.querySelector('#writingModal button[onclick="showHint()"]');

  if (!container || !counterElem || !feedback || !selectedContainer || !checkButton || !resetButton) {
    console.error("One or more elements missing in writing game modal for display update.");
    return;
  }

  // Clear previous state
  feedback.style.display = 'none';
  feedback.textContent = '';
  feedback.classList.remove('correct', 'incorrect');
  selectedContainer.innerHTML = '';
  checkButton.disabled = true; // Disable until letters are loaded
  resetButton.disabled = true;
  if (hintButton) hintButton.disabled = true;

  if (gameWords.length === 0 || gameWordIndex >= gameWords.length) {
    container.innerHTML = `<p class="text-muted small">${t('noChallenges')}</p>`;
    counterElem.textContent = '0/0';
    originalWord = '';
    currentScrambled = [];
    selectedOrder = [];
  } else {
    gameWordIndex = Math.max(0, Math.min(gameWordIndex, gameWords.length - 1));
    originalWord = gameWords[gameWordIndex];
    currentScrambled = scrambleWord(originalWord);
    selectedOrder = [];
    createLetterTiles(); // Create the interactive tiles
    updateSelectedLetters(); // Update the (initially empty) selection area
    counterElem.textContent = `${gameWordIndex + 1}/${gameWords.length}`;

    // Enable buttons now that content is loaded
    checkButton.disabled = false;
    resetButton.disabled = false;
    if (hintButton) hintButton.disabled = false;
  }
  updateNavigationButtons('game', gameWordIndex, gameWords.length);
}


/** Navigates to the previous word in the arrangement game */
function previousGameWord() {
  if (gameWordIndex > 0) {
    gameWordIndex--;
    updateGameWordDisplay();
    // Focus first tile on navigation
    document.querySelector('#scrambledLetters .letter-tile:not(:disabled)')?.focus();
  }
}

/** Navigates to the next word in the arrangement game */
function nextGameWord() {
  if (gameWordIndex < gameWords.length - 1) {
    gameWordIndex++;
    updateGameWordDisplay();
    // Focus first tile on navigation
    document.querySelector('#scrambledLetters .letter-tile:not(:disabled)')?.focus();
  }
}


// --- Guess Letter Game Functions ---

/** Shows the guess the letter+haraka game modal */
function showGuessGame() {
  guessChallenges = generateGuessChallenges(10); // Generate challenges
  if (guessChallenges.length === 0) {
    console.warn("No challenges generated for Guess Letter game.");
    showTemporaryMessage(t('noChallenges'), 'warning');
    return;
  }
  guessIndex = 0;
  updateGuessDisplay(); // Initial display

  const modalElement = document.getElementById('guessLetterModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the play sound button
      document.querySelector('#guessLetterModal button[onclick="playGuessSound()"]')?.focus();
    }, { once: true });
  } else {
    console.error("Guess game modal (#guessLetterModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open guess game.", "danger");
  }
}

/**
 * Generates a specified number of challenges for the guess game.
 * Each challenge is a unique letter + basic haraka combination.
 * @param {number} count - Number of challenges to generate.
 * @returns {Array<{letter: string, haraka: string}>} Array of challenges.
 */
function generateGuessChallenges(count = 10) {
  const challenges = [];
  const possibleHarakat = ['َ', 'ُ', 'ِ']; // Basic harakat only
  const availableItems = [];

  // Create all possible letter+haraka combinations
  arabicLetters.forEach(letter => {
    possibleHarakat.forEach(haraka => {
      availableItems.push({ letter, haraka });
    });
  });

  // Shuffle the available items
  for (let i = availableItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
  }

  // Take the first 'count' items, ensuring not to exceed available combinations
  return availableItems.slice(0, Math.min(count, availableItems.length));
}

/** Updates the display for the guess letter game */
function updateGuessDisplay() {
  const optionsContainer = document.getElementById('guessOptions');
  const counterElem = document.getElementById('guessCounter');
  const feedbackElem = document.getElementById('guessFeedback');
  const playSoundBtn = document.querySelector('#guessLetterModal button[onclick="playGuessSound()"]');

  if (!optionsContainer || !counterElem || !feedbackElem || !playSoundBtn) {
    console.error("One or more elements missing in guess game modal for display update.");
    return;
  }

  // Clear previous state
  feedbackElem.textContent = '';
  feedbackElem.className = 'guess-feedback mt-3 small'; // Reset classes

  if (guessChallenges.length === 0 || guessIndex >= guessChallenges.length) {
    optionsContainer.innerHTML = `<p class="text-muted small">${t('noChallenges')}</p>`;
    counterElem.textContent = '0/0';
    correctLetterWithHaraka = '';
    playSoundBtn.disabled = true;
  } else {
    guessIndex = Math.max(0, Math.min(guessIndex, guessChallenges.length - 1));
    const challenge = guessChallenges[guessIndex];
    // Determine the correct display text using initialShapes
    correctLetterWithHaraka = initialShapes[challenge.letter]?.[challenge.haraka] || (challenge.letter + challenge.haraka);

    const options = generateGuessOptions(challenge, 4); // Generate 4 options
    optionsContainer.innerHTML = ''; // Clear previous options

    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-primary m-2 fs-4 p-3'; // Style as button
      btn.textContent = option;
      btn.lang = 'ar';
      btn.onclick = () => checkGuess(option);
      optionsContainer.appendChild(btn);
    });

    counterElem.textContent = `${guessIndex + 1}/${guessChallenges.length}`;
    playSoundBtn.disabled = false; // Enable sound button
    playGuessSound(); // Auto-play sound for the new challenge
  }
  updateNavigationButtons('guess', guessIndex, guessChallenges.length);
}


/**
 * Generates options for the guess game, including the correct answer and distractors.
 * @param {{letter: string, haraka: string}} challenge - The current challenge.
 * @param {number} count - The total number of options required (e.g., 4).
 * @returns {string[]} An array of option strings (letter+haraka).
 */
function generateGuessOptions(challenge, count = 4) {
  const correctOption = initialShapes[challenge.letter]?.[challenge.haraka] || (challenge.letter + challenge.haraka);
  const options = new Set([correctOption]); // Start with the correct answer
  const possibleHarakat = ['َ', 'ُ', 'ِ'];
  const pool = []; // Pool of potential incorrect options

  // Create a pool of all possible letter+haraka combinations, excluding the correct one
  arabicLetters.forEach(l => {
    possibleHarakat.forEach(h => {
      const potentialOption = initialShapes[l]?.[h] || (l + h);
      if (potentialOption && potentialOption !== correctOption) {
        pool.push(potentialOption);
      }
    });
  });

  // Shuffle the pool of incorrect options
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Add incorrect options from the pool until the desired count is reached
  let poolIndex = 0;
  while (options.size < count && poolIndex < pool.length) {
    options.add(pool[poolIndex]);
    poolIndex++;
  }

  // Fallback if pool runs out (should be rare with 28 letters * 3 harakat)
  while (options.size < count) {
    const randomLetter = arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
    const randomHaraka = possibleHarakat[Math.floor(Math.random() * possibleHarakat.length)];
    const fallbackOption = initialShapes[randomLetter]?.[randomHaraka] || (randomLetter + randomHaraka);
    if (fallbackOption) {
      options.add(fallbackOption); // Add even if it duplicates, Set handles it
    } else {
      // Extremely unlikely fallback
      options.add(`?${options.size}`);
    }
  }

  // Convert Set to array and shuffle the final options
  const finalOptions = Array.from(options);
  for (let i = finalOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
  }

  return finalOptions;
}


/** Plays the sound of the correct letter+haraka for the current guess challenge */
function playGuessSound() {
  if (correctLetterWithHaraka) {
    speakTextDebounced(correctLetterWithHaraka);
  } else {
    console.warn("playGuessSound called but correctLetterWithHaraka is empty.");
  }
}

/**
 * Checks the user's selected guess against the correct answer.
 * @param {string} selectedOption - The option chosen by the user.
 */
function checkGuess(selectedOption) {
  const feedback = document.getElementById('guessFeedback');
  const optionsContainer = document.getElementById('guessOptions');
  const playSoundBtn = document.querySelector('#guessLetterModal button[onclick="playGuessSound()"]');

  if (!feedback || !optionsContainer || !playSoundBtn) {
    console.error("Feedback, options container, or play sound button not found in guess game.");
    return;
  }

  const isCorrect = selectedOption === correctLetterWithHaraka;

  feedback.className = 'guess-feedback mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text

  if (isCorrect) {
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    showConfetti();
    trackProgress('game-guess-correct'); // Track correct guess
  } else {
    // Provide correct answer in feedback
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span> ${t('correctWas', {}, 'Correct was:')} <strong class="text-primary">${correctLetterWithHaraka}</strong>`;
    feedback.classList.add('incorrect');
  }
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback

  // Disable all option buttons and highlight correct/incorrect
  optionsContainer.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctLetterWithHaraka) {
      btn.classList.remove('btn-outline-primary', 'btn-danger'); // Remove potential incorrect styling
      btn.classList.add('btn-success'); // Highlight correct
    } else if (btn.textContent === selectedOption && !isCorrect) {
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-danger'); // Highlight incorrect selection
    }
  });

  // Disable play sound button after guess
  playSoundBtn.disabled = true;
}


/** Navigates to the previous question in the guess game */
function previousGuess() {
  if (guessIndex > 0) {
    guessIndex--;
    updateGuessDisplay();
  }
}

/** Navigates to the next question in the guess game */
function nextGuess() {
  if (guessIndex < guessChallenges.length - 1) {
    guessIndex++;
    updateGuessDisplay();
  }
}


// --- Writing Practice Functions ---

/** Shows the writing practice modal */
function showWritingPractice() {
  writingChallenges = generateGuessChallenges(10); // Reuse guess challenge generator
  if (writingChallenges.length === 0) {
    console.warn("No challenges generated for Writing Practice game.");
    showTemporaryMessage(t('noChallenges'), 'warning');
    return;
  }
  writingIndex = 0;
  updateWritingDisplay(); // Initial display

  const modalElement = document.getElementById('writingPracticeModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the input field
      document.getElementById('userInput')?.focus();
    }, { once: true });
  } else {
    console.error("Writing practice modal (#writingPracticeModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open writing practice.", "danger");
  }
}

/** Updates the display for the writing practice game */
function updateWritingDisplay() {
  const targetLetterElem = document.getElementById('targetLetter');
  const userInputElem = document.getElementById('userInput');
  const feedbackElem = document.getElementById('writingFeedback');
  const counterElem = document.getElementById('writingCounter');
  const checkBtn = document.querySelector('#writingPracticeModal button[onclick="checkWriting()"]');

  if (!targetLetterElem || !userInputElem || !feedbackElem || !counterElem || !checkBtn) {
    console.error("One or more elements missing in writing practice modal for display update.");
    return;
  }

  // Clear previous state
  feedbackElem.textContent = '';
  feedbackElem.className = 'writing-feedback mt-3 small'; // Reset classes
  userInputElem.value = ''; // Clear input
  userInputElem.classList.remove('is-invalid', 'is-valid'); // Remove validation classes

  if (writingChallenges.length === 0 || writingIndex >= writingChallenges.length) {
    targetLetterElem.textContent = t('noChallenges');
    targetLetterElem.lang = getCurrentLanguage();
    userInputElem.disabled = true;
    counterElem.textContent = '0/0';
    currentTargetLetter = '';
    checkBtn.disabled = true;
  } else {
    writingIndex = Math.max(0, Math.min(writingIndex, writingChallenges.length - 1));
    const challenge = writingChallenges[writingIndex];
    // Determine the target display text
    currentTargetLetter = initialShapes[challenge.letter]?.[challenge.haraka] || (challenge.letter + challenge.haraka);

    targetLetterElem.textContent = currentTargetLetter;
    targetLetterElem.lang = 'ar';
    userInputElem.disabled = false;
    userInputElem.lang = 'ar'; // Ensure input field expects Arabic
    counterElem.textContent = `${writingIndex + 1}/${writingChallenges.length}`;
    checkBtn.disabled = false; // Enable check button
    speakTextDebounced(currentTargetLetter); // Speak the target letter/haraka combination
  }
  updateNavigationButtons('writing', writingIndex, writingChallenges.length);
}

/** Checks the user's typed input against the target letter+haraka */
function checkWriting() {
  const userInputElem = document.getElementById('userInput');
  const feedback = document.getElementById('writingFeedback');
  const checkBtn = document.querySelector('#writingPracticeModal button[onclick="checkWriting()"]');

  if (!userInputElem || !feedback || !checkBtn) {
    console.error("Input, feedback, or check button not found in writing practice.");
    return;
  }

  // Basic sanitization and trim whitespace
  const userInput = sanitizeInput(userInputElem.value).trim();
  const isCorrect = userInput === currentTargetLetter;

  feedback.className = 'writing-feedback mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text
  userInputElem.classList.remove('is-invalid', 'is-valid'); // Clear validation states

  if (isCorrect) {
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    userInputElem.classList.add('is-valid');
    showConfetti();
    trackProgress('game-write-correct'); // Track correct writing
    userInputElem.disabled = true; // Disable input after correct answer
    checkBtn.disabled = true; // Disable check button
  } else {
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span>`;
    feedback.classList.add('incorrect');
    userInputElem.classList.add('is-invalid');
    userInputElem.focus(); // Keep focus on input for correction
    animateElement(userInputElem, 'animate__headShake'); // Shake effect
  }
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback
}

// Add event listener to check writing on Enter key press in the input field
const writingUserInput = document.getElementById('userInput');
if (writingUserInput) {
  writingUserInput.addEventListener('keypress', (event) => {
    // Check if Enter key was pressed and the check button is enabled
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if it's in a form
      const checkBtn = document.querySelector('#writingPracticeModal button[onclick="checkWriting()"]');
      if (checkBtn && !checkBtn.disabled) {
        checkWriting();
      }
    }
  });
}


/** Navigates to the previous challenge in the writing practice game */
function previousWriting() {
  if (writingIndex > 0) {
    writingIndex--;
    updateWritingDisplay();
    document.getElementById('userInput')?.focus(); // Focus input on navigation
  }
}

/** Navigates to the next challenge in the writing practice game */
function nextWriting() {
  if (writingIndex < writingChallenges.length - 1) {
    writingIndex++;
    updateWritingDisplay();
    document.getElementById('userInput')?.focus(); // Focus input on navigation
  }
}


// --- Moving Letter Game Functions ---

/** Shows the moving letter game modal */
function showMovingLetterGame() {
  selectedLetter = currentLetter || arabicLetters[0]; // Default to current or first letter
  populateLetterSelect(); // Fill dropdown
  updateBaseLetterDisplay(); // Show base letter form

  const movingLetterElem = document.getElementById('movingLetter');
  if (movingLetterElem) {
    movingLetterElem.textContent = selectedLetter; // Set initial display
    movingLetterElem.lang = 'ar';
  }
  stopMovingLetter(); // Ensure any previous interval is stopped

  const modalElement = document.getElementById('movingLetterModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    // Add listener to clean up interval when modal is hidden
    modalElement.removeEventListener('hidden.bs.modal', stopMovingLetter); // Remove previous listener if any
    modalElement.addEventListener('hidden.bs.modal', stopMovingLetter, { once: true });
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the select dropdown or start button
      document.getElementById('letterSelect')?.focus();
    }, { once: true });
  } else {
    console.error("Moving letter modal (#movingLetterModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open moving letter game.", "danger");
  }
}

/** Populates the letter selection dropdown */
function populateLetterSelect() {
  const select = document.getElementById('letterSelect');
  if (!select) {
    console.error("Letter select dropdown (#letterSelect) not found.");
    return;
  }

  select.innerHTML = `<option value="" disabled>${t('selectLetterPrompt', {}, 'Select a letter')}</option>`; // Placeholder
  arabicLetters.forEach(letter => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    option.lang = 'ar';
    if (letter === selectedLetter) {
      option.selected = true; // Pre-select the current letter
    }
    select.appendChild(option);
  });
}

/** Updates the display showing the base letter (e.g., with fatha) */
function updateBaseLetterDisplay() {
  const baseDisplay = document.getElementById('harakatList'); // Assuming this ID shows the base form
  if (baseDisplay && selectedLetter) {
    // Display the letter with Fatha as the base example
    baseDisplay.textContent = initialShapes[selectedLetter]?.['َ'] || selectedLetter;
    baseDisplay.lang = 'ar';
    // baseDisplay.classList.remove('highlight'); // Remove any previous highlight if used
  } else if (!baseDisplay) {
    console.warn("Element #harakatList not found for base letter display.");
  }
}

/** Starts the interval to cycle through harakat on the moving letter */
function startMovingLetter() {
  stopMovingLetter(); // Stop any existing interval first
  const movingLetter = document.getElementById('movingLetter');
  if (!movingLetter || !selectedLetter) {
    console.error("Moving letter element or selected letter missing.");
    return;
  }

  currentHarakatIndex = 0; // Reset index
  displayAndSpeakMovingLetter(movingLetter); // Initial display and sound

  // Start interval to cycle through harakatSequence
  movingInterval = setInterval(() => {
    currentHarakatIndex = (currentHarakatIndex + 1) % harakatSequence.length;
    displayAndSpeakMovingLetter(movingLetter);
  }, 1500); // Cycle every 1.5 seconds
  console.log("Moving letter interval started.");
}

/** Helper function to display and speak the current moving letter combination */
function displayAndSpeakMovingLetter(element) {
  if (!element || !selectedLetter || currentHarakatIndex < 0 || currentHarakatIndex >= harakatSequence.length) return;

  const currentItem = harakatSequence[currentHarakatIndex];
  const harakaSymbol = currentItem.symbol;
  let displayText = '';

  // Determine the correct display form based on haraka type
  if (['َ', 'ُ', 'ِ'].includes(harakaSymbol)) {
    // Use initialShapes for basic harakat if available
    displayText = initialShapes[selectedLetter]?.[harakaSymbol] || (selectedLetter + harakaSymbol);
  } else if (['ً', 'ٌ', 'ٍ'].includes(harakaSymbol)) {
    // Handle Tanween, adding Alif for Fath Tanween where appropriate
    displayText = selectedLetter + harakaSymbol;
    if (harakaSymbol === 'ً' && !['ة', 'ء'].includes(selectedLetter)) {
      displayText += 'ا';
    }
  } else if (['ا', 'و', 'ي'].includes(harakaSymbol)) {
    // Handle long vowels
    displayText = selectedLetter + harakaSymbol;
  } else {
    // Fallback for any other symbols (though sequence only contains defined ones)
    displayText = selectedLetter + harakaSymbol;
  }

  element.textContent = displayText;
  element.lang = 'ar';
  // animateElement(element, 'animate__pulse'); // Optional animation on change
  speakTextDebounced(displayText); // Speak the current combination
}


/** Stops the moving letter interval */
function stopMovingLetter() {
  if (movingInterval) {
    clearInterval(movingInterval);
    movingInterval = null;
    console.log("Moving letter interval stopped.");
  }
}

// Add event listener to the select dropdown to update letter and stop/reset animation
const letterSelectElement = document.getElementById('letterSelect');
if (letterSelectElement) {
  letterSelectElement.addEventListener('change', (e) => {
    if (e.target instanceof HTMLSelectElement) { // Type guard
      const newLetter = e.target.value;
      if (newLetter && newLetter !== selectedLetter) {
        selectedLetter = newLetter;
        updateBaseLetterDisplay(); // Update the static example
        const movingLetterElem = document.getElementById('movingLetter');
        if (movingLetterElem) movingLetterElem.textContent = selectedLetter; // Reset moving display
        stopMovingLetter(); // Stop animation on letter change
      }
    }
  });
}


// --- Word Hunter Game Functions ---

/** Shows the Word Hunter game modal */
function showWordHunterGame() {
  hunterScore = 0;
  hunterTimeLeft = 30; // Reset timer
  updateHunterDisplay(); // Generate first set of words
  startHunterTimer(); // Start the countdown

  const modalElement = document.getElementById('wordHunterModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    // Add listener to clean up timer when modal is hidden
    modalElement.removeEventListener('hidden.bs.modal', stopHunterTimer); // Remove previous listener
    modalElement.addEventListener('hidden.bs.modal', stopHunterTimer, { once: true });
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the first word option button
      document.getElementById('wordOptions')?.querySelector('.btn')?.focus();
    }, { once: true });
  } else {
    console.error("Word Hunter modal (#wordHunterModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open Word Hunter game.", "danger");
  }
}

/** Updates the display for the Word Hunter game (new target letter and options) */
function updateHunterDisplay() {
  const targetLetterElem = document.getElementById('hunterTargetLetter');
  const optionsContainer = document.getElementById('wordOptions');
  const scoreElem = document.getElementById('hunterScore');
  const feedbackElem = document.getElementById('hunterFeedback');

  if (!targetLetterElem || !optionsContainer || !scoreElem || !feedbackElem) {
    console.error("One or more elements missing in Word Hunter modal for display update.");
    return;
  }

  // Clear previous feedback
  feedbackElem.textContent = '';
  feedbackElem.className = 'hunter-feedback mt-3 small';

  // Find letters that actually have words defined
  const lettersWithWords = Object.keys(letterWords).filter(l => letterWords[l] && letterWords[l].length > 0);
  if (lettersWithWords.length === 0) {
    console.error("No letters with words defined for Word Hunter game.");
    optionsContainer.innerHTML = `<p class="text-danger small">${t('errorNoWordsForGame')}</p>`;
    targetLetterElem.textContent = '?';
    targetLetterElem.lang = 'ar';
    scoreElem.textContent = t('score', { score: hunterScore });
    stopHunterTimer(); // Stop timer if no words available
    return;
  }

  // Select a random target letter from those with words
  const targetLetter = lettersWithWords[Math.floor(Math.random() * lettersWithWords.length)];

  targetLetterElem.textContent = targetLetter;
  targetLetterElem.lang = 'ar';
  const words = generateHunterWords(targetLetter, 5); // Generate 5 word options
  optionsContainer.innerHTML = ''; // Clear previous options

  if (words.length < 2) { // Need at least one correct and one incorrect ideally
    console.warn(`Could only generate ${words.length} options for Word Hunter (target: ${targetLetter}). Retrying or skipping.`);
    // Optionally retry or show an error and stop
    updateHunterDisplay(); // Retry generating
    return;
  }

  words.forEach(word => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary m-2 fs-5 word-tile'; // Style as button/tile
    btn.textContent = word;
    btn.lang = 'ar';
    btn.onclick = () => selectHunterWord(word, targetLetter);
    optionsContainer.appendChild(btn);
  });

  scoreElem.textContent = t('score', { score: hunterScore });
}

/**
 * Generates word options for the Word Hunter game, ensuring at least one correct and one incorrect.
 * @param {string} targetLetter - The letter whose words are correct.
 * @param {number} count - The total number of options required (e.g., 5).
 * @returns {string[]} An array of word options.
 */
function generateHunterWords(targetLetter, count = 5) {
  const correctWords = letterWords[targetLetter] || [];
  if (correctWords.length === 0) return []; // Cannot generate if no correct words

  // Pool of incorrect words (from other letters)
  const incorrectPool = Object.entries(letterWords)
    .filter(([letter, words]) => letter !== targetLetter && words && words.length > 0)
    .flatMap(([, words]) => words);

  // Ensure the pool is not empty
  if (incorrectPool.length === 0) {
    console.warn("Word Hunter: Incorrect word pool is empty.");
    // Fallback: Use duplicates of correct words if necessary, though not ideal
    if (correctWords.length > 0) {
      while (incorrectPool.length < count -1) incorrectPool.push(correctWords[0]);
    } else return []; // Should not happen if initial check passed
  }

  // Shuffle pools
  for (let i = correctWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [correctWords[i], correctWords[j]] = [correctWords[j], correctWords[i]];
  }
  for (let i = incorrectPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incorrectPool[i], incorrectPool[j]] = [incorrectPool[j], incorrectPool[i]];
  }

  // Determine number of correct/incorrect words (aim for 1-2 correct)
  const numCorrect = Math.max(1, Math.min(correctWords.length, Math.floor(count / 2)));
  const numIncorrect = count - numCorrect;

  const options = new Set();

  // Add correct words
  let correctAdded = 0;
  for (const word of correctWords) {
    if (correctAdded < numCorrect) {
      options.add(word);
      correctAdded++;
    } else break;
  }

  // Add incorrect words
  let incorrectAdded = 0;
  for (const word of incorrectPool) {
    if (incorrectAdded < numIncorrect && !options.has(word)) { // Avoid duplicates if possible
      options.add(word);
      incorrectAdded++;
    }
    if (incorrectAdded >= numIncorrect) break;
  }

  // Fill remaining slots if necessary (e.g., if pools were small or duplicates prevented filling)
  let fallbackIndex = 0;
  const combinedPool = [...correctWords, ...incorrectPool];
  while (options.size < count && fallbackIndex < combinedPool.length) {
    options.add(combinedPool[fallbackIndex]);
    fallbackIndex++;
  }
  while (options.size < count) { // Absolute fallback
    options.add(`Fallback${options.size}`);
  }

  // Convert Set to array and shuffle final options
  const finalOptions = Array.from(options);
  for (let i = finalOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
  }

  return finalOptions;
}


/**
 * Handles the user selecting a word in the Word Hunter game.
 * @param {string} selectedWord - The word the user clicked.
 * @param {string} targetLetter - The current target letter.
 */
function selectHunterWord(word, targetLetter) {
  const feedback = document.getElementById('hunterFeedback');
  const scoreElem = document.getElementById('hunterScore');
  const optionsContainer = document.getElementById('wordOptions');

  if (!feedback || !scoreElem || !optionsContainer) {
    console.error("Feedback, score, or options container not found in Word Hunter.");
    return;
  }

  // Check if the selected word belongs to the target letter's list
  const isCorrect = (letterWords[targetLetter] || []).includes(word);

  feedback.className = 'hunter-feedback mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text

  if (isCorrect) {
    hunterScore += 10; // Increase score
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    showConfetti();
    trackProgress('game-hunter-correct'); // Track correct hunt
  } else {
    hunterScore = Math.max(0, hunterScore - 5); // Decrease score, minimum 0
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span>`;
    feedback.classList.add('incorrect');
  }
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback
  scoreElem.textContent = t('score', { score: hunterScore }); // Update score display

  // Disable all buttons temporarily
  optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);

  // Load next set of words after a short delay, if time remains
  setTimeout(() => {
    if (hunterTimeLeft > 0) {
      updateHunterDisplay(); // Generate new target and options
      // Focus first new button
      const firstButton = optionsContainer.querySelector('.btn');
      if (firstButton instanceof HTMLElement) firstButton.focus();
    }
  }, 800); // Delay before showing next round
}

/** Stops the hunter timer interval */
function stopHunterTimer() {
  if (hunterTimerInterval) {
    clearInterval(hunterTimerInterval);
    hunterTimerInterval = null;
    console.log("Hunter timer stopped.");
  }
}

/** Starts the timer for the Word Hunter game */
function startHunterTimer() {
  stopHunterTimer(); // Ensure no duplicate timers
  const timerElem = document.getElementById('hunterTimer');
  if (!timerElem) {
    console.error("Timer element #hunterTimer not found.");
    return;
  }

  timerElem.textContent = t('hunterTimeLeft', { seconds: hunterTimeLeft }); // Initial display

  hunterTimerInterval = setInterval(() => {
    hunterTimeLeft--;
    if (timerElem) { // Check again inside interval
      timerElem.textContent = t('hunterTimeLeft', { seconds: hunterTimeLeft });
    }

    if (hunterTimeLeft <= 0) {
      stopHunterTimer(); // Stop the interval
      showTemporaryMessage(t('hunterGameOver', { score: hunterScore }), 'info', 5000);
      // Disable options when time runs out
      const optionsContainer = document.getElementById('wordOptions');
      if (optionsContainer) {
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
      }
      // Optionally disable reset button too, or leave it enabled
      // document.querySelector('#wordHunterModal button[onclick="resetHunterGame()"]')?.setAttribute('disabled', 'true');
    }
  }, 1000); // Update every second
  console.log("Hunter timer started.");
}

/** Resets and restarts the Word Hunter game */
function resetHunterGame() {
  stopHunterTimer(); // Stop current timer
  hunterScore = 0;
  hunterTimeLeft = 30; // Reset time
  updateHunterDisplay(); // Get new words
  startHunterTimer(); // Start new timer

  // Ensure buttons are enabled
  const optionsContainer = document.getElementById('wordOptions');
  if (optionsContainer) {
    optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
    // Focus first button
    const firstButton = optionsContainer.querySelector('.btn');
    if (firstButton instanceof HTMLElement) firstButton.focus();
  }
}


// --- Missing Syllable Game Functions ---

/** Shows the Missing Syllable game modal */
function showMissingSyllableGame() {
  syllableChallenges = generateSyllableChallenges(10); // Generate challenges
  if (syllableChallenges.length === 0) {
    console.warn("No challenges generated for Missing Syllable game.");
    showTemporaryMessage(t('noChallenges'), 'warning');
    return;
  }
  syllableIndex = 0;
  updateSyllableDisplay(); // Initial display

  const modalElement = document.getElementById('missingSyllableModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the first syllable option button
      document.getElementById('syllableOptions')?.querySelector('.btn')?.focus();
    }, { once: true });
  } else {
    console.error("Missing Syllable modal (#missingSyllableModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open missing syllable game.", "danger");
  }
}

/**
 * Generates challenges for the Missing Syllable game.
 * Each challenge has a word, the index of the missing syllable, and the correct syllable.
 * @param {number} count - Number of challenges to generate.
 * @returns {Array<{word: string, missingIndex: number, correctSyllable: string}>}
 */
function generateSyllableChallenges(count = 10) {
  const challenges = [];
  // Regex to match an Arabic letter possibly followed by harakat
  const syllableRegex = /[\u0621-\u064A][\u064B-\u065F]*/g;
  const pool = [];

  // Create a pool of potential challenges from all words
  Object.values(letterWords).flat().forEach(word => {
    if (!word || typeof word !== 'string') return; // Skip invalid words
    syllableRegex.lastIndex = 0; // Reset regex index
    const syllables = word.match(syllableRegex);
    // Only use words with more than one syllable
    if (syllables && syllables.length > 1) {
      syllables.forEach((syllable, index) => {
        // Ensure syllable is not empty or just whitespace
        if (syllable && syllable.trim()) {
          pool.push({ word, missingIndex: index, correctSyllable: syllable });
        }
      });
    }
  });

  // Shuffle the pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Select the desired number of unique challenges
  const uniqueChallenges = [];
  const seenWords = new Set();
  for (const item of pool) {
    if (uniqueChallenges.length >= count) break;
    // Try to get variety by not repeating the same word immediately if possible
    if (!seenWords.has(item.word) || pool.length <= count) {
      uniqueChallenges.push(item);
      seenWords.add(item.word);
    }
  }
  // If still not enough, add more even if words repeat
  let poolIndex = 0;
  while(uniqueChallenges.length < count && poolIndex < pool.length) {
    if(!uniqueChallenges.some(uc => uc.word === pool[poolIndex].word && uc.missingIndex === pool[poolIndex].missingIndex)) {
      uniqueChallenges.push(pool[poolIndex]);
    }
    poolIndex++;
  }

  return uniqueChallenges;
}

/** Updates the display for the Missing Syllable game */
function updateSyllableDisplay() {
  const incompleteWordElem = document.getElementById('incompleteWord');
  const optionsContainer = document.getElementById('syllableOptions');
  const counterElem = document.getElementById('syllableCounter');
  const feedbackElem = document.getElementById('syllableFeedback');
  const letterElem = document.getElementById('missingSyllableLetter'); // Displays first letter of the word

  if (!incompleteWordElem || !optionsContainer || !counterElem || !feedbackElem || !letterElem) {
    console.error("One or more elements missing in Missing Syllable modal for display update.");
    return;
  }

  // Clear previous state
  feedbackElem.textContent = '';
  feedbackElem.className = 'syllable-feedback mt-3 small'; // Reset classes

  if (syllableChallenges.length === 0 || syllableIndex >= syllableChallenges.length) {
    incompleteWordElem.textContent = t('noChallenges');
    incompleteWordElem.lang = getCurrentLanguage();
    optionsContainer.innerHTML = '';
    counterElem.textContent = '0/0';
    correctSyllable = '';
    letterElem.textContent = '-'; // Placeholder
    letterElem.lang = 'ar';
  } else {
    syllableIndex = Math.max(0, Math.min(syllableIndex, syllableChallenges.length - 1));
    const challenge = syllableChallenges[syllableIndex];
    correctSyllable = challenge.correctSyllable;
    const syllableRegex = /[\u0621-\u064A][\u064B-\u065F]*/g;
    syllableRegex.lastIndex = 0; // Reset regex index
    const syllables = challenge.word.match(syllableRegex) || [];

    // Create the word display with a placeholder for the missing syllable
    if (challenge.missingIndex >= 0 && challenge.missingIndex < syllables.length) {
      syllables[challenge.missingIndex] = `<span class="missing-syllable-placeholder text-primary fw-bold">___</span>`;
    } else {
      // Handle error case: invalid index
      console.error(`Invalid missingIndex ${challenge.missingIndex} for word ${challenge.word}`);
      incompleteWordElem.textContent = t('errorLoad'); // Show generic error
      incompleteWordElem.lang = getCurrentLanguage();
      optionsContainer.innerHTML = ''; // Clear options
      counterElem.textContent = `${syllableIndex + 1}/${syllableChallenges.length}`;
      letterElem.textContent = '?';
      letterElem.lang = 'ar';
      updateNavigationButtons('syllable', syllableIndex, syllableChallenges.length);
      return; // Stop further processing for this challenge
    }

    incompleteWordElem.innerHTML = syllables.join(''); // Display word with placeholder
    incompleteWordElem.lang = 'ar';
    letterElem.textContent = challenge.word[0]; // Show the first letter as a hint
    letterElem.lang = 'ar';

    // Generate and display options
    const options = generateSyllableOptions(challenge, 4);
    optionsContainer.innerHTML = ''; // Clear previous options

    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-primary m-2 fs-5 p-2 syllable-tile'; // Style as button/tile
      btn.textContent = option;
      btn.lang = 'ar';
      btn.onclick = () => checkSyllable(option);
      optionsContainer.appendChild(btn);
    });

    counterElem.textContent = `${syllableIndex + 1}/${syllableChallenges.length}`;
    // Ensure buttons are enabled
    optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
  }
  updateNavigationButtons('syllable', syllableIndex, syllableChallenges.length);
}


/**
 * Generates options for the Missing Syllable game, including correct and distractors.
 * @param {{correctSyllable: string}} challenge - The current challenge.
 * @param {number} count - The total number of options required (e.g., 4).
 * @returns {string[]} An array of syllable options.
 */
function generateSyllableOptions(challenge, count = 4) {
  const correctOption = challenge.correctSyllable;
  const options = new Set([correctOption]); // Start with correct option
  const syllableRegex = /[\u0621-\u064A][\u064B-\u065F]*/g;
  const allSyllables = new Set(); // Use a Set to store unique syllables

  // Collect all unique syllables from all words, excluding the correct one
  Object.values(letterWords).flat().forEach(word => {
    if (!word || typeof word !== 'string') return;
    syllableRegex.lastIndex = 0;
    const syllables = word.match(syllableRegex);
    if (syllables) {
      syllables.forEach(s => {
        if (s && s.trim() && s !== correctOption) { // Ensure syllable is valid and not the correct one
          allSyllables.add(s);
        }
      });
    }
  });

  const pool = Array.from(allSyllables); // Convert Set to array for shuffling

  // Shuffle the pool of incorrect syllables
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Add incorrect syllables from the pool
  let poolIndex = 0;
  while (options.size < count && poolIndex < pool.length) {
    options.add(pool[poolIndex]);
    poolIndex++;
  }

  // Fallback if pool runs out (unlikely but possible)
  while (options.size < count) {
    if (pool.length > 0) { // Pick random from pool if needed
      options.add(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      options.add(`??${options.size}`); // Absolute fallback
    }
  }

  // Convert final Set to array and shuffle
  const finalOptions = Array.from(options);
  for (let i = finalOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
  }

  return finalOptions;
}


/**
 * Checks the user's selected syllable against the correct one.
 * @param {string} selectedOption - The syllable chosen by the user.
 */
function checkSyllable(selectedOption) {
  const feedback = document.getElementById('syllableFeedback');
  const optionsContainer = document.getElementById('syllableOptions');
  const incompleteWordElem = document.getElementById('incompleteWord'); // To update placeholder

  if (!feedback || !optionsContainer || !incompleteWordElem) {
    console.error("Feedback, options container, or word display not found in syllable game.");
    return;
  }

  const isCorrect = selectedOption === correctSyllable;

  feedback.className = 'syllable-feedback mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text

  if (isCorrect) {
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    showConfetti();
    trackProgress('game-syllable-correct'); // Track correct syllable guess

    // Replace placeholder with the correct syllable, styled correctly
    const placeholder = incompleteWordElem.querySelector('.missing-syllable-placeholder');
    if (placeholder) {
      placeholder.textContent = correctSyllable;
      placeholder.classList.remove('missing-syllable-placeholder', 'text-primary');
      placeholder.classList.add('text-success', 'fw-bold'); // Style as correct
    }
  } else {
    // Provide correct answer in feedback
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span> ${t('correctWas', {}, 'Correct was:')} <strong class="text-primary">${correctSyllable}</strong>`;
    feedback.classList.add('incorrect');
  }
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback

  // Disable all option buttons and highlight correct/incorrect
  optionsContainer.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctSyllable) {
      btn.classList.remove('btn-outline-primary', 'btn-danger');
      btn.classList.add('btn-success'); // Highlight correct
    } else if (btn.textContent === selectedOption && !isCorrect) {
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-danger'); // Highlight incorrect selection
    }
  });
}

/** Navigates to the previous challenge in the syllable game */
function previousSyllable() {
  if (syllableIndex > 0) {
    syllableIndex--;
    updateSyllableDisplay();
  }
}

/** Navigates to the next challenge in the syllable game */
function nextSyllable() {
  if (syllableIndex < syllableChallenges.length - 1) {
    syllableIndex++;
    updateSyllableDisplay();
  }
}


// --- Global Quiz Functions ---

/** Shows the Global Quiz modal */
function showGlobalQuiz() {
  quizQuestions = generateQuizQuestions(10); // Generate 10 questions
  if (quizQuestions.length === 0) {
    console.warn("No questions generated for Global Quiz.");
    showTemporaryMessage(t('noQuestions'), 'warning');
    return;
  }
  quizIndex = 0;
  quizScore = 0;
  updateQuizDisplay(); // Initial display

  const modalElement = document.getElementById('globalQuizModal');
  if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
    modalElement.addEventListener('shown.bs.modal', () => {
      // Focus the play sound button or first option
      const playBtn = document.querySelector('#globalQuizModal button[onclick="playQuizSound()"]');
      if (playBtn && !playBtn.disabled) playBtn.focus();
      else document.querySelector('#quizOptions .btn:not(:disabled)')?.focus();
    }, { once: true });
  } else {
    console.error("Global Quiz modal (#globalQuizModal) or Bootstrap JS not found.");
    showTemporaryMessage("Error: Could not open global quiz.", "danger");
  }
}

/**
 * Generates questions for the global quiz, balancing question types.
 * @param {number} totalQuestions - The total number of questions desired.
 * @returns {Array<object>} An array of question objects { type, question, correctAnswer }.
 */
function generateQuizQuestions(totalQuestions = 10) {
  const questions = [];
  const possibleHarakat = ['َ', 'ُ', 'ِ']; // Focus on basic harakat for letter questions

  // --- Create Pools ---
  const letterPool = [];
  arabicLetters.forEach(letter => {
    possibleHarakat.forEach(haraka => {
      const displayText = initialShapes[letter]?.[haraka] || (letter + haraka);
      letterPool.push({ type: 'letter', question: displayText, correctAnswer: displayText });
    });
  });

  const wordPool = Object.values(letterWords).flat()
    .filter(word => word && typeof word === 'string' && word.trim()) // Ensure valid words
    .map(word => ({ type: 'word', question: word, correctAnswer: word }));

  const phrasePool = Object.values(letterPhrases).flat()
    .filter(phrase => phrase && typeof phrase === 'string' && phrase.trim()) // Ensure valid phrases
    .map(phrase => ({ type: 'phrase', question: phrase, correctAnswer: phrase }));

  // --- Determine Question Counts ---
  // Aim for roughly 40% letters, 30% words, 30% phrases, adjusting based on pool sizes
  let numLetterQs = letterPool.length > 0 ? Math.min(letterPool.length, Math.floor(totalQuestions * 0.4)) : 0;
  let numWordQs = wordPool.length > 0 ? Math.min(wordPool.length, Math.floor(totalQuestions * 0.3)) : 0;
  // Calculate phrase Qs based on remaining, ensuring total doesn't exceed desired count
  let numPhraseQs = phrasePool.length > 0 ? Math.min(phrasePool.length, totalQuestions - numLetterQs - numWordQs) : 0;

  // Adjust if total is less than desired and pools have more items
  let currentTotal = numLetterQs + numWordQs + numPhraseQs;
  let remainingQs = totalQuestions - currentTotal;

  // Prioritize adding from pools with more available items relative to current count
  const pools = [
    { pool: letterPool, count: numLetterQs, add: (n) => numLetterQs += n },
    { pool: wordPool, count: numWordQs, add: (n) => numWordQs += n },
    { pool: phrasePool, count: numPhraseQs, add: (n) => numPhraseQs += n }
  ].sort((a, b) => (b.pool.length - b.count) - (a.pool.length - a.count)); // Sort by remaining available

  while (remainingQs > 0 && pools.some(p => p.pool.length > p.count)) {
    for (const p of pools) {
      if (remainingQs <= 0) break;
      if (p.pool.length > p.count) {
        p.add(1);
        remainingQs--;
      }
    }
  }

  // --- Shuffle Pools and Select Questions ---
  letterPool.sort(() => 0.5 - Math.random());
  wordPool.sort(() => 0.5 - Math.random());
  phrasePool.sort(() => 0.5 - Math.random());

  questions.push(...letterPool.slice(0, numLetterQs));
  questions.push(...wordPool.slice(0, numWordQs));
  questions.push(...phrasePool.slice(0, numPhraseQs));

  if (questions.length < totalQuestions && questions.length > 0) {
    console.warn(`Generated only ${questions.length} quiz questions due to limited source material.`);
  } else if (questions.length === 0) {
    console.error("Failed to generate any quiz questions. Check source data (letterWords, letterPhrases).");
  }

  // Final shuffle of all selected questions
  questions.sort(() => 0.5 - Math.random());
  return questions;
}

/** Updates the display for the Global Quiz */
function updateQuizDisplay() {
  const questionElem = document.getElementById('quizQuestion');
  const optionsContainer = document.getElementById('quizOptions');
  const scoreElem = document.getElementById('quizScore');
  const counterElem = document.getElementById('quizCounter');
  const feedbackElem = document.getElementById('quizFeedback');
  const playSoundBtn = document.querySelector('#globalQuizModal button[onclick="playQuizSound()"]');
  const resetBtn = document.querySelector('#globalQuizModal button[onclick="resetQuiz()"]');

  if (!questionElem || !optionsContainer || !scoreElem || !counterElem || !feedbackElem || !playSoundBtn || !resetBtn) {
    console.error("One or more elements missing in Global Quiz modal for display update.");
    return;
  }

  // Clear previous state
  feedbackElem.textContent = '';
  feedbackElem.className = 'quiz-feedback mt-3 small'; // Reset classes

  // Check if quiz is complete
  if (quizQuestions.length === 0 || quizIndex >= quizQuestions.length) {
    questionElem.textContent = t('quizComplete', { score: quizScore });
    questionElem.lang = getCurrentLanguage();
    optionsContainer.innerHTML = ''; // Clear options
    scoreElem.textContent = t('score', { score: quizScore });
    counterElem.textContent = `${quizIndex}/${quizQuestions.length}`;
    correctQuizAnswer = '';
    playSoundBtn.disabled = true;
    resetBtn.disabled = false; // Enable reset at the end
    updateNavigationButtons('quiz', quizIndex, quizQuestions.length);

    // Celebrate quiz completion with confetti!
    if (quizScore > 0) {
      showConfetti();
    }

    return; // End update if quiz is complete
  }

  // Update for the current question
  quizIndex = Math.max(0, Math.min(quizIndex, quizQuestions.length - 1));
  const question = quizQuestions[quizIndex];
  correctQuizAnswer = question.correctAnswer;

  // Display the question text
  questionElem.textContent = question.question;
  questionElem.lang = 'ar';
  // Adjust display size based on content type (optional)
  questionElem.className = `quiz-question-display display-${question.type === 'phrase' ? '6' : '4'} mb-3`;

  // Set ARIA label for screen readers
  const questionPromptKey = `quizQuestion${question.type.charAt(0).toUpperCase() + question.type.slice(1)}`;
  questionElem.setAttribute('aria-label', t(questionPromptKey) + ': ' + question.question);

  // Generate and display options
  const options = generateQuizOptions(question, 4);
  optionsContainer.innerHTML = ''; // Clear previous options

  options.forEach(option => {
    const btn = document.createElement('button');
    // Adjust button size for longer text (phrases)
    let btnClass = 'btn btn-outline-primary m-2 fs-5 p-2 quiz-option'; // Base class
    if (option.length > 15) btnClass += ' btn-sm'; // Smaller button for long text
    btn.className = btnClass;
    btn.textContent = option;
    btn.lang = 'ar';
    btn.onclick = () => checkQuizAnswer(option);
    optionsContainer.appendChild(btn);
  });

  // Update score and counter
  scoreElem.textContent = t('score', { score: quizScore });
  counterElem.textContent = `${quizIndex + 1}/${quizQuestions.length}`;

  // Ensure buttons are enabled for the new question
  optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
  playSoundBtn.disabled = false;
  resetBtn.disabled = false; // Keep reset enabled

  playQuizSound(); // Auto-play sound for the new question
  updateNavigationButtons('quiz', quizIndex, quizQuestions.length);
}


/**
 * Generates options for the current quiz question, including distractors.
 * @param {object} question - The current question object { type, question, correctAnswer }.
 * @param {number} count - The total number of options required (e.g., 4).
 * @returns {string[]} An array of option strings.
 */
function generateQuizOptions(question, count = 4) {
  const correctOption = question.correctAnswer;
  const options = new Set([correctOption]); // Start with the correct answer
  let pool = []; // Pool of potential incorrect options

  // Populate pool based on question type
  if (question.type === 'letter') {
    const possibleHarakat = ['َ', 'ُ', 'ِ'];
    arabicLetters.forEach(l => {
      possibleHarakat.forEach(h => {
        const potentialOption = initialShapes[l]?.[h] || (l + h);
        if (potentialOption && potentialOption !== correctOption) {
          pool.push(potentialOption);
        }
      });
    });
  } else if (question.type === 'word') {
    // Use words from other letters as distractors
    pool = Object.values(letterWords).flat().filter(w => w && w !== correctOption);
  } else { // phrase
    // Use phrases from other letters as distractors
    pool = Object.values(letterPhrases).flat().filter(p => p && p !== correctOption);
  }

  // Remove duplicates from the pool
  pool = [...new Set(pool)];

  // Shuffle the pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Add incorrect options from the pool
  let poolIndex = 0;
  while (options.size < count && poolIndex < pool.length) {
    options.add(pool[poolIndex]);
    poolIndex++;
  }

  // Fallback if pool runs out
  while (options.size < count) {
    if (pool.length > 0) { // Pick random from pool if needed
      options.add(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      options.add(`Option ${options.size + 1}`); // Absolute fallback
    }
  }

  // Convert final Set to array and shuffle
  const finalOptions = Array.from(options);
  for (let i = finalOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
  }

  return finalOptions;
}


/** Plays the sound of the correct answer (question text) for the current quiz question */
function playQuizSound() {
  // Ensure quizIndex is valid before accessing quizQuestions
  if (quizIndex >= 0 && quizIndex < quizQuestions.length) {
    const questionText = quizQuestions[quizIndex]?.question;
    if (questionText) {
      speakTextDebounced(questionText);
    } else {
      console.warn("playQuizSound called but question text is missing for current index.");
    }
  } else {
    console.warn("playQuizSound called but quizIndex is out of bounds or quiz not started.");
  }
}

/**
 * Checks the user's selected quiz answer.
 * @param {string} selectedOption - The answer chosen by the user.
 */
function checkQuizAnswer(selectedOption) {
  const feedback = document.getElementById('quizFeedback');
  const scoreElem = document.getElementById('quizScore');
  const optionsContainer = document.getElementById('quizOptions');
  const playSoundBtn = document.querySelector('#globalQuizModal button[onclick="playQuizSound()"]');

  if (!feedback || !scoreElem || !optionsContainer || !playSoundBtn) {
    console.error("Feedback, score, options container, or play sound button not found in quiz.");
    return;
  }

  const isCorrect = selectedOption === correctQuizAnswer;

  feedback.className = 'quiz-feedback mt-3 small'; // Reset classes
  feedback.textContent = ''; // Clear previous text

  if (isCorrect) {
    quizScore += 10; // Increment score
    feedback.innerHTML = `<span class="text-success fw-bold">${t('correctAnswer')}</span>`;
    feedback.classList.add('correct');
    showConfetti();
    trackProgress('quiz-correct'); // Track correct quiz answer
  } else {
    // Provide correct answer in feedback
    feedback.innerHTML = `<span class="text-danger">${t('incorrectAnswer')}</span> ${t('correctWas', {}, 'Correct was:')} <strong class="text-primary">${correctQuizAnswer}</strong>`;
    feedback.classList.add('incorrect');
  }
  feedback.setAttribute('aria-live', 'polite'); // Announce feedback
  scoreElem.textContent = t('score', { score: quizScore }); // Update score display

  // Disable all option buttons and highlight correct/incorrect
  optionsContainer.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctQuizAnswer) {
      btn.classList.remove('btn-outline-primary', 'btn-danger');
      btn.classList.add('btn-success'); // Highlight correct
    } else if (btn.textContent === selectedOption && !isCorrect) {
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-danger'); // Highlight incorrect selection
    }
  });

  // Disable play sound button after answering
  playSoundBtn.disabled = true;

  // Check if this was the last question
  if (quizIndex === quizQuestions.length - 1) {
    // Delay showing the final message slightly
    setTimeout(() => {
      showTemporaryMessage(t('quizComplete', { score: quizScore }), 'info', 5000);
      const questionElem = document.getElementById('quizQuestion');
      if(questionElem) {
        questionElem.textContent = t('quizComplete', { score: quizScore });
        questionElem.lang = getCurrentLanguage();
      }
      // Ensure nav buttons reflect end state
      updateNavigationButtons('quiz', quizIndex, quizQuestions.length);
      // Ensure reset button is enabled
      const resetBtn = document.querySelector('#globalQuizModal button[onclick="resetQuiz()"]');
      if (resetBtn) resetBtn.disabled = false;
    }, 1000); // 1 second delay
  }
}

/** Navigates to the previous question in the quiz */
function previousQuizQuestion() {
  if (quizIndex > 0) {
    quizIndex--;
    updateQuizDisplay();
  }
}

/** Navigates to the next question in the quiz, or shows completion message */
function nextQuizQuestion() {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    updateQuizDisplay();
  } else {
    // If already on the last question and feedback is shown, re-show completion message
    const feedbackElem = document.getElementById('quizFeedback');
    if (feedbackElem && feedbackElem.textContent) {
      // Update display to show final score message if not already shown
      const questionElem = document.getElementById('quizQuestion');
      if(questionElem && !questionElem.textContent.includes(t('quizComplete', { score: quizScore }).substring(0,10))) { // Avoid duplicate messages
        questionElem.textContent = t('quizComplete', { score: quizScore });
        questionElem.lang = getCurrentLanguage();
        document.getElementById('quizOptions').innerHTML = ''; // Clear options
      }
      showTemporaryMessage(t('quizComplete', { score: quizScore }), 'info', 5000);
      updateNavigationButtons('quiz', quizIndex, quizQuestions.length); // Ensure next is disabled
    }
    // If feedback not shown yet (e.g., user clicks next before answering last question), do nothing extra
  }
}

/** Resets and restarts the global quiz */
function resetQuiz() {
  quizQuestions = generateQuizQuestions(10); // Generate new questions
  if (quizQuestions.length === 0) {
    showTemporaryMessage(t('noQuestions'), 'warning');
    return;
  }
  quizIndex = 0;
  quizScore = 0;
  updateQuizDisplay(); // Update to the first question

  // Focus appropriate element
  const playBtn = document.querySelector('#globalQuizModal button[onclick="playQuizSound()"]');
  if (playBtn && !playBtn.disabled) playBtn.focus();
  else document.querySelector('#quizOptions .btn:not(:disabled)')?.focus();

  // Ensure reset button remains enabled
  const resetBtn = document.querySelector('#globalQuizModal button[onclick="resetQuiz()"]');
  if (resetBtn) resetBtn.disabled = false;
}


// --- Tutorial Function ---

/** Starts the interactive tutorial using Intro.js */
function startTutorial() {
  if (typeof introJs !== 'function') {
    console.error("Intro.js library not found.");
    showTemporaryMessage(t('errorTutorial', {}, "Tutorial feature is unavailable."), "warning");
    return;
  }

  // Define steps, ensuring elements exist and are visible
  const steps = [
    { title: t('tutorial.introTitle', {}, 'Welcome!'), intro: t('tutorial.intro') },
    { element: document.querySelector('.language-switcher'), title: t('tutorial.languageTitle', {}, 'Language'), intro: t('tutorial.language') },
    { element: '#lettersContainer', title: t('tutorial.lettersTitle', {}, 'Letters'), intro: t('tutorial.letters'), position: 'top' },
    // Add step for Harakat modal if possible (might need to open it first)
    // { element: '#harakatModal .modal-body', title: t('tutorial.harakatTitle', {}, 'Harakat'), intro: t('tutorial.harakat') }, // Example, needs refinement
    { element: document.querySelector('button[onclick="showGlobalQuiz()"]'), title: t('tutorial.activitiesTitle', {}, 'Activities & Quiz'), intro: t('tutorial.games') + "<br/><br/>" + t('tutorial.quiz') }
  ];

  // Filter out steps where the element is not found or not visible
  const validSteps = steps.filter(step => {
    if (!step.element) return true; // Intro-only step
    const elem = typeof step.element === 'string' ? document.querySelector(step.element) : step.element;
    // Check if element exists and has dimensions (is visible)
    return elem && (elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0);
  });

  if (validSteps.length < steps.length) {
    console.warn("Some tutorial steps were skipped because their elements were not found or visible.");
    if (validSteps.length === 0) {
      showTemporaryMessage("Could not start tutorial: No valid steps found.", "warning");
      return;
    }
  }

  // Configure and start Intro.js
  try {
    introJs().setOptions({
      steps: validSteps,
      nextLabel: t('next', {}, 'Next &rarr;'),
      prevLabel: t('prev', {}, '&larr; Previous'),
      doneLabel: t('done', {}, 'Done'),
      showProgress: true,
      showBullets: false,
      exitOnOverlayClick: false, // Prevent accidental closing
      tooltipClass: 'custom-introjs-tooltip' // Use custom class from CSS
    }).start();
  } catch (error) {
    console.error("Failed to start Intro.js tutorial:", error);
    showTemporaryMessage("Error starting tutorial.", "danger");
  }
}


// --- Initialization ---

/** Main initialization function, runs on DOMContentLoaded or immediately if already loaded */
function initializeApp() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitialSetup);
  } else {
    runInitialSetup(); // DOM already loaded
  }
}

/** Code to run after DOM is loaded */
function runInitialSetup() {
  console.log("DOM fully loaded. Running initial setup...");

  // Check for essential elements required for core functionality
  const essentialElements = { lettersContainer, selectedLetterElement, progressBar, toggleSpeechBtn, audio };
  const missingElements = Object.entries(essentialElements)
    .filter(([_, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error(`Critical Error: Essential DOM elements missing: ${missingElements.join(', ')}. Aborting setup.`);
    // Display a user-friendly error message instead of replacing the whole body
    const errorDiv = document.createElement('div');
    errorDiv.className = "alert alert-danger m-5";
    errorDiv.setAttribute('role', 'alert');
    errorDiv.innerHTML = `<strong>Critical Error:</strong> Application UI components failed to load. Please reload the page or contact support. Missing: ${missingElements.join(', ')}`;
    document.body.prepend(errorDiv); // Add error message at the top
    return; // Stop further execution
  }

  // Set initial language based on localStorage or browser preference
  const initialLang = localStorage.getItem('language') || (navigator.language.startsWith('ar') ? 'ar' : 'en');
  switchLanguage(initialLang); // Apply language settings

  // Load progress from localStorage
  const savedProgress = localStorage.getItem('progress');
  if (savedProgress) {
    try {
      const parsedProgress = JSON.parse(savedProgress);
      // Validate the loaded data structure (should be an array of [key, value] pairs)
      if (Array.isArray(parsedProgress) && parsedProgress.every(item => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string')) {
        progressMap = new Map(parsedProgress);
        console.log(`Loaded ${progressMap.size} progress items.`);
      } else {
        console.warn("Invalid progress data found in localStorage. Resetting progress.");
        localStorage.removeItem('progress'); // Remove invalid data
      }
    } catch (e) {
      console.error("Failed to parse progress from localStorage:", e);
      localStorage.removeItem('progress'); // Remove corrupted data
    }
    updateProgress(); // Update progress bar based on loaded data
  }

  // Set initial state of the speech toggle button
  updateToggleSpeechButton();

  // Add global error handler for the audio element
  audio.addEventListener('error', (e) => {
    console.error('Audio Element Error Event:', e);
    // Check if there's a valid source and the error is not just an abort
    if (audio.src && audio.src !== window.location.href && audio.error && audio.error.code !== MediaError.MEDIA_ERR_ABORTED) {
      let errorMsg = t('errorAudio');
      // Provide more specific error details if available
      if (audio.error) {
        switch (audio.error.code) {
          case MediaError.MEDIA_ERR_NETWORK: errorMsg += ' (Network Error)'; break;
          case MediaError.MEDIA_ERR_DECODE: errorMsg += ' (Decode Error)'; break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: errorMsg += ' (Source Not Supported)'; break;
          default: errorMsg += ` (Code ${audio.error.code})`; break;
        }
      }
      // Avoid showing redundant messages if playAudio already handled it (e.g., NotAllowedError)
      // Show message for network, decode, or unsupported source errors.
      showTemporaryMessage(errorMsg, 'warning');
    }
  });

  // Check if tutorial button exists
  const tutorialButton = document.querySelector('button[onclick="startTutorial()"]');
  if (!tutorialButton) {
    console.warn("Tutorial button not found. Tutorial feature might be inaccessible.");
  }

  console.log("Application initialized successfully.");
}

// Start the application initialization process
initializeApp();

// --- End of Script ---
