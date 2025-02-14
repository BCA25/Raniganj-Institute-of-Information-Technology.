// Subject details database
const subjectDetails = {
    'BCA101': {
        name: 'C Programming Language',
        syllabus: [
            'Introduction to Programming',
            'Data Types and Operators',
            'Control Structures',
            'Functions and Arrays',
            'Pointers and Structures',
            'File Handling',
            'Practical Programming Projects'
        ],
        books: [
            'Let Us C by Yashwant Kanetkar',
            'Programming in ANSI C by E. Balagurusamy',
            'The C Programming Language by Kernighan & Ritchie'
        ]
    },
    'BCA102': {
        name: 'English Communication',
        syllabus: [
            'Grammar and Usage',
            'Vocabulary Building',
            'Business Writing',
            'Presentation Skills',
            'Group Discussions',
            'Email Writing',
            'Report Writing'
        ],
        books: [
            'Business English by Mary Ellen Guffey',
            'Technical Communication by Meenakshi Raman',
            'Professional Communication by Aruna Koneru'
        ]
    },
    'BCA103': {
        name: 'Financial Accounting',
        syllabus: [
            'Basic Accounting Concepts',
            'Journal and Ledger',
            'Trial Balance',
            'Financial Statements',
            'Computerized Accounting',
            'Tally Fundamentals',
            'GST Basics'
        ],
        books: [
            'Financial Accounting by S.N. Maheshwari',
            'Tally.ERP 9 Training Guide',
            'Corporate Accounting by S.N. Maheshwari'
        ]
    },
    'BCA104': {
        name: 'Office Automation',
        syllabus: [
            'MS Word Advanced Features',
            'Excel Functions and Formulas',
            'PowerPoint Presentations',
            'MS Access Basics',
            'Mail Merge',
            'Cloud Computing Basics',
            'Office 365 Features'
        ],
        books: [
            'Microsoft Office 2021 Step by Step',
            'Office 365 For Dummies',
            'Excel 2021 Bible'
        ]
    }
};

function viewSubject(subjectCode) {
    const subject = subjectDetails[subjectCode];
    if (!subject) return;

    // Create modal content
    const modalHTML = `
        <div class="subject-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${subject.name}</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <h3>Course Syllabus</h3>
                    <ul class="syllabus-list">
                        ${subject.syllabus.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h3>Recommended Books</h3>
                    <ul class="books-list">
                        ${subject.books.map(book => `<li>${book}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Create modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .subject-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .close-modal {
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #000;
        }
        
        .syllabus-list, .books-list {
            list-style: none;
            padding: 0;
        }
        
        .syllabus-list li, .books-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .syllabus-list li:before {
            content: '📚';
            margin-right: 0.5rem;
        }
        
        .books-list li:before {
            content: '📖';
            margin-right: 0.5rem;
        }
        
        .modal-body h3 {
            margin: 1.5rem 0 1rem 0;
            color: #4a90e2;
        }
    `;

    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    document.head.appendChild(modalStyles);

    // Handle close modal
    const closeModal = () => {
        modalContainer.remove();
        modalStyles.remove();
    };

    modalContainer.querySelector('.close-modal').addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });
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
