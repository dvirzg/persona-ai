# Frontend Library

This directory contains shared TypeScript/JavaScript libraries used by the frontend application.

## Features

- AI model configuration
- System prompts
- Database utilities
- Authentication helpers
- Editor components
- Store management
- Custom hooks

## Directory Structure

- `ai/` - AI model configuration and system prompts
- `db/` - Database utilities and types
- `editor/` - Editor-related components
- `hooks/` - Custom React hooks
- `store/` - State management

## Environment Variables

Copy `.env.example` to `.env` and update with your values:
```
# Required
MESSAGE_PROCESSOR_URL=  # URL of your deployed backend service

# Optional
DEBUG=false  # Enable debug logging
``` 