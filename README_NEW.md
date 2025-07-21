# 🌿 Dbanyan Group - Premium Organic Moringa E-commerce Platform

A high-performance, visually stunning e-commerce platform for premium organic Moringa products, built with modern technologies and focused on user experience, sustainability, and wellness.

## ✨ Features

### 🛍️ Core E-commerce
- **Premium Product Catalog** - Moringa powder, capsules, tea, and oil
- **Smart Shopping Cart** - Persistent cart with real-time updates
- **Secure Checkout** - Razorpay integration with guest checkout option
- **Order Management** - Real-time order tracking and status updates

### 🔐 Authentication & User Management
- **JWT-based Authentication** - Secure login/signup with email verification
- **Admin Dashboard** - Comprehensive admin panel for inventory management
- **Guest Checkout** - Purchase without registration for convenience
- **Password Reset** - Email-based password recovery with secure tokens

### 🎨 Modern UI/UX
- **Enhanced Landing Page** - Interactive animations and scroll effects
- **Organic Design Theme** - Green color palette reflecting nature and health
- **Mobile-First Responsive** - Optimized for all devices
- **Smooth Animations** - Framer Motion for engaging user interactions
- **Interactive Elements** - Hover effects, parallax scrolling, and micro-interactions

### 📚 Educational Content
- **Moringa Guide** - Comprehensive information about Moringa benefits
- **Expert Opinions** - Scientific research and expert testimonials
- **Health Benefits** - Detailed nutritional information and usage guides

### 🌱 Sustainability Focus
- **Organic Certification** - 100% organic, chemical-free products
- **Farmer Partnerships** - Direct relationships with local organic farmers
- **Environmental Impact** - Sustainability information and eco-friendly practices

## 🚀 Technology Stack

### Frontend
- **React 18.3.1** - Latest stable version for better performance
- **Vite** - Fast build tool and development server
- **Mantine UI** - Modern React components library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Zustand** - Lightweight state management
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing

### Backend
- **FastAPI** - Modern, fast Python web framework
- **MongoDB** - NoSQL database with UUID-based documents
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation and serialization
- **JWT** - JSON Web Tokens for authentication
- **Razorpay** - Payment gateway integration
- **Email Service** - SMTP-based email notifications

### DevOps & Tools
- **Docker** - Containerization (optional)
- **Git** - Version control
- **ESLint** - Code linting
- **PowerShell Scripts** - Automated startup and deployment

## 📋 Prerequisites

- **Node.js** v18 or higher
- **Python** 3.9 or higher
- **MongoDB** (Atlas or local instance)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/dbanyan-project.git
cd dbanyan-project
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Environment Configuration
Create `.env` file in the backend directory:
```env
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/
DB_NAME=dbanyan

# Security
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# API Configuration
API_V1_STR=/api/v1
PROJECT_NAME=Dbanyan Group API
DEBUG=True

# CORS Settings
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@dbanyan.com
FROM_NAME=Dbanyan Group
FRONTEND_URL=http://localhost:5173
```

#### Database Setup
```bash
# Seed the database with sample data
python seed_db.py
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend/dbanyan
npm install
```

#### Environment Configuration
Create `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Start the Application

#### Option 1: Full Stack Startup (Recommended)
```bash
# From project root
./start_full_stack.ps1
```

#### Option 2: Manual Startup

**Start Backend:**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Start Frontend:**
```bash
cd frontend/dbanyan
npm run dev
```

## 🔑 Admin Setup

### Create First Admin User
```bash
# Using curl (replace with your details)
curl -X POST "http://localhost:8000/api/v1/auth/create-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dbanyan.com",
    "password": "SecureAdminPassword123!",
    "full_name": "Dbanyan Admin",
    "admin_secret": "dbanyan_admin_2025"
  }'
```

### Using Postman
1. **URL:** `POST http://localhost:8000/api/v1/auth/create-admin`
2. **Headers:** `Content-Type: application/json`
3. **Body:**
```json
{
  "email": "admin@dbanyan.com",
  "password": "SecureAdminPassword123!",
  "full_name": "Dbanyan Admin",
  "admin_secret": "dbanyan_admin_2025"
}
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with token
- `GET /api/v1/auth/me` - Get current user info
- `PUT /api/v1/auth/profile` - Update user profile

### Admin Endpoints
- `POST /api/v1/auth/create-admin` - Create first admin (restricted)

### Product Endpoints
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/{id}` - Get product details
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/{id}` - Update product (admin only)
- `DELETE /api/v1/products/{id}` - Delete product (admin only)

### Order Endpoints
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List user orders
- `GET /api/v1/orders/{id}` - Get order details

## 🎨 Design System

### Color Palette
- **Primary Green:** `#059669` (Emerald 600)
- **Secondary Green:** `#2C5F2D` (Dark Green)
- **Light Green:** `#D1FAE5` (Emerald 100)
- **Accent Orange:** `#F59E0B` (Amber 500)
- **Text Dark:** `#1F2937` (Gray 800)
- **Text Light:** `#6B7280` (Gray 500)

### Typography
- **Headings:** Lora (serif) - for elegance and readability
- **Body Text:** Inter (sans-serif) - for modern clarity
- **UI Elements:** System fonts for performance

### Animation Principles
- **Smooth Transitions:** 300ms ease-in-out
- **Parallax Effects:** Scroll-based transformations
- **Hover States:** Scale and color transitions
- **Loading States:** Skeleton screens and spinners

## 📱 Pages & Components

### Enhanced Pages
- **Landing Page** - Hero section, benefits, testimonials, call-to-action
- **About Page** - Company story, mission, vision, timeline
- **Products Page** - Product grid with filtering and search
- **Product Detail** - Detailed product information and add to cart
- **Checkout** - Multi-step checkout process
- **Login/Signup** - Authentication forms with validation
- **Admin Dashboard** - Product and order management

### Interactive Components
- **Modern Navbar** - Responsive navigation with smooth animations
- **Enhanced Hero** - Parallax background with animated elements
- **Benefit Cards** - Interactive cards with hover effects
- **Expert Opinions** - Scientific research and testimonials
- **Product Cards** - Engaging product displays with quick actions
- **Shopping Cart** - Slide-out cart with real-time updates

## 🔧 Development Guidelines

### Code Organization
- **Modular Architecture** - Separate concerns and reusable components
- **Consistent Naming** - Follow established naming conventions
- **Type Safety** - Use PropTypes or TypeScript for better development
- **Performance** - Optimize images, lazy load components, minimize bundles

### Best Practices
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliance
- **SEO Optimization** - Meta tags, structured data, sitemap
- **Error Handling** - Graceful error states and user feedback

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn for production
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email:** support@dbanyan.com
- **Documentation:** Check this README and inline code comments
- **Issues:** Use GitHub Issues for bug reports and feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 🌱 About Dbanyan Group

Dbanyan Group is committed to bringing the incredible health benefits of organic Moringa to health-conscious individuals worldwide. Our mission is to provide the highest quality, pure Moringa products while supporting sustainable farming practices and empowering rural communities.

**Experience the power of nature's most complete superfood.**

---

*Made with 💚 by the Dbanyan Group team*
