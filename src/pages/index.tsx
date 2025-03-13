import Head from "next/head";
import styles from "@/styles/home.module.css";
import Image from 'next/image';
import heroImg from '../../public/assets/hero.png'


export default function Home() {
  return (
    <div
    className={styles.container} 
    >
      <Head>
        <title>Board Tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

        <main className={styles.main}>
          <div className={styles.logoContent}>
            <Image
              className={styles.hero}
              alt="Logo Board Tarefas"
              src={heroImg}
              priority
            />

            <h1 className={styles.title}>
              Sistema feito para organizar<br/> seus estudos e tarefas!
            </h1>

            <div className={styles.infoContent}>
                <section className={styles.box}>
                  +12 posts
                </section>
                <section className={styles.box}>
                  +90 comentários
                </section>
            </div>
          </div>
        </main>
      </div>
 
  );
}
