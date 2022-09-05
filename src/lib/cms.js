import {TANGEM_CMS_TOKEN, TANGEM_CMS_URI} from "../config";

const pageSize = 11;

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

export async function getPosts(language, page= 1) {
  const result = await Promise.all([
    getData(`blog-posts/?populate=*&locale=${language}&?pagination[page]=${page}&pagination[pageSize]=${pageSize}`),
    getData(`categories/?locale=${language}`)
  ]);

  const [posts, categories] = await Promise.all(
    result.map(item => item.json())
  );

  return {
    posts, categories
  }
}

export async function getPagesSlugs(languages) {
  await Promise.all(
    languages.map((lang) => getData(`blog-posts/?populate=*&locale=${language}&pagination[pageSize]=11`) )

  )
}
