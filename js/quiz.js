/**
 * Walker Quiz - Main Quiz Logic
 * This file handles the quiz flow, question display, and user interaction
 */

// Quiz questions with options and scoring weights
const questions = [
    {
        question: "Where will you primarily use your walker?",
        answers: {
            a: "Indoors (narrow spaces)",
            b: "Outdoors (uneven terrain)",
            c: "Both indoor and outdoor"
        },
        weights: {
            a: { standard: 3, rollator: 1, allTerrain: 0 },
            b: { standard: 0, rollator: 1, allTerrain: 3 },
            c: { standard: 1, rollator: 2, allTerrain: 2 }
        }
    },
    {
        question: "How would you describe your mobility needs?",
        answers: {
            a: "Occasional stability support",
            b: "Full weight-bearing assistance",
            c: "Post-surgery recovery"
        },
        weights: {
            a: { standard: 1, rollator: 3, allTerrain: 2 },
            b: { standard: 3, rollator: 1, allTerrain: 0 },
            c: { standard: 2, rollator: 1, allTerrain: 1 }
        }
    },
    {
        question: "Do you have any of these physical considerations?",
        answers: {
            a: "Limited hand strength or arthritis",
            b: "Balance issues or dizziness",
            c: "Limited stamina/need to rest frequently",
            d: "None of the above"
        },
        weights: {
            a: { standard: 0, rollator: 3, allTerrain: 2 },
            b: { standard: 3, rollator: 2, allTerrain: 1 },
            c: { standard: 0, rollator: 3, allTerrain: 2 },
            d: { standard: 2, rollator: 1, allTerrain: 1 }
        }
    },
    {
        question: "Which activities are most important to you?",
        answers: {
            a: "Basic household activities",
            b: "Shopping and errands",
            c: "Social outings and travel",
            d: "Exercise and longer walks"
        },
        weights: {
            a: { standard: 3, rollator: 1, allTerrain: 0 },
            b: { standard: 1, rollator: 3, allTerrain: 2 },
            c: { standard: 0, rollator: 2, allTerrain: 3 },
            d: { standard: 0, rollator: 1, allTerrain: 3 }
        }
    },
    {
        question: "How important is it that your walker can be folded or transported in a vehicle?",
        answers: {
            a: "Very important – I need to transport it regularly",
            b: "Somewhat important – I occasionally need to transport it",
            c: "Not important – It will stay in one location"
        },
        weights: {
            a: { standard: 2, rollator: 3, allTerrain: 1 },
            b: { standard: 2, rollator: 2, allTerrain: 1 },
            c: { standard: 3, rollator: 1, allTerrain: 1 }
        }
    }
];

// Quiz state variables
let currentQuestion = 0;
const userResponses = {};

// DOM elements
const startBtn = document.getElementById('startQuiz');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const progressBar = document.querySelector('.progress');
const currentQuestionNum = document.getElementById('currentQuestionNum');
const totalQuestions = document.getElementById('totalQuestions');

// Initialize the quiz
function initQuiz() {
    // Set total questions
    totalQuestions.textContent = questions.length;
    
    // Hide previous button on first question
    prevBtn.style.display = 'none';
    
    // Add event listeners
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', handleNextButton);
    
    // Add label click handlers for answer selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('answer-option') || e.target.parentElement.classList.contains('answer-option')) {
            const label = e.target.classList.contains('answer-option') ? e.target : e.target.parentElement;
            const radio = label.querySelector('input[type="radio"]');
            
            // Deselect all options
            const allOptions = document.querySelectorAll('.answer-option');
            allOptions.forEach(option => option.classList.remove('selected'));
            
            // Select clicked option
            label.classList.add('selected');
            radio.checked = true;
        }
    });
}

// Start the quiz
function startQuiz() {
    hideSection('intro');
    showSection('questions');
    showQuestion();
}

// Display the current question
function showQuestion() {
    const q = questions[currentQuestion];
    
    // Update question number and progress bar
    currentQuestionNum.textContent = currentQuestion + 1;
    updateProgress();
    
    // Build question HTML
    let html = `<h3>${q.question}</h3>`;
    
    // Add answer options
    Object.entries(q.answers).forEach(([key, value]) => {
        const isChecked = userResponses[currentQuestion] === key ? 'checked' : '';
        const isSelected = userResponses[currentQuestion] === key ? 'selected' : '';
        
        html += `
            <label class="answer-option ${isSelected}">
                <input type="radio" name="q${currentQuestion}" value="${key}" ${isChecked}>
                ${value}
            </label>
        `;
    });
    
    // Update the question container
    questionContainer.innerHTML = html;
    
    // Show/hide previous button
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    
    // Update next button text
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'See Results →' : 'Next →';
}

// Handle next button click
function handleNextButton() {
    // Get selected answer
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    // Validate answer selection
    if (!selectedOption) {
        alert('Please select an answer to continue.');
        return;
    }
    
    // Save response
    userResponses[currentQuestion] = selectedOption.value;
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        calculateResults();
    }
}

// Show previous question
function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Calculate quiz results and show results page
function calculateResults() {
    // Store responses for results.js to use
    localStorage.setItem('walkerQuizResponses', JSON.stringify(userResponses));
    
    // Show results section
    hideSection('questions');
    showSection('results');
    
    // Results.js will handle the actual calculation and display
}

// Helper function to hide a section
function hideSection(sectionId) {
    document.getElementById(sectionId).classList.remove('active');
}

// Helper function to show a section
function showSection(sectionId) {
    document.getElementById(sectionId).classList.add('active');
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', initQuiz);
