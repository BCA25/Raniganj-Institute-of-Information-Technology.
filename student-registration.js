document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('student-registration-form');
    const instituteSelect = document.getElementById('institute');
    const selectedInstituteText = document.getElementById('selected-institute');
    const emailInput = document.getElementById('email');
    const sendOtpBtn = document.getElementById('send-otp');
    const verifyOtpBtn = document.getElementById('verify-otp');
    const resendOtpBtn = document.getElementById('resend-otp');
    const otpSection = document.querySelector('.otp-section');
    const otpInput = document.getElementById('otp');
    const timerDisplay = document.getElementById('timer');

    let isEmailVerified = false;
    let generatedOTP = '';
    let timerInterval;

    // Institute details
    const institutes = {
        'RiiT': {
            name: 'Raniganj Institute of Information Technology',
            shortName: 'RiiT',
            primaryColor: '#6b46c1'
        },
        'AEC': {
            name: 'Asansol Engineering College',
            shortName: 'AEC',
            primaryColor: '#2c5282'
        },
        'BBC': {
            name: 'Benoy Badal Dinesh College',
            shortName: 'BB College',
            primaryColor: '#2f855a'
        }
    };

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

    // Function to validate phone number (10 digits)
    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    // Function to validate PIN code (6 digits)
    function isValidPincode(pincode) {
        return /^\d{6}$/.test(pincode);
    }

    // Email verification functions
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function startTimer() {
        let timeLeft = 120; // 2 minutes
        resendOtpBtn.disabled = true;
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                resendOtpBtn.disabled = false;
                showError(otpInput, 'OTP expired. Please request a new one.');
            }
            timeLeft--;
        }, 1000);
    }

    function showVerificationSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'otp-verified';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Email Verified Successfully';
        otpSection.appendChild(successDiv);
        isEmailVerified = true;
        emailInput.readOnly = true;
        otpSection.style.display = 'none';
        sendOtpBtn.style.display = 'none';
        
        // Add verified indicator next to email
        const verifiedBadge = document.createElement('span');
        verifiedBadge.className = 'verified-badge';
        verifiedBadge.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
        emailInput.parentElement.appendChild(verifiedBadge);
    }

    // Handle institute selection
    instituteSelect.addEventListener('change', function() {
        const selectedInstitute = institutes[this.value];
        if (selectedInstitute) {
            selectedInstituteText.textContent = `${selectedInstitute.name} (${selectedInstitute.shortName})`;
            document.documentElement.style.setProperty('--primary-color', selectedInstitute.primaryColor);
        } else {
            selectedInstituteText.textContent = 'Please Select Your Institute';
            document.documentElement.style.setProperty('--primary-color', '#6b46c1');
        }
    });

    // Add input event listeners for real-time validation
    document.querySelectorAll('.input-group input, .input-group select, .input-group textarea').forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });
    });

    // Event Listeners for OTP
    sendOtpBtn.addEventListener('click', function() {
        const email = emailInput.value;
        if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        generatedOTP = generateOTP();
        console.log('Generated OTP:', generatedOTP); // For testing purposes
        
        otpSection.style.display = 'flex';
        startTimer();
        
        // Here you would typically send the OTP to the user's email
        // For this example, we'll show it in the console
        alert('For testing purposes, your OTP is: ' + generatedOTP);
    });

    verifyOtpBtn.addEventListener('click', function() {
        const enteredOTP = otpInput.value;
        if (enteredOTP === generatedOTP) {
            clearInterval(timerInterval);
            showVerificationSuccess();
            removeError(otpInput);
        } else {
            showError(otpInput, 'Invalid OTP. Please try again.');
        }
    });

    resendOtpBtn.addEventListener('click', function() {
        generatedOTP = generateOTP();
        console.log('New Generated OTP:', generatedOTP); // For testing purposes
        startTimer();
        alert('For testing purposes, your new OTP is: ' + generatedOTP);
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate email verification
        if (!isEmailVerified) {
            showError(emailInput, 'Please verify your email address');
            isValid = false;
        }

        // Validate full name
        const fullname = document.getElementById('fullname');
        if (fullname.value.trim().length < 3) {
            showError(fullname, 'Name must be at least 3 characters long');
            isValid = false;
        }

        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('phone');
        if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        // Validate date of birth
        const dob = document.getElementById('dob');
        if (!dob.value) {
            showError(dob, 'Please select your date of birth');
            isValid = false;
        }

        // Validate gender
        const gender = document.getElementById('gender');
        if (!gender.value) {
            showError(gender, 'Please select your gender');
            isValid = false;
        }

        // Validate education
        const education = document.getElementById('education');
        if (!education.value) {
            showError(education, 'Please select your education level');
            isValid = false;
        }

        // Validate school/college
        const school = document.getElementById('school');
        if (school.value.trim().length < 3) {
            showError(school, 'Please enter your school/college name');
            isValid = false;
        }

        // Validate course selection
        const course = document.getElementById('course');
        if (!course.value) {
            showError(course, 'Please select a course');
            isValid = false;
        }

        // Validate batch timing
        const batchTiming = document.getElementById('batch-timing');
        if (!batchTiming.value) {
            showError(batchTiming, 'Please select preferred batch timing');
            isValid = false;
        }

        // Validate institute selection
        const institute = document.getElementById('institute');
        if (!institute.value) {
            showError(institute, 'Please select your institute');
            isValid = false;
        }

        // Validate address
        const address = document.getElementById('address');
        if (address.value.trim().length < 10) {
            showError(address, 'Please enter your complete address');
            isValid = false;
        }

        // Validate city
        const city = document.getElementById('city');
        if (city.value.trim().length < 2) {
            showError(city, 'Please enter your city');
            isValid = false;
        }

        // Validate state
        const state = document.getElementById('state');
        if (state.value.trim().length < 2) {
            showError(state, 'Please enter your state');
            isValid = false;
        }

        // Validate PIN code
        const pincode = document.getElementById('pincode');
        if (!isValidPincode(pincode.value)) {
            showError(pincode, 'Please enter a valid 6-digit PIN code');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to your server
            alert('Registration successful! We will contact you soon with course details.');
            form.reset();
        }
    });
});
