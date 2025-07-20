# Dbanyan Group Project - Libraries Overview

This document provides a detailed list of all major libraries used in the Dbanyan Group project, including their purpose, use case, recommended stable versions (as of July 2025), and documentation links.

---

## Frontend (React/Vite)

### 1. React
- **Description:** Core JavaScript library for building user interfaces.
- **Use Case:** All UI components, pages, and state management.
- **Recommended Version:** `18.3.1`
- [Docs](https://react.dev/)

### 2. Vite
- **Description:** Fast build tool and development server for modern web projects.
- **Use Case:** Project scaffolding, hot module replacement, fast builds.
- **Recommended Version:** `5.x`
- [Docs](https://vitejs.dev/)

### 3. Tailwind CSS
- **Description:** Utility-first CSS framework for rapid UI development.
- **Use Case:** Styling components, responsive design, custom themes.
- **Recommended Version:** `3.x`
- [Docs](https://tailwindcss.com/)

### 4. Mantine
- **Description:** React component library with beautiful UI elements.
- **Use Case:** Forms, modals, navigation, cards, buttons, etc.
- **Recommended Version:** `7.x`
- [Docs](https://mantine.dev/)

### 5. Framer Motion
- **Description:** Animation and gesture library for React.
- **Use Case:** Page transitions, button animations, interactive effects.
- **Recommended Version:** `10.x`
- [Docs](https://www.framer.com/motion/)

### 6. TanStack Query (React Query)
- **Description:** Powerful data-fetching and caching library for React.
- **Use Case:** API calls, caching, background updates, optimistic UI.
- **Recommended Version:** `5.x`
- [Docs](https://tanstack.com/query/latest)

### 7. Zustand
- **Description:** Minimal, fast state management for React.
- **Use Case:** Global state (auth, cart, etc.), store management.
- **Recommended Version:** `4.x`
- [Docs](https://zustand-demo.pmnd.rs/)

### 8. React Hook Form
- **Description:** Performant, flexible form library for React.
- **Use Case:** Form validation, input management, error handling.
- **Recommended Version:** `7.x`
- [Docs](https://react-hook-form.com/)

### 9. React Helmet Async
- **Description:** Manage document head for SEO in React apps.
- **Use Case:** Dynamic meta tags, page titles, SEO optimization.
- **Recommended Version:** `1.x`
- [Docs](https://github.com/staylor/react-helmet-async)

### 10. @tabler/icons-react
- **Description:** SVG icon set for React.
- **Use Case:** Icons for navigation, buttons, UI elements.
- **Recommended Version:** `2.x`
- [Docs](https://tabler-icons.io/)

---

## Backend (FastAPI/Python)

### 1. FastAPI
- **Description:** Modern, fast (async) Python web framework.
- **Use Case:** REST API, authentication, routing, validation.
- **Recommended Version:** `0.110.x`
- [Docs](https://fastapi.tiangolo.com/)

### 2. Motor
- **Description:** Async MongoDB driver for Python.
- **Use Case:** Database access, CRUD operations, async queries.
- **Recommended Version:** `3.x`
- [Docs](https://motor.readthedocs.io/)

### 3. Pydantic
- **Description:** Data validation and settings management using Python type hints.
- **Use Case:** Request/response schemas, model validation.
- **Recommended Version:** `2.x`
- [Docs](https://docs.pydantic.dev/)

### 4. python-dotenv
- **Description:** Loads environment variables from `.env` files.
- **Use Case:** Secret management, config loading.
- **Recommended Version:** `1.x`
- [Docs](https://pypi.org/project/python-dotenv/)

### 5. PyJWT
- **Description:** JSON Web Token implementation in Python.
- **Use Case:** Authentication, token generation/validation.
- **Recommended Version:** `2.x`
- [Docs](https://pyjwt.readthedocs.io/)

### 6. Razorpay Python SDK
- **Description:** Payment gateway integration for Razorpay.
- **Use Case:** Payment processing, order creation, refunds.
- **Recommended Version:** `1.x`
- [Docs](https://github.com/razorpay/razorpay-python)

### 7. python-multipart
- **Description:** Multipart form data parser for FastAPI.
- **Use Case:** File uploads, form handling.
- **Recommended Version:** `0.0.7`
- [Docs](https://pypi.org/project/python-multipart/)

### 8. starlette
- **Description:** Lightweight ASGI framework/toolkit (used by FastAPI).
- **Use Case:** Middleware, background tasks, CORS, static files.
- **Recommended Version:** `0.36.x`
- [Docs](https://www.starlette.io/)

### 9. email-validator
- **Description:** Validates email addresses.
- **Use Case:** User registration, newsletter signup.
- **Recommended Version:** `2.x`
- [Docs](https://pypi.org/project/email-validator/)

### 10. python-dateutil
- **Description:** Powerful extensions to the standard datetime module.
- **Use Case:** Date parsing, timezone handling.
- **Recommended Version:** `2.x`
- [Docs](https://dateutil.readthedocs.io/)

### 11. uuid
- **Description:** Built-in Python module for generating UUIDs.
- **Use Case:** Unique IDs for users, products, orders.
- **Recommended Version:** Built-in (no install needed)
- [Docs](https://docs.python.org/3/library/uuid.html)

### 12. pytest
- **Description:** Python testing framework.
- **Use Case:** Unit and integration tests.
- **Recommended Version:** `8.x`
- [Docs](https://docs.pytest.org/)

### 13. passlib
- **Description:** Password hashing library.
- **Use Case:** Secure password storage and verification.
- **Recommended Version:** `1.7.x`
- [Docs](https://passlib.readthedocs.io/)

---

## Other/Dev Tools

### 1. Uvicorn
- **Description:** ASGI server for FastAPI.
- **Use Case:** Running the backend server.
- **Recommended Version:** `0.29.x`
- [Docs](https://www.uvicorn.org/)

### 2. Vite/React Scripts
- **Description:** Build and dev server for frontend.
- **Use Case:** Local development, hot reload.
- **Recommended Version:** Use latest Vite.

### 3. PowerShell Scripts
- **Description:** Startup scripts for backend/frontend/dev.
- **Use Case:** Easy local development and deployment.

---

## How to Choose Stable Versions
- Always use the latest stable (non-beta) version unless you have a specific compatibility need.
- Pin versions in `package.json` (frontend) and `requirements.txt` (backend).
- Check official docs for breaking changes before upgrading.

---

## Summary Table

| Library                | Use Case                        | Recommended Version | Docs/Link                        |
|------------------------|---------------------------------|--------------------|----------------------------------|
| React                  | UI Components                   | 18.3.1             | https://react.dev/               |
| Vite                   | Build Tool                      | 5.x                | https://vitejs.dev/              |
| Tailwind CSS           | Styling                         | 3.x                | https://tailwindcss.com/         |
| Mantine                | UI Library                      | 7.x                | https://mantine.dev/             |
| Framer Motion          | Animation                       | 10.x               | https://framer.com/motion/       |
| TanStack Query         | Data Fetching                   | 5.x                | https://tanstack.com/query       |
| Zustand                | State Management                | 4.x                | https://zustand-demo.pmnd.rs/    |
| React Hook Form        | Forms                           | 7.x                | https://react-hook-form.com/     |
| React Helmet Async     | SEO                             | 1.x                | https://github.com/staylor/react-helmet-async |
| @tabler/icons-react    | Icons                           | 2.x                | https://tabler-icons.io/         |
| FastAPI                | Backend API                     | 0.110.x            | https://fastapi.tiangolo.com/    |
| Motor                  | MongoDB Async                   | 3.x                | https://motor.readthedocs.io/    |
| Pydantic               | Validation                      | 2.x                | https://docs.pydantic.dev/       |
| python-dotenv          | Env Vars                        | 1.x                | https://pypi.org/project/python-dotenv/ |
| PyJWT                  | JWT Auth                        | 2.x                | https://pyjwt.readthedocs.io/    |
| Razorpay Python SDK    | Payments                        | 1.x                | https://github.com/razorpay/razorpay-python |
| python-multipart       | File Uploads                    | 0.0.7              | https://pypi.org/project/python-multipart/ |
| starlette              | ASGI Toolkit                    | 0.36.x             | https://www.starlette.io/        |
| email-validator        | Email Validation                | 2.x                | https://pypi.org/project/email-validator/ |
| python-dateutil        | Date/Time                       | 2.x                | https://dateutil.readthedocs.io/ |
| uuid                   | Unique IDs                      | Built-in           | https://docs.python.org/3/library/uuid.html |
| pytest                 | Testing                         | 8.x                | https://docs.pytest.org/         |
| passlib                | Password Hashing                | 1.7.x              | https://passlib.readthedocs.io/  |
| Uvicorn                | ASGI Server                     | 0.29.x             | https://www.uvicorn.org/         |

---

If you need a full `requirements.txt` or `package.json` template with pinned versions, let me know!
