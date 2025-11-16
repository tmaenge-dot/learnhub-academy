# Educational Platform

A comprehensive multi-subject educational website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Multiple Subjects**: Shorthand, Mathematics, Science, Languages, Programming, Business
- **Mobile Apps**: Download section for educational mobile apps (Shorthand Simplified)
- **Modular Design**: Easy to add new subjects and resources
- **Responsive**: Works on desktop, tablet, and mobile
- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
edu-platform/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Homepage with subject cards
│   ├── subjects/            # Subject pages
│   │   └── [id]/            # Dynamic subject pages
│   └── apps/                # Mobile app pages
│       └── shorthand/
│           └── download/    # App download page
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Site footer
├── data/                    # Data and content
│   └── subjects.ts         # Subject definitions
├── public/                  # Static files
│   └── downloads/          # Downloadable files (APKs, PDFs)
└── README.md

## Adding New Content

### Add a New Subject

Edit `data/subjects.ts`:

\`\`\`typescript
{
  id: "history",
  name: "History",
  description: "Explore world history from ancient to modern times",
  icon: "🏛️",
  lessonCount: 30,
  resourceCount: 100,
  color: "indigo",
}
\`\`\`

### Add App Downloads

1. Place your APK/AAB file in `public/downloads/`
2. Update the download link in `app/apps/shorthand/download/page.tsx`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

### Deploy to Your Own Server

1. Build for production:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## Adding the Shorthand App

To make the Shorthand Simplified app downloadable:

1. Copy your APK file to `public/downloads/`:
```bash
cp /home/oem/Desktop/shorthand-simplified/build/shorthand-simplified.aab public/downloads/
```

2. Convert AAB to APK (if needed):
```bash
bundletool build-apks --bundle=public/downloads/shorthand-simplified.aab --output=public/downloads/shorthand-simplified.apks --mode=universal
```

3. The download link is already configured at `/apps/shorthand/download`

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:

\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: "#3b82f6",  // Change this
      secondary: "#8b5cf6", // And this
    },
  },
}
\`\`\`

### Branding
- Update the site name in `components/Header.tsx` and `components/Footer.tsx`
- Modify metadata in `app/layout.tsx`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel / Netlify / Self-hosted

## License

MIT License - feel free to use for your own educational projects!

## Support

For questions or issues, create an issue in the repository or contact the development team.
