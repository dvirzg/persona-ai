from typing import List, Dict, Optional, Union, Any
import os
from dataclasses import dataclass, asdict
from openai import OpenAI
from datetime import datetime

@dataclass
class Message:
    id: str
    role: str
    content: str
    created_at: datetime
    chat_id: str

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "chat_id": self.chat_id
        }

@dataclass
class Chat:
    id: str
    user_id: str
    title: str
    created_at: datetime

class MessageProcessor:
    def __init__(self, api_key: str, model: str = "gpt-4"):
        """Initialize the message processor with OpenAI credentials"""
        self.model = model
        self.client = OpenAI(api_key=api_key)
        
    def process_message(
        self,
        user_message: str,
        chat_id: str,
        user_id: str,
        message_history: Optional[List[Dict[str, str]]] = None,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Union[str, Dict[str, Any]]]:
        """Process a user message and return AI response"""
        
        # Format messages for OpenAI
        messages = []
        
        # Add system prompt if provided
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
            
        # Add message history if provided
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
        
        try:
            # Call OpenAI API
            stream = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                stream=True  # Enable streaming
            )
            
            # Process streaming response
            collected_messages = []
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    collected_messages.append(chunk.choices[0].delta.content)
                    
            # Combine message chunks
            full_response = ''.join(collected_messages)
            
            # Create Message objects and convert to dictionaries
            user_msg = Message(
                id=generate_uuid(),
                role="user",
                content=user_message,
                chat_id=chat_id,
                created_at=datetime.now()
            )
            
            assistant_msg = Message(
                id=generate_uuid(),
                role="assistant", 
                content=full_response,
                chat_id=chat_id,
                created_at=datetime.now()
            )
            
            return {
                "status": "success",
                "user_message": user_msg.to_dict(),
                "assistant_message": assistant_msg.to_dict()
            }
            
        except Exception as e:
            print(f"Error in process_message: {str(e)}")  # Add debug logging
            return {
                "status": "error",
                "error": str(e)
            }
            
    def generate_title(self, first_message: str) -> str:
        """Generate a title for a new chat based on the first message"""
        try:
            completion = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": """
                        Generate a short title based on the user's first message.
                        - Keep it under 80 characters
                        - Make it a summary of the user's message
                        - Do not use quotes or colons
                        """
                    },
                    {
                        "role": "user",
                        "content": first_message
                    }
                ]
            )
            return completion.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error in generate_title: {str(e)}")  # Add debug logging
            return "New Chat"  # Fallback title
            
def generate_uuid() -> str:
    """Generate a UUID for messages"""
    import uuid
    return str(uuid.uuid4()) 