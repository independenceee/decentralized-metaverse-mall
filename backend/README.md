# 🔧 Backend - NestJS API Server

## 📋 Introduction

The backend of Decentralized Metaverse Mall is a powerful RESTful API built with **NestJS**, providing all necessary services for the decentralized e-commerce platform.

---

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.module.ts              # Root module
│   ├── main.ts                    # Entry point
│   ├── helpers/                   # Utility functions
│   ├── auth/                      # Authentication & authorization
│   ├── account/                   # Account management
│   ├── user/                      # User management
│   ├── category/                  # Product categories
│   ├── voucher/                   # Voucher system
│   ├── banner/                    # Banner management
│   ├── roadmap/                   # Project roadmap
│   ├── blockfrost/                # Blockfrost integration
│   ├── koios/                     # Koios integration
│   ├── emurgo/                    # Emurgo integration
│   ├── mail/                      # Email service
│   ├── prisma/                    # Prisma ORM configuration
│   ├── founder/                   # Founder management
│   └── dealhot/                   # Hot deals management
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration files
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Main Modules

### 🔐 Auth Module (`auth/`)

Handles user authentication and authorization.

**Features:**

- JWT-based authentication
- Login / Register
- Password hashing
- Authorization guards

**Files:**

- `auth.controller.ts` - Endpoints
- `auth.service.ts` - Business logic
- `auth.module.ts` - Module configuration
- `strategy/` - JWT strategy
- `guard/` - Auth guards
- `dto/` - Data transfer objects

### 👤 Account Module (`account/`)

Manages user account information.

**Features:**

- Update profile
- Personal information management
- Email/Phone verification
- Account security

### 👥 User Module (`user/`)

Manages global user data.

**Features:**

- Retrieve user data
- Update information
- Manage user status

### 📦 Category Module (`category/`)

Manages product categories.

**Features:**

- CRUD categories
- Filter & sort
- Category hierarchy
- Description & image management

### 🎟️ Voucher Module (`voucher/`)

Voucher and promotion management system.

**Features:**

- Create & delete vouchers
- Validate voucher codes
- Track usage
- Calculate discounts
- Manage expiration

### 🖼️ Banner Module (`banner/`)

Manages advertising banners.

**Features:**

- Create banners
- Schedule display
- Image management
- Click tracking

### 🗺️ Roadmap Module (`roadmap/`)

Manages project roadmap.

**Features:**

- Store project goals
- Track progress
- Manage versions

### ⛓️ Blockchain Modules

#### Blockfrost Module (`blockfrost/`)

Blockfrost API integration.

- Query Cardano network
- Transaction verification

#### Koios Module (`koios/`)

Koios API integration.

- Cardano on-chain data

#### Emurgo Module (`emurgo/`)

Emurgo services integration.

### 📧 Mail Module (`mail/`)

Email sending system.

**Features:**

- Send confirmation emails
- Password recovery emails
- Order notification emails
- Marketing emails

### 💾 Prisma Module (`prisma/`)

ORM configuration & database service.

**Features:**

- Database connection
- Query management
- Migration support

---

## 🚀 Quick Start

### Requirements

- Node.js v18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migration
npm run prisma:migrate

# Start development server
npm run start:dev
```

### Useful Commands

```bash
# Run in development mode
npm run start:dev

# Build production
npm run build

# Run production
npm run start:prod

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Lint code
npm run lint

# Format code
npm run format

# Prisma commands
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Run migrations
npm run prisma:studio       # Open Prisma Studio
```

---

## 🔧 Environment Variables

Create `.env` file in `backend/` folder:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dmm"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"

# Email Service
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"

# Blockchain APIs
BLOCKFROST_API_KEY="your-blockfrost-key"
KOIOS_API_URL="https://api.koios.rest/api/v0"

# Application
NODE_ENV="development"
PORT=3000
```

---

## 📊 Prisma ORM

### Database Schema

See [schema.prisma](./prisma/schema.prisma) for complete structure.

### Run Migrations

```bash
# Create new migration
npm run prisma:migrate -- --name add_new_feature

# Reset database
npm run prisma:reset

# View database with Prisma Studio
npm run prisma:studio
```

---

## 🛣️ API Endpoints

### Authentication

- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token

### Users

- `GET /user` - Get user information
- `PUT /user` - Update user
- `DELETE /user` - Delete account

### Categories

- `GET /category` - Get all categories
- `POST /category` - Create category (admin)
- `PUT /category/:id` - Update category
- `DELETE /category/:id` - Delete category

### Vouchers

- `GET /voucher` - Get vouchers
- `POST /voucher/validate` - Validate voucher
- `POST /voucher` - Create voucher (admin)

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📝 Linting & Formatting

```bash
# ESLint
npm run lint

# Format code with Prettier
npm run format
```

---

## 🐳 Docker

### Build Docker Image

```bash
docker build -t dmm-backend:latest .
```

### Run Container

```bash
docker run -p 3000:3000 --env-file .env dmm-backend:latest
```

### Docker Compose

```bash
docker-compose up -d
```

---

## 📚 Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

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

**Building the future of blockchain APIs! 🚀**
