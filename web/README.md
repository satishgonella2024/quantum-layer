# QuantumLayer Web Interface

The web interface for QuantumLayer provides a graphical user interface for managing and interacting with AI agents.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Agent management interface
- PromptGraph visual editor
- Interactive testing environment
- Analytics and monitoring
- Settings management

## Architecture

The web interface is built with:

- Next.js for the React framework
- TailwindCSS for styling
- SWR for data fetching
- Socket.io for real-time updates
- Zustand for state management

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## Integration with API

The web interface communicates with the QuantumLayer API to manage and interact with agents. The API must be running for the web interface to function properly.