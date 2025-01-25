# PersonaChat AI

A personalized AI chat app that learns about you through conversations and provides insights about your personality, conversation patterns, and interests. Built with Next.js 14 and FastAPI.

## Features

- **Personalized Chat Experience**: Engage in meaningful conversations with an AI that remembers your context and adapts to your style.
- **Personal Context Management**: 
  - Input and manage your personal information
  - Track interests, goals, and personality traits
  - Visualize your social connections through an interactive graph
- **Insights & Analytics**:
  - Personality insights based on your conversations
  - Conversation trend analysis
  - Personalized topic recommendations
- **Modern UI/UX**:
  - Clean, responsive design
  - Dark mode support
  - Interactive components and smooth transitions

## Tech Stack

### Frontend (Vercel)
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide](https://lucide.dev)

### Backend (Separate Host)
- **Message Processing**: FastAPI Python service
- **LLM Integration**: OpenAI API with streaming support
- **Database**: Shared PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- PostgreSQL database
- OpenAI API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dvirzg/persona-ai.git
   cd persona-ai
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up the Python message processing service:
   ```bash
   cd lib
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Copy the example environment files:
   ```bash
   cp .env.example .env
   cd lib && cp .env.example .env
   ```

5. Update environment files with your credentials:
   ```
   # Frontend (.env)
   POSTGRES_URL=
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=
   MESSAGE_PROCESSOR_URL=http://localhost:8000  # In production, use your deployed service URL
   
   # Backend (lib/.env)
   OPENAI_API_KEY=
   ```

### Running the Application

1. Start the Python message processing service:
   ```bash
   cd lib
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python server.py
   ```

2. In a new terminal, start the Next.js development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Database Setup

1. Run database migrations:
   ```bash
   npm run db:migrate
   ```

2. (Optional) Seed the database:
   ```bash
   npm run db:seed
   ```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `POSTGRES_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `MESSAGE_PROCESSOR_URL`

### Backend (e.g., Heroku, DigitalOcean, Railway)

1. Choose a hosting platform that supports long-running Python processes
2. Deploy the contents of the `lib` directory
3. Set environment variables:
   - `OPENAI_API_KEY`
4. Update CORS settings in `server.py` with your Vercel domain
5. Update `MESSAGE_PROCESSOR_URL` in your Vercel deployment to point to your backend service

## Architecture

The application uses a distributed architecture:

1. **Frontend (Vercel)**
   - Handles UI/UX
   - User authentication
   - Database interactions
   - Message streaming

2. **Message Processing Service (Separate Host)**
   - Processes user messages
   - Interacts with OpenAI API
   - Handles message history
   - Generates chat titles

This separation allows for:
- Independent scaling of components
- Platform-agnostic message processing
- Easier testing and maintenance
- Future mobile app integration

## Development

### Frontend Development
```bash
npm run dev
```

### Message Processing Service Development
```bash
cd lib
python server.py
```

## Testing

To test the API endpoints:

1. Frontend tests:
   ```bash
   npm test
   ```

2. Message processing service:
   - Start the server
   - Visit `http://localhost:8000/docs`
   - Try out the endpoints

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
