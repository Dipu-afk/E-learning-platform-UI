// Initialize video player
document.addEventListener('DOMContentLoaded', function() {
    // Sample Vimeo video - replace with your actual video ID
    const options = {
        id: 76979871, // Replace with your video ID
        width: 640,
        loop: false
    };

    const videoPlayer = new Vimeo.Player('videoPlayer', options);

    // Track video progress
    videoPlayer.on('timeupdate', function(data) {
        const progress = (data.percent * 100).toFixed(1);
        updateProgressBar(progress);
    });

    // Save progress when video ends
    videoPlayer.on('ended', function() {
        saveProgress(100);
    });
});

// Progress tracking functionality
function updateProgressBar(progress) {
    const progressBadges = document.querySelectorAll('.progress-badge');
    progressBadges.forEach(badge => {
        if (badge.textContent.includes('Complete')) {
            badge.textContent = `${progress}% Complete`;
        }
    });
}

function saveProgress(progress) {
    // In a real application, this would save to a backend
    console.log(`Progress saved: ${progress}%`);
}

// Course data
const courseData = {
    'Web Development Fundamentals': {
        startDate: 'March 1, 2025',
        endDate: 'May 30, 2025',
        duration: '12 weeks',
        students: '1.2k',
        description: 'Master the fundamentals of web development with this comprehensive course. Learn HTML5, CSS3, and JavaScript to build modern, responsive websites. This course covers everything from basic markup to advanced interactive features.',
        topics: [
            'HTML5 semantic elements and structure',
            'CSS3 styling, flexbox, and grid layouts',
            'JavaScript fundamentals and DOM manipulation',
            'Responsive design principles',
            'Web accessibility best practices',
            'Version control with Git'
        ]
    },
    'Python Programming': {
        startDate: 'April 15, 2025',
        endDate: 'July 15, 2025',
        duration: '15 weeks',
        students: '2.5k',
        description: 'Learn Python programming from the ground up. This course covers core Python concepts, data structures, algorithms, and practical applications. Perfect for beginners and intermediate programmers looking to expand their skills.',
        topics: [
            'Python syntax and basic concepts',
            'Data structures and algorithms',
            'Object-oriented programming',
            'File handling and databases',
            'API integration',
            'Testing and debugging'
        ]
    },
    'Data Science Essentials': {
        startDate: 'May 1, 2025',
        endDate: 'August 30, 2025',
        duration: '20 weeks',
        students: '1.8k',
        description: 'Dive into the world of data science with this comprehensive course. Learn data analysis, visualization, and machine learning using Python. Work with real-world datasets and build practical data science projects.',
        topics: [
            'Data analysis with Pandas',
            'Data visualization with Matplotlib and Seaborn',
            'Statistical analysis and hypothesis testing',
            'Machine learning fundamentals',
            'Deep learning introduction',
            'Data science project workflow'
        ]
    }
};

// Course card interactions
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('continue-button') && 
            !e.target.classList.contains('enroll-button')) {
            const courseTitle = this.querySelector('h3').textContent;
            showCourseDetails(courseTitle);
        }
    });
});

// Modal functionality
const modal = document.getElementById('courseModal');
const closeModal = document.querySelector('.close-modal');

function showCourseDetails(courseTitle) {
    const course = courseData[courseTitle];
    if (!course) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = courseTitle;
    document.getElementById('startDate').textContent = course.startDate;
    document.getElementById('endDate').textContent = course.endDate;
    document.getElementById('duration').textContent = course.duration;
    document.getElementById('students').textContent = course.students;
    document.getElementById('courseDescription').textContent = course.description;

    // Update topics
    const topicsList = document.getElementById('courseTopics');
    topicsList.innerHTML = '';
    course.topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        topicsList.appendChild(li);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal when clicking the close button or outside the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Handle modal enroll button
document.getElementById('modalEnrollButton').addEventListener('click', function() {
    const courseTitle = document.getElementById('modalTitle').textContent;
    enrollInCourse(courseTitle);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

function enrollInCourse(courseTitle) {
    // In a real application, this would handle enrollment through a backend
    console.log(`Enrolled in: ${courseTitle}`);
    // Update button state
    const button = document.querySelector(`h3:contains('${courseTitle}')`).closest('.course-card').querySelector('.enroll-button');
    if (button) {
        button.textContent = 'Continue Learning';
        button.classList.remove('enroll-button');
        button.classList.add('continue-button');
    }
}

// Enrollment functionality
document.querySelectorAll('.enroll-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        enrollInCourse(courseTitle);
    });
});

// Continue learning functionality
document.querySelectorAll('.continue-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        continueCourse(courseTitle);
    });
});

function continueCourse(courseTitle) {
    // In a real application, this would load the last viewed lesson
    console.log(`Continuing course: ${courseTitle}`);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
