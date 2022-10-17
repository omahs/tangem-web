import Layout from "../../Common/Layout";
import i18next, {t} from "i18next";
import Header from "../../Common/Header";
import * as styles from "./blogList.module.scss";
import Link from "next/link";
import Footer from "../../Common/Footer";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Pagination from "../Pagination";
import Card from "../Card";

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
    <Layout
      title={currentCategoryTitle || t('pages.blog.title')}
      titleSuffix={currentCategoryTitle ? t('pages.blog.titleSuffix') : undefined}
      description={t('description')}
    >
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>{t('pages.blog.title')}</h1>
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
      <Footer />
    </Layout>
  );
}

export default BlogList;
