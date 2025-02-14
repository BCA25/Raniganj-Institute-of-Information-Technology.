document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('teacher-signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const qualificationSelect = document.getElementById('qualification');
    const subjectsSelect = document.getElementById('subjects');

    // Subject mapping based on qualification
    const subjectsByQualification = {
        'Bachelors': [
            'Mathematics', 'Physics', 'Chemistry', 'Biology',
            'Computer Science', 'English', 'History', 'Geography'
        ],
        'Masters': [
            'Advanced Mathematics', 'Advanced Physics', 'Advanced Chemistry',
            'Advanced Biology', 'Computer Science', 'English Literature',
            'World History', 'Economic Geography', 'Statistics'
        ],
        'PhD': [
            'Research Methodology', 'Advanced Statistics', 'Quantum Physics',
            'Organic Chemistry', 'Molecular Biology', 'Computer Science',
            'Literature', 'Modern History'
        ],
        'MPhil': [
            'Research Methods', 'Advanced Statistics', 'Data Analysis',
            'Subject Specialization', 'Academic Writing'
        ],
        'BEd': [
            'Teaching Methodology', 'Educational Psychology', 'Mathematics',
            'Science', 'Social Studies', 'Language Teaching'
        ],
        'MEd': [
            'Advanced Pedagogy', 'Educational Leadership', 'Curriculum Development',
            'Educational Technology', 'Special Education'
        ],
        'NET': [
            'Research Methodology', 'Teaching Aptitude', 'Subject Specialization',
            'Higher Education System'
        ],
        'Other': [
            'Basic Mathematics', 'General Science', 'Social Studies',
            'Language Arts', 'Computer Basics'
        ]
    };

    // Function to update subjects based on qualification
    function updateSubjects(qualification) {
        // Clear existing options
        subjectsSelect.innerHTML = '<option value="" disabled>Select Subjects to Teach</option>';
        
        if (qualification && subjectsByQualification[qualification]) {
            const subjects = subjectsByQualification[qualification];
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.toLowerCase().replace(/\s+/g, '-');
                option.textContent = subject;
                subjectsSelect.appendChild(option);
            });
            subjectsSelect.disabled = false;
        } else {
            subjectsSelect.disabled = true;
        }
    }

    // Listen for qualification changes
    qualificationSelect.addEventListener('change', function() {
        updateSubjects(this.value);
        removeError(this);
    });

    // Function to show error
    function showError(input, message) {
        const inputGroup = input.parentElement;
        inputGroup.classList.add('error');
        inputGroup.setAttribute('data-error', message);
    }

    // Function to remove error
    function removeError(input) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        inputGroup.removeAttribute('data-error');
    }

    // Function to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to validate phone number
    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    // Add input event listeners for real-time validation
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate full name
        const fullname = document.getElementById('fullname');
        if (fullname.value.trim().length < 3) {
            showError(fullname, 'Name must be at least 3 characters long');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('phone');
        if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        // Validate qualification
        if (!qualificationSelect.value) {
            showError(qualificationSelect, 'Please select your highest qualification');
            isValid = false;
        }

        // Validate subjects
        if (!subjectsSelect.value || subjectsSelect.selectedOptions.length === 0) {
            showError(subjectsSelect, 'Please select at least one subject to teach');
            isValid = false;
        }

        // Validate experience
        const experience = document.getElementById('experience');
        if (experience.value < 0) {
            showError(experience, 'Experience cannot be negative');
            isValid = false;
        }

        // Validate password
        if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }

        // Validate password confirmation
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to your server
            const selectedSubjects = Array.from(subjectsSelect.selectedOptions).map(option => option.text);
            console.log('Selected subjects:', selectedSubjects);
            alert('Registration successful! We will review your application and contact you soon.');
            form.reset();
            updateSubjects(''); // Reset subjects dropdown
        }
    });

    // Initialize subjects dropdown as disabled
    subjectsSelect.disabled = true;
});
