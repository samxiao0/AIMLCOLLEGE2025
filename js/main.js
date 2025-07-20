// Timetable data for each day
const timetableData = {
    monday: [
        [1, '09:00 - 09:50', 'andcdkj'],
        [2, '09:50 - 10:40', 'Physics'],
        [3, '10:50 - 11:40', 'Chemistry'],
        [4, '11:40 - 12:30', 'English'],
        [5, '01:30 - 02:20', 'Computer Science'],
        [6, '02:20 - 03:10', 'Physical Education']
    ],
    tuesday: [
        [1, '09:00 - 09:50', 'Biology'],
        [2, '09:50 - 10:40', 'Mathematics'],
        [3, '10:50 - 11:40', 'English'],
        [4, '11:40 - 12:30', 'Physics'],
        [5, '01:30 - 02:20', 'Chemistry'],
        [6, '02:20 - 03:10', 'Library']
    ],
    wednesday: [
        [1, '09:00 - 09:50', 'Chemistry'],
        [2, '09:50 - 10:40', 'Mathematics'],
        [3, '10:50 - 11:40', 'Computer Science'],
        [4, '11:40 - 12:30', 'English'],
        [5, '01:30 - 02:20', 'Physics'],
        [6, '02:20 - 03:10', 'Sports']
    ],
    thursday: [
        [1, '09:00 - 09:50', 'English'],
        [2, '09:50 - 10:40', 'Biology'],
        [3, '10:50 - 11:40', 'Mathematics'],
        [4, '11:40 - 12:30', 'Chemistry'],
        [5, '01:30 - 02:20', 'Physics'],
        [6, '02:20 - 03:10', 'Computer Science']
    ],
    friday: [
        [1, '09:00 - 09:50', 'Physics'],
        [2, '09:50 - 10:40', 'Mathematics'],
        [3, '10:50 - 11:40', 'Chemistry'],
        [4, '11:40 - 12:30', 'English'],
        [5, '01:30 - 02:20', 'Biology'],
        [6, '02:20 - 03:10', 'Physical Education']
    ],
    saturday: [
        [1, '09:00 - 09:50', 'Mathematics'],
        [2, '09:50 - 10:40', 'English'],
        [3, '10:50 - 11:40', 'Computer Science'],
        [4, '11:40 - 12:30', 'Sports'],
        [5, '01:30 - 02:20', 'Library'],
        [6, '02:20 - 03:10', 'Club Activities']
    ]
};

function renderTimetable(day) {
    const tbody = document.querySelector('#timetable-table tbody');
    tbody.innerHTML = '';
    timetableData[day].forEach(period => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${period[0]}</td><td>${period[1]}</td><td>${period[2]}</td>`;
        tbody.appendChild(row);
    });
}

// Gallery: Manually load images from the gallery folder using a list
// To add a new image: 1) Upload it to the gallery folder, 2) Add its filename to the array below
const galleryImages = [
    '1290467.jpg',
    '1290468.jpg',
    '1305590.jpeg',
    '1309407.jpg',
    '3495178 (1).jpg'
];

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    if (galleryImages.length === 0) {
        galleryGrid.innerHTML = '<p>No images found in gallery.</p>';
        return;
    }
    galleryGrid.innerHTML = '';
    galleryImages.forEach(filename => {
        const img = document.createElement('img');
        img.src = 'gallery/' + filename;
        img.alt = 'Gallery Image';
        img.className = 'gallery-img';
        img.addEventListener('click', function() {
            openGalleryModal('gallery/' + filename);
        });
        galleryGrid.appendChild(img);
    });
}

// Modal logic for gallery
function openGalleryModal(src) {
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.innerHTML = `
            <button class="close-btn" aria-label="Close gallery">&times;</button>
            <img src="" alt="Gallery Large View" />
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-btn').onclick = closeGalleryModal;
        modal.onclick = function(e) {
            if (e.target === modal) closeGalleryModal();
        };
    }
    modal.querySelector('img').src = src;
    modal.classList.add('active');
}
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) modal.classList.remove('active');
}

// Countdown Timer with only date input
function startCountdown(targetDateStr, title) {
    const countdownEl = document.getElementById('countdown-timer');
    const titleEl = document.getElementById('countdown-title');
    if (!countdownEl || !titleEl) return;
    titleEl.textContent = title ? `Countdown to ${title}` : 'Countdown';
    const targetDate = new Date(targetDateStr);
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownEl.textContent = (title ? title : 'Event') + ' Ended!';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    updateCountdown();
    if (window._countdownInterval) clearInterval(window._countdownInterval);
    window._countdownInterval = setInterval(updateCountdown, 1000);
}

// Live Clock (12-hour format)
function updateLiveClock() {
    const clock = document.getElementById('liveClock');
    if (!clock) return;
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // 0 should be 12
    clock.textContent = `${h}:${m}:${s} ${ampm}`;
}
setInterval(updateLiveClock, 1000);
document.addEventListener('DOMContentLoaded', updateLiveClock);

// Page Visit Counter (per page)
function updateVisitCounter() {
    const counter = document.getElementById('visitCounter');
    if (!counter) return;
    const key = location.pathname + '_visits';
    let visits = parseInt(localStorage.getItem(key) || '0', 10);
    visits += 1;
    localStorage.setItem(key, visits);
    counter.textContent = `You have visited this page ${visits} time${visits === 1 ? '' : 's'}.`;
}
document.addEventListener('DOMContentLoaded', updateVisitCounter);

document.addEventListener('DOMContentLoaded', function() {
    const daySelect = document.getElementById('day-select');
    // Default to today's day if between Monday-Saturday, else Monday
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    let today = days[new Date().getDay()];
    if (!timetableData[today]) today = 'monday';
    daySelect.value = today;
    renderTimetable(today);
    daySelect.addEventListener('change', function() {
        renderTimetable(this.value);
    });
    loadGallery();
    // Countdown form logic
    const form = document.getElementById('countdown-form');
    const dateInput = document.getElementById('countdown-date');
    const titleInput = document.getElementById('countdown-title-input');
    const passwordInput = document.getElementById('countdown-password');
    const savedDate = localStorage.getItem('countdownDate') || '2025-07-31';
    const savedTitle = localStorage.getItem('countdownTitle') || 'Semester End';
    dateInput.value = savedDate;
    titleInput.value = savedTitle;
    startCountdown(savedDate + 'T23:59:59', savedTitle);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = dateInput.value;
        const title = titleInput.value.trim() || 'Semester End';
        const password = passwordInput.value;
        // Set your password/keyword here
        const correctPassword = 'aiml2025';
        if (password !== correctPassword) {
            alert('Incorrect password. Please try again.');
            passwordInput.value = '';
            passwordInput.focus();
            return;
        }
        if (!date) return;
        localStorage.setItem('countdownDate', date);
        localStorage.setItem('countdownTitle', title);
        startCountdown(date + 'T23:59:59', title);
        passwordInput.value = '';
    });
});
