# PDF Tool - All-in-One PDF Solution

A modern, full-stack PDF manipulation tool built with React, Express, and MongoDB. Perform various PDF operations including compress, merge, split, convert, rotate, and more.

## 🚀 Features

### PDF Operations
- **Compress PDF** - Reduce file size with quality options
- **Merge PDFs** - Combine multiple PDFs into one
- **Split PDF** - Divide PDF into multiple files
- **Image to PDF** - Convert images to PDF format
- **PDF to Image** - Extract pages as images
- **Rotate Pages** - Rotate PDF pages
- **Extract Pages** - Extract specific pages from PDF

### User Features
- JWT-based authentication
- User roles (admin/user)
- Operation history tracking
- File statistics dashboard
- Responsive Material-UI design

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🛠️ Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and other settings

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
pdf-tool/
├── backend/
│   ├── controllers/
│   │   └── pdfController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── FileHistory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── pdf.js
│   │   └── user.js
│   ├── utils/
│   │   └── fileCleanup.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ToolCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── tools/
    │   │   │   ├── CompressPDF.jsx
    │   │   │   ├── MergePDF.jsx
    │   │   │   ├── ImageToPDF.jsx
    │   │   │   ├── PDFToImage.jsx
    │   │   │   ├── RotatePDF.jsx
    │   │   │   ├── ExtractPages.jsx
    │   │   │   └── SplitPDF.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── History.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
TEMP_FILE_LIFETIME=3600000
CLIENT_URL=http://localhost:5173
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### PDF Operations
- `POST /api/pdf/compress` - Compress PDF
- `POST /api/pdf/merge` - Merge PDFs
- `POST /api/pdf/image-to-pdf` - Convert images to PDF
- `POST /api/pdf/pdf-to-image` - Convert PDF to images
- `POST /api/pdf/rotate` - Rotate PDF pages
- `POST /api/pdf/extract` - Extract pages
- `POST /api/pdf/split` - Split PDF

### User
- `GET /api/user/history` - Get operation history
- `GET /api/user/stats` - Get user statistics

## 🎨 Tech Stack

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- Tailwind CSS
- React Router
- Axios
- React Dropzone
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File uploads)
- compress-pdf
- pdf-lib
- sharp
- node-cron

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- File type validation
- File size limits
- Automatic file cleanup

## 🧹 File Cleanup

Temporary files are automatically deleted after 1 hour using a cron scheduler that runs every 30 minutes.

## 🚀 Deployment

### Backend
- Can be deployed to Heroku, Railway, Render, or any Node.js hosting
- Ensure MongoDB connection string is configured
- Set environment variables in hosting platform

### Frontend
- Can be deployed to Vercel, Netlify, or any static hosting
- Build command: `npm run build`
- Output directory: `dist`
- Configure API proxy or update API base URL

## 📝 Usage

1. Register a new account or login
2. Select a PDF tool from the home page
3. Upload your file(s)
4. Configure options (if available)
5. Process and download the result
6. View your operation history in the History page

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, Express, and MongoDB

## 🐛 Known Issues

- PDF to Image conversion requires additional setup (pdf-poppler)
- Some advanced features are placeholders and need implementation

## 🔮 Future Enhancements

- Add watermark to PDF
- Remove pages from PDF
- PDF to Word conversion
- Word to PDF conversion
- Protect/Unlock PDF
- Add page numbers
- Reorder pages
- OCR support
- Batch processing
- Cloud storage integration
