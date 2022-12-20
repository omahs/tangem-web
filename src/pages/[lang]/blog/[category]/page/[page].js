import {getLanguage, getBlogLangsData} from "../../../../../lib/lang";
import {getCategoryPagesSlugsPaths, getPostsAndCategories} from "../../../../../lib/cms";
import BlogList from "../../../../../templates/BlogList";


const LangBlogCategoryPagination = ({ categories, posts }) => <BlogList categories={categories} posts={posts} />

export async function getStaticPaths() {
  const languages = getBlogLangsData();
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
