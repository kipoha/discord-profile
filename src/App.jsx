import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Core from './pages/Core';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Core />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}
