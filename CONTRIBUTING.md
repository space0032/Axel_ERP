# Contributing to Axel ERP

Thank you for your interest in contributing to Axel ERP! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Axel_ERP.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Follow the setup instructions in SETUP.md

## Code Style Guidelines

### Java/Spring Boot
- Follow standard Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Keep methods focused and small
- Use Lombok annotations to reduce boilerplate
- Follow REST API best practices

### React/JavaScript
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Keep components focused and reusable
- Use proper PropTypes or TypeScript for type checking
- Follow ESLint rules

### Database
- Use descriptive column names
- Add proper indexes for frequently queried columns
- Use appropriate data types
- Follow normalization principles

## Git Commit Messages

Format: `type(scope): subject`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(inventory): add low stock notification feature
fix(auth): resolve JWT token expiration issue
docs(readme): update setup instructions
```

## Pull Request Process

1. Update the README.md or SETUP.md with details of changes if needed
2. Ensure all tests pass
3. Update documentation for any API changes
4. Create a pull request with a clear description
5. Link any related issues

## Testing

### Backend Tests
```bash
cd axel-erp-backend
mvn test
```

### Frontend Tests
```bash
cd axel-erp-frontend
npm test
```

## Adding New Features

### Backend Module
1. Create entity in `model/` package
2. Create repository interface in `repository/`
3. Implement service in `service/`
4. Create controller in `controller/`
5. Add DTOs if needed in `dto/`
6. Update documentation

### Frontend Component
1. Create component in appropriate module folder
2. Add service methods in `services/`
3. Update routing in `App.js`
4. Add navigation link in `Sidebar.jsx`
5. Style according to existing patterns

## Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] Performance impact is minimal
- [ ] Backward compatibility maintained

## Reporting Bugs

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Java version, etc.)
- Error messages or logs
- Screenshots if applicable

## Feature Requests

When suggesting features:
- Provide clear use case
- Explain expected behavior
- Consider impact on existing features
- Discuss potential implementation approach

## Security Issues

For security vulnerabilities:
- DO NOT open a public issue
- Email details to project maintainers
- Allow time for fix before disclosure

## Questions and Support

- Check existing documentation first
- Search existing issues
- Open a new issue with clear description
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Axel ERP!
