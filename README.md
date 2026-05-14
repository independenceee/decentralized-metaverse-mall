<div align="center">
  <h2>Modern e-commerce platform built on blockchain and Web3 technologies</h2>
  <p><strong>Decentralized Metaverse Mall (DMM)</strong></p>
  <img src="./frontend/src/assets/images/logo.png" alt="DMM Logo" width="200" />
</div>
</br>

<div align="center">

[![GitHub License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com/)

</div>

## 📋 Project Introduction

**Decentralized Metaverse Mall (DMM)** is a revolutionary e-commerce platform that bridges the gap between traditional consumer electronics commerce and blockchain technology. Built on cutting-edge Web3 technologies, DMM enables cryptocurrency users to purchase real-world consumer products (particularly high-value electronic devices) while simultaneously helping convert new users into confident cryptocurrency investors.

The platform leverages blockchain transparency to ensure every transaction is verifiable, secure, and traceable, while maintaining an intuitive user experience that doesn't require cryptocurrency expertise to use.

### 🎯 Main Goals & Vision

**Primary Objectives:**

- **Transparent Supply Chain:** Implement blockchain-based tracking for all products from manufacturer to consumer, ensuring authenticity and preventing counterfeits
- **Secure Crypto Payments:** Enable safe, fast, and low-fee cryptocurrency transactions through integrated Cardano blockchain solutions
- **Mass Adoption Bridge:** Reduce friction for cryptocurrency newcomers by providing real-world utility and tangible products
- **Decentralized Verification:** Use smart contracts and blockchain oracles for transaction verification without intermediaries
- **Global Accessibility:** Support multi-currency payments and international shipping with transparent fees

**Secondary Goals:**

- Build a thriving community of crypto users and merchants
- Create educational resources for new cryptocurrency users
- Establish partnerships with major electronic manufacturers and retailers
- Develop reputation systems based on blockchain verification
- Implement DAO governance for platform decisions

---

## � Key Features

### For Customers

- **Easy Registration:** Sign up with email or existing cryptocurrency wallet
- **One-Click Checkout:** Streamlined purchase process with cryptocurrency payment integration
- **Transaction Transparency:** View complete order history on blockchain
- **Voucher System:** Apply discount codes and promotional vouchers to reduce costs
- **Order Tracking:** Real-time order status from warehouse to doorstep
- **Secure Payments:** Multiple payment methods including Cardano (ADA), Bitcoin, Ethereum
- **Buyer Protection:** Escrow system and dispute resolution mechanisms

### For Merchants/Vendors

- **Easy Storefront Setup:** Deploy your store without coding
- **Inventory Management:** Real-time stock tracking and automated reordering
- **Analytics Dashboard:** - API & Business Logic

A powerful, production-ready API server built with NestJS and TypeScript. Handles all business logic, data management, and blockchain interactions.

**Core Features:**

- 🔐 **JWT-based Authentication** - Secure user sessions and API token management
- 👤 **Account Management** - User profiles, KYC verification, preference storage
- 🛍️ **E-commerce Engine** - Product catalog, inventory, order processing
- 💳 **Payment Processing** - Cryptocurrency payment integration and transaction verification
- 🎟️ **Promotion System** - Voucher management, discount codes, flash sales
- ⛓️ **Blockchain Integration** - Cardano network interaction, smart contract verification
- 📧 **Notifications** - Email, SMS, and in-app notifications
- 📊 **Analytics** - Sales tracking, user insights, performance metrics

**Microservices/Modules:**

- `auth/` - User registration, login, token refresh, password recovery
- `account/` - User profile data, contact information, preferences
- `user/` - User management, role-based access control
- `category/` - Product categorization, taxonomy management
- `voucher/` - Discount code creation, validation, and tracking
- `banner/` - Marketing campaign management, promotional displays
- `roadmap/` - Project milestones and feature tracking
- `blockfrost/` - Cardano blockchain API integration
- `koios/` - Advanced blockchain state queries and verification
- `emurgo/` - Additional blockchain services and utilities
- `mail/` - Email delivery, transactional messages
- `founder/` - Admin/founder dashboard and controls
- `dealhot/` - Flash sales, time-limited offers, deals management
- `prisma/` - Database ORM and connection pooling

**Technology Stack:**

- NestJS 10.x - Progressive N - User Interface

A modern, responsive web application built with Next.js 14 and React. Provides an intuitive interface for customers, merchants, and administrators.

**Core Features:**

- 🎨 **Responsive Design** - Mobile-first approach, works on all devices
- 🔐 **Secure Authentication** - Login/signup with email or crypto wallets
- 🛍️ **Product Browsing** - Advanced search, filtering, and categorization
- 🛒 **Shopping Cart** - Persistent cart with cryptocurrency price conversion
- 💳 **Checkout Process** - One-page checkout with multiple payment options
- 👨‍💼 **Admin Dashboard** - Merchant and admin control panels
- 📊 **Analytics Dashboard** - Sales reports, customer insights, performance metrics
- 📱 **PWA Support** - Progressive Web App for offline functionality
- 🌐 **Internationalization** - Multi-language and multi-currency support
- ⚡ **Performance Optimized** - Code splitting, image optimization, caching

**User Sections:**

- **Customer Portal:**
  - Browse product categories and search products
  - View product details with images and reviews
  - Add items to shopping cart
  - Manage wishlists and favorites
  - Proceed to checkout with multiple payment methods
  - Track order status in real-time
  - View order history and invoices
  - Manage account settings and preferences
  - Submit product reviews and ratings
    (PostgreSQL) - Data Persistence Layer

Robust relational database system using PostgreSQL, managed through Prisma ORM with Docker containerization for consistent environments.

**Database Features:**

- 🗄️ **PostgreSQL 14+** - Battle-tested relational database
- 🔄 **Prisma ORM** - Type-safe database access with migrations
- 🐳 **Docker Deployment** - Containerized for consistent environments
- 🔒 **Encryption** - Data at rest and in transit encryption
- 🔐 **Access Control** - Role-based database access
- 📈 **Scalability** - Connection pooling and replication support
- 🛡️ **Backup & Recovery** - Automated backups and point-in-time recovery
- 📊 **Monitoring** - Query performance monitoring and logging

**Core Data Models:**

- **Users** - Customer and merchant accounts, authentication
- **Products** - Item inventory, pricing, descriptions
- **Categories** - Product classification and taxonomy
- **Orders** - Transaction records and order fulfillment
- **Vouchers** - Discount codes and promotional offers
- **Transactions** - Payment records and blockchain references
- **Reviews** - Product ratings and customer feedback
- **Banners** - Marketing campaign data
- **Analytics** - Usage statistics and metrics

**Performance Specifications:**

- Sub-100ms query response time for typical queries
- Support for millions of products and transactions
- Automatic index optimization
- Query result caching
- Read replica support for reporting

**Backup & Disaster Recovery:**

- Automated daily backups
- Point-in-time recovery capability
- Replication to backup database
- Regular restore testing
- Disaster recovery procedures documented

📍 [Detailed Database Documentation(customers, merchants, admins)

- Global analytics and platform metrics
- Voucher and promotion management
- Banner and marketing campaign controls
- Platform settings and configurations
- Transaction monitoring
- Support ticket management

**Technology Stack:**

- Next.js 14.1.0 - React metaframework
- React 18.x - UI library
- TypeScript 5.x - Type safety
- Redux Toolkit - State management
- SCSS/CSS Modules - Styling
- Axios - HTTP client
- Tailwind CSS - Utility-first CSS

**Features by Category:**

_Responsive & Performance:_

- Mobile-first responsive design (breakpoints for all device sizes)
- Automatic image optimization and lazy loading
- Code splitting and dynamic imports
- Server-side rendering (SSR) where beneficial
- Static site generation (SSG) for content pages

_State Management:_

- Redux for global application state
- Local component state for UI interactions
- Context API for theme and settings
- React hooks for side effects

_Security:_

- XSS protection through React's built-in escaping
- CSRF token handling for form submissions
- Secure cookie handling for authentication tokens
- Input validation and sanitization
- Content Security Policy headers

### Main Components

---

## 🏗️ Main Components

### 1. **Backend** (NestJS)

Powerful API server built with NestJS and TypeScript.

**Features:**

- ✅ User authentication and authorization
- ✅ Account and user profile management
- ✅ Product and category management
- ✅ Voucher and promotion system
- ✅ Blockchain integration (Blockfrost, Koios, Emurgo)
- ✅ Banner and roadmap management
- ✅ Email and notification system
- ✅ Prisma ORM database

**Main Modules:**

- `auth/` - JWT authentication
- `account/` - User account management
- `user/` - User data
- `category/` - Product categories
- `voucher/` - Voucher system
- `banner/` - Banner management
- `blockfrost/` - Blockfrost integration
- `koios/` - Koios integration
- `emurgo/` - Emurgo integration
- `mail/` - Email service
- `prisma/` - ORM & database

📍 [Backend Details](./backend/README.md)

### 2. **Frontend** (Next.js)

Modern web application with Next.js 14 and TypeScript.

**Features:**

- ✅ Optimized UI/UX
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Product category browsing
- ✅ Shopping cart management
- ✅ Redux state management
- ✅ Responsive design (CSS/SCSS)
- ✅ Custom hooks

**Main Folder Structure:**

- `app/` - App routes and layout
- `components/` - Reusable components
- `pages/` - Pages
- `redux/` - State management
- `hooks/` - Custom React hooks
- `utils/` - Utility functions
- `styles/` - Global SCSS

📍 [Frontend Details](./frontend/README.md)

### 3. **Database**

PostgreSQL deployed with Docker Compose.

**Features:**

- ✅ PostgreSQL database
- ✅ Docker containerization
- ✅ Prisma migrations
- ✅ Advanced ORM schema

📍 [Database Details](./database/README.md)

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- Docker & Docker Compose
- PostgreSQL 14+

### Installation & Running

#### 1. Clone Repository

```bash
git clone https://github.com/yourusername/decentralized-metaverse-mall.git
cd decentralized-metaverse-mall
```

#### 2. Install Backend

```bash
cd backend
npm install
npm run dev
```

#### 3. Install Frontend

```bash
cd ../frontend
npm install
npm run dev
```

#### 4. Setup Database

```bash
cd ../database
docker-compose up -d
```

---

## 🔗 Blockchain Integration

The project supports integration with multiple blockchain platforms:

| Service        | Description                             |
| -------------- | --------------------------------------- |
| **Blockfrost** | API to interact with Cardano blockchain |
| **Koios**      | API to query Cardano state              |
| **Emurgo**     | Additional blockchain services          |

---

## 📚 Technology Stack

### Backend

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT
- **API:** RESTful

### Frontend

- **Framework:** Next.js 14
- **Language:** TypeScript
- **State Management:** Redux
- **Styling:** SCSS
- **HTTP Client:** Fetch API / Axios

### DevOps

- **Container:** Docker
- **Orchestration:** Docker Compose
- **Database:** PostgreSQL

---

## 📖 Additional Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Database Setup](./database/README.md)
- [Prisma Schema](./backend/prisma/schema.prisma)

---

## 👥 Contributing

We welcome contributions from the community! Please create Pull Requests or Issues.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 🎯 Roadmap

**Phase 1 (Q2 2026)** ✅ Current

- Core e-commerce functionality
- Cardano blockchain integration
- Voucher system
- User authentication

**Phase 2 (Q3 2026)** 📅

- Smart contracts
- Analytics dashboard
- Merchant tools
- Multi-language support

**Phase 3 (Q4 2026)** 📅

- DAO governance
- Staking mechanisms
- Cross-chain support
- Mobile apps

**Phase 4 (Q1 2027)** 📅

- AI recommendations
- Supply chain tracking
- NFT integration
- Global expansion

---

**Building the Future of Decentralized Commerce** 🚀

_Last Updated: May 14, 2026_

[Backend](./backend/README.md) • [Frontend](./frontend/README.md) • [Database](./database/README.md)
