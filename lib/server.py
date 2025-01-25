from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
from message_processor import MessageProcessor

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://persona-ai-git-main-dvir-zagury-grynbaums-projects.vercel.app",  # Vercel preview
        "https://persona-e9n3v7xkf-dvir-zagury-grynbaums-projects.vercel.app",  # Vercel preview
        "https://dvirzg.com",  # Custom domain
        "https://www.dvirzg.com"  # www subdomain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security setup
API_KEY_NAME = "X-API-Key"
API_KEY = os.getenv("API_KEY", "your-secret-api-key")  # You'll set this in Railway
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

async def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key",
        )
    return api_key

class MessageModel(BaseModel):
    id: str
    role: str
    content: str
    created_at: str
    chat_id: str

class ProcessMessageRequest(BaseModel):
    user_message: str
    chat_id: str
    user_id: str
    message_history: Optional[List[Dict[str, str]]] = None
    system_prompt: Optional[str] = None

class ProcessMessageResponse(BaseModel):
    status: str
    user_message: Optional[MessageModel] = None
    assistant_message: Optional[MessageModel] = None
    error: Optional[str] = None

class GenerateTitleRequest(BaseModel):
    message: str

class GenerateTitleResponse(BaseModel):
    title: str

# Initialize message processor
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

processor = MessageProcessor(api_key=api_key)

@app.post("/process-message", response_model=ProcessMessageResponse, dependencies=[Depends(verify_api_key)])
async def process_message(request: ProcessMessageRequest) -> ProcessMessageResponse:
    try:
        result = processor.process_message(
            user_message=request.user_message,
            chat_id=request.chat_id,
            user_id=request.user_id,
            message_history=request.message_history,
            system_prompt=request.system_prompt
        )
        return ProcessMessageResponse(**result)
    except Exception as e:
        print(f"Error in process_message endpoint: {str(e)}")  # Add debug logging
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-title", response_model=GenerateTitleResponse, dependencies=[Depends(verify_api_key)])
async def generate_title(request: GenerateTitleRequest) -> GenerateTitleResponse:
    try:
        title = processor.generate_title(request.message)
        return GenerateTitleResponse(title=title)
    except Exception as e:
        print(f"Error in generate_title endpoint: {str(e)}")  # Add debug logging
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=host, port=port) 