import Link,{LinkProps} from 'next/link';
import styles from './Button.module.css';


interface Btn extends Omit<LinkProps,'href'> {
    children: React.ReactNode;
    href?:string;
}


export const Button: React.FC<Btn> = ({children,href,...rest}) => {
    if(href)
    return (
      <Link className={styles.btn} href={href} {...rest}>
        {children}
      </Link>
    );
    else{

        return (
           <button className={styles.btn}>
                {children}
           </button>
          );
    }
  }; 