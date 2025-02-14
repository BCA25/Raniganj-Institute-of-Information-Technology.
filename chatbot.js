document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const minimizeChat = document.querySelector('.minimize-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input');
    const sendMessage = document.querySelector('.send-message');
    const notificationBadge = document.querySelector('.notification-badge');

    // Chatbot responses database
    const botResponses = {
        greetings: [
            "Hello! How can I help you today?",
            "Hi there! Welcome to Amit Coaching. What can I assist you with?",
            "Welcome! I'm here to help you with any questions about our courses."
        ],
        courses: [
            "We offer various courses including BCA, Programming, Mathematics, and Science. Which one interests you?",
            "Our most popular course is BCA. Would you like to know more about it?",
            "You can view our complete course catalog on the Courses page. Would you like me to show you?"
        ],
        registration: [
            "To register for a course, you can use our quick signup form. Would you like me to guide you through the process?",
            "Registration is easy! Just click the 'Sign Up' button at the top of the page. Need help with that?",
            "I can help you with the registration process. What course would you like to register for?"
        ],
        schedule: [
            "Our live classes run throughout the week. You can check the complete schedule in the Online Classes section.",
            "We have both morning and evening batches available. Would you like to see the timings?",
            "The class schedule is flexible and you can choose your preferred time slot. Shall I show you the available options?"
        ],
        default: [
            "I'm not sure I understand. Could you please rephrase that?",
            "Let me connect you with our support team for more detailed information.",
            "That's an interesting question. Let me help you find the right information."
        ]
    };

    // Initial message
    setTimeout(() => {
        addMessage("Hi! 👋 I'm Amit Assistant. How can I help you today?", 'bot');
    }, 1000);

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
        notificationBadge.style.display = 'none';
    });

    // Minimize chat
    minimizeChat.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    // Send message on button click
    sendMessage.addEventListener('click', handleUserMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Handle user message
    function handleUserMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process message and get response
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing');
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return getRandomResponse(botResponses.greetings);
        }
        else if (message.includes('course') || message.includes('bca') || message.includes('study')) {
            return getRandomResponse(botResponses.courses);
        }
        else if (message.includes('register') || message.includes('sign up') || message.includes('join')) {
            return getRandomResponse(botResponses.registration);
        }
        else if (message.includes('schedule') || message.includes('class') || message.includes('timing')) {
            return getRandomResponse(botResponses.schedule);
        }
        else {
            return getRandomResponse(botResponses.default);
        }
    }

    // Get random response from array
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
});
