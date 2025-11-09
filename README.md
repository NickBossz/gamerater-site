# GameRater

A comprehensive game rating platform where users can review games, discover new titles, and share their gaming experiences.

## Project Structure

This is a monorepo containing both frontend and backend applications:

```
gamerater/
├── backend/          # Spring Boot REST API
├── frontend/         # React web application
└── README.md         # This file
```

## Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.3.1** - Application framework
- **Spring Data JPA** - Database ORM
- **MySQL** - Relational database
- **Flyway** - Database migrations
- **Lombok** - Boilerplate code reduction
- **Maven** - Build tool

### Frontend
- **React** - UI library
- **[Additional technologies listed in frontend/README.md]**

## Features

- **Game Reviews** - Complete CRUD operations for game ratings and reviews
- **User Management** - User registration, authentication, and profile management
- **Report System** - Report inappropriate content and reviews
- **[Additional features]**

## Getting Started

### Prerequisites

- Java JDK 17 or higher
- Maven 3.x
- MySQL Server 5.7+
- Node.js 14+ (for frontend)
- npm or yarn (for frontend)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure the database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gamerater_api
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

3. Create the MySQL database:
   ```sql
   CREATE DATABASE gamerater_api;
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
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

The backend provides RESTful endpoints for:
- `/api/avaliacoes` - Game reviews management
- `/api/usuarios` - User management
- `/api/denuncias` - Report management

For detailed API documentation, see [backend/README.md](backend/README.md)

## Database Migrations

Database schema is managed using Flyway. Migration scripts are located in:
```
backend/src/main/resources/db/migration/
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
