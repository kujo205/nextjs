import { Fragment } from "react";
import { Header } from "./Header";
import { useContext } from "react";
import NotificationCxt from "@/../store/notification-context";
import Notification from "@/components/ui/notification";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { notification } = useContext(NotificationCxt);
  return (
    <Fragment>
      <header>
        <Header />
      </header>

      <main>
        {children}
        {notification && <Notification {...notification} />}
      </main>
    </Fragment>
  );
};
