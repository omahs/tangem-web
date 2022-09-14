import BlogList from "../../components/Blog/BlogList";
import { getLanguage} from "../../lib/lang";
import {getPosts} from "../../lib/cms";

const BlogPage = ( {posts, categories} ) => <BlogList posts={posts} categories={categories}  />

export async function getStaticProps() {
  const language = getLanguage();

  const { posts, categories } = await getPosts({language});

  return {
    props: {
      language,
      posts,
      categories
    },
  };
}

export default BlogPage;
