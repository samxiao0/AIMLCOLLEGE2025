// Timetable data for each day
const timetableData = {
    monday: [
        [1, '09:00 - 09:50', 'Mathematics'],
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
    // Example: 'image1.jpg', 'image2.png', ...
    // Add your image filenames here
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
        galleryGrid.appendChild(img);
    });
}

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
});
