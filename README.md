# Axel ERP - Enterprise Resource Planning System

A comprehensive, web-based ERP system built with Spring Boot backend and React frontend.

## 🚀 Features

### Modules

1. **Inventory Management**
   - Product management with SKU tracking
   - Supplier management
   - Purchase order processing
   - Low stock alerts

2. **Employee Management**
   - Employee records and profiles
   - Attendance tracking
   - Leave management system
   - Department and designation tracking

3. **CRM (Customer Relationship Management)**
   - Customer database
   - Support ticket system
   - Customer interaction tracking

4. **Accounts & Finance**
   - Transaction management
   - Invoice generation
   - Financial reports
   - Revenue tracking

5. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (ADMIN, MANAGER, EMPLOYEE)
   - Secure password encryption

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (with JWT)
- **Spring Data JPA**
- **MySQL** Database
- **Hibernate ORM**
- **Maven** Build Tool
- **Lombok** (for reducing boilerplate)

### Frontend
- **React 18**
- **React Router** (for navigation)
- **Axios** (for API calls)
- **Vite** (build tool)
- **CSS3** (custom styling)

## 📁 Project Structure

```
Axel_ERP/
├── axel-erp-backend/          # Spring Boot Backend
│   ├── src/main/java/com/axelerp/
│   │   ├── AxelErpApplication.java
│   │   ├── config/            # Security, CORS, JWT configuration
│   │   ├── controller/        # REST API Controllers
│   │   ├── service/           # Business Logic
│   │   ├── repository/        # Data Access Layer
│   │   ├── model/             # Entity Classes
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── security/          # JWT & Security Components
│   │   └── exception/         # Exception Handlers
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-dev.properties
│   └── pom.xml
│
└── axel-erp-frontend/         # React Frontend
    ├── src/
    │   ├── components/        # React Components
    │   │   ├── auth/         # Login, Register
    │   │   ├── common/       # Navbar, Sidebar, Footer
    │   │   ├── dashboard/    # Dashboard
    │   │   ├── inventory/    # Inventory Module
    │   │   ├── employees/    # Employee Module
    │   │   ├── crm/          # CRM Module
    │   │   └── accounts/     # Accounts Module
    │   ├── services/         # API Service Layer
    │   ├── context/          # React Context
    │   ├── hooks/            # Custom Hooks
    │   └── styles/           # CSS Styles
    └── package.json
```

## 🔧 Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE axel_erp;
   ```

2. **Configure Database**
   
   Edit `axel-erp-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/axel_erp
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

3. **Build and Run Backend**
   ```bash
   cd axel-erp-backend
   mvn clean install
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd axel-erp-frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:3000`

## 📡 API Documentation

### Authentication APIs
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Inventory APIs
- `GET /api/inventory/products` - List all products
- `POST /api/inventory/products` - Create product
- `PUT /api/inventory/products/{id}` - Update product
- `DELETE /api/inventory/products/{id}` - Delete product
- `GET /api/inventory/products/low-stock` - Get low stock products
- `GET /api/inventory/suppliers` - List suppliers
- `GET /api/inventory/purchase-orders` - List purchase orders

### Employee APIs
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/{id}/attendance` - Get attendance
- `POST /api/employees/attendance` - Mark attendance
- `GET /api/employees/{id}/leaves` - Get leaves
- `POST /api/employees/leaves` - Apply for leave

### CRM APIs
- `GET /api/crm/customers` - List customers
- `POST /api/crm/customers` - Create customer
- `PUT /api/crm/customers/{id}` - Update customer
- `DELETE /api/crm/customers/{id}` - Delete customer
- `GET /api/crm/tickets` - List tickets
- `POST /api/crm/tickets` - Create ticket

### Accounts APIs
- `GET /api/accounts/transactions` - List transactions
- `POST /api/accounts/transactions` - Create transaction
- `GET /api/accounts/transactions/summary` - Financial summary
- `GET /api/accounts/invoices` - List invoices
- `POST /api/accounts/invoices` - Create invoice
- `GET /api/accounts/revenue` - Revenue report

## 🔐 Security

- JWT tokens for authentication
- BCrypt password encryption
- CORS enabled for frontend
- Role-based access control
- Secure HTTP-only sessions

## 🎯 Default Roles

- **ADMIN** - Full system access
- **MANAGER** - Management level access
- **EMPLOYEE** - Basic access

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Note:** This is a scaffold/starter project. Additional features and enhancements can be added based on specific business requirements.
