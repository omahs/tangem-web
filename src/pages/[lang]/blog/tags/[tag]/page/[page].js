import BlogTaggedList from "../../../../../../templates/BlogTaggedList";
import {getPostsForTag, getTag, getTagPagesSlugsPaths} from "../../../../../../lib/cms";
import {getLanguage, getBlogLangsData} from "../../../../../../lib/lang";

const LangBlogTagPagination = ({ tag, posts }) =>
  <BlogTaggedList tag={tag} posts={posts} />

export async function getStaticPaths() {
  const languages = getBlogLangsData();
  const paths = await getTagPagesSlugsPaths(languages);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { tag, lang, page } = params;
  const language = getLanguage(lang);
  const [posts, tagData] = await Promise.all([
    getPostsForTag({ language, tag, page }),
    getTag(tag, language),
  ])

  return {
    props: {
      language,
      tag: tagData,
      ...posts,
    },
  };
}

export default LangBlogTagPagination;
