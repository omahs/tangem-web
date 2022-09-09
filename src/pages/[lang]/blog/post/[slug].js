import {getLanguage, getSortedLangsData} from "../../../../lib/lang";
import {getPost, getPostsSlugsPaths} from "../../../../lib/cms";
import {t} from "i18next";
import Header from "../../../../components/Common/Header";
import * as styles from "../blog.module.scss";
import React from "react";
import Footer from "../../../../components/Common/Footer";
import ReactHtmlParser from "react-html-parser";
import Layout from "../../../../components/Common/Layout";
import Image from "next/image";

const LangBlogPostPage = ({post})  => {
  const { body, title, image } = post;

  return (
    <Layout title={t('pages.blog.title')} description={t('description')} >
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>{title}</h1>
          <Image src={image.data.attributes.url}  width={52} height={52} />
          {  ReactHtmlParser(body) }
          <div className={styles.author}>

            <span className={styles.name}>Name</span>
            <span className={styles.date}>Date</span>
          </div>

        </section>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const languages = getSortedLangsData();
  const paths = await getPostsSlugsPaths(languages);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug, lang } = params;
  const language = getLanguage(lang);
  const post = await getPost(slug, language);

  return {
    props: {
      language,
      post,
    },
  };
}

export default LangBlogPostPage;
