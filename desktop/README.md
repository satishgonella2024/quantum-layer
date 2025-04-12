# QuantumLayer Desktop Application

This is the Electron-based desktop application for QuantumLayer, providing a native experience across Windows, macOS, and Linux.

## Development

```bash
# Install dependencies
npm install

# Run the application in development mode
npm run dev
```

## Building for Distribution

```bash
# Build for all platforms
npm run dist:all

# Build for specific platforms
npm run dist:mac
npm run dist:win
npm run dist:linux
```

## Features

- Native desktop experience
- System tray integration
- File system access for agent configurations
- Local tool execution
- Offline capabilities
- Automatic updates

## Architecture

The desktop app wraps the Next.js web application in an Electron shell, providing additional native capabilities while maintaining the same user interface.

## Notes

- The desktop application requires the web application to be built first
- The desktop application shares code with the web application, but has its own configuration and build process