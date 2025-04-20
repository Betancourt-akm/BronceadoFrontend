import { Link } from 'react-router-dom';
import './NotFound.css'; // Import the CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-box">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for no exist.</p>
                <Link to="/" className="home-link">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
