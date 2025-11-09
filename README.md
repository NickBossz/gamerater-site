# GameRater

A comprehensive game rating platform where users can review games, discover new titles, share their gaming experiences, and create detailed game analyses.

## Project Structure

This is a monorepo containing both frontend and backend applications:

```
gamerater/
├── backend/          # Node.js/Express REST API
├── frontend/         # React web application
└── README.md         # This file
```

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.21** - Web application framework
- **Sequelize 6.37** - ORM for database management
- **SQLite3** - Lightweight database
- **CORS** - Cross-Origin Resource Sharing
- **node-fetch** - HTTP requests for external APIs
- **UUID** - Unique identifier generation

### Frontend
- **React 18.3** - UI library
- **React Router DOM 6.28** - Client-side routing
- **Axios 1.7** - HTTP client
- **React Scripts 5.0** - Build tooling
- **CSS Modules** - Scoped styling

## Features

### Core Functionality
- **Game Reviews (Avaliações)** - Rate and review games with a personalized rating system
- **Game Analyses (Análises)** - Create in-depth written analyses and reviews of games
- **User Management** - Registration, authentication, and profile management with custom profile images
- **Community Features** - Explore reviews and analyses from other users
- **Game Database** - Browse games with integrated external API data
- **Dynamic Rating System** - Automatic game rating updates based on user reviews

### Available Pages
- **Home** - Main dashboard
- **Login/Register** - User authentication
- **Game Details** - Individual game information and reviews
- **User Profile** - Personal profile with reviews and analyses
- **Community** - Discover content from other users
- **Analyses** - Browse and create detailed game analyses

## Getting Started

### Prerequisites

- **Node.js 14+** (for both frontend and backend)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The SQLite database (`Database.sqlite`) will be created automatically on first run

4. Start the server:
   ```bash
   npm start
   ```

The backend API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Documentation

The backend provides RESTful endpoints organized by resource:

### Games (`/jogos`)
- `GET /jogos` - List all games
- `GET /jogo/:id` - Get game by ID

### Reviews (`/avaliacoes`)
- `POST /avaliar/:id` - Create a new review
- `GET /avaliacoes/:username` - Get user's reviews
- `PUT /avaliacoes/:id` - Update a review

### Users (`/usuarios`)
- `POST /criarUsuario` - Create new user
- `GET /usuario/:username` - Get user by username
- `GET /usuarios` - List all users
- `DELETE /excluirUsuario/:username` - Delete user
- `POST /uploadperfilimage` - Upload profile image

### Analyses (`/analises`)
- `GET /analises` - List all analyses
- `GET /analisesDe/:username` - Get user's analyses
- `GET /analise/:id` - Get analysis by ID
- `POST /criarAnalise` - Create new analysis

## Database

The application uses SQLite as its database, with Sequelize ORM for data management. The database file (`Database.sqlite`) is stored in the backend directory and includes tables for:
- Games
- Reviews (Avaliações)
- Users (Usuários)
- Analyses (Análises)

## Project Architecture

### Backend Structure
```
backend/
├── CRUDS/
│   ├── Analises/       # Analysis CRUD operations
│   ├── Avaliacoes/     # Review CRUD operations
│   ├── Jogos/          # Game data and external API integration
│   └── Usuarios/       # User management
├── Database.sqlite     # SQLite database file
└── servidor.js         # Main Express server
```

### Frontend Structure
```
frontend/
└── src/
    └── pages/
        ├── home/           # Home page
        ├── login/          # Login page
        ├── registrar/      # Registration page
        ├── jogo/           # Game details page
        ├── perfil/         # User profile page
        ├── comunidade/     # Community page
        ├── analises/       # Analyses listing page
        └── analise/        # Individual analysis page
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/NickBossz/gamerater](https://github.com/NickBossz/gamerater)
