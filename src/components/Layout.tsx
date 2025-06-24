import { useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Optional: Global header or nav */}
      {isHome ? (
        <>{children}</>
      ) : (
        <div className="container">
          {children}
        </div>
      )}
    </>
  );
}
