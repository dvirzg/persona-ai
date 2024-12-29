# PersonaChat AI

A personalized AI chat application that learns about you through conversations and provides insights about your personality, conversation patterns, and interests. Built with Next.js 13, Vercel AI SDK, and Shadcn UI.

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

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide](https://lucide.dev)
- **Graph Visualization**: [React Force Graph](https://github.com/vasturiano/react-force-graph)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/persona-chat.git
   cd persona-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```
   # Database
   POSTGRES_URL=
   
   # Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=
   
   # OpenAI
   OPENAI_API_KEY=
   ```

### Database Setup

1. Run database migrations:
   ```bash
   npm run db:migrate
   ```

2. (Optional) Seed the database:
   ```bash
   npm run db:seed
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
├── app/                   # Next.js 13 app directory
│   ├── (auth)/           # Authentication routes
│   ├── (main)/           # Main application routes
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/              # UI components from shadcn/ui
│   └── ...              # Custom components
├── lib/                 # Utility functions and configurations
│   ├── db/             # Database configurations and schemas
│   └── store/          # State management
└── public/             # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Credits

This project is built upon the [Vercel AI Chatbot](https://github.com/vercel-labs/ai-chatbot) template, with significant modifications and additional features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
