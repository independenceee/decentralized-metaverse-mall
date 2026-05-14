# 🎨 Frontend - Next.js Web Application

## 📋 Introduction

The frontend of Decentralized Metaverse Mall is a modern web application built with **Next.js 14** and **TypeScript**, providing an optimized user interface for the e-commerce platform.

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── globals.scss           # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   ├── (admin)/               # Admin routes
│   │   └── ...                    # Other routes
│   ├── components/                # React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   └── ...
│   ├── pages/                     # Legacy page routes
│   ├── redux/                     # Redux state management
│   │   ├── store.ts
│   │   ├── slices/
│   │   └── hooks.ts
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── helpers/                   # Helper functions
│   ├── types/                     # TypeScript types
│   ├── constants/                 # App constants
│   ├── configs/                   # Configuration files
│   ├── contexts/                  # React contexts
│   ├── styles/                    # Global & shared styles
│   ├── assets/                    # Images, icons, fonts
│   ├── data/                      # Static data
│   ├── HOC/                       # Higher Order Components
│   ├── routes/                    # Route definitions
│   └── layouts/                   # Layout components
├── public/                        # Static assets
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📦 Folder Structure Details

### 🎯 App Router (`src/app/`)

- Uses Next.js 14 App Router
- File-based routing
- Layout components
- Dynamic routes

### 🧩 Components (`src/components/`)

Reusable React components:

- Header & Navigation
- Footer
- ProductCard
- CartItem
- Modal components
- Form components

### 🔴 Redux Store (`src/redux/`)

Global state management:

- `store.ts` - Redux store configuration
- `slices/` - Redux slices (reducers, actions)
- `hooks.ts` - Custom Redux hooks

### 🪝 Hooks (`src/hooks/`)

Custom React hooks:

- `useAuth()` - Authentication hook
- `useCart()` - Shopping cart hook
- `useProduct()` - Product data hook
- `useFetch()` - Data fetching hook

### 🛠️ Utilities (`src/utils/`)

Utility functions:

- API calls
- Data formatting
- Validation
- Local storage management

### 🎨 Styles (`src/styles/`)

SCSS styling:

- `globals.scss` - Global styles
- `variables.scss` - SCSS variables
- `mixins.scss` - SCSS mixins
- Component-specific styles

### 📊 Redux (`src/redux/`)

State Management:

- User authentication state
- Shopping cart state
- Product filters
- UI state

### 🔐 HOC (`src/HOC/`)

Higher Order Components:

- `withAuth` - Protect routes
- `withLayout` - Layout wrapper
- Error boundaries

---

## 🚀 Quick Start

### Requirements

- Node.js v18+
- npm or yarn

### Installation

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Access `http://localhost:3000` in your browser.

### Useful Commands

```bash
# Run development server
npm run dev

# Build production
npm run build

# Run production
npm run start

# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

---

## 🔧 Environment Variables

Create `.env.local` file in `frontend/` folder:

```env
# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"

# Authentication
NEXT_PUBLIC_JWT_STORAGE_KEY="dmm_token"

# Application
NEXT_PUBLIC_APP_NAME="Decentralized Metaverse Mall"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="your-analytics-id"
```

---

## 🎯 Pages & Routes

### Public Routes

- `/` - Home page
- `/products` - Product list
- `/products/:id` - Product details
- `/login` - Login
- `/register` - Register
- `/cart` - Shopping cart
- `/checkout` - Checkout

### Protected Routes (Requires login)

- `/account` - Account
- `/orders` - Orders
- `/wishlist` - Wishlist
- `/profile` - Profile

### Admin Routes

- `/admin` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/categories` - Manage categories
- `/admin/vouchers` - Manage vouchers
- `/admin/users` - Manage users
- `/admin/orders` - Manage orders

---

## 📦 Redux State Management

### Slices (Reducers)

```typescript
// User Slice
-loginUser -
    logoutUser -
    updateProfile -
    // Cart Slice
    addToCart -
    removeFromCart -
    updateQuantity -
    clearCart -
    // Product Slice
    fetchProducts -
    setFilters -
    sortProducts;
```

### Using Redux

```typescript
// Component
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function MyComponent() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  return (...)
}
```

---

## 🎨 Styling

### SCSS Variables

```scss
// colors
$primary: #0066cc
$secondary: #ff6600
$background: #f5f5f5

// spacing
$spacing-xs: 4px
$spacing-sm: 8px
$spacing-md: 16px
$spacing-lg: 24px

// breakpoints
$breakpoint-sm: 640px
$breakpoint-md: 768px
$breakpoint-lg: 1024px
```

### Responsive Design

```scss
@media (max-width: $breakpoint-md) {
    // Mobile styles
}
```

---

## 🔐 Authentication

### Login Flow

1. User enters email/password
2. Send request to API
3. Receive JWT token
4. Save token in localStorage/Redux
5. Redirect to dashboard

### Protected Routes

```typescript
// HOC withAuth
export default withAuth(DashboardPage);
```

---

## 🛒 Shopping Cart

### Cart State

```typescript
interface Cart {
    items: CartItem[];
    total: number;
    count: number;
}

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    name: string;
}
```

### Actions

- Add to cart
- Remove from cart
- Update quantity
- Clear cart
- Apply voucher

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🐳 Docker

### Build Docker Image

```bash
docker build -t dmm-frontend:latest .
```

### Run Container

```bash
docker run -p 3000:3000 dmm-frontend:latest
```

### Docker Compose

```bash
docker-compose up -d
```

---

## 📊 Performance

### Optimization Tips

- ✅ Code splitting
- ✅ Image optimization (next/image)
- ✅ Lazy loading components
- ✅ Bundle analysis
- ✅ CSS-in-JS optimization

### Metrics

```bash
# Analyze bundle size
npm run analyze
```

---

## 📚 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Redux** - State management
- **SCSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation (if using pages router)

---

## 🤝 Contributing

To contribute:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -am 'Add new feature'`
4. Push: `git push origin feature/your-feature`
5. Submit a Pull Request

---

## 📄 License

This project is licensed under [LICENSE](../LICENSE)

---

**Building user-friendly interfaces for blockchain! 🚀**
