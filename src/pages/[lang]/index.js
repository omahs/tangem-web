import React from "react";
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';
import {LangHomeTemplate} from "../../templates/Home";

export const LangHome = () => {
	return <LangHomeTemplate />
}

export async function getStaticPaths() {
	const paths = getAllLanguageSlugs();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const language = getLanguage(params.lang);

	return {
		props: {
			language,
		},
	};
}


export default LangHome
