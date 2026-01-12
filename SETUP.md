# Axel ERP - Setup Guide

## Quick Start Guide

### 1. Prerequisites Installation

Ensure you have the following installed:
- **JDK 17** or higher ([Download](https://adoptium.net/))
- **Node.js 16+** and npm ([Download](https://nodejs.org/))
- **MySQL 8.0+** ([Download](https://dev.mysql.com/downloads/mysql/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))

### 2. Database Setup

Start MySQL and create the database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE axel_erp;
exit;
```

### 3. Backend Setup

Navigate to backend directory:
```bash
cd axel-erp-backend
```

Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

### 4. Frontend Setup

Open a new terminal and navigate to frontend directory:
```bash
cd axel-erp-frontend
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

Frontend will start at: `http://localhost:3000`

### 5. Initial Data (Optional)

Load sample data:
```bash
mysql -u root -p axel_erp < sample-data.sql
```

### 6. First Login

1. Open browser to `http://localhost:3000`
2. Click "Register" to create an account
3. Or use sample credentials:
   - Username: `admin`
   - Password: `password`

## Development Workflow

### Running Tests

Backend:
```bash
cd axel-erp-backend
mvn test
```

### Building for Production

Backend:
```bash
cd axel-erp-backend
mvn clean package
java -jar target/axel-erp-backend-1.0.0.jar
```

Frontend:
```bash
cd axel-erp-frontend
npm run build
# Serve the dist folder with any static server
```

## Project Architecture

### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Repositories**: Data access layer (JPA)
- **Models**: Entity classes mapped to database tables
- **DTOs**: Data Transfer Objects for API responses
- **Security**: JWT authentication and authorization

### Frontend Architecture
- **Components**: Reusable React components
- **Services**: API communication layer
- **Context**: Global state management
- **Hooks**: Custom React hooks
- **Routing**: React Router for navigation

## API Testing

You can test APIs using tools like Postman or curl:

### Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/inventory/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in application.properties
- Check port 8080 is not in use

### Frontend won't start
- Check Node.js version (should be 16+)
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is not in use

### Cannot connect to backend from frontend
- Ensure backend is running on port 8080
- Check CORS configuration in CorsConfig.java
- Verify API base URL in frontend/src/services/api.js

## Default User Roles

- **ADMIN**: Full system access, can manage all modules
- **MANAGER**: Can manage inventory, employees, and view reports
- **EMPLOYEE**: Limited access to assigned modules

## Module Overview

### 1. Inventory Management
- Manage products with SKU tracking
- Supplier information
- Purchase order processing
- Low stock alerts

### 2. Employee Management
- Employee records and profiles
- Attendance tracking with check-in/out times
- Leave application and approval workflow
- Department and designation management

### 3. CRM (Customer Relationship Management)
- Customer database with company information
- Support ticket system with priority levels
- Ticket status tracking

### 4. Accounts & Finance
- Transaction management (Credit/Debit)
- Invoice generation with tax calculation
- Financial summary reports
- Revenue tracking and reporting

## Security Features

- JWT-based authentication
- BCrypt password encryption
- Role-based access control (RBAC)
- CORS protection
- SQL injection protection (JPA)
- XSS protection

## Performance Optimization

### Backend
- Connection pooling configured
- Lazy loading for JPA entities
- Response caching where appropriate

### Frontend
- Code splitting with React Router
- Lazy loading of components
- Optimized bundle size with Vite

## Production Deployment

### Backend Deployment
1. Build JAR: `mvn clean package`
2. Set production profile: `export SPRING_PROFILES_ACTIVE=prod`
3. Configure production database
4. Deploy JAR to server
5. Run with: `java -jar axel-erp-backend-1.0.0.jar`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist` folder to web server (Nginx, Apache, etc.)
3. Configure proxy to backend API

## Environment Variables

### Backend
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`

### Frontend
- `VITE_API_URL` (if using different backend URL)

## Next Steps

After basic setup:
1. Customize the JWT secret in production
2. Set up proper MySQL user with limited privileges
3. Configure SSL/TLS for production
4. Set up logging and monitoring
5. Implement database backups
6. Add unit and integration tests
7. Set up CI/CD pipeline

## Support

For issues and questions:
- Check the main README.md
- Review API documentation
- Check server logs for errors

## License

MIT License - see LICENSE file for details
