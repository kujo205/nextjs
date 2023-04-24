import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Notification {
  status?: "pending" | "success" | "error";
  message?: string;
  title?: string;
}

interface initialValues {
  notification: Notification | null;
  showNotification: (arg0: Notification) => void;
  hideNotification: () => void;
}

const initial = {
    notification: null,
    showNotification: (arg0: Notification)=>{},
    hideNotification: () => {},
  }

const NotificationCxt = createContext<initialValues>(initial);

export const NotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>({});

  const showNotification = useCallback((notification: Notification) => {
    setNotification(notification);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);

  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 1000 * 5);
  }, [notification]);

  return (
    <NotificationCxt.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationCxt.Provider>
  );
};

export default NotificationCxt;
