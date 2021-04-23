import Layout from '../../components/layout'
import { getAllBookNames, getBookSummary } from '../../lib/books'
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
    const bookSummary = await getBookSummary(params.id)
    return {
        props: {
            bookSummary
        }
    }
}
export default function Book({bookSummary}){
    return (<Layout>
        <Head>
            <title>{bookSummary.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>
            {bookSummary.title}
            </h1>
            <div className={utilStyles.lightText}>
                <Date dateString={bookSummary.date}></Date>
            </div>
            <div dangerouslySetInnerHTML={{__html:bookSummary.contentHtml}} />
        </article>
    </Layout>
    )
}