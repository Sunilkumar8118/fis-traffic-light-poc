import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import CustomToast from "../components/CustomToast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    mode: "success",
  });

  const showToast = useCallback(
    (message, mode = "success", duration = 3000) => {
      setToast({ open: true, message, mode });
      setTimeout(
        () => setToast((prev) => ({ ...prev, open: false })),
        duration
      );
    },[]);

  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  return(
    <ToastContext.Provider value={showToast}>
        {children}
        <CustomToast
        open={toast.open}
        message={toast.message}
        mode={toast.mode}
        onClose={closeToast}
        />
    </ToastContext.Provider>
  )
};
