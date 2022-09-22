
import {getPostsForTag, getTag, getTagsSlugsPaths} from "../../../../../lib/cms";
import {getLanguage, getSortedLangsData} from "../../../../../lib/lang";
import BlogTaggedList from "../../../../../components/Blog/BlogTaggedList";

const LangBlogTag = ({ tag, posts }) =>
  <BlogTaggedList tag={tag} posts={posts} />

export async function getStaticPaths() {
  const languages = getSortedLangsData();
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
    getTag(tag),
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
