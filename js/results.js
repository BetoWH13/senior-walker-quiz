/**
 * Walker Quiz - Results Logic
 * This file handles the calculation and display of quiz results
 */

// Walker types with their features and descriptions
const walkerTypes = {
    standard: {
        name: "Standard Walker",
        features: [
            "Maximum stability for full weight-bearing",
            "Lightweight aluminum frame",
            "Adjustable height for proper posture",
            "Foldable design for easy storage"
        ],
        description: "Ideal for users who need maximum stability and support. Perfect for indoor use and recovery after surgery."
    },
    rollator: {
        name: "Rollator Walker",
        features: [
            "Four wheels for smooth movement",
            "Built-in seat for resting",
            "Hand brakes for safety",
            "Storage basket for convenience",
            "Foldable for transport"
        ],
        description: "Perfect for users who need balance support but maintain some mobility. Great for shopping, errands, and social outings."
    },
    allTerrain: {
        name: "All-Terrain Walker",
        features: [
            "Large, durable wheels for outdoor use",
            "Enhanced stability on uneven surfaces",
            "Shock absorption for comfort",
            "Ergonomic handles to reduce strain",
            "Weather-resistant materials"
        ],
        description: "Designed for active users who enjoy outdoor activities. Provides stability on various terrains while supporting an active lifestyle."
    }
};

// Question weights for scoring (copied from quiz.js for reference)
const questionWeights = [
    {
        a: { standard: 3, rollator: 1, allTerrain: 0 },
        b: { standard: 0, rollator: 1, allTerrain: 3 },
        c: { standard: 1, rollator: 2, allTerrain: 2 }
    },
    {
        a: { standard: 1, rollator: 3, allTerrain: 2 },
        b: { standard: 3, rollator: 1, allTerrain: 0 },
        c: { standard: 2, rollator: 1, allTerrain: 1 }
    },
    {
        a: { standard: 0, rollator: 3, allTerrain: 2 },
        b: { standard: 3, rollator: 2, allTerrain: 1 },
        c: { standard: 0, rollator: 3, allTerrain: 2 },
        d: { standard: 2, rollator: 1, allTerrain: 1 }
    },
    {
        a: { standard: 3, rollator: 1, allTerrain: 0 },
        b: { standard: 1, rollator: 3, allTerrain: 2 },
        c: { standard: 0, rollator: 2, allTerrain: 3 },
        d: { standard: 0, rollator: 1, allTerrain: 3 }
    },
    {
        a: { standard: 2, rollator: 3, allTerrain: 1 },
        b: { standard: 2, rollator: 2, allTerrain: 1 },
        c: { standard: 3, rollator: 1, allTerrain: 1 }
    }
];

// DOM elements
const walkerTypeElement = document.getElementById('walkerType');
const walkerFeaturesElement = document.getElementById('walkerFeatures');

// Initialize results page
function initResults() {
    // Calculate and display results
    calculateAndDisplayResults();
    
    // Urgency timer removed as requested
}

// Calculate and display the quiz results
function calculateAndDisplayResults() {
    // Get user responses from localStorage
    const responses = JSON.parse(localStorage.getItem('walkerQuizResponses') || '{}');
    
    // If no responses, show default recommendation
    if (Object.keys(responses).length === 0) {
        displayWalkerRecommendation('rollator');
        return;
    }
    
    // Calculate scores for each walker type
    const scores = {
        standard: 0,
        rollator: 0,
        allTerrain: 0
    };
    
    // Loop through each question and add weights based on answers
    Object.entries(responses).forEach(([questionIndex, answer]) => {
        const qIndex = parseInt(questionIndex);
        const weights = questionWeights[qIndex][answer];
        
        if (weights) {
            scores.standard += weights.standard || 0;
            scores.rollator += weights.rollator || 0;
            scores.allTerrain += weights.allTerrain || 0;
        }
    });
    
    // Determine the highest scoring walker type
    let recommendedType = 'rollator'; // Default
    let highestScore = 0;
    
    Object.entries(scores).forEach(([type, score]) => {
        if (score > highestScore) {
            highestScore = score;
            recommendedType = type;
        }
    });
    
    // Display the recommendation
    displayWalkerRecommendation(recommendedType);
}

// Display the walker recommendation
function displayWalkerRecommendation(type) {
    const walker = walkerTypes[type];
    
    // Update walker type name
    if (walkerTypeElement) {
        walkerTypeElement.textContent = walker.name;
    }
    
    // Update features list
    if (walkerFeaturesElement) {
        walkerFeaturesElement.innerHTML = walker.features
            .map(feature => `<li>✓ ${feature}</li>`)
            .join('');
    }
}

// Urgency timer function removed as requested

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initResults);
