import { FC } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
interface HeroSectionProps {}

export const Hero: FC<HeroSectionProps> = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/ivan.jpg"
          width={300}
          height={300}
          alt="avatar"
        />
      </div>
      <h1>Hello, I`m Ivan, cool web developer</h1>
      <p>
        This is a blog about front-end development, especially frameworks
        related to react
      </p>
    </section>
  );
};
