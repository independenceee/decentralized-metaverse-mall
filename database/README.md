# 💾 Database - PostgreSQL Setup

## 📋 Introduction

The database layer of Decentralized Metaverse Mall uses **PostgreSQL** managed by **Prisma ORM** and deployed with **Docker Compose**.

---

## 🗄️ Database Structure

### Main Tables

#### Users Table

```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- fullName (VARCHAR)
- avatar (TEXT)
- isVerified (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

#### Account Table

```sql
- id (UUID, PK)
- userId (UUID, FK)
- phone (VARCHAR)
- address (VARCHAR)
- city (VARCHAR)
- country (VARCHAR)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

#### Categories Table

```sql
- id (UUID, PK)
- name (VARCHAR)
- description (TEXT)
- icon (TEXT)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

#### Vouchers Table

```sql
- id (UUID, PK)
- code (VARCHAR, UNIQUE)
- discountPercent (FLOAT)
- maxUses (INT)
- usedCount (INT)
- expiresAt (TIMESTAMP)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

#### Banners Table

```sql
- id (UUID, PK)
- title (VARCHAR)
- image (TEXT)
- link (VARCHAR)
- isActive (BOOLEAN)
- displayOrder (INT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

---

## 🚀 Quick Start

### Requirements

- Docker
- Docker Compose
- PostgreSQL 14+ (or run in Docker)

### Installation & Running

#### 1. Start Database with Docker Compose

```bash
# From database/ folder
cd database

# Create and run containers
docker-compose up -d

# Check status
docker-compose ps
```

#### 2. Run Migrations

```bash
# From backend/ folder
cd ../backend

# Setup environment variables
cp .env.example .env

# Run migrations
npm run prisma:migrate

# Seed database (if available)
npm run prisma:seed
```

#### 3. View Database with Prisma Studio

```bash
npm run prisma:studio
```

---

## 🔧 Docker Compose Configuration

### File: `docker-compose.yaml`

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:14
    container_name: dmm_postgres
    environment:
      POSTGRES_DB: dmm
      POSTGRES_USER: dmm_user
      POSTGRES_PASSWORD: dmm_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - dmm_network

volumes:
  postgres_data:

networks:
  dmm_network:
    driver: bridge
```

---

## 📝 Prisma Schema

### Example Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  fullName  String?
  avatar    String?
  isVerified Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  account   Account?
}

model Account {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  phone     String?
  address   String?
  city      String?
  country   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🛠️ Useful Commands

### Database Management

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker-compose exec postgres psql -U dmm_user -d dmm

# Remove volume (delete all data)
docker-compose down -v
```

### Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create migration
npm run prisma:migrate -- --name add_new_table

# Apply unapplied migrations
npm run prisma:migrate:deploy

# Reset database
npm run prisma:reset

# View database GUI
npm run prisma:studio

# Validate schema
npm run prisma:validate
```

---

## 🔄 Migrations

### Migration Creation Process

1. **Edit `schema.prisma`**

```prisma
model NewTable {
  id    Int     @id @default(autoincrement())
  name  String
}
```

2. **Create migration**

```bash
npm run prisma:migrate -- --name add_new_table
```

3. **Review migration file** in `prisma/migrations/`

4. **Apply migration**

```bash
npm run prisma:migrate:deploy
```

### Example Migration

Create file: `prisma/migrations/{timestamp}_add_new_table/migration.sql`

```sql
-- CreateTable
CREATE TABLE "NewTable" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
```

---

## 🔐 Backup & Restore

### Backup Database

```bash
# Dump database
docker-compose exec postgres pg_dump -U dmm_user dmm > backup.sql
```

### Restore Database

```bash
# Restore from backup
docker-compose exec -T postgres psql -U dmm_user dmm < backup.sql
```

---

## 📊 Database Monitoring

### Check Database Size

```bash
docker-compose exec postgres psql -U dmm_user -d dmm -c "SELECT pg_size_pretty(pg_database_size('dmm')) as size;"
```

### Check Table Sizes

```bash
docker-compose exec postgres psql -U dmm_user -d dmm -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size FROM pg_tables WHERE schemaname = 'public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

---

## 🔐 Security Best Practices

### Production Setup

1. **Use Strong Passwords**

```env
POSTGRES_PASSWORD=YourSecurePassword123!
```

2. **Enable SSL Connection**

```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

3. **Regular Backups**

```bash
# Automated backup script
0 2 * * * pg_dump ... > backup_$(date +\%Y\%m\%d).sql
```

4. **Limit Database Access**

- Only allow from trusted networks
- Use VPN/firewall

5. **Monitor & Alert**

- Setup monitoring tools
- Set up alerts for connection issues

---

## 📚 Connection String Formats

### Local Development

```
postgresql://dmm_user:dmm_password@localhost:5432/dmm
```

### Docker Compose

```
postgresql://dmm_user:dmm_password@postgres:5432/dmm
```

### Production

```
postgresql://user:password@host.amazonaws.com:5432/db?sslmode=require
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 5432
lsof -i :5432

# Kill process
kill -9 PID
```

### Connection Refused

```bash
# Check container status
docker-compose ps

# Restart container
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Migration Failed

```bash
# View migration status
npm run prisma:migrate:status

# Resolve manually
npm run prisma:migrate:resolve -- --rolled-back

# Reset (development only)
npm run prisma:reset
```

---

## 📄 License

This project is licensed under [LICENSE](../LICENSE)

---

**Safe and efficient data management! 🚀**
