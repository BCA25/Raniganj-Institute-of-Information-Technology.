// Forgot Password Form Handling
const forgotPasswordForm = document.getElementById('forgot-password-form');

forgotPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Here you would typically send the email to a server
    // For demo purposes, we'll show a success message and simulate a reset link
    console.log('Password reset requested for:', email);
    
    // Create success message with reset link for demo
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Password reset instructions have been sent to your email address.
        Please check your inbox and follow the instructions.</p>
        <p style="margin-top: 10px; font-size: 0.9em;">
            <strong>Demo Purpose Only:</strong> 
            <a href="reset-password.html?email=${encodeURIComponent(email)}" style="color: #2980b9;">
                Click here to simulate reset link
            </a>
        </p>
    `;
    
    // Remove any existing success message
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Insert success message before the form
    forgotPasswordForm.insertBefore(successMessage, forgotPasswordForm.firstChild);
    successMessage.classList.add('show');
    
    // Clear the form
    forgotPasswordForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.remove(), 300);
    }, 5000);
});

// Input field animation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
