
import {getPostsForTag, getTag, getTagsSlugsPaths} from "../../../../../lib/cms";
import {getLanguage, getBlogLangsData} from "../../../../../lib/lang";
import BlogTaggedList from "../../../../../templates/BlogTaggedList";

const LangBlogTag = ({ tag, posts }) =>
  <BlogTaggedList tag={tag} posts={posts} />

export async function getStaticPaths() {
  const languages = getBlogLangsData();
  const paths = await getTagsSlugsPaths(languages);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { tag, lang } = params;
  const language = getLanguage(lang);
  const [posts, tagData] = await Promise.all([
    getPostsForTag({ language, tag, pageSize: 9 }),
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

export default LangBlogTag;
