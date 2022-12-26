import {t} from 'i18next';
import Header from "../../../components/Common/Header";
import React from "react";
import SectionHero from "../../../components/Partnership/SectionHero";
import {getAllLanguageSlugs, getLanguage} from "../../../lib/lang";
import SectionReseller from "../../../components/Partnership/SectionReseller";
import SectionAffiliate from "../../../components/Partnership/SectionAffiliate";
import SectionWorld from "../../../components/Partnership/SectionWorld";
import Footer from "../../../components/Common/Footer";
import Layout from "../../../components/Common/Layout";
import { header }  from './partnership.module.scss';

const LangPartnership = () => {
	return (
		<Layout title={t('pages.partnership.title')} description={t('description')} themeColor='#000000'>
			<Header className={ header } />
			<main>
				<SectionHero />
				<SectionReseller />
				<SectionAffiliate />
				<SectionWorld />
			</main>
			<Footer />
		</Layout>
	)
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

export default LangPartnership;
