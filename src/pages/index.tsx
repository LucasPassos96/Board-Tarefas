import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./../styles/home.module.css";
import Image from 'next/image';
import heroImg from '../../public/assets/hero.png'

import { collection, getDocs } from 'firebase/firestore'
import { db } from "../services/firebaseConnection";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments }: HomeProps) {

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
                  +{posts} posts
                </section>
                <section className={styles.box}>
                  +{comments} comentários
                </section>
            </div>
          </div>
        </main>
      </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  
  // buscar do banco de forma estatica os numeros de tasks/comentarios, e mostrar no componente
  const commentRef = collection(db, "comentarios");
  const postRef = collection(db, "tarefas");
  
  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);
  
  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0
    },
    revalidate: 90 //revalidado a cada 90 segundos
  }
}