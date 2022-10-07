import {getLanguage} from "../../../lib/lang";
import React from "react";
import {getPostsAndCategories} from "../../../lib/cms";
import BlogList from "../../../components/Blog/BlogList";

const LangBlogPage = ({ posts, categories }) => <BlogList posts={posts} categories={categories} />

export async function getStaticPaths() {
  // const paths = getAllLanguageSlugs();
  return {
    paths: [{ params: { lang: 'ru' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);

  const { posts, categories } = await getPostsAndCategories({ language });

  return {
    props: {
      language,
      posts,
      categories
    },
  };
}

export default LangBlogPage;
