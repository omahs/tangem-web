import Layout from "../../Common/Layout";
import i18next, {t} from "i18next";
import Header from "../../Common/Header";
import * as styles from "./blogTaggedList.module.scss";
import Footer from "../../Common/Footer";
import Pagination from "../Pagination";
import Breadcrumbs from "../../Common/Breadcrumbs";
import Card from "../Card";

const BlogTaggedList = ({ posts, tag: { title, slug }}) => {
  const { page, pageCount } = posts.meta.pagination;
  const { language } = i18next;

  const breadcrumbs = [
    {
      href: `/${language}/blog/`,
      name: t('menu.blog'),
    },
    {
      name: `#${title}`,
    }
  ];

  const capitalizeTitle = title.charAt(0).toUpperCase() + title.slice(1);

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
          <h1>{title}</h1>
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
      <Footer />
    </Layout>
  );
}

export default BlogTaggedList;
