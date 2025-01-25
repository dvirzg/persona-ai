# Message Processing Service

This is a standalone Python service that handles all message processing and LLM interactions for the chat application. It is designed to be modular and reusable across different platforms (web, mobile, etc.).

## Features

- Message processing with OpenAI's GPT models
- Streaming responses
- Chat title generation
- Message history management
- Platform-agnostic design

## Setup

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

## Running the Service

Start the FastAPI server:
```bash
python server.py
```

The server will run on `http://localhost:8000` by default.

## API Endpoints

### POST /process-message

Process a user message and get an AI response.

Request body:
```json
{
  "message": "User's message",
  "chat_id": "unique_chat_id",
  "user_id": "user_id",
  "message_history": [
    {
      "role": "user",
      "content": "Previous message"
    }
  ],
  "system_prompt": "Optional system prompt"
}
```

Response:
```json
{
  "status": "success",
  "user_message": {
    "id": "uuid",
    "role": "user",
    "content": "User's message",
    "chat_id": "chat_id",
    "created_at": "timestamp"
  },
  "assistant_message": {
    "id": "uuid",
    "role": "assistant",
    "content": "AI's response",
    "chat_id": "chat_id",
    "created_at": "timestamp"
  }
}
```

### POST /generate-title

Generate a title for a new chat.

Request body:
```json
{
  "message": "First message in the chat"
}
```

Response:
```json
{
  "title": "Generated chat title"
}
```

## Error Handling

The service returns appropriate HTTP status codes and error messages:

- 400: Bad Request (invalid input)
- 401: Unauthorized
- 500: Internal Server Error

Error responses include a message explaining what went wrong.

## Development

The service is structured into two main components:

1. `message_processor.py`: Core message processing logic
2. `server.py`: FastAPI server that exposes the functionality

To modify the message processing behavior, update the `MessageProcessor` class in `message_processor.py`.

## Testing

To test the API endpoints:

1. Start the server
2. Use the Swagger UI at `http://localhost:8000/docs`
3. Try out the endpoints with sample data 