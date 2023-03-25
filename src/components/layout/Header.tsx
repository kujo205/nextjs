import Link from "next/link";
import styles from './Header.module.css';


export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">All events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
