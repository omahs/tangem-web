import {TANGEM_CMS_TOKEN, TANGEM_CMS_URI} from "../config";

const DEFAULT_PAGE_SIZE = 11;
const POST_TAG_PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 100;
const DEFAULT_POSTS_FIELDS = ['title', 'slug', 'locale', 'date'];
const DEFAULT_POST_MEDIA = '&populate[0]=image&populate[1]=category&populate[2]=author.image&populate[3]=tags';
const DEFAULT_POST_SORT = '&sort[0]=date%3Adesc&sort[1]=publishedAt%3Adesc'

/**
 *
 * @param url string
 * @returns {Promise<Response>}
 */
function getData(url) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${TANGEM_CMS_TOKEN}`
    },
  };
  return fetch(`${TANGEM_CMS_URI}${url}`, options);
}

function getPostsData({language, page = 1, category = '', tag = '', withMedia = false, pageSize = DEFAULT_PAGE_SIZE, fields = DEFAULT_POSTS_FIELDS}) {
  let params = withMedia ? DEFAULT_POST_MEDIA :'';
  params += category ? `&filters[category][slug][$eq]=${category}` : '';
  params += tag ? `&filters[tags][slug][$eq]=${tag}` : '';
  params += fields.length ? fields.map((field, index) => `&fields[${index}]=${field}`).join('') : ''

  return getData(`blog-posts/?locale=${language}&pagination[page]=${page}&pagination[pageSize]=${pageSize}${params}${DEFAULT_POST_SORT}`);
}

function getPostBySlug(slug, language) {
  return getData(`blog-posts/?locale=${language}&filters[slug][$eq]=${slug}${DEFAULT_POST_MEDIA}`);
}

function getTagBySlug(slug) {
  return getData(`tags/?filters[slug][$eq]=${slug}`);
}

function getCategoriesData(language) {
  return getData(`categories/?locale=${language}&sort[0]=position&sort[1]=id`)
}

function getTagsData() {
  return getData(`tags/`)
}

export async function getPostsForTag(options) {
  const response = await getPostsData({...options, pageSize: POST_TAG_PAGE_SIZE, withMedia: true});
  const posts = await response.json();

  return { posts }
}

export async function getPostsAndCategories(options) {
  const result = await Promise.all([
    getPostsData({...options, withMedia: true}),
    getCategoriesData(options.language),
  ]);

  const [posts, categories] = await Promise.all(
    result.map(item => item.json())
  );

  return {
    posts, categories
  }
}

/**
 *
 * @param slug string
 * @param language string
 * @returns {Promise<any>}
 */
export async function getPost(slug, language) {
  const result = await getPostBySlug(slug, language);
  const { data } =  await result.json();
  const [ item ] =  data;
  return item.attributes;
}

export async function getTag(slug) {
  const result = await getTagBySlug(slug);
  const { data } =  await result.json();
  const [ item ] =  data;
  return item.attributes;
}

export async function getSlugPaths(response, languages, param) {
  const result = await Promise.all(response.map(item => item.json()));

  return result.reduce((acc, {data}, index) => {
    const params =  data
      .map(({attributes}) => ( attributes.slug
          ? { params: { lang: languages[index], [param]: attributes.slug}}
          : undefined
      ))
      .filter((item) => !!item);
    return [...acc, ...params];
  }, []);
}

export async function getCategoriesSlugsPaths(languages) {
  const response = await Promise.all(languages.map((lang) => getCategoriesData(lang)));
  return await getSlugPaths(response, languages, 'category');
}

export async function getTagsSlugsPaths(languages) {
  const response = await getTagsData();
  const { data } = await response.json();

  return data.reduce((acc, {attributes}) => {
    languages.forEach((lang) => acc.push({ params: { lang, tag: attributes.slug }}));
    return acc;
  }, []);
}

export async function getPostsSlugsPaths(languages) {
  const response = await Promise.all(
    languages.map((language) => getPostsData({ language, pageSize: MAX_PAGE_SIZE }))
  );
  const result = await Promise.all(response.map(item => item.json()));

  const promises = result.reduce((acc, {meta}, index) => {
    for (let page = 2; page <= meta.pagination.pageCount; page++) {
      acc = [...acc, getPostsData({ language: languages[index], page, pageSize: MAX_PAGE_SIZE })];
    }
    return acc;
  }, []);

  const responseExtra = await Promise.all(promises);
  const resultExtra = await Promise.all(responseExtra.map(item => item.json()));

  return [...result, ...resultExtra]
    .reduce((acc, {data}) => {
      data.forEach(({attributes}) => {
        const { locale: lang, slug } = attributes;
        acc = [...acc, { params: { lang, slug }}];
      });

      return acc;
    }, []);
}

export async function getPagesSlugsPaths(languages) {
  const result = await Promise.all(
    languages.map((language) => getPostsData({language}))
  );
  const data = await Promise.all(result.map(item => item.json()));

  return data
    .map(({ meta }) => meta.pagination.pageCount)
    .reduce((acc, item, index) => {
      for (let i = 1; i <= item; i++) {
        acc = [...acc, { params: { lang: languages[index], page: i.toString(10) } }];
      }
      return acc;
    }, []);
}

export async function getCategoryPagesSlugsPaths(languages) {
  const categoriesResponse = await Promise.all(languages.map((language) => getCategoriesData(language)));
  const categoriesResult = await Promise.all(categoriesResponse.map(item => item.json()));
  const categories = categoriesResult
    .reduce((acc, {data}) => {
    for (const {attributes: { locale: language, slug: category }} of data) {
      if(!!category) {
        acc.push({ language, category });
      }
    }
    return acc;
  }, []);

  const response = await Promise.all(
    categories.map((item) => getPostsData(item))
  );
  const result = await Promise.all(response.map(item => item.json()));

  return result
    .map(({ meta }) => meta.pagination.pageCount)
    .reduce((acc, pageCount, index) => {
      for (let i = 1; i <= pageCount; i++) {
        const {language: lang, category } = categories[index]
        acc = [...acc, { params: { lang, category, page: i.toString(10) } }];
      }
      return acc;
    }, []);
}

export async function getTagPagesSlugsPaths(languages) {
  const responseTags = await getTagsData();
  const {data } = await responseTags.json();

  const tags = data.reduce((acc, {attributes: { slug: tag}}) => {
    languages.forEach((language) => acc.push({ language, tag, pageSize: POST_TAG_PAGE_SIZE }));
    return acc;
  }, []);

  const response = await Promise.all(
    tags.map((item) => getPostsData(item))
  );

  const result = await Promise.all(response.map(item => item.json()));

  return result
    .map(({ meta }) => meta.pagination.pageCount)
    .reduce((acc, pageCount, index) => {
      for (let i = 1; i <= pageCount; i++) {
        const {language: lang, tag } = tags[index]
        acc = [...acc, { params: { lang, tag, page: i.toString(10) } }];
      }
      return acc;
    }, []);
}


export function getSrcSet(formats) {
  if (!formats) {
    return undefined;
  }

  return Object.values(formats)
    .sort((a, b) => b.width - a.width)
    .map(({url, width}) => `${url} ${width}w`)
    .join(', ');
}
