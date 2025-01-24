![Angular](https://img.shields.io/badge/Angular-red?style=for-the-badge)![Bootstrap](https://img.shields.io/badge/Bootstrap-blueviolet?style=for-the-badge)
![](https://img.shields.io/badge/Json_web_token-blue?style=for-the-badge)





# Auth Frontend

Welcome to the **Auth Frontend**, an Angular based authentication 
and authorization interface providing secure API endpoints for user management and authentication.

## Combined Project

This project is part of a combined solution that includes a backend service built with Spring Boot.  
You can find the backend repository here: [Auth Service Backend](https://github.com/stefano-maglione/Auth-service-JWT)

Together, these two repositories provide an authentication system, including user registration, login, and secure API access.


## Features

- **JWT-Based Authentication:**

  - Secure login via JWT tokens received from the backend.
  - Token storage and automatic inclusion in API requests.
  - Authorization via role-based access (User, Admin, SuperAdmin).

- **User Registration and Form Handling:**

  - Reactive Forms with validation (email, password strength, etc.).
  - Custom validators (password matching, input sanitization).
  - Error handling and notification messages.

- **Responsive UI:**

  - Theme switching (dark/light mode).
  - Password strength indicator.
  - Bootstrap CSS styling for consistent UI.

- **Secure API Communication:**

  - JWT interceptor to attach tokens to requests.
  - CORS handling for frontend-backend communication.

- **Modular Structure:**

  - **Standalone Components:**
    - Components such as `ThemeSwitcherComponent` and `PasswordStrengthComponent` are modular and reusable.
    - Uses Angular’s standalone feature to improve performance and maintainability.
  - **Service-Based Architecture:**
    - Centralized business logic in services like `AuthService` and `JwtService`.
    - Separation of concerns for improved maintainability.




## Technologies Used
- **Angular 19**
- **TypeScript**
- **RxJS**
- **Bootstrap**
- **Docker**


## Getting Started


### Installation

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:stefano-maglione/Auth-frontend-JWT.git
   cd Auth-frontend-JWT
   ```

### Running with Docker Compose

1. **Build and Run the Container:**
   ```bash
   docker compose up --build
   ```
2. **Start the backend service** [Auth Service Backend](https://github.com/stefano-maglione/Auth-service-JWT)
3. **Open the app:**  http://localhost/
### Preloaded user:
    - email: "admin@gmail.com", password: "adminPassword"


### Testing

 ```bash
   npm run test
   ```

## Improvements for future versions
Remember me and forget password.
