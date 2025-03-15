import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Textarea } from "@/components/textarea";
import Head from "next/head";
import styles from "./styles.module.css";

import { db } from "../../services/firebaseConnection";
import { doc, addDoc, collection, query, where, getDoc } from "firebase/firestore";

interface TaskProps {
  item: {
    tarefa: string;
    public: boolean;
    created_at: string;
    user: string;
    taskId: string;
  };
}

export default function Task({ item }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if(input === "") return;

    if(!session?.user?.email || !session?.user?.name) return;

    try {
        
        const docRef = await addDoc(collection(db, "comentarios"), {
            comment: input,
            created_at: new Date(),
            user: session?.user?.email,
            name: session?.user?.name,
            taskId: item?.taskId
        });

        setInput("");

    } catch(err) {
        console.log(err);
    }
  
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>

        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>
        <form onSubmit={handleComment}>
          <Textarea
            placeholder="Digite seu comentário..."
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
          />
          <button className={styles.button} disabled={!session?.user}>
            {session?.user
              ? "Enviar comentário"
              : "Faça login para poder comentar!"}
          </button>
        </form>
      </section>
    </div>
  );
}

// server side rendering para buscar a task especifica
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tarefas", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created_at?.seconds * 1000;
  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created_at: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: {
      item: task,
    },
  };
};
