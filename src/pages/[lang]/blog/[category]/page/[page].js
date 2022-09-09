import {getLanguage, getSortedLangsData} from "../../../../../lib/lang";
import {getCategoryPagesSlugsPaths, getPosts} from "../../../../../lib/cms";
import BlogList from "../../../../../components/BlogList";


const LangBlogCategoryPagination = ({ categories, posts }) => <BlogList categories={categories} posts={posts} />

export async function getStaticPaths() {
  const languages = getSortedLangsData();
  const paths = await getCategoryPagesSlugsPaths(languages);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: {lang, page, category} }) {
  const language = getLanguage(lang);
  const { posts, categories } = await getPosts({ language, page, category } );

  return {
    props: {
      language,
      posts,
      categories,
      category
    },
  };
}

export default LangBlogCategoryPagination;
