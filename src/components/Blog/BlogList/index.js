import Layout from "../../Common/Layout";
import i18next, {t} from "i18next";
import Header from "../../Common/Header";
import * as styles from "./blogList.module.scss";
import Link from "next/link";
import Footer from "../../Common/Footer";
import React, {useEffect, useRef, useState} from "react";
import {getSrcSet} from "../../../lib/cms";
import classNames from "classnames";
import {getFormatDate} from "../../../lib/util";
import Tags from "../Tags";

const BlogList = ({ posts, categories, category} ) => {
  const { page, pageCount } = posts.meta.pagination;
  const { language } = i18next;
  const path = category ? `/${language}/blog/${category}/` : `/${language}/blog/`;
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const refCategories = useRef();
  const currentCategoryTitle = category
    ? categories.data.find(({attributes}) => attributes.slug === category).attributes.title
    : undefined;

  useEffect(() => {
    if(!refCategories.current) {
      return function empty() {
        //
      }
    }
    refCategories.current.style.maxHeight = isCategoriesOpen ? refCategories.current.scrollHeight + "px" : null;
  }, [isCategoriesOpen]);

  return (
    <Layout title={t('pages.blog.title')} description={t('description')} >
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Blog</h1>
          <div className={styles.categories}>
            <div role="group" className={classNames(styles.dropdown, {[styles.open]: isCategoriesOpen })} >
              <button onClick={() => setIsCategoriesOpen((v) => !v)}>
                { category ? currentCategoryTitle: t('pages.blog.allCategories')}
              </button>
              <ul ref={refCategories}>
                <li key="allCategories" className={ !category ? styles.current : undefined}>
                  <Link href={`/${language}/blog/`} >
                    <a>{t('pages.blog.allCategories')}</a>
                  </Link>
                </li>
                { categories.data.map(({attributes}) =>
                  <li key={attributes.title} className={category === attributes.slug ? styles.current : undefined}>
                    { category === attributes.slug ?
                      <a>{attributes.title}</a> :
                      <Link href={`/${language}/blog/${attributes.slug}`} >
                        <a>{attributes.title}</a>
                      </Link>}
                  </li>
                )}
              </ul>
            </div>
          </div>
          <ul className={styles.grid}>
            { posts.data.map(({ attributes: { slug, tags, image, title, author, publishedAt }}, index) => {
              const imgSize = index < 2 ? { height: 300, width: 598 } : { height: 220, width: 384 } ;
              const { alternativeText, url, formats} = image.data.attributes;
              const authorImage = author.data.attributes.image.data.attributes;
              const localDate = getFormatDate(publishedAt)

              return (
                <li key={slug}>
                  <article className={styles.article} >
                    <div role="group" className={styles.info}>
                      <h2>
                        <Link href={`/${language}/blog/post/${slug}/`}>
                          <a>{title}</a>
                        </Link>
                      </h2>
                      <Tags items={tags} />
                      <div className={styles.author} role="group">
                        <img
                          height={40}
                          width={40}
                          loading='lazy'
                          decoding='async'
                          alt={authorImage.alternativeText}
                          src={authorImage.url}
                          srcSet={getSrcSet(authorImage.formats)}
                          className={styles.avatar}
                        />
                        <span className={styles.name}>{author.data.attributes.name}</span>
                        <time dateTime={localDate} className={styles.date}>{localDate}</time>
                      </div>
                    </div>
                    <div className={styles.cover}>
                      <img
                        height={imgSize.height}
                        width={imgSize.width}
                        loading='lazy'
                        decoding='async'
                        alt={alternativeText}
                        src={url}
                        srcSet={getSrcSet(formats)}
                      />
                    </div>
                  </article>
                </li>
              )})
            }
          </ul>
          {
            pageCount > 1 ?
              <div className={styles.pagination}>
                {page === pageCount ? <a className={styles.disabled}>{t('pagination.next')}</a> :
                  <Link href={`${path}page/${page + 1}/`}>
                    <a>{t('pagination.next')}</a>
                  </Link>
                }
                <span>{t('pagination.state', {page, pageCount})}</span>
                { page === 1 ? <a className={styles.disabled}>{t('pagination.prev')}</a> :
                  <Link href={ page === 2 ? path : `${path}page/${page - 1}/`}>
                    <a>{t('pagination.prev')}</a>
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
