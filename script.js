const englishInput = document.getElementById('english');
const japaneseInput = document.getElementById('japanese');
const koreanInput = document.getElementById('korean');
const outputTextarea = document.getElementById('output');

// Define the list of countries
const countriesList = [
    "en-US",
    "ar",
    "da-DK",
    "de-DE",
    "es-ES",
    "fi-FI",
    "fr-FR",
    "hi-IN",
    "hu-HU",
    "id",
    "it-IT",
    "iw-IL",
    "ja-JP",
    "ko-KR",
    "ms-MY",
    "ne-NP",
    "nl-NL",
    "no-NO",
    "pt-PT",
    "ro",
    "ru-RU",
    "sr",
    "sv-SE",
    "th",
    "tr-TR",
    "vi",
    "zh-CN"
];

function formatText() {
    const englishText = englishInput.value;
    const japaneseText = japaneseInput.value;
    const koreanText = koreanInput.value;

    let formattedText = '';

    countriesList.forEach(country => {
        let source = englishText; // Default to English text

        if (country === "ja-JP") {
            source = japaneseText;
        } else if (country === "ko-KR") {
            source = koreanText;
        }

        formattedText += `<${country}>\r\n${source}\r\n</${country}>\r\n`;
    });

    outputTextarea.value = formattedText;
}

function copyToClipboard() {
    const textToCopy = outputTextarea.value;
    navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Text copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
}

async function saveToFile() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const fileName = `Release note ${year}-${month}-${day}.txt`;

    try {
        // Create a Blob from the output text
        const blob = new Blob([outputTextarea.value], { type: 'text/plain' });

        // Create an anchor element to trigger download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName.split('/').pop();
        document.body.appendChild(a);

        // Programmatically click the anchor element to start the download
        a.click();

        // Remove the anchor element from the DOM
        document.body.removeChild(a);

        // Revoke the object URL to free up memory
        URL.revokeObjectURL(a.href);
    } catch (err) {
        console.error('Error saving file: ', err);
    }
}

// Function to save input values to local storage
function saveInputValues() {
    localStorage.setItem('english', englishInput.value);
    localStorage.setItem('japanese', japaneseInput.value);
    localStorage.setItem('korean', koreanInput.value);
}

// Function to load input values from local storage
function loadInputValues() {
    const savedEnglish = localStorage.getItem('english');
    const savedJapanese = localStorage.getItem('japanese');
    const savedKorean = localStorage.getItem('korean');

    if (savedEnglish) englishInput.value = savedEnglish;
    if (savedJapanese) japaneseInput.value = savedJapanese;
    if (savedKorean) koreanInput.value = savedKorean;

    // Reformat text after loading values
    formatText();
}

// Add event listeners for real-time updates
englishInput.addEventListener('input', formatText);
japaneseInput.addEventListener('input', formatText);
koreanInput.addEventListener('input', formatText);

// Save input values before the window is closed or hidden
window.addEventListener('beforeunload', saveInputValues);

// Load saved input values when the page loads
document.addEventListener('DOMContentLoaded', loadInputValues);

// Initial formatting on page load
formatText();
