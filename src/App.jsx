import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile'
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Profile />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </Router>
  )
}
