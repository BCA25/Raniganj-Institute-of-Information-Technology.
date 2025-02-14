document.addEventListener('DOMContentLoaded', function() {
    // Sample exam data - in real app, this would come from a server
    const examData = {
        duration: 7200, // 2 hours in seconds
        questions: [
            {
                id: 1,
                text: "What is the capital of France?",
                options: [
                    "London",
                    "Berlin",
                    "Paris",
                    "Madrid"
                ],
                correctAnswer: 2 // Index of correct answer
            },
            {
                id: 2,
                text: "Which programming language is known as the 'language of the web'?",
                options: [
                    "Python",
                    "JavaScript",
                    "Java",
                    "C++"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "What is the largest planet in our solar system?",
                options: [
                    "Mars",
                    "Saturn",
                    "Jupiter",
                    "Neptune"
                ],
                correctAnswer: 2
            },
            // Add more questions as needed
        ]
    };

    // DOM Elements
    const timeLeftElement = document.getElementById('time-left');
    const questionContainer = document.getElementById('question-container');
    const questionNavigator = document.getElementById('question-navigator');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const submitButton = document.getElementById('submit-exam');
    const markReviewButton = document.getElementById('mark-review');
    const clearResponseButton = document.getElementById('clear-response');
    const confirmModal = document.getElementById('confirm-modal');
    const cancelSubmitButton = document.getElementById('cancel-submit');
    const confirmSubmitButton = document.getElementById('confirm-submit');

    // Exam State
    let currentQuestionIndex = 0;
    let timeLeft = examData.duration;
    let answers = new Array(examData.questions.length).fill(null);
    let markedForReview = new Set();
    let timer;

    // Initialize exam
    function initializeExam() {
        loadQuestion(currentQuestionIndex);
        createQuestionNavigator();
        startTimer();
        updateNavigationButtons();
        loadStudentInfo();
    }

    // Load student info
    function loadStudentInfo() {
        // In real app, this would come from server/session
        const studentName = "John Doe";
        document.getElementById('student-name').textContent = studentName;
    }

    // Create question navigator buttons
    function createQuestionNavigator() {
        questionNavigator.innerHTML = '';
        examData.questions.forEach((_, index) => {
            const button = document.createElement('button');
            button.className = 'question-number not-visited';
            button.textContent = index + 1;
            button.addEventListener('click', () => navigateToQuestion(index));
            questionNavigator.appendChild(button);
        });
        updateQuestionStatus(0, 'current');
    }

    // Load question
    function loadQuestion(index) {
        const question = examData.questions[index];
        questionContainer.innerHTML = `
            <div class="question active">
                <div class="question-text">
                    <strong>Q${index + 1}.</strong> ${question.text}
                </div>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <label class="option ${answers[index] === i ? 'selected' : ''}">
                            <input type="radio" name="q${index}" value="${i}" ${answers[index] === i ? 'checked' : ''}>
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners to options
        const options = questionContainer.querySelectorAll('.option');
        options.forEach((option, i) => {
            option.addEventListener('click', () => selectOption(index, i));
        });
    }

    // Select option
    function selectOption(questionIndex, optionIndex) {
        answers[questionIndex] = optionIndex;
        updateQuestionStatus(questionIndex, 'answered');
        loadQuestion(questionIndex); // Reload to update UI
    }

    // Update question status in navigator
    function updateQuestionStatus(index, status) {
        const buttons = questionNavigator.querySelectorAll('.question-number');
        buttons[index].className = `question-number ${status}`;
    }

    // Navigate to question
    function navigateToQuestion(index) {
        updateQuestionStatus(currentQuestionIndex, 
            answers[currentQuestionIndex] !== null ? 'answered' : 
            markedForReview.has(currentQuestionIndex) ? 'marked' : 'not-visited'
        );
        currentQuestionIndex = index;
        updateQuestionStatus(index, 'current');
        loadQuestion(index);
        updateNavigationButtons();
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = currentQuestionIndex === examData.questions.length - 1;
        submitButton.style.display = currentQuestionIndex === examData.questions.length - 1 ? 'inline-flex' : 'none';
    }

    // Start timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                submitExam();
            }
        }, 1000);
    }

    // Update timer display
    function updateTimer() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        timeLeftElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Mark question for review
    markReviewButton.addEventListener('click', () => {
        if (markedForReview.has(currentQuestionIndex)) {
            markedForReview.delete(currentQuestionIndex);
            updateQuestionStatus(currentQuestionIndex, answers[currentQuestionIndex] !== null ? 'answered' : 'not-visited');
        } else {
            markedForReview.add(currentQuestionIndex);
            updateQuestionStatus(currentQuestionIndex, 'marked');
        }
    });

    // Clear response
    clearResponseButton.addEventListener('click', () => {
        answers[currentQuestionIndex] = null;
        updateQuestionStatus(currentQuestionIndex, markedForReview.has(currentQuestionIndex) ? 'marked' : 'not-visited');
        loadQuestion(currentQuestionIndex);
    });

    // Navigation event listeners
    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            navigateToQuestion(currentQuestionIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < examData.questions.length - 1) {
            navigateToQuestion(currentQuestionIndex + 1);
        }
    });

    // Submit exam
    submitButton.addEventListener('click', () => {
        updateExamSummary();
        confirmModal.classList.add('active');
    });

    // Update exam summary
    function updateExamSummary() {
        const answeredCount = answers.filter(answer => answer !== null).length;
        const markedCount = markedForReview.size;
        const notAttemptedCount = examData.questions.length - answeredCount;

        document.getElementById('answered-count').textContent = answeredCount;
        document.getElementById('marked-count').textContent = markedCount;
        document.getElementById('not-attempted-count').textContent = notAttemptedCount;
    }

    // Cancel submit
    cancelSubmitButton.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });

    // Confirm submit
    confirmSubmitButton.addEventListener('click', submitExam);

    // Submit exam
    function submitExam() {
        clearInterval(timer);
        
        // Calculate score
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === examData.questions[index].correctAnswer) {
                score++;
            }
        });

        // In real app, send results to server
        const results = {
            answers,
            score,
            timeSpent: examData.duration - timeLeft
        };
        console.log('Exam submitted:', results);

        // Redirect to results page
        window.location.href = 'exam-result.html';
    }

    // Initialize exam when page loads
    initializeExam();
});
