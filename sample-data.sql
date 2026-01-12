-- Axel ERP Sample Data Script
-- Run this script after the application creates the database schema

USE axel_erp;

-- Sample Users
INSERT INTO users (username, email, password, role, created_at) VALUES
('admin', 'admin@axelerp.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ADMIN', NOW()),
('manager', 'manager@axelerp.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'MANAGER', NOW()),
('employee', 'employee@axelerp.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'EMPLOYEE', NOW());
-- Note: All passwords are 'password' (BCrypt encrypted)

-- Sample Products
INSERT INTO products (name, description, sku, price, quantity, reorder_level, category, created_at, updated_at) VALUES
('Laptop Dell XPS 15', 'High-performance laptop for business', 'DELL-XPS-001', 1299.99, 15, 5, 'Electronics', NOW(), NOW()),
('Wireless Mouse', 'Ergonomic wireless mouse', 'MOUSE-001', 29.99, 50, 10, 'Accessories', NOW(), NOW()),
('Office Chair', 'Ergonomic office chair', 'CHAIR-001', 299.99, 8, 3, 'Furniture', NOW(), NOW()),
('USB-C Cable', '2m USB-C charging cable', 'CABLE-001', 9.99, 100, 20, 'Accessories', NOW(), NOW()),
('Monitor 27"', '27-inch 4K monitor', 'MON-001', 399.99, 12, 5, 'Electronics', NOW(), NOW());

-- Sample Suppliers
INSERT INTO suppliers (name, email, phone, address, created_at) VALUES
('TechSupply Co.', 'contact@techsupply.com', '+1-555-0101', '123 Tech Street, Silicon Valley, CA', NOW()),
('Office Depot', 'sales@officedepot.com', '+1-555-0102', '456 Office Ave, New York, NY', NOW()),
('Electronics Hub', 'info@electronichub.com', '+1-555-0103', '789 Electronics Blvd, Austin, TX', NOW());

-- Sample Employees
INSERT INTO employees (first_name, last_name, email, phone, department, designation, salary, joining_date, status) VALUES
('John', 'Doe', 'john.doe@axelerp.com', '+1-555-1001', 'IT', 'Senior Developer', 85000.00, '2023-01-15', 'ACTIVE'),
('Jane', 'Smith', 'jane.smith@axelerp.com', '+1-555-1002', 'HR', 'HR Manager', 75000.00, '2023-02-01', 'ACTIVE'),
('Bob', 'Johnson', 'bob.johnson@axelerp.com', '+1-555-1003', 'Sales', 'Sales Executive', 65000.00, '2023-03-10', 'ACTIVE'),
('Alice', 'Williams', 'alice.williams@axelerp.com', '+1-555-1004', 'IT', 'Junior Developer', 55000.00, '2023-04-20', 'ACTIVE'),
('Charlie', 'Brown', 'charlie.brown@axelerp.com', '+1-555-1005', 'Finance', 'Accountant', 70000.00, '2023-05-05', 'ACTIVE');

-- Sample Customers
INSERT INTO customers (name, email, phone, address, company, created_at) VALUES
('Acme Corporation', 'contact@acme.com', '+1-555-2001', '100 Business Pkwy, Chicago, IL', 'Acme Corp', NOW()),
('Global Tech Solutions', 'info@globaltech.com', '+1-555-2002', '200 Innovation Dr, Seattle, WA', 'Global Tech', NOW()),
('StartUp Inc', 'hello@startup.com', '+1-555-2003', '300 Venture Ln, San Francisco, CA', 'StartUp Inc', NOW());

-- Sample Tickets
INSERT INTO tickets (customer_id, subject, description, priority, status, created_at) VALUES
(1, 'Product inquiry', 'Need information about bulk pricing', 'MEDIUM', 'OPEN', NOW()),
(2, 'Technical support', 'Product not working as expected', 'HIGH', 'OPEN', NOW()),
(3, 'Order status', 'Checking on order #12345', 'LOW', 'OPEN', NOW());

-- Sample Transactions
INSERT INTO transactions (type, amount, description, category, transaction_date) VALUES
('CREDIT', 5000.00, 'Product sale to Acme Corp', 'Sales', NOW()),
('DEBIT', 2000.00, 'Purchase of office supplies', 'Expenses', NOW()),
('CREDIT', 3500.00, 'Service contract payment', 'Services', NOW()),
('DEBIT', 1500.00, 'Employee salary payment', 'Payroll', NOW());

-- Sample Invoices
INSERT INTO invoices (customer_id, items, total_amount, tax, grand_total, status, issued_date, due_date) VALUES
(1, 'Laptop x 5, Mouse x 10', 6799.90, 543.99, 7343.89, 'PAID', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY)),
(2, 'Monitor x 3', 1199.97, 95.99, 1295.96, 'PENDING', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY)),
(3, 'Office Chair x 2', 599.98, 47.99, 647.97, 'UNPAID', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY));

-- Sample Attendance Records
INSERT INTO attendance (employee_id, date, check_in, check_out, status) VALUES
(1, CURDATE(), '09:00:00', '18:00:00', 'PRESENT'),
(2, CURDATE(), '09:15:00', '17:45:00', 'PRESENT'),
(3, CURDATE(), '09:30:00', '18:30:00', 'PRESENT'),
(4, CURDATE(), NULL, NULL, 'ABSENT'),
(5, CURDATE(), '09:00:00', '13:00:00', 'HALF_DAY');

-- Sample Leave Records
INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason, status) VALUES
(1, 'ANNUAL', DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), 'Family vacation', 'APPROVED'),
(2, 'SICK', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Medical appointment', 'PENDING'),
(3, 'CASUAL', DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Personal work', 'APPROVED');

-- Sample Purchase Orders
INSERT INTO purchase_orders (product_id, supplier_id, quantity, total_amount, status, order_date) VALUES
(1, 1, 10, 12999.90, 'PENDING', NOW()),
(2, 1, 50, 1499.50, 'APPROVED', NOW()),
(3, 2, 5, 1499.95, 'DELIVERED', NOW());

COMMIT;

-- Display counts
SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Suppliers', COUNT(*) FROM suppliers
UNION ALL
SELECT 'Employees', COUNT(*) FROM employees
UNION ALL
SELECT 'Customers', COUNT(*) FROM customers
UNION ALL
SELECT 'Tickets', COUNT(*) FROM tickets
UNION ALL
SELECT 'Transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'Invoices', COUNT(*) FROM invoices
UNION ALL
SELECT 'Attendance', COUNT(*) FROM attendance
UNION ALL
SELECT 'Leaves', COUNT(*) FROM leaves
UNION ALL
SELECT 'Purchase Orders', COUNT(*) FROM purchase_orders;
