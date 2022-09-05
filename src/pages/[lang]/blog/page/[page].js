import {getSortedLangsData} from "../../../../lib/lang";
import {sectionsConfig} from "../../../../config/faq";
import LangBlogPage from "../index";

const LangBlogPagination = (props) => <LangBlogPage props={...props} />

export async function getStaticPaths() {
  const languages = getSortedLangsData();


  const slugs = Object.keys(sectionsConfig).map((key) => sectionsConfig[key].slug);
  let paths = [];
  for (const lang of languages) {
    for (const section of slugs) {
      paths = [...paths, { params: { lang, section }}]
    }
  }

  return {
    paths,
    fallback: false,
  };
}
