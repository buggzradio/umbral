// Load saved theme
const bg = localStorage.getItem('bgColor');
const text = localStorage.getItem('textColor');
const accent = localStorage.getItem('accentColor');
const card = localStorage.getItem('cardBg');

if(bg) document.documentElement.style.setProperty('--bg-color', bg);
if(text) document.documentElement.style.setProperty('--text-color', text);
if(accent) document.documentElement.style.setProperty('--accent-color', accent);
if(card) document.documentElement.style.setProperty('--card-bg', card);

// Handle settings form
const form = document.getElementById('settings-form');
if(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bgColor = document.getElementById('bgColor').value;
    const textColor = document.getElementById('textColor').value;
    const accentColor = document.getElementById('accentColor').value;
    const cardBg = document.getElementById('cardBg').value;

    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('cardBg', cardBg);

    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--card-bg', cardBg);
  });
}
