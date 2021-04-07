import Layout from '../../components/layout'
import { getAllPostIds,getPostData } from '../../lib/posts'
//import { getEmotionScore,getOpacityAndFilterByRank } from '../../lib/emotion_recognition'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

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
            <h1 className={utilStyles.headingXl}>
            {postData.title}
            </h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}></Date>
            </div>
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