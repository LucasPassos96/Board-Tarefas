import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import styles from './styles.module.css'
import Head from 'next/head'

export default function Dashboard() {



    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>

            <h1>Meu dashboard</h1>
        </div>
    )
}

// autenticacao server side

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    if(!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
};