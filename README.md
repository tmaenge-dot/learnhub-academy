# Shorthand Simplified 📝

A comprehensive mobile learning app for mastering shorthand writing skills. Built with React Native and Expo.

## Features

### 🏠 Home Screen
- Welcome message and introduction to shorthand
- Key learning principles
- Quick navigation to all sections
- Motivational content

### ✏️ Strokes
- 18+ basic shorthand strokes
- Categorized by type (consonants, vowels, blends)
- Search functionality
- Symbol representations with examples
- Detailed descriptions for each stroke

### 📋 Shortforms
- 26+ common shortform abbreviations
- Organized by category (common, business, legal, medical)
- Quick reference for frequently used words
- Search and filter options

### 💬 Phrases
- 20+ common phrase combinations
- Real-world usage examples
- Shorthand representations
- Step-by-step writing instructions

### 📚 Outlines
- 24+ complete word outlines
- Difficulty levels (beginner, intermediate, advanced)
- Detailed stroke breakdowns
- Progressive learning path

### ❓ Q&A
- 20+ frequently asked questions
- Categories: basics, rules, practice, tips
- Expandable answers
- Comprehensive guidelines for word representation
- Learning tips and best practices

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **UI Components**: Custom themed components
- **State Management**: React hooks (useState)

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shorthand-simplified
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Install Expo Go from App Store or Play Store
   - Scan the QR code shown in terminal
   - Or press `a` for Android emulator, `i` for iOS simulator

## Development

### Project Structure
```
shorthand-simplified/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based screens
│   │   ├── index.tsx      # Home screen
│   │   ├── strokes.tsx    # Strokes learning
│   │   ├── shortforms.tsx # Shortforms reference
│   │   ├── phrases.tsx    # Phrases practice
│   │   ├── outlines.tsx   # Word outlines
│   │   └── qa.tsx         # Q&A guidelines
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/             # Theme and constants
├── data/                  # Educational content
│   ├── strokes.ts
│   ├── shortforms.ts
│   ├── phrases.ts
│   ├── outlines.ts
│   └── qa.ts
├── types/                 # TypeScript type definitions
└── assets/                # Images and static files
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## Adding Content

### To add more strokes:
Edit `/data/strokes.ts` and add new stroke objects following the existing pattern.

### To add more shortforms:
Edit `/data/shortforms.ts` with new shortform entries.

### To add more phrases:
Edit `/data/phrases.ts` with additional phrase combinations.

### To add more outlines:
Edit `/data/outlines.ts` with new word outlines.

### To add more Q&A:
Edit `/data/qa.ts` with additional questions and answers.

## Customization

### Colors and Theme
Edit `/constants/theme.ts` to customize the color scheme.

### App Name and Metadata
Edit `app.json` to change app name, description, and other metadata.

## Building for Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:
- Building for Android/iOS
- Publishing to Google Play Store
- Publishing to Apple App Store
- Managing updates

## Features to Consider Adding

- [ ] Bookmarking/favorites functionality
- [ ] Progress tracking
- [ ] Practice exercises and quizzes
- [ ] Speed testing with timer
- [ ] User notes/annotations
- [ ] Dark mode toggle
- [ ] Audio pronunciations
- [ ] Handwriting practice area
- [ ] Export notes functionality
- [ ] Achievement system
- [ ] Multiple shorthand systems support

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Bug fixes
- New content (strokes, shortforms, phrases, outlines)
- Feature enhancements
- Documentation improvements

## License

This project is open source and available under the MIT License.

## Contact

For questions, suggestions, or feedback, please open an issue in the repository.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons by [SF Symbols](https://developer.apple.com/sf-symbols/)
- Inspired by traditional shorthand systems (Gregg, Pitman, Teeline)

---

**Happy Learning! Master shorthand, write faster, achieve more! 🚀**
