import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ textDecoration: 'underline', color: '#0d6efd' }}>
        Go back to homepage
      </Link>
    </div>
  );
}
