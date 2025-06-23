import { useNavigate } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <h1 onClick={() => navigate('/')}>AuthApp</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>
      <div className="container">
        {children}
      </div>
    </>
  );
}
