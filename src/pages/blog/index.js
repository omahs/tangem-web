import BlogList from "../../templates/BlogList";
import { getLanguage} from "../../lib/lang";
import {getPostsAndCategories} from "../../lib/cms";

const BlogPage = ( {posts, categories} ) => <BlogList posts={posts} categories={categories}  />

export async function getStaticProps() {
  const language = getLanguage();

  const { posts, categories } = await getPostsAndCategories({language});

  return {
    props: {
      language,
      posts,
      categories
    },
  };
}

export default BlogPage;
