# Senior Walker Quiz

A lead generation quiz that helps seniors find the most suitable walker based on their mobility needs, usage environment, and personal preferences.

## Overview

This quiz serves as a lead magnet for [WalkerSupport.com](https://walkersupport.com), providing basic walker recommendations while encouraging users to visit the main website for more detailed, personalized advice.

## Features

- **Clinically-informed questions** based on mobility assessment tools used by physical therapists
- **Weighted scoring algorithm** that matches responses to appropriate walker types
- **Strategic lead capture** at optimal points in the user journey
- **Compelling results page** with social proof and urgency elements
- **Mobile-responsive design** for all devices
- **Exit-intent detection** to maximize conversion opportunities

## Project Structure

```
senior-walker-quiz/
├── index.html           # Main page with quiz structure
├── css/
│   ├── styles.css       # Main styles
│   └── quiz.css         # Quiz-specific styles
├── js/
│   ├── quiz.js          # Quiz flow and logic
│   └── results.js       # Results calculation and display
├── images/
│   ├── walker-types/    # Images for different walker types
│   └── ui/              # UI elements (icons, buttons, etc.)
└── README.md            # Project documentation
```

## Implementation Notes

- The quiz uses localStorage to store user responses and email information
- Lead capture occurs at the midpoint of the quiz and again on the results page
- All CTAs direct users to the main website at walkersupport.com
- The scoring algorithm weights different factors based on clinical considerations

## Deployment

This quiz is designed to be hosted on GitHub Pages or any static hosting service. It can be embedded on the main website or used as a standalone landing page.

## Future Enhancements

- Integration with email marketing platforms
- A/B testing different question sequences
- Adding more detailed walker models and specifications
- Implementing a backend to store user data and preferences
