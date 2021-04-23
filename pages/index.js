import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getAllBookNames } from '../lib/books'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import stylesTab from '../components/layout.module.css'

const styles = {
  tabs: {
    display: 'inline-block',
    marginRight: '30px',
    verticalAlign: 'top'
  },
  links: {
    margin: 0,
    padding: 0
  },
  tabLink: {
    lineHeight: '30px',
    padding:'0 10px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    display: 'inline-block',
    backgroundColor:'white',
    fontSize:'1.5rem',
    color:'gray'
  },
  activeLinkStyle: {
    // borderBottom: '2px solid #333'
  },
  visibleTabStyle: {
    display: 'inline-block'
  },
  content: {
    paddingTop: '20px',
    paddingLeft: '10px'
  },
  previewSpace:{
    paddingLeft:'10px'
  }
};

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  const bookNames = await getAllBookNames()
  return {
    props:{
      allPostsData,
      bookNames
    }
  }
}
export default function Home({ allPostsData, bookNames }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I’m Rohit. I’m a software engineer working in Singapore. You can contact me on <a href="https://twitter.com/RohitKumarB4U">Twitter</a></p>
        <p>
          This is my personal blog where I share my thoughts, books I'm reading and what I'm learning.
          I hope that you'll enjoy the conversation.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <div id="plain-react" style={{marginTop:'20px'}}>
            <Tabs
              activeLinkStyle={styles.activeLinkStyle}
              visibleTabStyle={styles.visibleTabStyle}
              style={styles.tabs}
            >
              <div style={styles.links}>
                <TabLink to="tab1" default style={styles.tabLink}>
                 Notes
                </TabLink>
                <TabLink to="tab2" style={styles.tabLink}>
                  Books
                </TabLink>
                <TabLink to="tab3" style={styles.tabLink}>
                  Now
                </TabLink>
              </div>
              <div style={styles.content}>
                <TabContent for="tab1">
                <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                      <Link href={`/posts/${id}`}>
                        <a>{title}</a>
                      </Link>
                      <br />
                      <small className={utilStyles.lightText}>
                        <Date dateString={date}></Date>
                      </small>
                    </li>
                  ))}
                </ul>
                </TabContent>
                <TabContent for="tab2">
                  <ul className={utilStyles.list}>
                  {bookNames.map(({params}) => (
                    <li className={`${utilStyles.listItem} ${utilStyles.preview}`} key={params.id}>
                    <div>
                        <img  src={"/images/"+params.id + ".jpeg"}
                            className={`${stylesTab.headerImage} ${utilStyles.borderCircle}`} />
                    </div>
                    <div style={styles.previewSpace}>
                      <Link href={`/books/${params.id}`}>
                        <p style={{marginBottom:'0px',cursor:'pointer'}}><a>{params.id}</a></p>
                      </Link>
                      <small className={utilStyles.lightText}>
                        <p style={{margin:'0px'}}>Rohit Kumar</p>
                      </small>
                    </div>
                  </li>
                  ))}
                  </ul>
                </TabContent>
                <TabContent for="tab3">
                  <p>(╯°□°）╯︵ ┻━┻)</p>
                </TabContent>
              </div>
            </Tabs>
        </div>
      </section>
    </Layout>
  )
}
