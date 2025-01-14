import {getLanguage, getBlogLangsData} from "../../../../lib/lang";
import {getPost, getPostsSlugsPaths, getSrcSet} from "../../../../lib/cms";
import i18next, {t} from "i18next";
import Header from "../../../../components/Common/Header";
import * as styles from "./post.module.scss";
import React from "react";
import Footer from "../../../../components/Common/Footer";
import Layout from "../../../../components/Common/Layout";
import Breadcrumbs from "../../../../components/Common/Breadcrumbs";
import {getFormatDate} from "../../../../lib/util";
import Tags from "../../../../components/Blog/Tags";
import {parseHtml} from "../../../../lib/html-parse";

const LangBlogPostPage = ({post})  => {
  const { body, title, image, category, author, publishedAt, tags, excerpt } = post;
  const authorImage = author.data && author.data.attributes.image.data
    ? author.data.attributes.image.data.attributes
    : undefined;

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
    <Layout
      title={t('pages.blog.post.title', { title })}
      description={t('pages.blog.post.description', { title })}
      ogImage={image?.data?.attributes?.url}
      ogDescription={excerpt}
    >
      <Header className={styles.header}>
        <Breadcrumbs items={breadcrumbs} classNames={styles.breadcrumbs}/>
      </Header>
      <div className={styles.wrapper}>
        <main className={styles.page}>
          <section className={styles.post} itemScope itemType="https://schema.org/BlogPosting">
            <h1 itemProp='name'>{title}</h1>
            <meta itemProp='description' content={excerpt} />
            { author ?
              <div className={styles.author} role="group" itemProp="author" itemScope itemType="https://schema.org/Person">
                {authorImage ?
                  <img
                    height={52}
                    width={52}
                    loading='lazy'
                    decoding='async'
                    alt={authorImage.alternativeText}
                    src={authorImage.url}
                    srcSet={getSrcSet(authorImage.formats)}
                    className={styles.avatar}
                    itemProp="image"
                  /> : null
                }
                <span itemProp="name">{author.data.attributes.title}</span>
                <time dateTime={localDate} className={styles.date}>{localDate}</time>
              </div> : null
            }
            { tags.data ? <Tags className={styles.tags} items={tags} /> : null }
            { image.data ?
              <div className={styles.cover} itemProp="image">
                <img
                  height={377}
                  width={752}
                  loading='lazy'
                  decoding='async'
                  alt={image.data.attributes.alternativeText}
                  src={image.data.attributes.url}
                  srcSet={getSrcSet(image.data.attributes.formats)}
                />
              </div> : null
            }
            <div className={styles.body} itemProp="articleBody">
            { parseHtml(body) }
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const languages = getBlogLangsData();
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
