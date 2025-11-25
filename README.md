# PDF Tool Platform

A modern, full-stack PDF manipulation platform with a vibrant dark theme.
looks like :- https://pdftool-one.vercel.app/

## Features

- **Merge PDFs** - Combine multiple PDF documents
- **Split PDF** - Separate PDFs into multiple files
- **Rotate Pages** - Rotate PDF pages
- **Extract Pages** - Extract specific pages
- **Image to PDF** - Convert images to PDF
- **PDF to Image** - Extract pages as images

## Tech Stack

- **Frontend**: React + Vite, Material-UI
- **Backend**: Node.js + Express, PDF-lib, Sharp
- **Deployment**: Vercel (Serverless)

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Environment variables**
   Create `backend/.env`:
   ```
   PORT=5001
   NODE_ENV=development
   ```

3. **Run development servers**
   ```bash
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from frontend directory)
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## Deployment to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy:**
```bash
vercel login
vercel --prod
```

## Project Structure

```
pdf-tool/
├── api/              # Vercel serverless functions
│   └── index.js      # API entry point
├── backend/          # Express backend
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Upload & error handling
│   ├── routes/       # API routes
│   └── server.js     # Local dev server
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── dist/         # Build output (generated)
└── vercel.json       # Vercel configuration
```

## License

MIT
