import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';

// PDF Tool Pages (compression removed)
import MergePDF from './pages/tools/MergePDF';
import ImageToPDF from './pages/tools/ImageToPDF';
import PDFToImage from './pages/tools/PDFToImage';
import RotatePDF from './pages/tools/RotatePDF';
import ExtractPages from './pages/tools/ExtractPages';
import SplitPDF from './pages/tools/SplitPDF';

import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                {/* PDF Tool Routes */}
                <Route path="/tools/merge" element={<MergePDF />} />
                <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
                <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
                <Route path="/tools/rotate" element={<RotatePDF />} />
                <Route path="/tools/extract" element={<ExtractPages />} />
                <Route path="/tools/split" element={<SplitPDF />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
