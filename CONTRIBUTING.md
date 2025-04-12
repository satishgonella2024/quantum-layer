# Contributing to QuantumLayer

Thank you for your interest in contributing to QuantumLayer! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

There are many ways to contribute to QuantumLayer:

### Reporting Bugs

Bugs are tracked as GitHub issues. When you create an issue, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots or logs if applicable
- Environment information (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Explanation of why this enhancement would be useful
- Examples of how the enhancement would be used

### Your First Code Contribution

Unsure where to begin? Look for issues labeled with `good-first-issue` or `help-wanted`.

### Pull Requests

Please follow these steps for submitting a pull request:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Run tests to ensure they pass
5. Push your branch and open a pull request

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/satishgonella2024/quantum-layer.git
   cd quantum-layer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the project
   ```bash
   npm run build
   ```

4. Link for local development
   ```bash
   npm link
   ```

## Style Guidelines

### Code Style

We use ESLint and Prettier to enforce code style. Please ensure your code passes linting before submitting:

```bash
npm run lint
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test-related changes
- `chore:` for maintenance tasks

### Documentation

Please update documentation when making changes:

- Update README.md if necessary
- Update relevant documentation in the docs/ directory
- Include JSDoc comments for functions and interfaces

## Testing

We use Jest for testing. Please include tests for new features or bug fixes.

```bash
npm test
```

## Release Process

The release process is managed by maintainers. We use semantic versioning.

## Contact

If you have questions, feel free to open an issue on GitHub.