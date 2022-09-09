import Layout from "../Common/Layout";
import i18next, {t} from "i18next";
import Header from "../Common/Header";
import * as styles from "../../pages/[lang]/blog/blog.module.scss";
import Link from "next/link";
import Footer from "../Common/Footer";
import React from "react";
import {getSrcSet} from "../../lib/cms";

const BlogList = ({ posts, categories, category} ) => {
  const { page, pageCount } = posts.meta.pagination;
  const { language } = i18next;
  const path = category ? `/${language}/blog/${category}/` : `/${language}/blog/`;

  return (
    <Layout title={t('pages.blog.title')} description={t('description')} >
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Blog</h1>
          <ul className={styles.categories}>
            { categories.data.map(({attributes}) =>
              <li key={attributes.title} className={category===attributes.slug ? styles.current : undefined}>
                { category===attributes.slug ?
                  <a>{attributes.title}</a> :
                  <Link href={`/${language}/blog/${attributes.slug}`} >
                    <a>{attributes.title}</a>
                  </Link>}
              </li>
            )}
          </ul>
          <ul className={styles.grid}>
            { posts.data.map(({ attributes: { slug, tags, image, title, author, publishedAt }}, index) => {
              const imgSize = index < 2 ? { height: 300, width: 598 } : { height: 220, width: 384 } ;
              const { alternativeText, url, formats} = image.data.attributes;
              const authorImage = author.data.attributes.image.data.attributes;
              const date = new Date(publishedAt);
              const localDate = date
                .toLocaleString( t('locale'), { year: 'numeric', month: 'short', day: 'numeric' })
                .replace('г.', '');

              return (
                <li key={slug}>
                  <article className={styles.article}>
                    <h2>
                      <Link href={`/${language}/blog/post/${slug}/`}>
                        <a>{title}</a>
                      </Link>
                    </h2>
                    <img
                      height={imgSize.height}
                      width={imgSize.width}
                      loading='lazy'
                      decoding='async'
                      alt={alternativeText}
                      src={url}
                      srcSet={getSrcSet(formats)}
                      className={styles.cover}
                    />
                    <ul className={styles.tags}>
                      { tags.data.map( ({attributes : { name }}) =>
                        <li className={styles.tag} key={name}>{name}</li>
                      )}
                    </ul>
                    <div className={styles.author} role="group">
                      <img
                        height={40}
                        width={40}
                        loading='lazy'
                        decoding='async'
                        alt={authorImage.alternativeText}
                        src={authorImage.url}
                        srcSet={getSrcSet(authorImage.formats)}
                        className={styles.cover}
                      />
                      <span className={styles.name}>{author.data.attributes.name}</span>
                      <time dateTime={date.toLocaleString()} className={styles.date}>{localDate}</time>
                    </div>
                  </article>
                </li>
              )})
            }
          </ul>
          {
            pageCount > 1 ?
              <div className={styles.pagination}>
                {page === 1 ? <a className={styles.disabled}>{t('pagination.prev')}</a> :
                  <Link href={ page === 2 ? path : `${path}page/${page - 1}/`}>
                    <a>{t('pagination.prev')}</a>
                  </Link>
                }
                <span>{t('pagination.state', {page, pageCount})}</span>
                {page === pageCount ? <a className={styles.disabled}>{t('pagination.next')}</a> :
                  <Link href={`${path}page/${page + 1}/`}>
                    <a>{t('pagination.next')}</a>
                  </Link>
                }
              </div> : null
          }
        </section>
      </main>
      <Footer />
    </Layout>
  );
}

export default BlogList;
