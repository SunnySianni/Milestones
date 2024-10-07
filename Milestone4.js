// Video data
const videos = [
    {
        id: 'default',
        title: 'Big Buck Bunny',
        description: 'This is a sample video of the animated short film "Big Buck Bunny". It\'s often used as a demo video due to its open-source nature and high quality.',
        thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        type: 'video'
    },
    {
        id: '1',
        title: 'Suggested Video 1',
        description: 'YouTube Video • Click to watch',
        thumbnailUrl: 'https://img.youtube.com/vi/6stlCkUDG_s/0.jpg',
        videoUrl: 'https://www.youtube.com/embed/6stlCkUDG_s',
        type: 'youtube'
    },
    {
        id: '2',
        title: 'Suggested Video 2',
        description: 'YouTube Video • Click to watch',
        thumbnailUrl: 'https://img.youtube.com/vi/pBOfoKBPRcs/0.jpg',
        videoUrl: 'https://www.youtube.com/embed/pBOfoKBPRcs',
        type: 'youtube'
    },
    {
        id: '3',
        title: 'Suggested Video 3',
        description: 'YouTube Video • Click to watch',
        thumbnailUrl: 'https://img.youtube.com/vi/SEVZjwX63G4/0.jpg',
        videoUrl: 'https://www.youtube.com/embed/SEVZjwX63G4',
        type: 'youtube'
    }
];

// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const videoContainer = document.querySelector('.video-container');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const videoList = document.getElementById('video-list');

// State
let currentVideo = videos[0];
let userPreference = null;

// Initialize the application
function init() {
    loadUserPreference();
    loadVideo(currentVideo);
    renderSuggestedVideos();
    loadVideoProgress();
}

// Load user preference from local storage
function loadUserPreference() {
    const savedPreference = localStorage.getItem('userPreference');
    if (savedPreference) {
        userPreference = JSON.parse(savedPreference);
        setTheme(userPreference.theme);
    } else {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
}

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (userPreference) {
        userPreference.theme = theme;
        localStorage.setItem('userPreference', JSON.stringify(userPreference));
    }
}

// Toggle theme
function toggleTheme() {
    if (userPreference) {
        setTheme(userPreference.theme === 'dark' ? 'light' : 'dark');
    } else {
        showPreferenceForm();
    }
}

// Load video
function loadVideo(video) {
    currentVideo = video;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;

    // Clear the video container
    videoContainer.innerHTML = '';

    if (video.type === 'video') {
        // For direct video files
        const videoElement = document.createElement('video');
        videoElement.src = video.videoUrl;
        videoElement.controls = true;
        videoElement.className = 'w-full h-full';
        videoElement.id = 'main-video';
        videoContainer.appendChild(videoElement);

        // Add event listener for saving progress
        videoElement.addEventListener('timeupdate', () => {
            saveVideoProgress(videoElement.currentTime);
        });

        // Load saved progress
        const savedProgress = localStorage.getItem(`videoProgress_${video.id}`);
        if (savedProgress) {
            videoElement.currentTime = parseFloat(savedProgress);
        }
    } else if (video.type === 'youtube') {
        // For YouTube embeds
        const iframeElement = document.createElement('iframe');
        iframeElement.src = video.videoUrl;
        iframeElement.width = '100%';
        iframeElement.height = '100%';
        iframeElement.frameBorder = '0';
        iframeElement.allowFullscreen = true;
        videoContainer.appendChild(iframeElement);
    }

    saveVideoProgress(0); // Reset progress when loading a new video
}

// Render suggested videos
function renderSuggestedVideos() {
    videoList.innerHTML = '';
    videos.slice(1).forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="thumbnail">
                <img src="${video.thumbnailUrl}" alt="${video.title}">
            </div>
            <div class="video-details">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        videoItem.addEventListener('click', () => loadVideo(video));
        videoList.appendChild(videoItem);
    });
}

// Show user preference form
function showPreferenceForm() {
    const form = document.createElement('form');
    form.className = 'form-overlay';
    
    const formContent = document.createElement('div');
    formContent.className = 'form-content';
    
    formContent.innerHTML = `
        <h2>User Preferences</h2>
        <input type="text" id="name" placeholder="Name" required>
        <input type="email" id="email" placeholder="Email" required>
        <select id="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
        <button type="submit">Submit</button>
    `;
    
    form.appendChild(formContent);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const theme = document.getElementById('theme').value;
        
        userPreference = { name, email, theme };
        localStorage.setItem('userPreference', JSON.stringify(userPreference));
        setTheme(theme);
        
        document.body.removeChild(form);
    });
    
    document.body.appendChild(form);
}

// Save video progress
function saveVideoProgress(time) {
    localStorage.setItem(`videoProgress_${currentVideo.id}`, time.toString());
}

// Load video progress
function loadVideoProgress() {
    const savedProgress = localStorage.getItem(`videoProgress_${currentVideo.id}`);
    if (savedProgress && currentVideo.type === 'video') {
        const videoElement = document.getElementById('main-video');
        if (videoElement) {
            videoElement.currentTime = parseFloat(savedProgress);
        }
    }
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

// Initialize the application
init();