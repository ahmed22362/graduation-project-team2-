# Pet Adoption Website - Backend

The Pet Adoption Website Backend is the server-side application responsible for handling the functionality and data management of the Pet Adoption Website. Built with Node.js and Sequelize, this backend provides the necessary APIs and database functionality to support the frontend and facilitate the pet adoption process.

## Features

1. User Authentication Provides user registration, login, and authentication using JSON Web Tokens (JWT).

2. User Authorization: Implements role-based access control (RBAC) to authorize user actions based on their roles (e.g., admin, adopter).

3. Pet Listings Management: Enables administrators to manage pet listings, including creating, updating, and deleting pet information.

4. Adoption Applications: Handles adoption applications submitted by potential adopters, allowing administrators to review and process them.

5. Messaging System: Implements a messaging system to enable communication between potential adopters and shelters/rescuers.

6. Reviews and Testimonials: Manages user reviews and testimonials, showcasing positive adoption experiences and feedback from adopters.

7. Image Uploads: Supports image uploads for pet listings and user avatars.

8. Search Functionality: Implements search functionality to enable users to search for pets based on various criteria.

## Installation

1. Clone the repository:

```
git clone https://github.com/ahmed22362/graduation-project-team2-.git
```

2. Navigate to the project directory:

```
cd pet_adoption_backend
```

3. Install the required dependencies:

```
npm install
```

4. Set up the database:

   - Set up the PostgreSQL database:
     Create a PostgreSQL database and update the database configuration in the .env file.

5. Start the server:

```
npm start
```

The backend server should now be running at `http://localhost:3000`.

Configuration

- Database: Configure the PostgreSQL database connection in the .env file.

```
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

- JWT Secret: Set the JWT secret key in the `.env` file:

```
JWT_SECRET=your_secret_key
```

API Documentation

The API documentation for the Pet Adoption Website Backend can be found in the `API Documentation` file.

Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework
- PostgreSQL: Relational database management system
- JWT: JSON Web Tokens for user authentication
- Multer: Middleware for handling file uploads
- Bcrypt: Password hashing and encryption

  Contributing

Contributions to the Pet Adoption Website Backend are welcome! If you have any suggestions or find any issues, please create a pull request or submit an issue in the repository.

License

This backend application is licensed under the MIT License, allowing free use, modification, and distribution.
