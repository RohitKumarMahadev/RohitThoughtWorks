import Head from "next/head";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { getBookShelfPreview } from "../lib/books";
import { getTechPostsByDate } from "../lib/tech";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import stylesTab from "../components/layout.module.css";
import Carousel, { consts } from "react-elastic-carousel";
import { getDesignThumbs } from "../lib/design";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const styles = {
  tabs: {
    //display: "inline-block",
    marginRight: "30px",
    verticalAlign: "top",
  },
  links: {
    margin: 0,
    padding: 0,
  },
  tabLink: {
    lineHeight: "30px",
    padding: "0 10px",
    cursor: "pointer",
    border: "none",
    borderBottom: "2px solid transparent",
    display: "inline-block",
    backgroundColor: "white",
    fontSize: "1.2rem",
    color: "gray",
  },
  activeLinkStyle: {
    // borderBottom: '2px solid #333'
  },
  visibleTabStyle: {
    //display: "inline-block",
  },
  content: {
    paddingTop: "20px",
    paddingLeft: "10px",
  },
  previewSpace: {
    paddingLeft: "10px",
  },
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const techPosts = getTechPostsByDate();
  const books = await getBookShelfPreview();
  const thumbs = getDesignThumbs();
  const nowDirectory = path.join(process.cwd(), "now");
  const fullPath = path.join(nowDirectory, `now.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const tasksInHand = { contentHtml, ...matterResult.data };
  return {
    props: {
      allPostsData,
      techPosts,
      books,
      thumbs,
    },
  };
}
export default function Home({ allPostsData, techPosts, books, thumbs }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 550, itemsToShow: 3, itemsToScroll: 3, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? "↼" : "⇀";
    return (
      <button
        className={utilStyles.buttonHover}
        onClick={onClick}
        disabled={isEdge}
      >
        {pointer}
      </button>
    );
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m Rohit. I’m a software engineer working in Singapore. You
          can contact me on{" "}
          <a href="https://twitter.com/RohitKumarB4U">Twitter</a>
        </p>
        <p>
          This is my digital garden - a compendium of thoughts, books I'm
          reading, things I've learned and created along the way. I hope that
          you'll enjoy the conversation.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div id="plain-react" style={{ marginTop: "20px" }}>
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
                Tech
              </TabLink>
              <TabLink to="tab3" style={styles.tabLink}>
                Design
              </TabLink>
              <TabLink to="tab4" style={styles.tabLink}>
                Books
              </TabLink>
            </div>
            <div style={styles.content}>
              <TabContent for="tab1">
                <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                      <table className={utilStyles.noBorder}>
                        <tbody>
                          <tr className={utilStyles.noBorder}>
                            <td className={utilStyles.noBorder}>
                              <div className={stylesTab.titleImageDiv}>
                                {title.charAt(0)}
                              </div>
                            </td>
                            <td className={utilStyles.noBorder}>
                              <div style={styles.previewSpace}>
                                <Link href={`/posts/${id}`}>
                                  <a>{title}</a>
                                </Link>
                                <small className={utilStyles.lightText}>
                                  <Date dateString={date}></Date>
                                </small>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  ))}
                </ul>
              </TabContent>
              <TabContent for="tab4">
                {/* <ul className={utilStyles.list}>
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
                        <p style={{margin:'0px'}}>John Gray</p>
                      </small>
                    </div>
                  </li>
                  ))}
                  </ul> */}
                {/* {
                  <div className={utilStyles.flexContainer}>
                    {books.map(({ id, source_url }) => (
                      <div className={utilStyles.bookHolder} key={id}>
                        <small className={utilStyles.bookTitle}>
                          Surely, You'r Joking, Mr.Feynman
                        </small>
                        <small className={utilStyles.bookTitle}>
                          Richard Feynman
                        </small>
                        <div className={utilStyles.flexItem} key={id}>
                          <div className={utilStyles.bookCover}>
                            <img src={source_url}></img>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                } */}
                <Carousel breakPoints={breakPoints} renderArrow={myArrow}>
                  {books.map(({ id, source_url, author, filename }) => (
                    <div className={utilStyles.bookHolder} key={id}>
                      <small className={utilStyles.bookTitle}>{filename}</small>
                      <small className={utilStyles.bookTitle}>{author}</small>
                      <div className={utilStyles.flexItem} key={id}>
                        <div className={utilStyles.bookCover}>
                          <img src={source_url}></img>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Link href={`/books/`}>
                    <a className={utilStyles.linkStyle}>
                      See All
                      <span
                        style={{
                          borderLeft: "1px solid",
                          paddingLeft: "10px",
                          marginLeft: "1rem",
                        }}
                      >
                        →
                      </span>
                    </a>
                  </Link>
                </div>
              </TabContent>
              <TabContent for="tab3">
                <Carousel breakPoints={breakPoints} renderArrow={myArrow}>
                  {thumbs.map(({ id, source, title }) => (
                    <div className={utilStyles.thumbHolder} key={id}>
                      <small className={utilStyles.bookTitle}>{title}</small>
                      <div className={utilStyles.thumbFlexItem} key={id}>
                        <Image
                          priority
                          width={239}
                          height={190}
                          className={utilStyles.thumbImage}
                          src={source}
                        ></Image>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </TabContent>
              <TabContent for="tab2">
                {/* <div dangerouslySetInnerHTML={{__html:tasksInHand.contentHtml}} /> */}
                {
                  <ul className={utilStyles.list}>
                    {techPosts.map(({ id, date, title }) => (
                      <li className={utilStyles.listItem} key={id}>
                        <table className={utilStyles.noBorder}>
                          <tbody>
                            <tr className={utilStyles.noBorder}>
                              <td className={utilStyles.noBorder}>
                                <div className={stylesTab.titleImageDiv}>
                                  {title.charAt(0).toUpperCase()}
                                </div>
                              </td>
                              <td className={utilStyles.noBorder}>
                                <div style={styles.previewSpace}>
                                  <Link href={`/tech/${id}`}>
                                    {<a>{title}</a>}
                                  </Link>
                                  {
                                    <small className={utilStyles.lightText}>
                                      <Date dateString={date}></Date>
                                    </small>
                                  }
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    ))}
                  </ul>
                }
              </TabContent>
            </div>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
