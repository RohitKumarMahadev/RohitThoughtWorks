import Layout from '../../components/layout'
import { getAllTechPosts, getTechPost } from '../../lib/tech'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import styles from '../../components/layout.module.css'

export async function getStaticPaths(){
    const paths = getAllTechPosts()
    return {
        paths,
        fallback:false
    }
}
export async function getStaticProps({ params }){
    const post = await getTechPost(params.id)
    return {
        props: {
            post
        }
    }
}
export default function Tech({post}){
    return (<Layout>
         <Head>
            <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>
            {post.title}
            </h1>
            <table className={utilStyles.noBorder}>
                <tbody>
                <tr className={utilStyles.noBorder}>
                    <td className={utilStyles.noBorder}>
                        <Link href="/">
                            <a>
                                <img
                                src="/images/Profile.png"
                                className={`${styles.headerPostImage} ${utilStyles.borderCircle}`}
                                />
                            </a>
                        </Link>
                    </td>
                    <td className={utilStyles.noBorder}>
                        <Link href="/">
                            <a className={`${utilStyles.colorInherit}`} style={{fontSize:'medium'}}>Rohit Kumar Mahadev</a>
                        </Link>
                        <table className={utilStyles.noBorder}>
                            <tbody>
                                <tr className={utilStyles.noBorder}>
                                    <td class={`${utilStyles.lightText} ${utilStyles.noBorder}`}>
                                        <Date dateString={post.date}></Date>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <div dangerouslySetInnerHTML={{__html:post.contentHtml}} />
        </article>
    </Layout>
    )
}