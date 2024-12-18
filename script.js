// Customizable settings
const config = {
    serverName: "Your Server Name",
    serverDescription: "Welcome to our FiveM server!",
    discordLink: "https://discord.gg/yourserver",
    websiteLink: "https://yourwebsite.com",
    backgroundImage: "background.jpg",
    rules: [
        "Be respectful to all players",
        "No cheating or exploiting",
        "Follow RP guidelines",
        "Have fun!"
    ]
};

console.log('Script loaded and running!');

// Initialize the loading screen
function initializeLoadingScreen() {
    // Set server information
    document.getElementById('preview-server-name').textContent = config.serverName;
    document.getElementById('preview-server-description').textContent = config.serverDescription;
    
    // Set social links
    document.getElementById('preview-discord-link').href = config.discordLink;
    document.getElementById('preview-website-link').href = config.websiteLink;
    
    // Initialize input fields
    document.getElementById('serverName').value = config.serverName;
    document.getElementById('serverDescription').value = config.serverDescription;
    document.getElementById('discordLink').value = config.discordLink;
    document.getElementById('websiteLink').value = config.websiteLink;
    
    // Set rules
    const rulesList = document.getElementById('preview-rules-list');
    rulesList.innerHTML = '';
    config.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
    
    // Start progress simulation
    updateLoadingProgress();
}

// Simulate loading progress
let loadingProgress = 0;
const progressBar = document.querySelector('.loading-bar');
const progressText = document.getElementById('loading-progress');

function updateLoadingProgress() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 10;
        if (loadingProgress > 100) loadingProgress = 100;
        
        progressBar.style.width = `${loadingProgress}%`;
        progressText.textContent = `${Math.round(loadingProgress)}%`;
        setTimeout(updateLoadingProgress, Math.random() * 50 + 50);
    }
}

// Listen for FiveM loading events
window.addEventListener('message', function(e) {
    if (e.data.eventName === 'loadProgress') {
        loadingProgress = Math.round(e.data.loadFraction * 100);
        progressBar.style.width = `${loadingProgress}%`;
        progressText.textContent = `${loadingProgress}%`;
    }
});

// DOM Elements
const form = document.getElementById('customization-form');
const addRuleBtn = document.getElementById('add-rule');
const rulesContainer = document.getElementById('rules-container');
const downloadBtn = document.getElementById('download');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Preview Elements
const previewServerName = document.getElementById('preview-server-name');
const previewServerDescription = document.getElementById('preview-server-description');
const previewRulesList = document.getElementById('preview-rules-list');
const previewDiscordLink = document.getElementById('preview-discord-link');
const previewWebsiteLink = document.getElementById('preview-website-link');
const loadingPreview = document.querySelector('.loading-preview');
const loadingBar = document.querySelector('.loading-bar');
const tipsContainer = document.getElementById('tips-container');
const currentTip = document.getElementById('current-tip');

// Audio Element
let backgroundMusic = null;

// Tab Switching
function setupTabs() {
    const basic = document.getElementById('basic-tab');
    const style = document.getElementById('style-tab');
    const animation = document.getElementById('animation-tab');
    const media = document.getElementById('media-tab');

    // Hide all tabs except basic initially
    style.style.display = 'none';
    animation.style.display = 'none';
    media.style.display = 'none';
    basic.style.display = 'block';

    // Get all tab buttons
    const basicBtn = document.querySelector('[data-tab="basic"]');
    const styleBtn = document.querySelector('[data-tab="style"]');
    const animationBtn = document.querySelector('[data-tab="animation"]');
    const mediaBtn = document.querySelector('[data-tab="media"]');

    // Basic tab click
    basicBtn.onclick = function() {
        basic.style.display = 'block';
        style.style.display = 'none';
        animation.style.display = 'none';
        media.style.display = 'none';
        
        basicBtn.classList.add('active');
        styleBtn.classList.remove('active');
        animationBtn.classList.remove('active');
        mediaBtn.classList.remove('active');
    };

    // Style tab click
    styleBtn.onclick = function() {
        basic.style.display = 'none';
        style.style.display = 'block';
        animation.style.display = 'none';
        media.style.display = 'none';
        
        basicBtn.classList.remove('active');
        styleBtn.classList.add('active');
        animationBtn.classList.remove('active');
        mediaBtn.classList.remove('active');
    };

    // Animation tab click
    animationBtn.onclick = function() {
        basic.style.display = 'none';
        style.style.display = 'none';
        animation.style.display = 'block';
        media.style.display = 'none';
        
        basicBtn.classList.remove('active');
        styleBtn.classList.remove('active');
        animationBtn.classList.add('active');
        mediaBtn.classList.remove('active');
    };

    // Media tab click
    mediaBtn.onclick = function() {
        basic.style.display = 'none';
        style.style.display = 'none';
        animation.style.display = 'none';
        media.style.display = 'block';
        
        basicBtn.classList.remove('active');
        styleBtn.classList.remove('active');
        animationBtn.classList.remove('active');
        mediaBtn.classList.add('active');
    };
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Test if we can find our elements
    const backgroundInput = document.getElementById('backgroundImage');
    const previewContainer = document.querySelector('.loading-preview');
    
    console.log('Background input:', backgroundInput);
    console.log('Preview container:', previewContainer);
    
    if (backgroundInput) {
        console.log('Adding change listener to background input');
        backgroundInput.addEventListener('change', function(e) {
            console.log('Background image change detected');
            const file = e.target.files[0];
            
            if (file) {
                console.log('File selected:', file.name);
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    console.log('File read complete');
                    const previewContainer = document.querySelector('.loading-preview');
                    previewContainer.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${event.target.result}')`;
                    previewContainer.style.backgroundSize = 'cover';
                    previewContainer.style.backgroundPosition = 'center';
                    previewContainer.style.backgroundRepeat = 'no-repeat';
                };
                
                reader.onerror = function() {
                    console.error('Error reading file:', reader.error);
                };
                
                console.log('Starting file read...');
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error('Could not find background image input!');
    }
    
    setupTabs();
    initializeLoadingScreen();
});

// Basic Settings
document.getElementById('serverName').addEventListener('input', (e) => {
    previewServerName.textContent = e.target.value;
});

document.getElementById('serverDescription').addEventListener('input', (e) => {
    previewServerDescription.textContent = e.target.value;
});

document.getElementById('discordLink').addEventListener('input', (e) => {
    previewDiscordLink.href = e.target.value;
});

document.getElementById('websiteLink').addEventListener('input', (e) => {
    document.getElementById('preview-website-link').href = e.target.value;
});

// Style Settings
document.getElementById('font-family').addEventListener('change', (e) => {
    loadingPreview.style.fontFamily = e.target.value;
});

document.getElementById('backgroundColor').addEventListener('input', (e) => {
    loadingPreview.style.backgroundColor = e.target.value;
});

document.getElementById('textColor').addEventListener('input', (e) => {
    loadingPreview.style.color = e.target.value;
});

document.getElementById('accentColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent-color', e.target.value);
});

document.getElementById('overlay-opacity').addEventListener('input', (e) => {
    loadingPreview.style.backgroundColor = `rgba(0, 0, 0, ${e.target.value})`;
});

document.getElementById('blur-intensity').addEventListener('input', (e) => {
    if (loadingPreview.style.backgroundImage) {
        loadingPreview.style.backdropFilter = `blur(${e.target.value}px)`;
    }
});

// Animation Settings
document.getElementById('loading-animation').addEventListener('change', (e) => {
    loadingBar.className = 'loading-bar';
    if (e.target.value !== 'default') {
        loadingBar.classList.add(e.target.value);
    }
});

document.getElementById('text-animation').addEventListener('change', (e) => {
    const elements = [previewServerName, previewServerDescription];
    elements.forEach(el => {
        el.className = '';
        if (e.target.value !== 'none') {
            el.classList.add(e.target.value);
        }
    });
});

document.getElementById('background-animation').addEventListener('change', (e) => {
    loadingPreview.className = 'loading-preview';
    if (e.target.value !== 'none') {
        loadingPreview.classList.add(e.target.value);
    }
});

// Tips System
let tips = [
    "Press T to open chat",
    "Join our Discord for the latest updates",
    "Report any bugs on our website",
    "Be respectful to other players",
    "Need help? Ask in chat!"
];

document.getElementById('enable-tips').addEventListener('change', (e) => {
    tipsContainer.style.display = e.target.checked ? 'block' : 'none';
    if (e.target.checked) {
        startTipsRotation();
    }
});

document.getElementById('custom-tips').addEventListener('input', (e) => {
    tips = e.target.value.split('\n').filter(tip => tip.trim());
    if (document.getElementById('enable-tips').checked) {
        showRandomTip();
    }
});

function showRandomTip() {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    currentTip.textContent = tip;
}

function startTipsRotation() {
    showRandomTip();
    setInterval(showRandomTip, 5000);
}

// Media Handling
document.getElementById('backgroundImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const previewContainer = document.querySelector('.loading-preview');
            previewContainer.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${event.target.result}')`;
            previewContainer.style.backgroundSize = 'cover';
            previewContainer.style.backgroundPosition = 'center';
            previewContainer.style.backgroundRepeat = 'no-repeat';
        };
        
        reader.readAsDataURL(file);
    }
});

document.getElementById('logo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const logoElement = document.getElementById('preview-logo');
            logoElement.style.backgroundImage = `url('${event.target.result}')`;
            logoElement.style.backgroundSize = 'contain';
            logoElement.style.backgroundPosition = 'center';
            logoElement.style.backgroundRepeat = 'no-repeat';
            logoElement.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
});

const logoInput = document.getElementById('logo');
const previewLogo = document.getElementById('preview-logo');

// Background Music
document.getElementById('background-music').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (backgroundMusic) {
                backgroundMusic.pause();
            }
            backgroundMusic = new Audio(e.target.result);
            backgroundMusic.loop = true;
            if (document.getElementById('enable-music').checked) {
                backgroundMusic.play();
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('enable-music').addEventListener('change', function(e) {
    if (backgroundMusic) {
        if (e.target.checked) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
});

document.getElementById('music-volume').addEventListener('input', function(e) {
    if (backgroundMusic) {
        backgroundMusic.volume = e.target.value;
    }
});

// Video Background
document.getElementById('background-video').addEventListener('change', function(e) {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const previewContainer = document.querySelector('.loading-preview');
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        z-index: 1000;
    `;
    loadingIndicator.textContent = 'Loading video...';
    previewContainer.appendChild(loadingIndicator);
    
    // Create and add video element first
    const video = document.createElement('video');
    video.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    `;
    
    // Add dark overlay
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, ${document.getElementById('overlay-opacity').value}), 
                                 rgba(0, 0, 0, ${document.getElementById('overlay-opacity').value}));
        z-index: 1;
    `;
    
    // Clear existing video and overlay
    const existingVideo = previewContainer.querySelector('video');
    const existingOverlay = previewContainer.querySelector('.video-overlay');
    
    if (existingVideo) {
        existingVideo.pause();
        existingVideo.removeAttribute('src');
        existingVideo.load();
        existingVideo.remove();
    }
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Make sure preview container is properly set up
    previewContainer.style.position = 'relative';
    previewContainer.style.overflow = 'hidden';
    
    // Add elements to container
    previewContainer.insertBefore(video, previewContainer.firstChild);
    previewContainer.insertBefore(overlay, video.nextSibling);
    
    // Set up video properties
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;
    
    // Create object URL and set up video
    const videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;
    
    // Add event listeners
    video.addEventListener('loadstart', () => console.log('Video loading started'));
    video.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded, attempting to play...');
        video.play().then(() => {
            console.log('Video playing successfully');
            loadingIndicator.remove();
        }).catch(error => {
            console.error("Video play failed:", error);
            loadingIndicator.textContent = 'Error playing video';
            setTimeout(() => loadingIndicator.remove(), 2000);
        });
    });
    
    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        loadingIndicator.textContent = 'Error loading video';
        setTimeout(() => loadingIndicator.remove(), 2000);
    });
    
    // Clean up object URL when done
    video.addEventListener('loadeddata', () => {
        URL.revokeObjectURL(videoUrl);
    });
    
    // Load the video
    video.load();
});

document.getElementById('enable-video-background').addEventListener('change', function(e) {
    const videoInput = document.getElementById('background-video');
    videoInput.disabled = !e.target.checked;
    
    if (!e.target.checked) {
        // Remove video if disabled
        const previewContainer = document.querySelector('.loading-preview');
        const existingVideo = previewContainer.querySelector('video');
        const existingOverlay = previewContainer.querySelector('.video-overlay');
        
        if (existingVideo) {
            existingVideo.pause();
            existingVideo.removeAttribute('src');
            existingVideo.load();
            existingVideo.remove();
        }
        
        if (existingOverlay) {
            existingOverlay.remove();
        }
    }
});

// Update video background in preview when overlay opacity changes
document.getElementById('overlay-opacity').addEventListener('input', function(e) {
    const overlay = document.querySelector('.video-overlay');
    if (overlay) {
        overlay.style.background = `linear-gradient(rgba(0, 0, 0, ${e.target.value}), 
                                                  rgba(0, 0, 0, ${e.target.value}))`;
    }
});

// Rules Management
addRuleBtn.addEventListener('click', () => {
    const ruleInput = document.createElement('div');
    ruleInput.className = 'rule-input';
    ruleInput.innerHTML = `
        <input type="text" class="rule" placeholder="Enter rule">
        <button type="button" class="remove-rule">×</button>
    `;
    rulesContainer.appendChild(ruleInput);
    updatePreviewRules();
});

rulesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-rule')) {
        e.target.parentElement.remove();
        updatePreviewRules();
    }
});

function updatePreviewRules() {
    previewRulesList.innerHTML = '';
    document.querySelectorAll('.rule').forEach(ruleInput => {
        if (ruleInput.value.trim()) {
            const li = document.createElement('li');
            li.textContent = ruleInput.value;
            previewRulesList.appendChild(li);
        }
    });
}

rulesContainer.addEventListener('input', updatePreviewRules);

// Download Functionality
downloadBtn.addEventListener('click', () => {
    const zip = new JSZip();
    
    // Generate files
    zip.file('index.html', generateHTML());
    zip.file('styles.css', generateCSS());
    zip.file('script.js', generateJS());
    zip.file('README.md', generateReadme());
    zip.file('fxmanifest.lua', generateFXManifest());
    zip.file('client.lua', generateClientLua());
    zip.file('html/index.html', generateLoadingScreenHTML());
    zip.file('html/styles.css', generateLoadingScreenCSS());
    zip.file('html/script.js', generateLoadingScreenJS());
    
    // Add media files
    const promises = [];

    // Background image
    const backgroundInput = document.getElementById('backgroundImage');
    if (backgroundInput.files[0]) {
        promises.push(
            new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    zip.file('html/background.jpg', e.target.result.split(',')[1], {base64: true});
                    resolve();
                };
                reader.readAsDataURL(backgroundInput.files[0]);
            })
        );
    }

    // Logo
    const logoInput = document.getElementById('logo');
    if (logoInput.files[0]) {
        promises.push(
            new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    zip.file('html/logo.png', e.target.result.split(',')[1], {base64: true});
                    resolve();
                };
                reader.readAsDataURL(logoInput.files[0]);
            })
        );
    }

    // Background music
    const musicInput = document.getElementById('background-music');
    if (musicInput.files[0]) {
        promises.push(
            new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    zip.file('html/background-music.mp3', e.target.result.split(',')[1], {base64: true});
                    resolve();
                };
                reader.readAsDataURL(musicInput.files[0]);
            })
        );
    }

    // Background video
    const videoInput = document.getElementById('background-video');
    if (videoInput.files[0] && !videoInput.disabled) {
        promises.push(
            new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    zip.file('html/background-video.mp4', e.target.result.split(',')[1], {base64: true});
                    resolve();
                };
                reader.readAsDataURL(videoInput.files[0]);
            })
        );
    }

    // Generate and download zip
    Promise.all(promises).then(() => {
        zip.generateAsync({type: 'blob'}).then(content => {
            const url = window.URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'fivem-loading-screen.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    });
});

// Generate HTML file
function generateHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FiveM Loading Screen</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="loading-container">
        <div class="server-info">
            <h1 id="server-name">${document.getElementById('serverName').value}</h1>
            <p id="server-description">${document.getElementById('serverDescription').value}</p>
        </div>
        
        <div class="loading-bar-container">
            <div class="loading-bar"></div>
            <div id="loading-text">Loading...</div>
            <div id="loading-progress">0%</div>
        </div>

        <div class="server-rules">
            <h2>Server Rules</h2>
            <ul id="rules-list">
                ${Array.from(document.querySelectorAll('.rule'))
                    .map(rule => `<li>${rule.value}</li>`)
                    .join('\n                ')}
            </ul>
        </div>

        <div class="social-links">
            <a href="${document.getElementById('discordLink').value}" id="discord-link">Discord</a>
            <a href="${document.getElementById('websiteLink').value}" id="website-link">Website</a>
        </div>
    </div>
    <div id="background"></div>
    <script src="script.js"></script>
</body>
</html>`;
}

// Generate CSS file
function generateCSS() {
    const backgroundColor = document.getElementById('backgroundColor').value;
    const textColor = document.getElementById('textColor').value;
    
    return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    background-color: ${backgroundColor};
    color: ${textColor};
    overflow: hidden;
}

#background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(3px);
    z-index: -1;
}

.loading-container {
    position: relative;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    z-index: 1;
}

.server-info {
    text-align: center;
    margin-bottom: 40px;
}

#server-name {
    font-size: 3em;
    margin-bottom: 10px;
    color: ${textColor};
    text-shadow: 0 0 10px rgba(0, 150, 255, 0.8);
}

#server-description {
    font-size: 1.2em;
    color: ${textColor};
}

.loading-bar-container {
    margin: 30px 0;
    text-align: center;
}

.loading-bar {
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.loading-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { left: -50%; }
    100% { left: 150%; }
}

#loading-text, #loading-progress {
    margin-top: 10px;
    font-size: 1.1em;
    color: ${textColor};
}

.server-rules {
    margin: 30px 0;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

.server-rules h2 {
    margin-bottom: 15px;
    color: ${textColor};
}

#rules-list {
    list-style-position: inside;
    color: ${textColor};
}

#rules-list li {
    margin: 10px 0;
}

.social-links {
    text-align: center;
    margin-top: 30px;
}

.social-links a {
    display: inline-block;
    padding: 10px 20px;
    margin: 0 10px;
    color: ${textColor};
    text-decoration: none;
    background-color: rgba(0, 150, 255, 0.3);
    border-radius: 5px;
    transition: background-color 0.3s;
}

.social-links a:hover {
    background-color: rgba(0, 150, 255, 0.5);
}`;
}

// Generate JS file
function generateJS() {
    return `// Initialize loading screen
let loadingProgress = 0;
const progressBar = document.querySelector('.loading-bar');
const progressText = document.getElementById('loading-progress');

function updateLoadingProgress() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 10;
        if (loadingProgress > 100) loadingProgress = 100;
        
        progressBar.style.width = \`\${loadingProgress}%\`;
        progressText.textContent = \`\${Math.round(loadingProgress)}%\`;
        
        setTimeout(updateLoadingProgress, Math.random() * 50 + 50);
    }
}

// Listen for FiveM loading events
window.addEventListener('message', function(e) {
    if (e.data.eventName === 'loadProgress') {
        loadingProgress = Math.round(e.data.loadFraction * 100);
        progressBar.style.width = \`\${loadingProgress}%\`;
        progressText.textContent = \`\${loadingProgress}%\`;
    }
});

// Initialize when the page loads
window.onload = function() {
    updateLoadingProgress();
};`;
}

// Generate README file
function generateReadme() {
    return `# FiveM Loading Screen

## Installation

1. Copy all files to your FiveM server's resource directory
2. Add the following to your server.cfg:
\`\`\`
ensure loading-screen
\`\`\`

## Customization

You can customize this loading screen by editing:
- \`index.html\` - Main structure
- \`styles.css\` - Visual styling
- \`script.js\` - Loading behavior
- Replace \`background.jpg\` with your own background image

## Support

For support or questions, visit our Discord server: https://discord.gg/TgJZ3QUazE`;
}

// Generate FXManifest file
function generateFXManifest() {
    return `fx_version 'cerulean'
game 'gta5'

description 'Custom Loading Screen'
version '1.0.0'

loadscreen 'html/index.html'

files {
    'html/index.html',
    'html/styles.css',
    'html/script.js',
    'html/background-music.mp3',
    'html/background-video.mp4',
    'html/background.jpg'
}

loadscreen_manual_shutdown 'yes'

client_script 'client.lua'`;
}

// Generate Client Lua file
function generateClientLua() {
    return `AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SendNuiMessage(json.encode({
            action = 'showLoadingScreen'
        }))
    end
end)

-- Hide loading screen when player spawns
AddEventHandler('playerSpawned', function()
    SendNuiMessage(json.encode({
        action = 'hideLoadingScreen'
    }))
end)`;
}

// Generate Loading Screen HTML file
function generateLoadingScreenHTML() {
    const preview = document.querySelector('.loading-preview').cloneNode(true);
    
    // Clean up preview-specific elements
    preview.classList.remove('loading-preview');
    preview.classList.add('loading-screen');
    
    // Get video if present
    const laggis = document.getElementById('background-video').files[0];
    let videoElement = '';
    if (laggis) {
        videoElement = `
            <video autoplay loop muted style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;">
                <source src="background-video.mp4" type="video/mp4">
            </video>
            <div class="volume-slider" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10;">
                <label for="volume-control" style="color: white; font-family: 'Poppins', sans-serif; margin-right: 10px;">Volume</label>
                <input id="volume-control" type="range" min="0" max="1" step="0.01" value="0.5">
            </div>`;
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Loading Screen</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600&family=Play:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="loading-screen">
        ${videoElement}
        <div class="overlay"></div>
        ${preview.innerHTML}
    </div>
</body>
</html>`;
}

// Generate Loading Screen CSS file
function generateLoadingScreenCSS() {
    return `body {
    margin: 0;
    padding: 0;
    font-family: ${document.getElementById('font-family').value};
    background-color: ${document.getElementById('backgroundColor').value};
    color: ${document.getElementById('textColor').value};
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.loading-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, ${document.getElementById('overlay-opacity').value}), 
                              rgba(0, 0, 0, ${document.getElementById('overlay-opacity').value}));
    backdrop-filter: blur(${document.getElementById('blur-intensity').value}px);
    z-index: -1;
}

#preview-logo {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.server-info {
    text-align: center;
    margin-bottom: 30px;
}

.server-info h1 {
    font-size: 3em;
    margin: 0;
    color: ${document.getElementById('textColor').value};
}

.server-info p {
    font-size: 1.2em;
    margin: 10px 0;
    opacity: 0.8;
}

.loading-bar-container {
    width: 80%;
    max-width: 600px;
    margin: 20px 0;
}

.loading-bar {
    height: 4px;
    width: 0%;
    background-color: ${document.getElementById('accentColor').value};
    transition: width 0.3s ease;
}

#loading-text, #loading-progress {
    text-align: center;
    margin: 10px 0;
    font-size: 1.1em;
}

.server-rules {
    margin: 20px 0;
    text-align: center;
}

.server-rules h2 {
    color: ${document.getElementById('accentColor').value};
    margin-bottom: 10px;
}

.server-rules ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.server-rules li {
    margin: 5px 0;
    opacity: 0.8;
}

.social-links {
    position: absolute;
    bottom: 20px;
    display: flex;
    gap: 20px;
}

.social-links a {
    color: ${document.getElementById('textColor').value};
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid ${document.getElementById('accentColor').value};
    border-radius: 5px;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background-color: ${document.getElementById('accentColor').value};
    color: ${document.getElementById('backgroundColor').value};
}`;
}

// Generate Loading Screen JS file
function generateLoadingScreenJS() {
    return `// Loading progress simulation
let loadingProgress = 0;
const progressBar = document.querySelector('.loading-bar');
const progressText = document.getElementById('loading-progress');

function updateLoadingProgress() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 10;
        if (loadingProgress > 100) loadingProgress = 100;
        
        progressBar.style.width = \`\${loadingProgress}%\`;
        progressText.textContent = \`\${Math.round(loadingProgress)}%\`;
        
        setTimeout(updateLoadingProgress, Math.random() * 50 + 50);
    }
}

// Start loading animation
window.addEventListener('load', function() {
    updateLoadingProgress();
});

// Listen for NUI messages from FiveM
window.addEventListener('message', function(e) {
    if (e.data.eventName === 'loadProgress') {
        loadingProgress = Math.round(e.data.loadFraction * 100);
        progressBar.style.width = \`\${loadingProgress}%\`;
        progressText.textContent = \`\${loadingProgress}%\`;
    }
});

// Handle FiveM events
window.addEventListener('message', function(event) {
    const data = event.data;

    if (data.action === 'showLoadingScreen') {
        document.querySelector('.loading-screen').style.display = 'block';
    } else if (data.action === 'hideLoadingScreen') {
        document.querySelector('.loading-screen').style.display = 'none';
    }
});

const laggis = document.getElementById('background-music');

// Set the default volume for the videos if elements exist
if (laggis) {
    laggis.volume = volumeControl.value;
    overlayVideo.volume = volumeControl.value;

    // Update volume when the slider changes
    volumeControl.addEventListener('input', function () {
        laggis.volume = this.value;
        overlayVideo.volume = this.value;
    });
}`;
}

// Live preview handlers for text inputs
document.getElementById('serverName').addEventListener('input', function(e) {
    document.getElementById('preview-server-name').textContent = e.target.value;
});

document.getElementById('serverDescription').addEventListener('input', function(e) {
    document.getElementById('preview-server-description').textContent = e.target.value;
});

document.getElementById('discordLink').addEventListener('input', function(e) {
    document.getElementById('preview-discord-link').href = e.target.value;
});

document.getElementById('websiteLink').addEventListener('input', (e) => {
    document.getElementById('preview-website-link').href = e.target.value;
});
