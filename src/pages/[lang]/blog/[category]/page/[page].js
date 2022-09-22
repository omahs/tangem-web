import {getLanguage, getSortedLangsData} from "../../../../../lib/lang";
import {getCategoryPagesSlugsPaths, getPostsAndCategories} from "../../../../../lib/cms";
import BlogList from "../../../../../components/Blog/BlogList";


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
  const { posts, categories } = await getPostsAndCategories({ language, page, category } );

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