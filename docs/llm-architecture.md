# LLM Architecture and Message Processing

## Overview

The application uses a modular approach to handle LLM interactions, with clear separation between frontend, API layer, and LLM processing. All LLM-related logic is contained in the Python backend service.

## Components

### 1. Models Configuration (`lib/ai/models.ts`)
```typescript
export const models = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
];

export const DEFAULT_MODEL_NAME = 'gpt-4o-mini';
```

### 2. System Prompts (`lib/ai/prompts.ts`)

The system prompts define the AI's behavior and capabilities:

1. **Regular Prompt (Base Personality)**
```typescript
export const regularPrompt = 'You are a friendly assistant! Keep your responses concise and helpful.';
```

2. **Blocks Prompt (UI Mode)**
```typescript
export const blocksPrompt = `
Blocks is a special user interface mode that helps users with writing, editing, and other content creation tasks...
[Detailed instructions for handling blocks UI mode]
`;
```

3. **Code Generation Prompt**
```typescript
export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets...
[Detailed code generation guidelines]
`;
```

The final system prompt combines these: `${regularPrompt}\n\n${blocksPrompt}`

## Message Processing Flow

### 1. Frontend Initialization
- When a new chat starts, it's initialized with:
  - Selected model (from `models.ts`)
  - Empty message history
  - System prompt (from `prompts.ts`)

### 2. API Layer (`app/(main)/chat/api/chat/route.ts`)
```typescript
// Message processing request
const response = await fetch(`${MESSAGE_PROCESSOR_URL}/process-message`, {
  method: 'POST',
  body: JSON.stringify({
    user_message: userMessage.content,
    chat_id: id,
    user_id: session.user.id,
    message_history: coreMessages,
    system_prompt: systemPrompt,
  }),
});
```

### 3. Backend Processing (`lib/message_processor.py`)

The `MessageProcessor` class handles all LLM interactions:

```python
class MessageProcessor:
    def __init__(self, api_key: str, model: str = "gpt-4"):
        self.model = model
        self.client = OpenAI(api_key=api_key)
        
    def process_message(
        self,
        user_message: str,
        chat_id: str,
        user_id: str,
        message_history: Optional[List[Dict[str, str]]] = None,
        system_prompt: Optional[str] = None
    ):
        # Format messages for OpenAI
        messages = []
        
        # Add system prompt if provided
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
            
        # Add message history
        if message_history:
            for msg in message_history:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
                
        # Add current user message
        messages.append({
            "role": "user",
            "content": user_message
        })
```

## What the LLM Sees

For each message, the LLM receives:

1. **System Prompt**
   - Base personality ("friendly assistant")
   - UI mode instructions (blocks mode)
   - Any specialized behavior instructions (code generation, etc.)

2. **Message History**
   - All previous messages in the conversation
   - Each message includes:
     - Role (user/assistant)
     - Content
     - No metadata (timestamps, IDs, etc.)

3. **Current Message**
   - The user's latest message
   - Any context from the current UI state

## Adding New Context

To add new context or modify the LLM's behavior, you can:

1. **Modify System Prompts**
   - Add new prompts in `lib/ai/prompts.ts`
   - Combine them with existing prompts
   - Example:
     ```typescript
     export const customPrompt = `You are specialized in...`;
     export const systemPrompt = `${regularPrompt}\n\n${customPrompt}\n\n${blocksPrompt}`;
     ```

2. **Add Conversation Types**
   - Create new conversation starters in `components/suggested-actions.tsx`
   - Add corresponding system prompts
   - Pass the conversation type to the backend

3. **Extend Message Processing**
   - Modify `MessageProcessor.process_message()` to handle new context
   - Add new parameters to the API request
   - Example:
     ```python
     def process_message(
         self,
         user_message: str,
         chat_id: str,
         user_id: str,
         message_history: Optional[List[Dict[str, str]]] = None,
         system_prompt: Optional[str] = None,
         conversation_type: Optional[str] = None,  # New parameter
         custom_context: Optional[Dict] = None     # New parameter
     ):
         messages = []
         
         # Add conversation-type specific instructions
         if conversation_type:
             messages.append({
                 "role": "system",
                 "content": f"This is a {conversation_type} conversation..."
             })
         
         # Add custom context
         if custom_context:
             messages.append({
                 "role": "system",
                 "content": f"Additional context: {json.dumps(custom_context)}"
             })
     ```

## Current Limitations

1. Conversation types are not persisted
2. System prompts are static per conversation
3. No dynamic context injection during conversation
4. Limited model configuration options

## Recommended Improvements

1. Persist conversation types in the database
2. Allow dynamic system prompt updates
3. Add conversation-specific context management
4. Implement model parameter configuration
5. Add conversation templates for different use cases 