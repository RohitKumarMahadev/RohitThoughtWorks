import Layout from '../../components/layout'
import { getAllPostIds,getPostData } from '../../lib/posts'
//import { getEmotionScore,getOpacityAndFilterByRank } from '../../lib/emotion_recognition'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import styles from '../../components/layout.module.css'
import Audiocard from 'audiocard'
import Link from 'next/link'

export async function getStaticPaths(){
    const paths = getAllPostIds()
    return {
        paths,
        fallback:false
    }
}
export async function getStaticProps({ params }){
    const postData = await getPostData(params.id)
    //const score = await getEmotionScore(params.id)
    const emotionFilter = '';//getOpacityAndFilterByRank(score)
    //console.log(emotionFilter)
    return {
        props: {
            postData,
            emotionFilter
        }
    }
}
function renderGrayScale(score,emotion){
    return 'grayScale('+score[emotion]+')';
}
function renderOpacity(score,emotion){
    let val = score[emotion];
    let opacity = 0.5
    let strongEmotion = Object.keys(score).reduce((a,b) => score[a] > score[b] ? a : b);
    if(strongEmotion == emotion){
        opacity = 1
    }
    return opacity
}
export default function Post({ postData,emotionFilter }){
    return (<Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h2 className={utilStyles.headingXl}>
            {postData.title}
            </h2>
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
                                        <Date dateString={postData.date}></Date>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>

            {
                postData.audioFile &&
                <Audiocard title="Voice-over for the post "
                source={`https://rohitnotes.com/${postData.id}.mp3`}
                skipBackSeconds={10}
                skipForwardSeconds={30}
            />
            }
            {/* <div className={utilStyles.lightText}>
                <Date dateString={postData.date}></Date>
            </div> */}
            {/* <div>
                <span style={{paddingLeft:'0px',filter:'grayScale('+emotionFilter['anger'].filter+')', opacity:emotionFilter['anger'].opacity }} className={utilStyles.spaceBetween} dangerouslySetInnerHTML={{__html:'&#x1F620'}}/>
                <span style={{filter:'grayScale('+emotionFilter['fear'].filter+')', opacity:emotionFilter['fear'].opacity}} className={utilStyles.spaceBetween} dangerouslySetInnerHTML={{__html:'&#x1F628'}}/>
                <span style={{filter:'grayScale('+emotionFilter['joy'].filter+')', opacity:emotionFilter['joy'].opacity}} className={utilStyles.spaceBetween} dangerouslySetInnerHTML={{__html:'&#x1F603'}}/>
                <span style={{filter:'grayScale('+emotionFilter['sad'].filter+')', opacity:emotionFilter['sad'].opacity}} className={utilStyles.spaceBetween} dangerouslySetInnerHTML={{__html:'&#x1F62D'}}/>
            </div> */}
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}} />
        </article>
    </Layout>
    )
}