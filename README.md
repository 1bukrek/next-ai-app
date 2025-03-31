# Next AI App

This project is a web application built using `gemini-2.0-flash` artificial intelligence model. It allows users to ask text-based questions and receive responses from AI.

It has a simple and modern interface that allows users to easily ask questions and view responses. Responses are presented to the user in real-time streaming and displayed as a rich text.

It also provides a high-performance application using Next.js and Edge Runtime.

## Installation

To run the app in development mode, follow these instructions:

1. **Clone the repository**:

```bash
git clone https://github.com/1bukrek/next-ai-app.git
cd next-ai-app
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Create .env.local file**:

-   Create a file named `.env.local` in the project directory.
-   Add your API key to this file:

```
API_KEY=YOUR_API_KEY
```

4. **Run the application**:

```bash
npm run dev
# or
yarn dev
```

The application will be running at `http://localhost:3000`.

## Dependencies:

`next` (next.js framework), `@google/generative-ai` (API client library), `react-markdown` (markdown displaying), and `tailwindcss` (CSS framework)
