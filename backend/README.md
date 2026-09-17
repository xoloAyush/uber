# Uber Clone - Backend API Documentation

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** for user & captain authentication and profile management.

---

## 🚀 Getting Started

### Prerequisites & Environment Variables
Ensure the following variables are defined in your `backend/.env` file:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/uber
JWT=your_super_secret_jwt_key
```

### Start the Server
```bash
# Install dependencies
npm install

# Start in development mode (with nodemon)
npm run dev
```

- **Base URL:** `http://localhost:3001`

---

## 🔐 Authentication Overview

- **Token Type:** JSON Web Token (JWT) signed with secret key `process.env.JWT`.
- **Token Validity:** 24 hours (`expiresIn: "24h"`).
- **Delivery Methods:** The backend supports dual token extraction in protected routes:
  1. **HTTP-only Cookie:** `token` (automatically set on registration and login with `httpOnly: true`, `secure: true`, `sameSite: "strict"`, `maxAge: 24h`).
  2. **Authorization Header:** `Authorization: Bearer <token>`
- **Token Revocation / Blacklisting:** When logging out, the token is stored in the `blacklistToken` MongoDB collection with a 1-day TTL index to prevent reuse.

---

## 📋 Endpoints Overview

### General & User Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Server health check |
| `POST` | `/user/register` | Public | Register a new user and return auth token |
| `POST` | `/user/login` | Public | Authenticate user credentials and return auth token |
| `GET` | `/user/profile` | Protected | Fetch the authenticated user's profile |
| `POST` | `/user/logout` | Protected | Logout user, clear cookie, and blacklist token |

### Captain Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/captain/register` | Public | Register a new captain with vehicle details and return auth token |
| `POST` | `/captain/login` | Public | Authenticate captain credentials and return auth token |

---

## 📖 Detailed Endpoint Documentation

### 1. Health Check
Checks if the backend server is running.

- **URL:** `/`
- **Method:** `GET`
- **Auth Required:** No

#### Response:
- **Status:** `200 OK`
- **Body:**
  ```text
  Server is running
  ```

---

## 👤 User Authentication

### 2. User Registration
Registers a new user account, securely hashes the password with bcrypt, generates an auth token, and sets an HTTP-only cookie.

- **URL:** `/user/register`
- **Method:** `POST`
- **Auth Required:** No
- **Headers:** `Content-Type: application/json`

#### Validation Rules:
- `fullname.firstname`: String, required, 3–20 characters.
- `fullname.lastname`: String, required by user service, 3–20 characters if provided.
- `email`: String, required, valid email format, 5–30 characters, must be unique.
- `password`: String, required, minimum 6 characters (max 80).

#### Request Body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```

#### Responses:
- **`201 Created`** (Success)
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  *Sets HTTP-only cookie: `token=<jwt_token>`*

- **`409 Conflict`** (User already exists)
  ```json
  {
    "success": false,
    "message": "User already exists"
  }
  ```

- **`500 Internal Server Error`** (Validation failure or server error)
  ```json
  {
    "message": "First name must be at least 3 characters long"
  }
  ```

---

### 3. User Login
Authenticates an existing user with email and password, issues a fresh JWT, and sets an HTTP-only cookie.

- **URL:** `/user/login`
- **Method:** `POST`
- **Auth Required:** No
- **Headers:** `Content-Type: application/json`

#### Validation Rules:
- `email`: String, required, valid email, 5–30 characters.
- `password`: String, required, 6–80 characters.

#### Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```

#### Responses:
- **`201 Created`** (Success)
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  *Sets HTTP-only cookie: `token=<jwt_token>`*

- **`400 Bad Request`** (Email not found)
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

- **`401 Unauthorized`** (Password mismatch)
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

- **`500 Internal Server Error`** (Validation or server error)
  ```json
  {
    "message": "Password must be at least 6 characters long"
  }
  ```

---

### 4. Get User Profile
Fetches the authenticated user profile information.

- **URL:** `/user/profile`
- **Method:** `GET`
- **Auth Required:** Yes (`authUser` middleware)
- **Headers / Cookies:**
  - Header: `Authorization: Bearer <token>`
  - OR Cookie: `token=<jwt_token>`

#### Middleware Verification:
1. Extracts token from Cookie or `Authorization` header.
2. Checks MongoDB `blacklistToken` collection to verify the token is not revoked.
3. Decodes JWT using secret key `process.env.JWT`.
4. Attaches user ID (`decode._id`) to `req.user`.

#### Responses:
- **`200 OK`** (Success)
  ```json
  {
    "user": "64f1a2b3c4d5e6f7a8b9c0d1"
  }
  ```

- **`401 Unauthorized`** (Missing or blacklisted token)
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **`500 Internal Server Error`** (Invalid / expired token or server error)
  ```json
  {
    "message": "jwt expired"
  }
  ```

---

### 5. User Logout
Logs out the user by clearing the client cookie and saving the current JWT into the token blacklist with automatic 24-hour expiration.

- **URL:** `/user/logout`
- **Method:** `POST`
- **Auth Required:** Yes (`authUser` middleware)
- **Headers / Cookies:**
  - Header: `Authorization: Bearer <token>`
  - OR Cookie: `token=<jwt_token>`

#### Responses:
- **`200 OK`** (Success)
  ```json
  {
    "success": true,
    "message": "User logged out successfully"
  }
  ```
  *Clears `token` cookie and inserts token into `blacklistTokens` collection.*

- **`401 Unauthorized`** (Missing token or already blacklisted)
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## 🚗 Captain Authentication

### 6. Captain Registration
Registers a new captain (driver) account along with vehicle specifications, hashes the password using bcrypt, generates an auth token, and sets an HTTP-only cookie.

- **URL:** `/captain/register`
- **Method:** `POST`
- **Auth Required:** No
- **Headers:** `Content-Type: application/json`

#### Validation Rules:
- `fullname.firstname`: String, required, 3–20 characters.
- `fullname.lastname`: String, required by captain service, 3–20 characters if provided.
- `email`: String, required, valid email format, 5–30 characters, must be unique.
- `password`: String, required, minimum 6 characters (max 80).
- `status`: String, required, 3–20 characters (e.g., `"active"`, `"inactive"`).
- `vehicle.color`: String, required, 3–20 characters.
- `vehicle.plate`: String, required, 3–20 characters.
- `vehicle.capacity`: Integer, required, 3–20.
- `vehicle.vehicleType`: String, required, 3–20 characters, allowed values: `"car"`, `"motorcycle"`, `"auto"`.

#### Request Body:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secretpassword",
  "status": "inactive",
  "vehicle": {
    "color": "Black",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses:
- **`201 Created`** (Success)
  ```json
  {
    "success": true,
    "message": "Captain created successfully",
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "DL01AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  *Sets HTTP-only cookie: `token=<jwt_token>`*

- **`400 Bad Request`** (Captain already exists)
  ```json
  {
    "message": "Captain already exists"
  }
  ```

- **`500 Internal Server Error`** (Validation failure or missing fields)
  ```json
  {
    "message": "First name must be at least 3 characters long"
  }
  ```

---

### 7. Captain Login
Authenticates an existing captain using email and password, issues a fresh JWT, and sets an HTTP-only cookie.

- **URL:** `/captain/login`
- **Method:** `POST`
- **Auth Required:** No
- **Headers:** `Content-Type: application/json`

#### Validation Rules:
- `email`: String, required, valid email, 5–30 characters.
- `password`: String, required, 6–80 characters.

#### Request Body:
```json
{
  "email": "jane.doe@example.com",
  "password": "secretpassword"
}
```

#### Responses:
- **`201 Created`** (Success)
  ```json
  {
    "success": true,
    "message": "Captain logged in successfully",
    "data": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "DL01AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  *Sets HTTP-only cookie: `token=<jwt_token>`*

- **`400 Bad Request`** (Email not found)
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

- **`401 Unauthorized`** (Password mismatch)
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

- **`500 Internal Server Error`** (Validation or server error)
  ```json
  {
    "message": "Password must be at least 6 characters long"
  }
  ```

---

## 🗄️ Database Models Summary

### User (`models/user.model.js`)
- `fullname.firstname`: `String` (required, 3–20 chars)
- `fullname.lastname`: `String` (optional/required by service, 3–20 chars)
- `email`: `String` (required, unique, regex validated, 5–30 chars)
- `password`: `String` (required, min 6 chars, `select: false`)
- **Methods:**
  - `generateHashPassword(password)` (static): Generates bcrypt hash with salt 10.
  - `comparePassword(password)` (instance): Compares plaintext password against hashed password.
  - `generateAuthToken()` (instance): Signs and returns 24h JWT.

### Captain (`models/captain.model.js`)
- `fullname.firstname`: `String` (required, 3–20 chars)
- `fullname.lastname`: `String` (optional in schema, required by service, 3–20 chars)
- `email`: `String` (required, unique, regex validated, 5–30 chars)
- `password`: `String` (required, min 6 chars, `select: false`)
- `socketId`: `String` (optional socket connection identifier)
- `status`: `String` (enum: `['active', 'inactive']`, default `'inactive'`)
- `vehicle.color`: `String` (required, min 3 chars)
- `vehicle.plate`: `String` (required, min 3 chars)
- `vehicle.capacity`: `Number` (required, min 1 in schema, validator enforces 3–20)
- `vehicle.vehicleType`: `String` (required, enum: `['car', 'motorcycle', 'auto']`)
- `location.ltd`: `Number` (optional latitude)
- `location.lng`: `Number` (optional longitude)
- **Methods:**
  - `generateHashPassword(password)` (static): Generates bcrypt hash with salt 10.
  - `comparePassword(password)` (instance): Compares plaintext password against hashed password.
  - `generateAuthToken()` (instance): Signs and returns 24h JWT.

### BlacklistToken (`models/blacklistToken.model.js`)
- `token`: `String` (required, trimmed)
- `createdAt`: `Date` (default `Date.now`, expires in 1 day via MongoDB TTL)
