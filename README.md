# Split Bill App

A modern, responsive web application for splitting bills between friends. Easily add items, assign people, and calculate who owes what.

## Key Features

- **Intuitive UI** with dark/light theme support
- **Dynamic bill management** with real-time calculations
- **Flexible person assignment** to bill items
- **Smart cost distribution** across multiple people
- **Interactive summary** with expandable cards
- **Friends management** with quick selection dropdown
- **Settings dropdown** with integrated theme toggle
- **Persistent preferences** stored in localStorage
- **Responsive design** optimized for mobile and desktop

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React Context API, React Hooks
- **Backend**: Express.js (REST API)
- **Architecture**: Monorepo with client/server separation
- **Styling**: Tailwind CSS with dark mode support

## Installation & Setup

### Local Development

```bash
# Install dependencies
npm install

# Start client (development mode)
npm run dev

# Start server
npm run server

# Start both client and server
npm run dev:all
```

### Docker

#### Development with Docker

```bash
# Start in development mode (from project root)
npm run docker:dev

# Or directly
docker-compose -f docker/docker-compose.yml --profile dev up --build

# Stop
npm run docker:dev:down
# or
docker-compose -f docker/docker-compose.yml --profile dev down
```

#### Production with Docker

```bash
# Start in production mode (from project root)
npm run docker:prod

# Or directly
docker-compose -f docker/docker-compose.yml --profile prod up --build -d

# Stop
npm run docker:prod:down
# or
docker-compose -f docker/docker-compose.yml --profile prod down

# View logs
npm run docker:logs
```

#### Available Ports

- **Development**: 
  - Frontend: http://localhost:5173 (Vite dev server)
  - Backend API: http://localhost:5000
- **Production**:
  - Express server (frontend + API): http://localhost:5000
  - Nginx (all requests): http://localhost:80

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── client/                 # Client-side (React + TypeScript)
│   ├── api/               # API client and services
│   ├── components/        # React components
│   │   ├── modals/        # Modal windows
│   │   ├── FriendSelector.tsx    # Friend selection dropdown
│   │   ├── SettingsDropdown.tsx  # Settings with theme toggle
│   │   └── ...
│   ├── contexts/          # React contexts (Theme, Modal, Auth)
│   └── types/             # TypeScript type definitions
└── server/                # Server-side (Express + TypeScript)
    └── routes/            # API routes
```

## Usage Guide

1. **Add People**: Use the input field or select from your saved friends list
2. **Add Items**: Create bill items with name and price
3. **Assign People**: Select who should pay for each item
4. **View Summary**: Check the calculated amount each person owes
5. **Manage Settings**: Use the settings dropdown to toggle theme, manage currency, or edit friends

## Features in Detail

### Friends Management
- Save frequently used friends for quick access
- Dropdown selector for easy person addition
- Persistent storage in localStorage

### Theme System
- Integrated theme toggle in settings dropdown
- Automatic system theme detection
- Persistent theme preference across sessions

### Responsive Design
- Mobile-first approach with responsive layouts
- Touch-friendly interface on mobile devices
- Optimized button sizing and spacing

## Performance Optimizations

- **React Optimization**: useCallback and useMemo for render optimization
- **Calculation Memoization**: Smart caching of bill calculations
- **CSS Optimization**: Tailwind CSS with purging for minimal bundle size
- **Component Architecture**: Modular components for better code splitting

## License

MIT
