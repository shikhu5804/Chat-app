# User Authentication API

This project provides user authentication functionalities including signup, login, logout, profile update, and authorization using JWT and MongoDB.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt
- Cloudinary

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```sh
   DB_CONNECT=<your_mongoDB_connection_string>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

4. Start the server:

   ```sh
   npm start
   ```

## API Endpoints

### 1. User Registration

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**

  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "profilepic": "<image_url>"
  }
  ```

- **Response:**

  ```json
  {
    "user": { ... },
    "token": "<jwt_token>"
  }
  ```

### 2. User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Response:**

  ```json
  {
    "message": "User logged in successfully"
  }
  ```

### 3. User Logout

- **Endpoint:** `/logout`
- **Method:** `POST`
- **Description:** Log out the user.
- **Response:**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### 4. Update Profile Picture

- **Endpoint:** `/update-profile`
- **Method:** `PUT`
- **Description:** Update user's profile picture.
- **Headers:**
  - `Cookie: token=<jwt_token>`
- **Request Body:**

  ```json
  {
    "profilepic": "<new_image_url>"
  }
  ```

- **Response:**

  ```json
  {
    "profilepic": "<updated_image_url>", ...
  }
  ```

### 5. Check Authentication

- **Endpoint:** `/check`
- **Method:** `GET`
- **Description:** Check if user is authenticated.
- **Headers:**
  - `Cookie: token=<jwt_token>`
- **Response:**

  ```json
  {
    "_id": "<user_id>",
    "fullname": "John Doe",
    "email": "john@example.com",
    "profilepic": "<image_url>",
    ...
  }
  ```

## Error Handling

All error responses are in the format:

```json
{
  "message": "Error message"
}
```

## Middleware

- **protectedRoute:** Protects routes by checking JWT token.

## License

This project is licensed under the MIT License.

