import Layout from "../../../components/Common/Layout";
import {getAllLanguageSlugs, getLanguage} from "../../../lib/lang";
import {t} from "i18next";
import Header from "../../../components/Common/Header";
import * as styles from "./blog.module.scss"
import React from "react";
import Footer from "../../../components/Common/Footer";
import {useRouter} from "next/router";
import Link from "next/link";
import {getPosts} from "../../../lib/cms";

const LangBlogPage = ( {posts, categories } ) => {
  const { page, pageCount } = posts.meta.pagination;
  const router = useRouter();

  return (
  <Layout title={t('pages.company.title')} description={t('description')} >
    <Header />
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Blog</h1>
        <ul className={styles.categories}>
          {
            categories.data.map(({attributes}) => <li key={attributes.title}>{attributes.title}</li>)
          }
        </ul>
        <ul className={styles.grid}>
          {
            posts.data.map(({attributes}, index) => {
              const imgSize = index < 2 ? { height: 300, width: 598 } : { height: 220, width: 384 } ;
              const { alternativeText, url, formats} = attributes.image.data.attributes;
              const { data: tags } = attributes.tags;
              const srcset = Object.values(formats).sort((a, b) => b.width - a.width).map(({url, width}) => `${url} ${width}w`).join(', ');
              return (
              <li key={attributes.title}>
                <article className={styles.article}>
                  <h2>{attributes.title}</h2>
                  <img
                    height={imgSize.height}
                    width={imgSize.width}
                    loading='lazy'
                    decoding='async'
                    alt={alternativeText}
                    src={url}
                    srcSet={srcset}
                    className={styles.cover}
                  />
                  <ul className={styles.tags}>
                    { tags.map( ({attributes}) =>
                      <li className={styles.tag} key={attributes.name}>{attributes.name}</li>
                    )}
                  </ul>
                  <div className={styles.author}>
                    <img src={url} width={40} height={40} alt={alternativeText} />
                    <span className={styles.name}>Name</span>
                    <span className={styles.date}>Date</span>
                  </div>
                </article>
              </li>
              )})
          }
        </ul>
        <div className={styles.pagination}>
          { page === 1 ? <a className={styles.disabled}>{ t('pagination.prev') }</a> :
            <Link href={`${router.asPath}/page/${page - 1}/`} >
              <a>{ t('pagination.prev') }</a>
            </Link>
          }
          <span>{ t('pagination.state', { page, pageCount }) }</span>
          { page === pageCount ? <a className={styles.disabled}>{ t('pagination.next') }</a> :
            <Link href={`${router.asPath}/page-${page + 1}`} >
              <a>{ t('pagination.next') }</a>
            </Link>
          }
        </div>
      </section>
    { /*
      Array.isArray(posts.data) && posts.data.map((item) => {
      return  ReactHtmlParser(item.attributes.body)
      }
     )
     */
    }
    </main>
    <Footer />
  </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);

  const { posts, categories } = await getPosts(language);

  return {
    props: {
      language,
      posts,
      categories
    },
  };
}

export default LangBlogPage;
