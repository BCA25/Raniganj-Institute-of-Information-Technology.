document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const scheduleContainer = document.querySelector('.class-schedule');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Load schedule based on selected tab
            const tabName = button.getAttribute('data-tab');
            loadSchedule(tabName);
        });
    });

    // Sample class schedule data (in a real app, this would come from a server)
    const classSchedule = {
        today: [
            {
                time: '09:00 AM - 10:30 AM',
                subject: 'Advanced Mathematics',
                teacher: 'Dr. Amit Kumar',
                status: 'completed',
                meetLink: 'https://meet.google.com/abc-defg-hij'
            },
            {
                time: '11:00 AM - 12:30 PM',
                subject: 'Physics - Wave Mechanics',
                teacher: 'Prof. Sarah Johnson',
                status: 'live',
                meetLink: 'https://meet.google.com/xyz-mnop-qrs'
            },
            {
                time: '02:00 PM - 03:30 PM',
                subject: 'Chemistry - Organic Reactions',
                teacher: 'Dr. Michael Chen',
                status: 'upcoming',
                meetLink: 'https://meet.google.com/tuv-wxyz-123'
            },
            {
                time: '04:00 PM - 05:30 PM',
                subject: 'Programming Fundamentals',
                teacher: 'Mr. David Wilson',
                status: 'upcoming',
                meetLink: 'https://meet.google.com/456-789-abc'
            }
        ],
        week: [
            // Add weekly schedule data here
        ],
        recorded: [
            // Add recorded classes data here
        ]
    };

    function loadSchedule(tab) {
        const schedule = classSchedule[tab] || classSchedule.today;
        let html = '';

        schedule.forEach(class_ => {
            const statusClass = `status-${class_.status}`;
            const isJoinable = class_.status === 'live' || class_.status === 'upcoming';
            const buttonClass = isJoinable ? 'join-button' : 'join-button disabled';
            const statusText = getStatusText(class_.status);

            html += `
                <div class="schedule-item">
                    <div class="schedule-time">
                        <i class="far fa-clock"></i>
                        ${class_.time}
                    </div>
                    <div class="schedule-details">
                        <div class="schedule-subject">
                            ${class_.subject}
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </div>
                        <div class="schedule-teacher">
                            <i class="fas fa-chalkboard-teacher"></i>
                            ${class_.teacher}
                        </div>
                    </div>
                    <button class="${buttonClass}" onclick="joinClass('${class_.subject}', '${class_.status}', '${class_.meetLink}')">
                        ${getButtonText(class_.status)}
                    </button>
                </div>
            `;
        });

        scheduleContainer.innerHTML = html;
    }

    function getStatusText(status) {
        switch(status) {
            case 'live': return 'LIVE NOW';
            case 'upcoming': return 'Upcoming';
            case 'completed': return 'Completed';
            default: return status;
        }
    }

    function getButtonText(status) {
        switch(status) {
            case 'live': return '<i class="fas fa-video"></i> Join Now';
            case 'upcoming': return '<i class="fas fa-clock"></i> Reminder';
            case 'completed': return '<i class="fas fa-play-circle"></i> Watch Recording';
            default: return 'Join';
        }
    }

    // Initial load
    loadSchedule('today');
});

// Function to handle joining a class
function joinClass(subject, status, meetLink) {
    if (status === 'completed') {
        alert(`The recording for ${subject} will be available soon.`);
    } else if (status === 'upcoming') {
        const reminder = confirm(`Would you like to set a reminder for ${subject}?`);
        if (reminder) {
            alert('Reminder set! We will notify you before the class starts.');
        }
    } else if (status === 'live') {
        // Open Google Meet in a new tab
        window.open(meetLink, '_blank', 'noopener,noreferrer');
    }
}

// Handle mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}
