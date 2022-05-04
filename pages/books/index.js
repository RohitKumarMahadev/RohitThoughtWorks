import utilStyles from "../../styles/utils.module.css";
import { getBookShelfPreview } from "../../lib/books";
import Layout from "../../components/layout";
import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const books = await getBookShelfPreview();
  const imageDirectory = path.join(process.cwd(), "public/covers");
  const covers = fs.readdirSync(imageDirectory);
  return {
    props: {
      books,
      covers,
    },
  };
}
export default function Books({ books, covers }) {
  return (
    <Layout>
      <div style={{ borderBottom: "1px solid #424242", textAlign: "center" }}>
        <h2>Rohit Book Collection</h2>
      </div>
      <div
        className={utilStyles.flexContainer}
        style={{ marginTop: "2rem", justifyContent: "center" }}
      >
        {books.map(({ id, source_url }) => (
          <div className={utilStyles.bookHolder} key={id}>
            <div className={utilStyles.flexItem}>
              <div className={utilStyles.bookCover}>
                <img src={source_url}></img>
              </div>
            </div>
          </div>
        ))}
        {covers.map((cover) => (
          <div className={utilStyles.bookHolder} key={cover}>
            <div className={utilStyles.flexItem}>
              <div className={utilStyles.bookCover}>
                <img src={"/covers/" + cover}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
