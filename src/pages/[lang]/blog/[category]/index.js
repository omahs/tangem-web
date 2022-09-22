import {getLanguage, getSortedLangsData} from "../../../../lib/lang";
import {getCategoriesSlugsPaths, getPostsAndCategories} from "../../../../lib/cms";
import BlogList from "../../../../components/Blog/BlogList";

const LangBlogCategory = ({ categories, posts, category }) =>
  <BlogList categories={categories} posts={posts} category={category} />

export async function getStaticPaths() {
  const languages = getSortedLangsData();
  const paths = await getCategoriesSlugsPaths(languages);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category, lang } = params;
  const language = getLanguage(lang);
  const posts =  await getPostsAndCategories({ language, category });

  return {
    props: {
      language,
      category,
      ...posts,
    },
  };
}

export default LangBlogCategory;