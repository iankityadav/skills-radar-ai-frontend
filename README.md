# Radar Chart AI Frontend

A modern React application for generating AI-powered radar chart profiles from CVs.

## Features

- 🚀 Built with Vite for lightning-fast development
- ⚡ React 18 with modern hooks and components
- 🎨 Beautiful UI with TailwindCSS
- 🔄 State management with Redux Toolkit
- 📊 Interactive radar charts with Chart.js
- 🔗 Shareable profile links
- 🔐 GitHub OAuth authentication
- 📱 Fully responsive design

## Tech Stack

- **React 18+** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with RTK Query
- **Chart.js** - Interactive charts
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend server running on port 3001

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Update the environment variables as needed
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── store/              # Redux store and slices
├── api/                # RTK Query API definitions
├── utils/              # Utility functions
├── styles/             # Global styles
└── main.jsx            # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Authentication
- GitHub OAuth integration
- Persistent login state
- Protected routes

### CV Processing
- File upload with validation
- AI-powered data extraction
- Manual data correction interface

### Radar Chart Generation
- Interactive radar charts
- Customizable categories
- Export and sharing capabilities

### Shareable Profiles
- Unique URLs for each profile
- Embeddable charts
- Social media sharing

## Environment Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_FRONTEND_URL` - Frontend URL for OAuth
- `VITE_NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License