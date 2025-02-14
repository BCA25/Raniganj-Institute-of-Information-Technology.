document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reset-password-form');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const resetButton = document.getElementById('reset-button');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthLabel = document.querySelector('.strength-label');
    
    // Password requirements
    const requirements = {
        length: { regex: /.{8,}/, element: document.getElementById('length-check') },
        uppercase: { regex: /[A-Z]/, element: document.getElementById('uppercase-check') },
        lowercase: { regex: /[a-z]/, element: document.getElementById('lowercase-check') },
        number: { regex: /[0-9]/, element: document.getElementById('number-check') },
        special: { regex: /[^A-Za-z0-9]/, element: document.getElementById('special-check') }
    };

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Check password strength
    function checkPasswordStrength(password) {
        let strength = 0;
        let validRequirements = 0;

        // Check each requirement
        for (const [key, requirement] of Object.entries(requirements)) {
            const isValid = requirement.regex.test(password);
            requirement.element.classList.toggle('valid', isValid);
            if (isValid) {
                requirement.element.querySelector('i').classList.remove('fa-circle');
                requirement.element.querySelector('i').classList.add('fa-check-circle');
                validRequirements++;
            } else {
                requirement.element.querySelector('i').classList.remove('fa-check-circle');
                requirement.element.querySelector('i').classList.add('fa-circle');
            }
        }

        // Calculate strength
        strength = (validRequirements / Object.keys(requirements).length) * 100;

        // Update strength meter
        strengthMeter.classList.remove('weak', 'medium', 'strong', 'very-strong');
        if (strength >= 100) {
            strengthMeter.classList.add('very-strong');
            strengthLabel.textContent = 'Very Strong';
            strengthLabel.style.color = '#27ae60';
        } else if (strength >= 75) {
            strengthMeter.classList.add('strong');
            strengthLabel.textContent = 'Strong';
            strengthLabel.style.color = '#3498db';
        } else if (strength >= 50) {
            strengthMeter.classList.add('medium');
            strengthLabel.textContent = 'Medium';
            strengthLabel.style.color = '#f1c40f';
        } else {
            strengthMeter.classList.add('weak');
            strengthLabel.textContent = 'Weak';
            strengthLabel.style.color = '#e74c3c';
        }

        return validRequirements === Object.keys(requirements).length;
    }

    // Check if passwords match and meet requirements
    function validatePasswords() {
        const isStrong = checkPasswordStrength(newPassword.value);
        const doMatch = newPassword.value === confirmPassword.value && newPassword.value !== '';
        
        resetButton.disabled = !(isStrong && doMatch);
    }

    // Event listeners
    newPassword.addEventListener('input', validatePasswords);
    confirmPassword.addEventListener('input', validatePasswords);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (newPassword.value !== confirmPassword.value) {
            alert('Passwords do not match!');
            return;
        }

        // Here you would typically send the new password to a server
        // For demo purposes, we'll show a success message
        console.log('Password reset successful');
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Your password has been successfully reset. You will be redirected to the login page shortly.
        `;
        
        form.insertBefore(successMessage, form.firstChild);
        successMessage.classList.add('show');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    });
});
