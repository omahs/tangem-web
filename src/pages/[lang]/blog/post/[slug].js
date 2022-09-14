import {getLanguage, getSortedLangsData} from "../../../../lib/lang";
import {getPost, getPostsSlugsPaths, getSrcSet} from "../../../../lib/cms";
import i18next, {t} from "i18next";
import Header from "../../../../components/Common/Header";
import * as styles from "./post.module.scss";
import React from "react";
import Footer from "../../../../components/Common/Footer";
import ReactHtmlParser from "react-html-parser";
import Layout from "../../../../components/Common/Layout";
import Breadcrumbs from "../../../../components/Common/Breadcrumbs";
import {getFormatDate} from "../../../../lib/util";
import Tags from "../../../../components/Blog/Tags";

const LangBlogPostPage = ({post})  => {
  const { body, title, image, category, author, publishedAt, tags } = post;
  const authorImage = author.data ? author.data.attributes.image.data.attributes : undefined;
  const localDate = getFormatDate(publishedAt)
  const {language} = i18next;

  const breadcrumbs = [
    {
      href: `/${language}/blog/`,
      name: t('menu.blog'),
    },
    ...(category.data ? [{
        href: `/${language}/blog/${category.data.attributes.slug}/`,
        name: category.data.attributes.title,
      }] : []),
    {
      name: title,
    }
  ];

  return (
    <Layout title={t('pages.blog.title')} description={t('description')} >
      <Header className={styles.header}>
        <Breadcrumbs items={breadcrumbs} classNames={styles.breadcrumbs}/>
      </Header>
      <main className={styles.page}>
        <section className={styles.post}>
          <h1>{title}</h1>
          { authorImage ?
            <div className={styles.author} role="group">
              <img
                height={52}
                width={52}
                loading='lazy'
                decoding='async'
                alt={authorImage.alternativeText}
                src={authorImage.url}
                srcSet={getSrcSet(authorImage.formats)}
                className={styles.avatar}
              />
              <span>{author.data.attributes.name}</span>
              <time dateTime={localDate} className={styles.date}>{localDate}</time>
            </div> : null
          }
          { tags.data ? <Tags items={tags} /> : null }
          <div className={styles.cover}>
            <img
              height={377}
              width={752}
              loading='lazy'
              decoding='async'
              alt={image.data.attributes.alternativeText}
              src={image.data.attributes.url}
              srcSet={getSrcSet(image.data.attributes.formats)}
            />
          </div>
          <div className={styles.body}>
          {  ReactHtmlParser(body) }
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
