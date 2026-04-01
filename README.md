# Emmanuel Akuma Portfolio

A React portfolio for showcasing systems engineering work, with an AI-assisted code explanation panel powered through a server-side Gemini proxy.

## Stack

- React with Create React App
- Tailwind CSS via PostCSS
- Lucide React icons
- Vercel-style `api/` function for Gemini requests

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file from `.env.example`.

3. Add your server-side Gemini key:

```env
GEMINI_API_KEY=your_key_here
```

4. Optional settings:

```env
GEMINI_MODEL=gemini-1.5-flash-latest
REACT_APP_API_BASE_URL=
```

`REACT_APP_API_BASE_URL` is only needed when your frontend is talking to a separately hosted API.

## Running The App

- `npm start` starts the CRA frontend.
- `npm test -- --watchAll=false` runs the test suite once.
- `npm run build` creates the production bundle.

The AI explanation feature expects a server that serves `/api/explain`. In production, that fits a Vercel-style deployment. If you run only `npm start`, set `REACT_APP_API_BASE_URL` to a deployed backend or run the frontend in an environment that also serves the `api/` directory.

## Project Structure

- `src/App.js`: portfolio UI and client-side request to `/api/explain`
- `src/index.js`: React entry point
- `api/explain.js`: server-side Gemini proxy
- `src/App.test.js`: smoke test for the core landing page UI

## Notes

- Gemini credentials should stay server-side in `GEMINI_API_KEY`.
- The frontend no longer requires a `REACT_APP_GEMINI_API_KEY`.
