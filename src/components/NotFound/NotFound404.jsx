import './NotFound404.css'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return (
        <div className="not-found-404">
            <h1>404 - Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default NotFound404