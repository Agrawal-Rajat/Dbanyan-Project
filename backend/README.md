# Dbanyan Group Backend API

High-performance FastAPI backend for Dbanyan Group's premium Moringa e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- MongoDB (local or Atlas)
- PowerShell (for Windows scripts)

### Setup & Run

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Start development server:**
   ```powershell
   .\start_dev.ps1
   ```
   This script will:
   - Create virtual environment
   - Install dependencies
   - Create .env from template
   - Start FastAPI server

3. **Update configuration:**
   - Edit `.env` file with your MongoDB URI
   - Add Razorpay credentials (optional for initial setup)

4. **Seed database (optional):**
   ```powershell
   .\seed_db.ps1
   ```

## 📁 Project Structure

```
backend/
├── models/           # Pydantic schemas and data models
│   └── __init__.py   # All models (Product, Order, User, etc.)
├── services/         # Business logic layer
│   ├── product_service.py
│   ├── order_service.py
│   ├── coupon_service.py
│   └── newsletter_service.py
├── routes/           # API endpoints
│   ├── products.py
│   ├── orders.py
│   ├── coupons.py
│   └── newsletter.py
├── config.py         # Settings and configuration
├── db.py            # Database connection and utilities
├── main.py          # FastAPI application
└── requirements.txt  # Python dependencies
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017
DB_NAME=dbanyan

# Security
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256

# API
API_V1_STR=/api/v1
DEBUG=True

# CORS (Frontend URLs)
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Payment (Razorpay)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
```

## 📚 API Documentation

Once running, access interactive docs at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🛠 Key Features

### ✅ Implemented
- **Product Management** - CRUD operations with inventory tracking
- **Order Processing** - Complete checkout flow with Razorpay
- **Inventory Management** - Atomic stock updates and validation
- **Coupon System** - Percentage and fixed amount discounts
- **Newsletter** - Email subscription management
- **Performance Optimized** - Database indexes and efficient queries

### 🔄 Architecture Highlights
- **UUID-based IDs** - No ObjectId usage as per requirements
- **Async/Await** - Full async operations with Motor
- **Transaction Support** - Atomic operations for inventory
- **Input Validation** - Pydantic models with validation
- **Error Handling** - Comprehensive exception management
- **CORS Configured** - Ready for frontend integration

## 📊 Database Schema

### Collections
- `products` - Product catalog with inventory
- `orders` - Order history and status
- `coupons` - Discount codes and rules
- `subscribers` - Newsletter subscriptions
- `users` - User accounts (for future admin)

### Key Indexes
- Products: `uid`, `category`, `is_active`, text search
- Orders: `uid`, `customer_email`, `status`, `created_at`
- Coupons: `code`, `is_active`, `expires_at`

## 🔧 API Endpoints

### Products (`/api/v1/products`)
- `GET /` - List products with filtering/pagination
- `GET /featured` - Homepage featured products
- `GET /search` - Text search products
- `GET /{uid}` - Single product details
- `POST /check-stock` - Validate cart stock

### Orders (`/api/v1/orders`)
- `POST /create` - Create order with Razorpay
- `POST /confirm-payment` - Confirm payment
- `GET /{uid}` - Order details
- `GET /customer/{email}` - Customer orders

### Coupons (`/api/v1/coupons`)
- `POST /validate` - Validate coupon code

### Newsletter (`/api/v1/newsletter`)
- `POST /subscribe` - Subscribe to newsletter
- `POST /unsubscribe` - Unsubscribe

## 🚀 Performance Features

1. **Database Optimization:**
   - Strategic indexes for fast queries
   - Aggregation pipelines for complex data
   - Connection pooling with Motor

2. **Response Optimization:**
   - Pagination for large datasets
   - Field selection for minimal data transfer
   - Response time headers

3. **Caching Ready:**
   - Service layer separation for easy Redis integration
   - Async architecture for high concurrency

## 🛡 Security Features

- Input validation with Pydantic
- CORS protection
- SQL injection prevention (NoSQL)
- Environment-based secrets
- Trusted host middleware

## 🔗 Frontend Integration

The API is optimized for React frontend with:
- Fast product listing for homepage
- Real-time stock validation
- Seamless checkout flow
- Error handling compatible with TanStack Query

## 📝 Development Notes

- **No ObjectId:** Uses UUID for all primary keys
- **Atomic Transactions:** Stock updates use MongoDB transactions
- **Async First:** All database operations are async
- **Type Safety:** Full Pydantic validation
- **Logging:** Comprehensive logging for debugging

## 🚢 Deployment Ready

- Environment-based configuration
- Health check endpoint (`/health`)
- Production/development modes
- Ready for Render deployment

---

Built with ❤️ for Dbanyan Group's premium Moringa products platform.
