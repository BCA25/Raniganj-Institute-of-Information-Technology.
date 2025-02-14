document.addEventListener('DOMContentLoaded', function() {
    // Job Search Functionality
    const searchInput = document.getElementById('job-search');
    const categorySelect = document.getElementById('job-category');
    const jobCards = document.querySelectorAll('.job-card');
    const searchBtn = document.querySelector('.search-btn');

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();

        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.company').textContent.toLowerCase();
            const skills = Array.from(card.querySelectorAll('.skills span'))
                .map(skill => skill.textContent.toLowerCase());
            const category = card.dataset.category?.toLowerCase() || '';

            const matchesSearch = title.includes(searchTerm) || 
                                company.includes(searchTerm) || 
                                skills.some(skill => skill.includes(searchTerm));
            
            const matchesCategory = !selectedCategory || category === selectedCategory;

            card.style.display = (matchesSearch && matchesCategory) ? 'flex' : 'none';
        });
    }

    searchBtn.addEventListener('click', filterJobs);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterJobs();
        }
    });
    categorySelect.addEventListener('change', filterJobs);

    // Apply Button Functionality
    const applyButtons = document.querySelectorAll('.apply-btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const jobCard = e.target.closest('.job-card');
            const jobTitle = jobCard.querySelector('h3').textContent;
            const company = jobCard.querySelector('.company').textContent;

            // Check if user is logged in (you'll need to implement this)
            const isLoggedIn = checkUserLoginStatus();

            if (!isLoggedIn) {
                showLoginPrompt(jobTitle, company);
            } else {
                showApplicationForm(jobTitle, company);
            }
        });
    });

    function checkUserLoginStatus() {
        // Implement your login check logic here
        return false; // For demonstration
    }

    function showLoginPrompt(jobTitle, company) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login Required</h2>
                <p>Please log in to apply for ${jobTitle} position at ${company}</p>
                <div class="modal-buttons">
                    <a href="login.html" class="login-btn">Login</a>
                    <a href="signup.html" class="signup-btn">Sign Up</a>
                </div>
                <button class="close-btn">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    function showApplicationForm(jobTitle, company) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Apply for ${jobTitle}</h2>
                <p class="company-name">${company}</p>
                <form id="application-form">
                    <div class="form-group">
                        <label for="resume">Upload Resume (PDF)</label>
                        <input type="file" id="resume" accept=".pdf" required>
                    </div>
                    <div class="form-group">
                        <label for="cover-letter">Cover Letter</label>
                        <textarea id="cover-letter" rows="4" placeholder="Write a brief cover letter..."></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Application</button>
                </form>
                <button class="close-btn">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#application-form');
        const closeBtn = modal.querySelector('.close-btn');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle application submission
            submitApplication(jobTitle, company, form);
        });

        closeBtn.addEventListener('click', () => modal.remove());

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    function submitApplication(jobTitle, company, form) {
        // Implement your application submission logic here
        console.log(`Submitting application for ${jobTitle} at ${company}`);
        
        // Show success message
        const modal = form.closest('.modal');
        modal.innerHTML = `
            <div class="modal-content success">
                <h2>Application Submitted!</h2>
                <p>Your application for ${jobTitle} at ${company} has been submitted successfully.</p>
                <p>We will review your application and contact you soon.</p>
                <button class="close-btn">Close</button>
            </div>
        `;

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());
    }
});
