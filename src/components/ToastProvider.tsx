import { createContext, useContext, useState, useCallback } from "react";
import "../styles.css";

const ToastContext = createContext<(message: string) => void>(() => {});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && <div className="toast">{message}</div>}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
