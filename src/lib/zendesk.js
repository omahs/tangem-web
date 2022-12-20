import GeneralIcon from "../../public/svg/help/general.svg";
import SecurityIcon from "../../public/svg/help/security.svg";
import SupportedAssetsIcon from "../../public/svg/help/supported-assets.svg";
import FundTransferIcon from "../../public/svg/help/fund-transfer.svg";
import AppFunctionalityIcon from "../../public/svg/help/app-functionality.svg";
import AcquisitionIcon from "../../public/svg/help/acquisition.svg";
import React from "react";
import {ZENDESK_HELP_CENTER_API_URI} from "../config";

export const sectionsConfig = {
	5639392515485: {
		icon:  <GeneralIcon />,
		slug:  'general',
	},
	5713319369629:  {
		icon:  <SecurityIcon />,
		slug:  'security',
	},
	5713294009757:  {
		icon:  <SupportedAssetsIcon />,
		slug:  'supported-assets',
	},
	5713346162973: {
		icon:   <FundTransferIcon />,
		slug:  'fund-transfer',
	},
	5713320737437:  {
		icon:  <AppFunctionalityIcon />,
		slug:  'app-functionality',
	},
	5713345649181: {
		icon:   <AcquisitionIcon />,
		slug:  'acquisition',
	},
};


const getCodeByLanguage = (language) => ['ru', 'by'].includes(language) ? 'ru' : 'en-us';

const getData = async (language, path, page = 1, perPage = 100) => {
  const langCode =  getCodeByLanguage(language);
  const response = await fetch(`${ZENDESK_HELP_CENTER_API_URI}${langCode}/${path}?page=${page}&per_page=${perPage}`);
  return response.json();
}

const getPaginationData = async (language, path, node) => {
  const result = await getData(language, path);
  let data = result[node];
  let promises = [];
  for (let page = 2; page <= result.page_count; page++) {
    promises.push(getData(language, path, page));
  }

  const resultExtra = await Promise.all(promises);
  resultExtra.forEach((item) => { data = [...data, ...item[node]]})

  return data;
}

export const getSections = (language) => {
  return getPaginationData(language, 'sections', 'sections');
}

export const getSectionBySlug = async (language, slug) => {
  const id = Object.keys(sectionsConfig).find(key => sectionsConfig[key].slug === slug);
  const { section } = await getData(language, `sections/${id}`);
  return section
}

export const getSectionArticles = (language, id) => {
  return getPaginationData(language, `sections/${id}/articles`, 'articles');
}

export const getSectionsSlug = (languages) => {
  const slugs = Object.keys(sectionsConfig).map((key) => sectionsConfig[key].slug);
  let paths = [];
  for (const lang of languages) {
    for (const slug of slugs) {
      paths.push({ params: { lang, slug }});
    }
  }
  return paths;
}

export const searchArticles = async (language, query, limit = 100, option) => {
  const code =  getCodeByLanguage(language);
  const sections = Object.keys(sectionsConfig).join(',')
  const res = await fetch(`${ZENDESK_HELP_CENTER_API_URI}articles/search?query=${query}&per_page=${limit}&locale=${code}&section=${sections}`, option);
  const { results } = await res.json();
  return results;
}
