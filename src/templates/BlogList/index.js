import Layout from "../../components/Common/Layout";
import i18next, {t} from "i18next";
import Header from "../../components/Common/Header";
import * as styles from "./blogList.module.scss";
import Link from "next/link";
import Footer from "../../components/Common/Footer";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Pagination from "../../components/Blog/Pagination";
import Card from "../../components/Blog/Card";

const BlogList = ({ posts, categories, category} ) => {
  const { page, pageCount } = posts.meta.pagination;
  const { language } = i18next;
  const path = category ? `/${language}/blog/${category}/` : `/${language}/blog/`;
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const refCategories = useRef();
  const title = category
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
    <Layout
      title={ title ? t('pages.blog.category.title', { title }) : t('pages.blog.title')}
      description={ title ? t('pages.blog.category.description', { title }) : t('pages.blog.description')}
    >
      <Header className={styles.header} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>{t('pages.blog.title')}</h1>
          <div className={styles.categories}>
            <div role="group" className={classNames(styles.dropdown, {[styles.open]: isCategoriesOpen })} >
              <button onClick={() => setIsCategoriesOpen((v) => !v)}>
                { category ? title: t('pages.blog.allCategories')}
              </button>
              <ul ref={refCategories}>
                <li key="allCategories" className={ !category ? styles.current : undefined}>
                  <Link href={`/${language}/blog/`} >
                    <a>{t('pages.blog.allCategories')}</a>
                  </Link>
                </li>
                { categories.data.map(({attributes: {slug, title}}) =>
                  <li key={title} className={category === slug ? styles.current : undefined}>
                    { category === slug ?
                      <a>{title}</a> :
                      <Link href={`/${language}/blog/${slug}`} >
                        <a>{title}</a>
                      </Link>}
                  </li>
                )}
              </ul>
            </div>
          </div>
          <ul className={styles.grid}>
            { posts.data.map(({ attributes}, index) => {

              return (
                <li key={attributes.slug}>
                  <Card attributes={attributes} isBig={index < 2} />
                </li>
              )})
            }
          </ul>
          <Pagination path={path} pageCount={pageCount} page={page} />
        </section>
      </main>
      <Footer className={styles.body} />
    </Layout>
  );
}

export default BlogList;
