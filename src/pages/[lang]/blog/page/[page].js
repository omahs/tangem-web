import {getLanguage, getSortedLangsData} from "../../../../lib/lang";
import {getPagesSlugsPaths, getPostsAndCategories} from "../../../../lib/cms";
import BlogList from "../../../../components/Blog/BlogList";

const LangBlogPagination = ({ categories, posts }) => <BlogList categories={categories} posts={posts} />

export async function getStaticPaths() {
  const languages = getSortedLangsData();
  const paths = await getPagesSlugsPaths(languages);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);

  const { posts, categories } = await getPostsAndCategories({language, page: params.page});

  return {
    props: {
      language,
      posts,
      categories
    },
  };
}

export default LangBlogPagination;
