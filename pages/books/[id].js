import Layout from '../../components/layout'
import { getAllBookNames } from '../../lib/books'
//import { getEmotionScore,getOpacityAndFilterByRank } from '../../lib/emotion_recognition'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths(){
    const paths = getAllBookNames()
    return {
        paths,
        fallback:false
    }
}
export async function getStaticProps({ params }){
    const bookNames = await getAllBookNames()
    return {
        props: {
            bookNames
        }
    }
}
export default function Book({id}){
    return (<Layout>
        <Head>
            <title>{id}</title>
        </Head>
    </Layout>
    )
}