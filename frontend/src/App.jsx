import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Profile from './pages/Profile';

// PDF Tool Pages
import CompressPDF from './pages/tools/CompressPDF';
import MergePDF from './pages/tools/MergePDF';
import ImageToPDF from './pages/tools/ImageToPDF';
import PDFToImage from './pages/tools/PDFToImage';
import RotatePDF from './pages/tools/RotatePDF';
import ExtractPages from './pages/tools/ExtractPages';
import SplitPDF from './pages/tools/SplitPDF';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* PDF Tool Routes */}
                <Route
                    path="/tools/compress"
                    element={
                        <ProtectedRoute>
                            <CompressPDF />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/merge"
                    element={
                        <ProtectedRoute>
                            <MergePDF />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/image-to-pdf"
                    element={
                        <ProtectedRoute>
                            <ImageToPDF />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/pdf-to-image"
                    element={
                        <ProtectedRoute>
                            <PDFToImage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/rotate"
                    element={
                        <ProtectedRoute>
                            <RotatePDF />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/extract"
                    element={
                        <ProtectedRoute>
                            <ExtractPages />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tools/split"
                    element={
                        <ProtectedRoute>
                            <SplitPDF />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
