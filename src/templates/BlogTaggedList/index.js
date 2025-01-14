import Layout from "../../components/Common/Layout";
import i18next, {t} from "i18next";
import Header from "../../components/Common/Header";
import * as styles from "./blogTaggedList.module.scss";
import Footer from "../../components/Common/Footer";
import Pagination from "../../components/Blog/Pagination";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import Card from "../../components/Blog/Card";

const BlogTaggedList = ({ posts, tag: { title, slug }}) => {
  const { page, pageCount } = posts.meta.pagination;
  const { language } = i18next;
  const capitalizeTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const breadcrumbs = [
    {
      href: `/${language}/blog/`,
      name: t('menu.blog'),
    },
    {
      name: `#${capitalizeTitle}`,
    }
  ];

  return (
    <Layout
      title={t('pages.blog.tag.title', { title: capitalizeTitle })}
      description={t('pages.blog.tag.description', { title: capitalizeTitle })}
    >
      <Header className={styles.header}>
        <Breadcrumbs items={breadcrumbs} classNames={styles.breadcrumbs} />
      </Header>
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>{capitalizeTitle}</h1>
          <ul className={styles.grid}>
            { posts.data.map(({ attributes }) => {
              return (
                <li key={attributes.slug}>
                  <Card attributes={attributes} imageSize={{ height: 220, width: 384 }} />
                </li>
              )})
            }
          </ul>
          <Pagination page={page}  pageCount={pageCount} path={`/${language}/blog/tags/${slug}/`} />
        </section>
      </main>
      <Footer className={styles.body}  />
    </Layout>
  );
}

export default BlogTaggedList;
